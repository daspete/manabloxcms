import { NestFactory } from '@nestjs/core';
import { ManabloxModule } from './manablox.module';
import { ValidationPipe } from '@nestjs/common';
// import * as graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(ManabloxModule);

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: process.env.API_CORS_DOMAINS
      ? process.env.API_CORS_DOMAINS.split(',')
      : ['http://admin.manablox.test'],
  });

  // app.use(
  //   graphqlUploadExpress({
  //     maxFileSize: process.env.FILE_MAX_SIZE
  //       ? parseInt(process.env.FILE_MAX_SIZE) * 1024 * 1024
  //       : 10 * 1024 * 1024,
  //     maxFiles: 10,
  //   }),
  // );

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
