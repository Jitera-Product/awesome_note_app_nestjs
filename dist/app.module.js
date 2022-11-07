"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const path_1 = require("path");
const nestjs_i18n_1 = require("nestjs-i18n");
const constants_1 = require("./constants");
const typeorm_config_service_1 = require("./database/typeorm-config.service");
const share_module_1 = require("./shared/share.module");
const configs_1 = require("./configs");
const notes_module_1 = require("./modules/notes/notes.module");
const auth_module_1 = require("./features/auth/auth.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true, load: [configs_1.default] }),
            typeorm_1.TypeOrmModule.forRootAsync({
                useClass: typeorm_config_service_1.TypeOrmConfigService,
                dataSourceFactory: async (options) => {
                    const dataSource = await new typeorm_2.DataSource(options).initialize();
                    return dataSource;
                },
            }),
            nestjs_i18n_1.I18nModule.forRootAsync({
                useFactory: (configService) => ({
                    fallbackLanguage: configService.get('app.fallbackLanguage'),
                    loaderOptions: {
                        path: (0, path_1.join)(__dirname, 'i18n'),
                        watch: configService.get('app.nodeEnv') === constants_1.NODE_ENV.DEVELOPMENT,
                    },
                    resolvers: [
                        {
                            use: nestjs_i18n_1.HeaderResolver,
                            useFactory: (configService) => {
                                return configService.get('app.headerLanguage');
                            },
                            inject: [config_1.ConfigService],
                        },
                    ],
                }),
                inject: [config_1.ConfigService],
            }),
            common_1.CacheModule.register({ isGlobal: true }),
            share_module_1.ShareModule,
            auth_module_1.AuthModule,
            notes_module_1.NoteModule,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map