import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { join } from 'path';
import { HeaderResolver, I18nModule } from 'nestjs-i18n';
import { NODE_ENV } from './constants';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import { ShareModule } from './shared/share.module';
import configs from './configs';
import { NoteModule } from 'modules/notes/notes.module';
import { AuthModule } from './features/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configs] }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options) => {
        const dataSource = await new DataSource(options).initialize();
        return dataSource;
      },
    }),
    I18nModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        fallbackLanguage: configService.get('app.fallbackLanguage'),
        loaderOptions: {
          path: join(__dirname, 'i18n'),
          watch: configService.get('app.nodeEnv') === NODE_ENV.DEVELOPMENT,
        },
        resolvers: [
          {
            use: HeaderResolver,
            useFactory: (configService: ConfigService) => {
              return configService.get('app.headerLanguage');
            },
            inject: [ConfigService],
          },
        ],
      }),
      inject: [ConfigService],
    }),
    CacheModule.register({ isGlobal: true }),
    ShareModule,
    AuthModule,
    NoteModule,
  ],
})
export class AppModule {}
