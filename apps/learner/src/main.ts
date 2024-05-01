import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { LearnerModule } from './learner.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    LearnerModule,
    {
      transport: Transport.TCP,
      options: {
        port: 3001,
      },
    },
  );

  await app.listen();
}
bootstrap();
