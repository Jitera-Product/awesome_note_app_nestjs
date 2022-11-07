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
const passport_jwt_1 = require("passport-jwt");
const passport_1 = require("@nestjs/passport");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const users_1 = require("../../../database/entities/users");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const constants_1 = require("../../../constants");
let TokenStrategy = class TokenStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, constants_1.AUTH_STRATEGY.TOKEN) {
    constructor(configService, usersRepo) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('jwt.accessSecret'),
        });
        this.configService = configService;
        this.usersRepo = usersRepo;
    }
    async validate(payload) {
        switch (payload.resourceOwner) {
            case 'users':
                return this.validateUser(payload.userId);
            default:
                throw new common_1.BadRequestException(`scope ${payload.scope} is not supported.`);
        }
    }
    async validateUser(userId) {
        const user = await this.usersRepo.findOneBy({ id: userId });
        if (!user ||
            (this.configService.get('authentication.sendConfirmationEmail') && !user.confirmed_at)) {
            throw new common_1.UnauthorizedException();
        }
        return user;
    }
};
TokenStrategy = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(users_1.User)),
    __metadata("design:paramtypes", [config_1.ConfigService,
        typeorm_2.Repository])
], TokenStrategy);
exports.default = TokenStrategy;
//# sourceMappingURL=token.strategy.js.map