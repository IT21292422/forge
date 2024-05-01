import { Injectable } from '@nestjs/common';
import { CreateUserEvent } from 'shared/events/auth.events';

@Injectable()
export class NotificationsService {
  getHello(): string {
    return 'Hello Notifications!';
  }

  handleUserCreatedEvent(data: CreateUserEvent) {
    console.log('Received user created event ~ 🚀 Notifications', data);
  }

  getHealth() {
    return { status: 'OK', service: 'notifications', timestamp: Date.now() };
  }
}
