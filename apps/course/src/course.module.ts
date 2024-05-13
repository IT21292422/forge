import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { DatabaseModule } from './db/db.module';
import { Course, CourseSchema } from './schema/Course.schema';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NOTIFICATIONS_SERVICE',
        transport: Transport.TCP,
        options: {
          host: '0.0.0.0',
          port: 3004,
        },
      },
      {
        name: 'FORGE',
        transport: Transport.TCP,
        options: {
          host: '0.0.0.0',
          port: 3005,
        },
      },
      {
        name: 'LEARNER_SERVICE',
        transport: Transport.TCP,
        options: {
          host: '0.0.0.0',
          port: 3001,
        },
      },
    ]),
    DatabaseModule,
    MongooseModule.forFeature([
      {
        name: Course.name,
        schema: CourseSchema,
      },
    ]),
  ],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
