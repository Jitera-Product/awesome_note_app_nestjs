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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailConfigService = void 0;
const handlebars_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const index_1 = require("../../constants/index");
const path_1 = require("path");
let MailConfigService = class MailConfigService {
    constructor(configService) {
        this.configService = configService;
    }
    createMailerOptions() {
        const transportConfig = this._getTransportConfig();
        return {
            transport: {
                host: transportConfig.host,
                port: transportConfig.port,
                auth: {
                    user: transportConfig.username,
                    pass: transportConfig.password,
                },
            },
            defaults: {
                from: `${this.configService.get('mail.mailFrom')}`,
            },
            template: {
                dir: (0, path_1.join)(__dirname, 'templates'),
                adapter: new handlebars_adapter_1.HandlebarsAdapter(),
                options: {
                    strict: true,
                },
            },
            preview: this.configService.get('app.nodeEnv') === index_1.NODE_ENV.DEVELOPMENT,
        };
    }
    _getTransportConfig() {
        const provider = this.configService.get('mail.provider');
        switch (provider) {
            case 'ses':
                return {
                    host: 'email-smtp.ap-northeast-1.amazonaws.com',
                    port: 587,
                    username: this.configService.get('mail.ses.username'),
                    password: this.configService.get('mail.ses.password'),
                };
            case 'sendgrid':
                return {
                    host: 'smtp.sendgrid.net',
                    port: 587,
                    username: 'apikey',
                    password: this.configService.get('mail.sendgrid.apiKey'),
                };
            default:
                throw Error(`Email provider ${provider} doesn't support yet`);
        }
    }
};
MailConfigService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], MailConfigService);
exports.MailConfigService = MailConfigService;
//# sourceMappingURL=mail-config.service.js.map