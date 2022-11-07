import { ISendMailOptions } from '@nestjs-modules/mailer';
import { Queue } from 'bull';
export declare class MailService {
    private readonly mailQueue;
    constructor(mailQueue: Queue);
    private logger;
    sendMail(options: ISendMailOptions): Promise<boolean>;
}
