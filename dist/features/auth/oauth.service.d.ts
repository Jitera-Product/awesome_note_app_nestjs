import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Cache } from 'cache-manager';
import { SignUpDto } from './dtos/sign-up.dto';
import { GrantTokenDto } from './dtos/grant-token.dto';
import { User } from 'entities/users';
import { Repository } from 'typeorm';
import { MailService } from 'src/shared/mail/mail.service';
import { VerifyResetPasswordDTO } from './dtos/verify-reset-password.dto';
import { TokenResponseDTO } from './dtos/token-response.dto';
export declare class OAuthService {
    private cacheService;
    private userRepo;
    private readonly configService;
    private readonly jwtService;
    private readonly mailService;
    private jwtConfig;
    constructor(cacheService: Cache, userRepo: Repository<User>, configService: ConfigService, jwtService: JwtService, mailService: MailService);
    protected get isRequireConfirmation(): any;
    login(grantTokenDto: GrantTokenDto): Promise<TokenResponseDTO>;
    signUpUser(signUpDto: SignUpDto): Promise<TokenResponseDTO>;
    loginUser(grantTokenDto: GrantTokenDto): Promise<TokenResponseDTO>;
    sendUserConfirmationEmail(user: User): Promise<boolean>;
    verifyUserConfirmationEmail(token: string): Promise<{
        success: boolean;
    }>;
    resetUserPassword(email: string): Promise<{
        success: boolean;
    }>;
    verifyUserResetPassword(data: VerifyResetPasswordDTO): Promise<{
        success: boolean;
    }>;
    revokeToken(refreshToken: string): Promise<{
        success: boolean;
    }>;
    private _generateTokenResponse;
}
