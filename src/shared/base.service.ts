import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { DeepPartial, Repository, SelectQueryBuilder } from 'typeorm';
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from 'src/constants/index';
import { isEmpty } from 'lodash';

export enum QueryOperators {
  START_WITH = 'START_WITH',
  END_WITH = 'END_WITH',
  CONTAIN = 'CONTAIN',
  NOT_EQUAL = 'NOT_EQUAL',
  EQUAL = 'EQUAL',
  GREATER_THAN = 'GREATER_THAN',
  LESS_THAN = 'LESS_THAN',
  GREATER_OR_EQUAL_THAN = 'GREATER_OR_EQUAL_THAN',
  LESS_OR_EQUAL_THAN = 'LESS_OR_EQUAL_THAN',
}

export enum QueryWhereType {
  WHERE = 'WHERE',
  WHERE_AND = 'WHERE_AND',
  WHERE_OR = 'WHERE_OR',
}

export enum QueryOrderDir {
  ASC = 'ASC',
  DESC = 'DESC',
}

export type QueryCondition = {
  column: string;
  value: unknown;
  operator: QueryOperators;
  whereType: QueryWhereType;
  paramName?: string; // use for relation condition
};

export type QueryPagination = {
  page: number;
  limit: number;
};

export type QueryOrder = {
  orderBy: string;
  orderDir: QueryOrderDir;
};

export type QueryRelation = {
  column: string;
  alias: string;
};

type ClassType<T> = {
  new (...args: any[]): T;
};

export class BaseService<T> {
  public repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this.repository = repository;
  }

  protected get alias(): string {
    return this.repository.metadata.tableName;
  }

  protected get primaryFields(): string[] {
    return this.repository.metadata.primaryColumns.map((column) => column.propertyName);
  }

  protected get entityType(): ClassType<T> {
    return this.repository.target as ClassType<T>;
  }

  async findMany(params: {
    conditions?: QueryCondition[];
    relations?: QueryRelation[];
    pagination?: QueryPagination;
    order?: QueryOrder;
  }): Promise<[T[], number]> {
    const { conditions, relations, pagination, order } = params;
    const queryBuilder = this.repository.createQueryBuilder(this.alias);

    if (conditions?.length > 0) {
      this._buildConditionQuery(queryBuilder, conditions);
    }

    if (relations?.length > 0) {
      this._buildRelationQuery(queryBuilder, relations);
    }

    queryBuilder.skip(
      ((pagination.page || DEFAULT_PAGE_NUMBER) - 1) * (pagination.limit || DEFAULT_PAGE_SIZE),
    );
    queryBuilder.take(pagination.limit || DEFAULT_PAGE_SIZE);

    if (order) {
      queryBuilder.orderBy(`${this._parseColumnName(order.orderBy)}`, order.orderDir);
    }

    const [records, total] = await queryBuilder.getManyAndCount();

    const totalPage = this._getTotalPages(total, pagination.limit || DEFAULT_PAGE_SIZE);

    return [records, totalPage];
  }

  async findOne(params: { conditions?: QueryCondition[]; relations?: QueryRelation[] }) {
    const { conditions, relations } = params;
    const queryBuilder = this.repository.createQueryBuilder(this.alias);

    if (conditions?.length > 0) {
      this._buildConditionQuery(queryBuilder, conditions);
    }

    if (relations?.length > 0) {
      this._buildRelationQuery(queryBuilder, relations);
    }

    const entity = await queryBuilder.getOne();

    if (!entity) {
      throw new NotFoundException();
    }

    return entity;
  }

  async createOne(params: { data: DeepPartial<T>; relations?: QueryRelation[] }) {
    const { data, relations } = params;

    const entity = plainToInstance(this.entityType, data);

    const savedEntity = await this.repository.save(entity);

    const conditions: QueryCondition[] = this.primaryFields.map((field) => {
      return {
        column: field,
        value: savedEntity[field],
        operator: QueryOperators.EQUAL,
        whereType: QueryWhereType.WHERE_AND,
      };
    });

    return this.findOne({ conditions, relations });
  }

  async updateOne(params: {
    conditions: QueryCondition[];
    data?: DeepPartial<T>;
    relations?: QueryRelation[];
  }) {
    const { conditions, data, relations } = params;

    const entity = await this.findOne({ conditions });

    const updatedEntity = !isEmpty(data)
      ? await this.repository.save(this.repository.merge(entity, data))
      : entity;

    const newConditions: QueryCondition[] = this.primaryFields.map((field) => {
      return {
        column: field,
        value: updatedEntity[field],
        operator: QueryOperators.EQUAL,
        whereType: QueryWhereType.WHERE_AND,
      };
    });

    return this.findOne({ conditions: newConditions, relations });
  }

  async removeOne(params: { conditions: QueryCondition[] }) {
    const { conditions } = params;

    const entity = await this.findOne({ conditions });

    await this.repository.remove(entity);

    return {};
  }

  private _getTotalPages(totalRecords: number, limit: number) {
    const totalPages = totalRecords / limit;
    const remainder = totalRecords % limit;
    return remainder > 0 ? Math.floor(totalPages) + 1 : totalPages;
  }

  private _buildConditionQuery(queryBuilder: SelectQueryBuilder<T>, conditions: QueryCondition[]) {
    conditions.forEach((condition) => {
      const { whereType, column, value, operator } = condition;

      if (value === undefined || value === null) return;

      const statement = `${this._parseColumnName(column)} ${this._parseOperator(
        operator,
      )} :${this._parseParamName(column)}`;
      const param = { [this._parseParamName(column)]: this._parseParameter(value, operator) };
      switch (whereType) {
        case QueryWhereType.WHERE:
          queryBuilder.where(statement, param);
          break;
        case QueryWhereType.WHERE_AND:
          queryBuilder.andWhere(statement, param);
          break;
        case QueryWhereType.WHERE_OR:
          queryBuilder.orWhere(statement, param);
          break;
      }
    });
  }

  private _buildRelationQuery(queryBuilder: SelectQueryBuilder<T>, relations: QueryRelation[]) {
    relations.forEach(({ column, alias }) => {
      queryBuilder.leftJoinAndSelect(`${this._parseColumnName(column)}`, alias);
    });
  }

  private _parseOperator(operator: QueryCondition['operator']) {
    switch (operator) {
      case QueryOperators.START_WITH:
      case QueryOperators.END_WITH:
      case QueryOperators.CONTAIN:
        return 'LIKE';
      case QueryOperators.GREATER_OR_EQUAL_THAN:
        return '>=';
      case QueryOperators.GREATER_THAN:
        return '>';
      case QueryOperators.LESS_OR_EQUAL_THAN:
        return '<=';
      case QueryOperators.LESS_THAN:
        return '<';
      case QueryOperators.NOT_EQUAL:
        return '!=';
      default:
        return '=';
    }
  }

  private _parseParameter(value: unknown, operator: QueryCondition['operator']) {
    switch (operator) {
      case QueryOperators.START_WITH:
        return `${value}%`;
      case QueryOperators.END_WITH:
        return `%${value}`;
      case QueryOperators.CONTAIN:
        return `&${value}%`;
      default:
        return value;
    }
  }

  private _parseColumnName(name: string) {
    return name.includes('.') ? name : `${this.alias}.${name}`;
  }

  private _parseParamName(name: string) {
    return name.includes('.') ? name.split('.').pop() : name;
  }
}
