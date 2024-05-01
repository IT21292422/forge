import { Injectable } from '@nestjs/common';
import { CreateUserEvent } from 'shared/events/auth.events';

@Injectable()
export class LearnerService {
  getHello(): string {
    return 'Hello World!';
  }

  handleUserCreated(data: CreateUserEvent) {
    console.log('Received user created event ~ 🚀 Learner', data);
  }
}
