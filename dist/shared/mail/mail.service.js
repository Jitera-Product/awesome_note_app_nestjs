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
var MailService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
const mail_constants_1 = require("./mail.constants");
let MailService = MailService_1 = class MailService {
    constructor(mailQueue) {
        this.mailQueue = mailQueue;
        this.logger = new common_1.Logger(MailService_1.name);
    }
    async sendMail(options) {
        try {
            await this.mailQueue.add(mail_constants_1.SEND_MAIL_JOB, options);
            return true;
        }
        catch (e) {
            this.logger.error('An error occur while adding send mail job', e);
            return false;
        }
    }
};
MailService = MailService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, bull_1.InjectQueue)(mail_constants_1.MAIL_QUEUE)),
    __metadata("design:paramtypes", [Object])
], MailService);
exports.MailService = MailService;
//# sourceMappingURL=mail.service.js.map