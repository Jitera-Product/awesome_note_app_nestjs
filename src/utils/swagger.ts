import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';

export const setupSwagger = (app: NestExpressApplication) => {
  const configService = app.get<ConfigService>(ConfigService);
  const path = configService.get('swagger.path');
  const username = configService.get('swagger.username');
  const password = configService.get('swagger.password');

  app.use(`/${path}`, basicAuth({ challenge: true, users: { [username]: password } }));

  const config = new DocumentBuilder()
    .setTitle('API V1')
    .setVersion('1.0')
    .addBearerAuth(
      {
        description: 'JWT Authorization',
        type: 'http',
        in: 'header',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'BearerAuth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(path, app, document);
};
