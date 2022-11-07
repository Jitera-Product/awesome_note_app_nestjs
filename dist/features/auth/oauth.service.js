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
exports.OAuthService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcryptjs");
const dayjs = require("dayjs");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const scope_dto_1 = require("./dtos/scope.dto");
const users_1 = require("../../database/entities/users");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const ms = require("ms");
const class_validator_1 = require("class-validator");
const mail_service_1 = require("../../shared/mail/mail.service");
let OAuthService = class OAuthService {
    constructor(cacheService, userRepo, configService, jwtService, mailService) {
        this.cacheService = cacheService;
        this.userRepo = userRepo;
        this.configService = configService;
        this.jwtService = jwtService;
        this.mailService = mailService;
        this.jwtConfig = this.configService.get('jwt');
    }
    get isRequireConfirmation() {
        return this.configService.get('authentication.sendConfirmationEmail');
    }
    async login(grantTokenDto) {
        switch (grantTokenDto.scope) {
            case 'users':
                return this.loginUser(grantTokenDto);
            default:
                throw new common_1.BadRequestException(`scope ${grantTokenDto.scope} is not supported.`);
        }
    }
    async signUpUser(signUpDto) {
        const user = this.userRepo.create(signUpDto);
        user.encrypted_password = await bcrypt.hash(user.password, 10);
        user.password = undefined;
        const errors = await (0, class_validator_1.validate)(user);
        if (errors.length > 0) {
            throw new common_1.BadRequestException(errors === null || errors === void 0 ? void 0 : errors.map((e) => { var _a; return (_a = Object.values(e.constraints)) === null || _a === void 0 ? void 0 : _a.join(','); }));
        }
        await this.userRepo.save(user);
        if (this.isRequireConfirmation) {
            await this.sendUserConfirmationEmail(user);
        }
        return this._generateTokenResponse({
            userId: user.id,
            scope: scope_dto_1.ScopeEnum.users,
            resourceOwner: 'users',
        });
    }
    async loginUser(grantTokenDto) {
        const user = await this.userRepo.findOneBy({ email: grantTokenDto.email });
        const isValidPassword = bcrypt.compareSync(grantTokenDto.password, (user === null || user === void 0 ? void 0 : user.encrypted_password) || '');
        if (!user || !isValidPassword || (this.isRequireConfirmation && !user.confirmed_at)) {
            throw new common_1.UnauthorizedException();
        }
        return this._generateTokenResponse({
            userId: user.id,
            scope: grantTokenDto.scope,
            resourceOwner: 'users',
        });
    }
    async sendUserConfirmationEmail(user) {
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
    async verifyUserConfirmationEmail(token) {
        const user = await this.userRepo.findOneBy({ confirmation_token: token });
        if (!user) {
            throw new common_1.BadRequestException('Token is invalid');
        }
        const confirmTokenExpireTime = dayjs(user.confirmation_sent_at).add(this.configService.get('authentication.confirmationIn'), 'h');
        if (dayjs().isAfter(confirmTokenExpireTime)) {
            throw new common_1.BadRequestException('Token is expired');
        }
        user.confirmed_at = new Date();
        user.confirmation_token = '';
        user.confirmation_sent_at = null;
        await this.userRepo.save(user);
        return { success: true };
    }
    async resetUserPassword(email) {
        const user = await this.userRepo.findOneBy({ email });
        if (!user) {
            throw new common_1.BadRequestException('Email not found');
        }
        if (!user.confirmed_at) {
            throw new common_1.BadRequestException('Email not confirm yet');
        }
        user.reset_password_token = await bcrypt.hash(JSON.stringify(Object.assign(Object.assign({}, user), { date: new Date().toISOString() })), 10);
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
    async verifyUserResetPassword(data) {
        const { reset_token, password } = data;
        const user = await this.userRepo.findOneBy({ reset_password_token: reset_token });
        if (!user) {
            throw new common_1.BadRequestException('Token is invalid');
        }
        const resetTokenExpireTime = dayjs(user.reset_password_sent_at).add(this.configService.get('authentication.resetPasswordIn'), 'h');
        if (dayjs().isAfter(resetTokenExpireTime)) {
            throw new common_1.BadRequestException('Token is expired');
        }
        user.reset_password_token = '';
        user.reset_password_sent_at = null;
        user.encrypted_password = await bcrypt.hash(password, 10);
        await this.userRepo.save(user);
        return { success: true };
    }
    async revokeToken(refreshToken) {
        const payload = await this.jwtService.verifyAsync(refreshToken, {
            secret: this.jwtConfig.refreshSecret,
        });
        await this.cacheService.set(`bl_${payload.iat}`, payload.iat, {
            ttl: Math.round(payload.exp / 1000),
        });
        return { success: true };
    }
    async _generateTokenResponse(payload) {
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
};
OAuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __param(1, (0, typeorm_2.InjectRepository)(users_1.User)),
    __metadata("design:paramtypes", [Object, typeorm_1.Repository,
        config_1.ConfigService,
        jwt_1.JwtService,
        mail_service_1.MailService])
], OAuthService);
exports.OAuthService = OAuthService;
//# sourceMappingURL=oauth.service.js.map