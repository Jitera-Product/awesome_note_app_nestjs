import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { User } from 'entities/users';
import { JwtDto } from 'src/features/auth/dtos/jwt.dto';
import { Repository } from 'typeorm';
import { Cache } from 'cache-manager';
declare const RefreshTokenStrategy_base: new (...args: any[]) => Strategy;
export default class RefreshTokenStrategy extends RefreshTokenStrategy_base {
    readonly configService: ConfigService;
    private cacheService;
    private usersRepo;
    constructor(configService: ConfigService, cacheService: Cache, usersRepo: Repository<User>);
    validate(payload: JwtDto): Promise<User>;
    validateUser(userId: number): Promise<User>;
}
export {};
