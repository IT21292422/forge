import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './db/db.module';
import { HealthController } from './health/app.health.controller';
import { PaymentController } from './payment/payment.controller';
import { PaymentService } from './payment/payment.service';
import { UsersModule } from './users/users.module';

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
    UsersModule,
  ],
  controllers: [AppController, HealthController, PaymentController],
  providers: [AppService, PaymentService],
})
export class AppModule {}
