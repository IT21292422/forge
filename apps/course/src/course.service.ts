import { Injectable } from '@nestjs/common';
import { CreateUserEvent } from 'shared/events/auth.events';

@Injectable()
export class CourseService {
  getHello(): string {
    return 'Hello World!';
  }

  handleUSerCreatedEvent(data: CreateUserEvent) {
    console.log('Received user created event ~ 🚀 Course', data);
  }
}
