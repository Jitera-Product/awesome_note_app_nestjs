import {
  BadRequestException,
  CACHE_MANAGER,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import * as dayjs from 'dayjs';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JWTConfig } from 'src/configs';
import { Cache } from 'cache-manager';
import { JwtDto } from './dtos/jwt.dto';
import { SignUpDto } from './dtos/sign-up.dto';
import { GrantTokenDto } from './dtos/grant-token.dto';
import { ScopeEnum } from './dtos/scope.dto';
import { User } from 'entities/users';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as ms from 'ms';
import { validate } from 'class-validator';
import { MailService } from 'src/shared/mail/mail.service';
import { VerifyResetPasswordDTO } from './dtos/verify-reset-password.dto';
import { TokenResponseDTO } from './dtos/token-response.dto';

@Injectable()
export class OAuthService {
  private jwtConfig: JWTConfig;

  constructor(
    @Inject(CACHE_MANAGER) private cacheService: Cache,
    @InjectRepository(User) private userRepo: Repository<User>,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {
    this.jwtConfig = this.configService.get<JWTConfig>('jwt');
  }

  protected get isRequireConfirmation() {
    return this.configService.get('authentication.sendConfirmationEmail');
  }

  async login(grantTokenDto: GrantTokenDto) {
    switch (grantTokenDto.scope) {
      case 'users':
        return this.loginUser(grantTokenDto);
      default:
        throw new BadRequestException(`scope ${grantTokenDto.scope} is not supported.`);
    }
  }

  async signUpUser(signUpDto: SignUpDto) {
    const user = this.userRepo.create(signUpDto);
    user.encrypted_password = await bcrypt.hash(user.password, 10);
    user.password = undefined;

    const errors = await validate(user);
    if (errors.length > 0) {
      throw new BadRequestException(errors?.map((e) => Object.values(e.constraints)?.join(',')));
    }

    await this.userRepo.save(user);

    if (this.isRequireConfirmation) {
      await this.sendUserConfirmationEmail(user);
    }

    return this._generateTokenResponse({
      userId: user.id,
      scope: ScopeEnum.users,
      resourceOwner: 'users',
    });
  }

  async loginUser(grantTokenDto: GrantTokenDto) {
    const user = await this.userRepo.findOneBy({ email: grantTokenDto.email });
    const isValidPassword = bcrypt.compareSync(
      grantTokenDto.password,
      user?.encrypted_password || '',
    );
    if (!user || !isValidPassword || (this.isRequireConfirmation && !user.confirmed_at)) {
      throw new UnauthorizedException();
    }

    return this._generateTokenResponse({
      userId: user.id,
      scope: grantTokenDto.scope,
      resourceOwner: 'users',
    });
  }

  async sendUserConfirmationEmail(user: User) {
    user.confirmation_token = await bcrypt.hash(JSON.stringify(user), 10);
    user.confirmation_sent_at = new Date();
    await this.userRepo.save(user);

    return this.mailService.sendMail({
      to: user.email,
      subject: 'Confirmation instructions',
      template: 'email-confirmation',
      context: {
        url: this.configService.get('authentication.confirmationUrl'),
        email: user.email,
        token: user.confirmation_token,
      },
    });
  }

  async verifyUserConfirmationEmail(token: string) {
    const user = await this.userRepo.findOneBy({ confirmation_token: token });

    if (!user) {
      throw new BadRequestException('Token is invalid');
    }

    const confirmTokenExpireTime = dayjs(user.confirmation_sent_at).add(
      this.configService.get('authentication.confirmationIn'),
      'h',
    );

    if (dayjs().isAfter(confirmTokenExpireTime)) {
      throw new BadRequestException('Token is expired');
    }

    user.confirmed_at = new Date();
    user.confirmation_token = '';
    user.confirmation_sent_at = null;

    await this.userRepo.save(user);

    return { success: true };
  }

  async resetUserPassword(email: string) {
    const user = await this.userRepo.findOneBy({ email });

    if (!user) {
      throw new BadRequestException('Email not found');
    }

    if (!user.confirmed_at) {
      throw new BadRequestException('Email not confirm yet');
    }

    user.reset_password_token = await bcrypt.hash(
      JSON.stringify({ ...user, date: new Date().toISOString() }),
      10,
    );
    user.reset_password_sent_at = new Date();
    await this.userRepo.save(user);

    const result = await this.mailService.sendMail({
      to: user.email,
      subject: 'Change my password',
      template: 'reset-password',
      context: {
        url: this.configService.get('authentication.resetPasswordUrl'),
        email: user.email,
        token: user.reset_password_token,
      },
    });

    return { success: result };
  }

  async verifyUserResetPassword(data: VerifyResetPasswordDTO) {
    const { reset_token, password } = data;

    const user = await this.userRepo.findOneBy({ reset_password_token: reset_token });

    if (!user) {
      throw new BadRequestException('Token is invalid');
    }

    const resetTokenExpireTime = dayjs(user.reset_password_sent_at).add(
      this.configService.get('authentication.resetPasswordIn'),
      'h',
    );

    if (dayjs().isAfter(resetTokenExpireTime)) {
      throw new BadRequestException('Token is expired');
    }

    user.reset_password_token = '';
    user.reset_password_sent_at = null;
    user.encrypted_password = await bcrypt.hash(password, 10);
    await this.userRepo.save(user);

    return { success: true };
  }

  async revokeToken(refreshToken: string) {
    const payload = await this.jwtService.verifyAsync<JwtDto>(refreshToken, {
      secret: this.jwtConfig.refreshSecret,
    });

    await this.cacheService.set(`bl_${payload.iat}`, payload.iat, {
      ttl: Math.round(payload.exp / 1000),
    });

    return { success: true };
  }

  private async _generateTokenResponse(
    payload: Pick<JwtDto, 'userId' | 'scope' | 'resourceOwner'>,
  ): Promise<TokenResponseDTO> {
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: this.jwtConfig.expiresIn,
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.jwtConfig.refreshSecret,
      expiresIn: this.jwtConfig.refreshIn,
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      resource_owner: payload.resourceOwner,
      resource_id: payload.userId,
      expires_in: ms(this.jwtConfig.expiresIn),
      token_type: 'Bearer',
      scope: payload.scope,
      create_at: new Date(),
    };
  }
}
