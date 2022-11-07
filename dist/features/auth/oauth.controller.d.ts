import { OAuthService } from './oauth.service';
import { SignUpDto } from './dtos/sign-up.dto';
import { GrantTokenDto } from './dtos/grant-token.dto';
import { RevokeTokenDto } from './dtos/revoke-token.dto';
import { TokenResponseDTO } from './dtos/token-response.dto';
import { ResetPasswordDTO } from './dtos/reset-password.dto';
import { VerifyResetPasswordDTO } from './dtos/verify-reset-password.dto';
import { VerifyConfirmationDTO } from './dtos/verify-conformation.dto';
import { SuccessResponseDTO } from './dtos/success-response.dto';
export declare class OAuthController {
    private readonly oauthService;
    constructor(oauthService: OAuthService);
    signUpUser(body: SignUpDto): Promise<TokenResponseDTO>;
    verifyUserConfirmationEmail(body: VerifyConfirmationDTO): Promise<SuccessResponseDTO>;
    resetUserPassword(body: ResetPasswordDTO): Promise<SuccessResponseDTO>;
    verifyUserResetPassword(body: VerifyResetPasswordDTO): Promise<SuccessResponseDTO>;
    grantToken(body: GrantTokenDto): Promise<TokenResponseDTO>;
    revoke(body: RevokeTokenDto): Promise<SuccessResponseDTO>;
}
