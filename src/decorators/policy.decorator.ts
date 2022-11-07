import { applyDecorators, SetMetadata } from '@nestjs/common';
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

export const POLICY_KEY = 'POLICY_KEY';
export const ACTION_KEY = 'ACTION_KEY';
export const RESOURCE_ENTITY_KEY = 'RESOURCE_ENTITY_KEY';

export const UsePolicy = (policy: IPolicyClass, resource: EntityClassOrSchema) => {
  return applyDecorators(
    SetMetadata(POLICY_KEY, policy),
    SetMetadata(RESOURCE_ENTITY_KEY, resource),
  );
};

export const CheckPolicy = (action: string) => SetMetadata(ACTION_KEY, action);
