import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { CourseModule } from './course.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    CourseModule,
    {
      transport: Transport.TCP,
      options: {
        port: 3003,
      },
    },
  );
  await app.listen();
}
bootstrap();
