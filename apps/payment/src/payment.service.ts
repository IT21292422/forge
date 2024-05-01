import { Injectable } from '@nestjs/common';
import { CreateUserEvent } from 'shared/events/auth.events';

@Injectable()
export class PaymentService {
  getHello(): string {
    return 'Hello World!';
  }

  handleUserCreatedEvent(data: CreateUserEvent) {
    console.log('Received user created event ~ 🚀 Payment', data);
  }
}
