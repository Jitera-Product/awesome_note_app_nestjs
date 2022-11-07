"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const nestjs_i18n_1 = require("nestjs-i18n");
const config_1 = require("@nestjs/config");
const class_validator_1 = require("class-validator");
const swagger_1 = require("./utils/swagger");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    const configService = app.get(config_1.ConfigService);
    app.useGlobalPipes(new common_1.ValidationPipe({
        exceptionFactory: nestjs_i18n_1.i18nValidationErrorFactory,
    }));
    app.useGlobalFilters(new nestjs_i18n_1.I18nValidationExceptionFilter());
    (0, class_validator_1.useContainer)(app.select(app_module_1.AppModule), { fallbackOnErrors: true });
    await (0, swagger_1.setupSwagger)(app);
    await app.listen(configService.get('app.port', 3000));
}
bootstrap();
//# sourceMappingURL=main.js.map