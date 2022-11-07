import { MailerModule } from '@nestjs-modules/mailer';
import { Global, Module } from '@nestjs/common';
import { MailConfigService } from './mail-config.service';
import { BullModule } from '@nestjs/bull';
import { MAIL_QUEUE } from './mail.constants';
import { MailService } from './mail.service';
import { MailConsumer } from './mail.consumer';

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      useClass: MailConfigService,
    }),
    BullModule.registerQueue({ name: MAIL_QUEUE }),
  ],
  providers: [MailService, MailConsumer],
  exports: [MailService],
})
export class MailModule {}
