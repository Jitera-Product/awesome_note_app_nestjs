import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { User } from 'entities/users';
export interface IPolicy {
    authorize: (action: string, resource?: unknown) => boolean;
    scope: () => Record<string, string> | {};
    setUser: (user: User) => void;
}
export interface IPolicyClass {
    new (): IPolicy;
}
export declare const POLICY_KEY = "POLICY_KEY";
export declare const ACTION_KEY = "ACTION_KEY";
export declare const RESOURCE_ENTITY_KEY = "RESOURCE_ENTITY_KEY";
export declare const UsePolicy: (policy: IPolicyClass, resource: EntityClassOrSchema) => <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
export declare const CheckPolicy: (action: string) => import("@nestjs/common").CustomDecorator<string>;
