import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { User } from 'entities/users';
import { JwtDto } from 'src/features/auth/dtos/jwt.dto';
import { Repository } from 'typeorm';
declare const TokenStrategy_base: new (...args: any[]) => Strategy;
export default class TokenStrategy extends TokenStrategy_base {
    private readonly configService;
    private usersRepo;
    constructor(configService: ConfigService, usersRepo: Repository<User>);
    validate(payload: JwtDto): Promise<User>;
    validateUser(userId: number): Promise<User>;
}
export {};
