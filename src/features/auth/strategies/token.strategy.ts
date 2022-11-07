import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from 'entities/users';
import { JwtDto } from 'src/features/auth/dtos/jwt.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AUTH_STRATEGY } from 'src/constants';

@Injectable()
export default class TokenStrategy extends PassportStrategy(Strategy, AUTH_STRATEGY.TOKEN) {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(User) private usersRepo: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('jwt.accessSecret'),
    });
  }

  async validate(payload: JwtDto) {
    switch (payload.resourceOwner) {
      case 'users':
        return this.validateUser(payload.userId);
      default:
        throw new BadRequestException(`scope ${payload.scope} is not supported.`);
    }
  }

  async validateUser(userId: number) {
    const user = await this.usersRepo.findOneBy({ id: userId });

    if (
      !user ||
      (this.configService.get('authentication.sendConfirmationEmail') && !user.confirmed_at)
    ) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
