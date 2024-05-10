import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NOTIFICATIONS_SERVICE',
        transport: Transport.TCP,
        options: { port: 3004 },
      },
      {
        name: 'FORGE',
        transport: Transport.TCP,
        options: { port: 3005 },
      },
      {
        name: 'LEARNER_SERVICE',
        transport: Transport.TCP,
        options: { port: 3001 },
      },
    ]),
  ],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
