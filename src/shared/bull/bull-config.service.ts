import { BullModuleOptions, SharedBullConfigurationFactory } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BullConfigService implements SharedBullConfigurationFactory {
  constructor(private configService: ConfigService) {}
  createSharedConfiguration(): BullModuleOptions {
    return {
      redis: {
        host: this.configService.get('redis.host'),
        port: +this.configService.get('redis.port'),
      },
      defaultJobOptions: {
        removeOnComplete: true,
        removeOnFail: true,
      },
    };
  }
}
