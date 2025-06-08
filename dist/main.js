"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Hotel Property Registration API')
        .setDescription('API documentation for the hotel property registration backend')
        .setVersion('1.0')
        .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'JWT')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('docs', app, document);
    const port = process.env.PORT || 3000;
    await app.listen(port);
    console.log(`🚀 Application is running on: ${await app.getUrl()}`);
}
bootstrap();
//# sourceMappingURL=main.js.map