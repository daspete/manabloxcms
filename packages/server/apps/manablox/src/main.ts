import { NestFactory } from '@nestjs/core';
import { ManabloxModule } from './manablox.module';

async function bootstrap() {
  const app = await NestFactory.create(ManabloxModule);
  await app.listen(3000);
}
bootstrap();
