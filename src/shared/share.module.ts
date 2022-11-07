import { Module } from '@nestjs/common';
import { BullModule } from './bull/bull.module';
import { MailModule } from './mail/mail.module';
import { EntityUniqueValidator } from './validators/entity-unique.validator';

@Module({
  imports: [BullModule, MailModule],
  providers: [EntityUniqueValidator],
})
export class ShareModule {}
