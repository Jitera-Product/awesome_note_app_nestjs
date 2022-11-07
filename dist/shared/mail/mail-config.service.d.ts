import { MailerOptionsFactory } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigService } from '@nestjs/config';
export declare class MailConfigService implements MailerOptionsFactory {
    private configService;
    constructor(configService: ConfigService);
    createMailerOptions(): {
        transport: {
            host: string;
            port: number;
            auth: {
                user: any;
                pass: any;
            };
        };
        defaults: {
            from: string;
        };
        template: {
            dir: string;
            adapter: HandlebarsAdapter;
            options: {
                strict: boolean;
            };
        };
        preview: boolean;
    };
    private _getTransportConfig;
}
