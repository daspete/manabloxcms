import { NestFactory } from '@nestjs/core';
import { ManabloxModule } from './manablox.module';

async function bootstrap() {
  const app = await NestFactory.create(ManabloxModule);
  app.enableCors({
    origin: ['http://admin.manablox.test'],
  });
  await app.listen(3000);
}
bootstrap();
