import { NestFactory } from '@nestjs/core';
import { LearnerModule } from './learner.module';

async function bootstrap() {
  const app = await NestFactory.create(LearnerModule);
  await app.listen(3000);
}
bootstrap();
