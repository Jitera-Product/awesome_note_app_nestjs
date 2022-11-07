import { ISendMailOptions } from '@nestjs-modules/mailer';
import { Job } from 'bull';
import { MailerService } from '@nestjs-modules/mailer';
export declare class MailConsumer {
    private readonly mailService;
    constructor(mailService: MailerService);
    private logger;
    sendMail({ data }: Job<ISendMailOptions>): Promise<void>;
}
