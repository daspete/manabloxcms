import { NestFactory } from '@nestjs/core';
import { ManabloxFilesModule } from './manablox-files.module';
import { Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(ManabloxFilesModule);

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: process.env.CORS_DOMAINS
      ? process.env.CORS_DOMAINS.split(',')
      : ['http://admin.manablox.test'],
  });

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: 3001,
    },
  });

  await app.startAllMicroservices();

  await app.listen(3000);
}
bootstrap();
