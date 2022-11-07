"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const token_strategy_1 = require("./strategies/token.strategy");
const config_1 = require("@nestjs/config");
const users_1 = require("../../database/entities/users");
const oauth_service_1 = require("./oauth.service");
const oauth_controller_1 = require("./oauth.controller");
const refresh_token_strategy_1 = require("./strategies/refresh-token.strategy");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([users_1.User]),
            passport_1.PassportModule,
            jwt_1.JwtModule.registerAsync({
                useFactory: (configService) => {
                    return {
                        secret: configService.get('jwt.accessSecret'),
                        signOptions: {
                            expiresIn: configService.get('jwt.expiresIn'),
                        },
                    };
                },
                inject: [config_1.ConfigService],
            }),
        ],
        controllers: [oauth_controller_1.OAuthController],
        providers: [token_strategy_1.default, refresh_token_strategy_1.default, oauth_service_1.OAuthService],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map