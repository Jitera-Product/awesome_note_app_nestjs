"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailModule = void 0;
const mailer_1 = require("@nestjs-modules/mailer");
const common_1 = require("@nestjs/common");
const mail_config_service_1 = require("./mail-config.service");
const bull_1 = require("@nestjs/bull");
const mail_constants_1 = require("./mail.constants");
const mail_service_1 = require("./mail.service");
const mail_consumer_1 = require("./mail.consumer");
let MailModule = class MailModule {
};
MailModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            mailer_1.MailerModule.forRootAsync({
                useClass: mail_config_service_1.MailConfigService,
            }),
            bull_1.BullModule.registerQueue({ name: mail_constants_1.MAIL_QUEUE }),
        ],
        providers: [mail_service_1.MailService, mail_consumer_1.MailConsumer],
        exports: [mail_service_1.MailService],
    })
], MailModule);
exports.MailModule = MailModule;
//# sourceMappingURL=mail.module.js.map