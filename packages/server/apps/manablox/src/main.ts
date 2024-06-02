import { NestFactory } from '@nestjs/core';
import { ManabloxModule } from './manablox.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(ManabloxModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: ['http://admin.manablox.test'],
  });
  await app.listen(3000);
}
bootstrap();
