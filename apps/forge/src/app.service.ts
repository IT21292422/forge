import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { SignUpRequestDTO } from 'shared/dto/auth.dto';
import { CreateUserEvent } from 'shared/events/auth.events';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!!';
  }

  constructor(
    @Inject('NOTIFICATIONS_SERVICE')
    private readonly notificationsClient: ClientProxy,
  ) {}

  createUser(signUpRequest: SignUpRequestDTO) {
    console.log('Received create user request', signUpRequest);
    this.notificationsClient.emit(
      'user_created',
      new CreateUserEvent(signUpRequest.email),
    );
  }
}
