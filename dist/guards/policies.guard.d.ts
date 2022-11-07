import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { DataSource } from 'typeorm';
export declare class PoliciesGuard implements CanActivate {
    private readonly dataSource;
    private reflector;
    constructor(dataSource: DataSource, reflector: Reflector);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
