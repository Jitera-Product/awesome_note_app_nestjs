import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from 'entities/users';
import { JwtDto } from 'src/features/auth/dtos/jwt.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AUTH_STRATEGY } from 'src/constants';
import { Cache } from 'cache-manager';

@Injectable()
export default class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  AUTH_STRATEGY.REFRESH_TOKEN,
) {
  constructor(
    readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
    @InjectRepository(User) private usersRepo: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      ignoreExpiration: false,
      secretOrKey: configService.get('jwt.refreshSecret'),
    });
  }

  async validate(payload: JwtDto) {
    const blacklistToken = await this.cacheService.get(`bl_${payload.iat}`);

    if (blacklistToken) {
      throw new UnauthorizedException();
    }

    switch (payload.resourceOwner) {
      case 'users':
        return this.validateUser(payload.userId);
      default:
        throw new BadRequestException(`scope ${payload.scope} is not supported.`);
    }
  }

  async validateUser(userId: number) {
    const user = await this.usersRepo.findOneBy({ id: userId });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
