import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from './db/db.module';
import { LearnerController } from './learner.controller';
import { LearnerService } from './learner.service';
import { Progress, ProgressSchema } from './model/Progress.schema';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NOTIFICATIONS_SERVICE',
        transport: Transport.TCP,
        options: { port: 3004 },
      },
      {
        name: 'COURSE_SERVICE',
        transport: Transport.TCP,
        options: { port: 3003 },
      },
      {
        name: 'PAYMENT_SERVICE',
        transport: Transport.TCP,
        options: { port: 3002 },
      },
      {
        name: 'LEARNER_SERVICE',
        transport: Transport.TCP,
        options: { port: 3001 },
      },
    ]),
    DatabaseModule,
    LearnerModule,
    MongooseModule.forFeature([
      {
        name: Progress.name,
        schema: ProgressSchema,
      },
    ]),
  ],
  controllers: [LearnerController],
  providers: [LearnerService],
})
export class LearnerModule {}
