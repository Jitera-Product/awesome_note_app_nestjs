"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseService = exports.QueryOrderDir = exports.QueryWhereType = exports.QueryOperators = void 0;
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const index_1 = require("../constants/index");
const lodash_1 = require("lodash");
var QueryOperators;
(function (QueryOperators) {
    QueryOperators["START_WITH"] = "START_WITH";
    QueryOperators["END_WITH"] = "END_WITH";
    QueryOperators["CONTAIN"] = "CONTAIN";
    QueryOperators["NOT_EQUAL"] = "NOT_EQUAL";
    QueryOperators["EQUAL"] = "EQUAL";
    QueryOperators["GREATER_THAN"] = "GREATER_THAN";
    QueryOperators["LESS_THAN"] = "LESS_THAN";
    QueryOperators["GREATER_OR_EQUAL_THAN"] = "GREATER_OR_EQUAL_THAN";
    QueryOperators["LESS_OR_EQUAL_THAN"] = "LESS_OR_EQUAL_THAN";
})(QueryOperators = exports.QueryOperators || (exports.QueryOperators = {}));
var QueryWhereType;
(function (QueryWhereType) {
    QueryWhereType["WHERE"] = "WHERE";
    QueryWhereType["WHERE_AND"] = "WHERE_AND";
    QueryWhereType["WHERE_OR"] = "WHERE_OR";
})(QueryWhereType = exports.QueryWhereType || (exports.QueryWhereType = {}));
var QueryOrderDir;
(function (QueryOrderDir) {
    QueryOrderDir["ASC"] = "ASC";
    QueryOrderDir["DESC"] = "DESC";
})(QueryOrderDir = exports.QueryOrderDir || (exports.QueryOrderDir = {}));
class BaseService {
    constructor(repository) {
        this.repository = repository;
    }
    get alias() {
        return this.repository.metadata.tableName;
    }
    get primaryFields() {
        return this.repository.metadata.primaryColumns.map((column) => column.propertyName);
    }
    get entityType() {
        return this.repository.target;
    }
    async findMany(params) {
        const { conditions, relations, pagination, order } = params;
        const queryBuilder = this.repository.createQueryBuilder(this.alias);
        if ((conditions === null || conditions === void 0 ? void 0 : conditions.length) > 0) {
            this._buildConditionQuery(queryBuilder, conditions);
        }
        if ((relations === null || relations === void 0 ? void 0 : relations.length) > 0) {
            this._buildRelationQuery(queryBuilder, relations);
        }
        queryBuilder.skip(((pagination.page || index_1.DEFAULT_PAGE_NUMBER) - 1) * (pagination.limit || index_1.DEFAULT_PAGE_SIZE));
        queryBuilder.take(pagination.limit || index_1.DEFAULT_PAGE_SIZE);
        if (order) {
            queryBuilder.orderBy(`${this._parseColumnName(order.orderBy)}`, order.orderDir);
        }
        const [records, total] = await queryBuilder.getManyAndCount();
        const totalPage = this._getTotalPages(total, pagination.limit || index_1.DEFAULT_PAGE_SIZE);
        return [records, totalPage];
    }
    async findOne(params) {
        const { conditions, relations } = params;
        const queryBuilder = this.repository.createQueryBuilder(this.alias);
        if ((conditions === null || conditions === void 0 ? void 0 : conditions.length) > 0) {
            this._buildConditionQuery(queryBuilder, conditions);
        }
        if ((relations === null || relations === void 0 ? void 0 : relations.length) > 0) {
            this._buildRelationQuery(queryBuilder, relations);
        }
        const entity = await queryBuilder.getOne();
        if (!entity) {
            throw new common_1.NotFoundException();
        }
        return entity;
    }
    async createOne(params) {
        const { data, relations } = params;
        const entity = (0, class_transformer_1.plainToInstance)(this.entityType, data);
        const savedEntity = await this.repository.save(entity);
        const conditions = this.primaryFields.map((field) => {
            return {
                column: field,
                value: savedEntity[field],
                operator: QueryOperators.EQUAL,
                whereType: QueryWhereType.WHERE_AND,
            };
        });
        return this.findOne({ conditions, relations });
    }
    async updateOne(params) {
        const { conditions, data, relations } = params;
        const entity = await this.findOne({ conditions });
        const updatedEntity = !(0, lodash_1.isEmpty)(data)
            ? await this.repository.save(this.repository.merge(entity, data))
            : entity;
        const newConditions = this.primaryFields.map((field) => {
            return {
                column: field,
                value: updatedEntity[field],
                operator: QueryOperators.EQUAL,
                whereType: QueryWhereType.WHERE_AND,
            };
        });
        return this.findOne({ conditions: newConditions, relations });
    }
    async removeOne(params) {
        const { conditions } = params;
        const entity = await this.findOne({ conditions });
        await this.repository.remove(entity);
        return {};
    }
    _getTotalPages(totalRecords, limit) {
        const totalPages = totalRecords / limit;
        const remainder = totalRecords % limit;
        return remainder > 0 ? Math.floor(totalPages) + 1 : totalPages;
    }
    _buildConditionQuery(queryBuilder, conditions) {
        conditions.forEach((condition) => {
            const { whereType, column, value, operator } = condition;
            if (value === undefined || value === null)
                return;
            const statement = `${this._parseColumnName(column)} ${this._parseOperator(operator)} :${this._parseParamName(column)}`;
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
    _buildRelationQuery(queryBuilder, relations) {
        relations.forEach(({ column, alias }) => {
            queryBuilder.leftJoinAndSelect(`${this._parseColumnName(column)}`, alias);
        });
    }
    _parseOperator(operator) {
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
    _parseParameter(value, operator) {
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
    _parseColumnName(name) {
        return name.includes('.') ? name : `${this.alias}.${name}`;
    }
    _parseParamName(name) {
        return name.includes('.') ? name.split('.').pop() : name;
    }
}
exports.BaseService = BaseService;
//# sourceMappingURL=base.service.js.map