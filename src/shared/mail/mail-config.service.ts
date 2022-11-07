import { MailerOptionsFactory } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NODE_ENV } from 'constants/index';
import { join } from 'path';

@Injectable()
export class MailConfigService implements MailerOptionsFactory {
  constructor(private configService: ConfigService) {}
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
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
      preview: this.configService.get('app.nodeEnv') === NODE_ENV.DEVELOPMENT,
    };
  }

  private _getTransportConfig() {
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
}
