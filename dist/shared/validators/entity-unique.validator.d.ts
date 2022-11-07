import { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from 'class-validator';
import { EntitySchema, DataSource, ObjectType } from 'typeorm';
export interface UniqueValidationArguments<E> extends ValidationArguments {
    constraints: [EntitySchema<E> | ObjectType<E>];
}
export declare class EntityUniqueValidator implements ValidatorConstraintInterface {
    protected readonly dataSource: DataSource;
    constructor(dataSource: DataSource);
    validate<E>(value: any, args: UniqueValidationArguments<E>): Promise<boolean>;
    defaultMessage<E>(args: UniqueValidationArguments<E>): string;
}
export declare function EntityUnique<E>(entity: EntitySchema<E> | ObjectType<E>, validationOptions?: ValidationOptions): (object: object, propertyName: string) => void;
