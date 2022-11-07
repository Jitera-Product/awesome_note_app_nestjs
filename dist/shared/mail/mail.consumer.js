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
var MailConsumer_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailConsumer = void 0;
const bull_1 = require("@nestjs/bull");
const mail_constants_1 = require("./mail.constants");
const mailer_1 = require("@nestjs-modules/mailer");
const common_1 = require("@nestjs/common");
let MailConsumer = MailConsumer_1 = class MailConsumer {
    constructor(mailService) {
        this.mailService = mailService;
        this.logger = new common_1.Logger(MailConsumer_1.name);
    }
    async sendMail({ data }) {
        try {
            await this.mailService.sendMail(data);
            this.logger.log(`Email ${data.template || ''} has been sent with context ${JSON.stringify(data.context) || ''}`);
        }
        catch (e) {
            this.logger.error(`An error occur while sending email ${data.template || ''} with context ${JSON.stringify(data.context) || ''}`, e);
        }
    }
};
__decorate([
    (0, bull_1.Process)(mail_constants_1.SEND_MAIL_JOB),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MailConsumer.prototype, "sendMail", null);
MailConsumer = MailConsumer_1 = __decorate([
    (0, bull_1.Processor)(mail_constants_1.MAIL_QUEUE),
    __metadata("design:paramtypes", [mailer_1.MailerService])
], MailConsumer);
exports.MailConsumer = MailConsumer;
//# sourceMappingURL=mail.consumer.js.map