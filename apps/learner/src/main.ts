import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { LearnerModule } from './learner.module';

async function bootstrap() {
  const app = await NestFactory.create(LearnerModule);
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      port: 3001,
    },
  });
  await app.startAllMicroservices();
  await app.listen(3001);
}
bootstrap();
