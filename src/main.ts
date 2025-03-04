import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger, ValidationPipe } from "@nestjs/common";
import { envs } from "./config";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  // private readonly logger = new Logger();
  const logger = new Logger();

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(`${envs.apiVersion}`);

  // DTO validations config
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  // Swagger api config
  const config = new DocumentBuilder()
    .setTitle("Products API")
    .setDescription("CRUD products")
    .setVersion("1.0")
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, documentFactory);

  await app.listen(envs.port);
  logger.debug(`App running on port: ${envs.port}`);
}
bootstrap();
