import { BullModuleOptions, SharedBullConfigurationFactory } from '@nestjs/bull';
import { ConfigService } from '@nestjs/config';
export declare class BullConfigService implements SharedBullConfigurationFactory {
    private configService;
    constructor(configService: ConfigService);
    createSharedConfiguration(): BullModuleOptions;
}
