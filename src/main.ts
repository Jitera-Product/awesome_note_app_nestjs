import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { i18nValidationErrorFactory, I18nValidationExceptionFilter } from 'nestjs-i18n';
import { ConfigService } from '@nestjs/config';
import { useContainer } from 'class-validator';
import { setupSwagger } from './utils/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();

  const configService = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: i18nValidationErrorFactory,
    }),
  );
  app.useGlobalFilters(new I18nValidationExceptionFilter());

  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await setupSwagger(app);
  await app.listen(configService.get('app.port', 3000));
}
bootstrap();
