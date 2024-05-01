import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { SignUpRequestDTO } from 'shared/dto/auth.dto';
import { CreateUserEvent } from 'shared/events/auth.events';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!!';
  }

  @Inject('NOTIFICATIONS_SERVICE')
  private readonly notificationsClient: ClientProxy;
  @Inject('PAYMENT_SERVICE')
  private readonly paymentClient: ClientProxy;
  @Inject('LEARNER_SERVICE')
  private readonly learnerClient: ClientProxy;
  @Inject('COURSE_SERVICE')
  private readonly courseClient: ClientProxy;

  createUser(signUpRequest: SignUpRequestDTO) {
    console.log('Received create user request', signUpRequest);
    this.notificationsClient.emit(
      'user_created',
      new CreateUserEvent(signUpRequest.email),
    );
    this.learnerClient.emit(
      'user_created',
      new CreateUserEvent(signUpRequest.email),
    );
    this.courseClient.emit(
      'user_created',
      new CreateUserEvent(signUpRequest.email),
    );
    this.paymentClient.emit(
      'user_created',
      new CreateUserEvent(signUpRequest.email),
    );
  }

  getApphealth() {
    return 'OK';
  }

  async getNotificationHealth() {
    return this.notificationsClient.send(
      { cmd: 'notifications_health_check' },
      {},
    );
  }
}
