import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './db/db.module';
import { HealthController } from './health/app.health.controller';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { LearnerModule } from './learner/learner.module';

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
    AuthModule,
    LearnerModule,
  ],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}
