import { DeepPartial, Repository } from 'typeorm';
export declare enum QueryOperators {
    START_WITH = "START_WITH",
    END_WITH = "END_WITH",
    CONTAIN = "CONTAIN",
    NOT_EQUAL = "NOT_EQUAL",
    EQUAL = "EQUAL",
    GREATER_THAN = "GREATER_THAN",
    LESS_THAN = "LESS_THAN",
    GREATER_OR_EQUAL_THAN = "GREATER_OR_EQUAL_THAN",
    LESS_OR_EQUAL_THAN = "LESS_OR_EQUAL_THAN"
}
export declare enum QueryWhereType {
    WHERE = "WHERE",
    WHERE_AND = "WHERE_AND",
    WHERE_OR = "WHERE_OR"
}
export declare enum QueryOrderDir {
    ASC = "ASC",
    DESC = "DESC"
}
export declare type QueryCondition = {
    column: string;
    value: unknown;
    operator: QueryOperators;
    whereType: QueryWhereType;
    paramName?: string;
};
export declare type QueryPagination = {
    page: number;
    limit: number;
};
export declare type QueryOrder = {
    orderBy: string;
    orderDir: QueryOrderDir;
};
export declare type QueryRelation = {
    column: string;
    alias: string;
};
declare type ClassType<T> = {
    new (...args: any[]): T;
};
export declare class BaseService<T> {
    repository: Repository<T>;
    constructor(repository: Repository<T>);
    protected get alias(): string;
    protected get primaryFields(): string[];
    protected get entityType(): ClassType<T>;
    findMany(params: {
        conditions?: QueryCondition[];
        relations?: QueryRelation[];
        pagination?: QueryPagination;
        order?: QueryOrder;
    }): Promise<[T[], number]>;
    findOne(params: {
        conditions?: QueryCondition[];
        relations?: QueryRelation[];
    }): Promise<T>;
    createOne(params: {
        data: DeepPartial<T>;
        relations?: QueryRelation[];
    }): Promise<T>;
    updateOne(params: {
        conditions: QueryCondition[];
        data?: DeepPartial<T>;
        relations?: QueryRelation[];
    }): Promise<T>;
    removeOne(params: {
        conditions: QueryCondition[];
    }): Promise<{}>;
    private _getTotalPages;
    private _buildConditionQuery;
    private _buildRelationQuery;
    private _parseOperator;
    private _parseParameter;
    private _parseColumnName;
    private _parseParamName;
}
export {};
