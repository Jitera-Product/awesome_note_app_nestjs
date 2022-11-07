"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = void 0;
const config_1 = require("@nestjs/config");
const swagger_1 = require("@nestjs/swagger");
const basicAuth = require("express-basic-auth");
const setupSwagger = (app) => {
    const configService = app.get(config_1.ConfigService);
    const path = configService.get('swagger.path');
    const username = configService.get('swagger.username');
    const password = configService.get('swagger.password');
    app.use(`/${path}`, basicAuth({ challenge: true, users: { [username]: password } }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('API V1')
        .setVersion('1.0')
        .addBearerAuth({
        description: 'JWT Authorization',
        type: 'http',
        in: 'header',
        scheme: 'bearer',
        bearerFormat: 'JWT',
    }, 'BearerAuth')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup(path, app, document);
};
exports.setupSwagger = setupSwagger;
//# sourceMappingURL=swagger.js.map