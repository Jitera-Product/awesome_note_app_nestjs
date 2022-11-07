"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OAuthController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const oauth_service_1 = require("./oauth.service");
const sign_up_dto_1 = require("./dtos/sign-up.dto");
const grant_token_dto_1 = require("./dtos/grant-token.dto");
const revoke_token_dto_1 = require("./dtos/revoke-token.dto");
const refresh_token_guard_1 = require("../../guards/refresh-token.guard");
const reset_password_dto_1 = require("./dtos/reset-password.dto");
const verify_reset_password_dto_1 = require("./dtos/verify-reset-password.dto");
const verify_conformation_dto_1 = require("./dtos/verify-conformation.dto");
const swagger_1 = require("@nestjs/swagger");
let OAuthController = class OAuthController {
    constructor(oauthService) {
        this.oauthService = oauthService;
    }
    async signUpUser(body) {
        return this.oauthService.signUpUser(body);
    }
    async verifyUserConfirmationEmail(body) {
        return this.oauthService.verifyUserConfirmationEmail(body.confirmation_token);
    }
    async resetUserPassword(body) {
        return this.oauthService.resetUserPassword(body.email);
    }
    async verifyUserResetPassword(body) {
        return this.oauthService.verifyUserResetPassword(body);
    }
    async grantToken(body) {
        return this.oauthService.login(body);
    }
    async revoke(body) {
        return this.oauthService.revokeToken(body.refreshToken);
    }
};
__decorate([
    (0, common_1.Post)('api/users_registrations'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: require("./dtos/token-response.dto").TokenResponseDTO }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sign_up_dto_1.SignUpDto]),
    __metadata("design:returntype", Promise)
], OAuthController.prototype, "signUpUser", null);
__decorate([
    (0, common_1.Post)('api/users_verify_confirmation_token'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: require("./dtos/success-response.dto").SuccessResponseDTO }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [verify_conformation_dto_1.VerifyConfirmationDTO]),
    __metadata("design:returntype", Promise)
], OAuthController.prototype, "verifyUserConfirmationEmail", null);
__decorate([
    (0, common_1.Post)('api/users_reset_password_requests'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: require("./dtos/success-response.dto").SuccessResponseDTO }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reset_password_dto_1.ResetPasswordDTO]),
    __metadata("design:returntype", Promise)
], OAuthController.prototype, "resetUserPassword", null);
__decorate([
    (0, common_1.Post)('api/users_verify_reset_password_requests'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: require("./dtos/success-response.dto").SuccessResponseDTO }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [verify_reset_password_dto_1.VerifyResetPasswordDTO]),
    __metadata("design:returntype", Promise)
], OAuthController.prototype, "verifyUserResetPassword", null);
__decorate([
    (0, common_1.Post)('oauth/token'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: require("./dtos/token-response.dto").TokenResponseDTO }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [grant_token_dto_1.GrantTokenDto]),
    __metadata("design:returntype", Promise)
], OAuthController.prototype, "grantToken", null);
__decorate([
    (0, common_1.Post)('oauth/revoke'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UseGuards)(refresh_token_guard_1.RefreshTokenGuard),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: require("./dtos/success-response.dto").SuccessResponseDTO }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [revoke_token_dto_1.RevokeTokenDto]),
    __metadata("design:returntype", Promise)
], OAuthController.prototype, "revoke", null);
OAuthController = __decorate([
    (0, common_1.Controller)(),
    (0, swagger_1.ApiTags)('Auth'),
    __metadata("design:paramtypes", [oauth_service_1.OAuthService])
], OAuthController);
exports.OAuthController = OAuthController;
//# sourceMappingURL=oauth.controller.js.map