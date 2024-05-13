import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CourseModule } from './course/course.module';
import { DatabaseModule } from './db/db.module';
import { HealthController } from './health/app.health.controller';
import { LearnerModule } from './learner/learner.module';
import { PaymentController } from './payment/payment.controller';
import { PaymentService } from './payment/payment.service';
import { UsersModule } from './users/users.module';

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
        name: 'COURSE_SERVICE',
        transport: Transport.TCP,
        options: {
          host: '0.0.0.0',
          port: 3003,
        },
      },
      {
        name: 'PAYMENT_SERVICE',
        transport: Transport.TCP,
        options: {
          host: '0.0.0.0',
          port: 3002,
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
    UsersModule,
    CourseModule,
    AuthModule,
    LearnerModule,
  ],
  controllers: [AppController, HealthController, PaymentController],
  providers: [AppService, PaymentService],
})
export class AppModule {}
