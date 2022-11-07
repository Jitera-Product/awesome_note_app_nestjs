import { Module } from '@nestjs/common';
import { BullModule as NestBullModule } from '@nestjs/bull';
import { BullConfigService } from './bull-config.service';

@Module({
  imports: [
    NestBullModule.forRootAsync({
      useClass: BullConfigService,
    }),
  ],
})
export class BullModule {}
