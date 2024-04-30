import { Controller, Get } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { CreateUserEvent } from 'shared/events/auth.events';
import { NotificationsService } from './notifications.service';

@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  getHello(): string {
    return this.notificationsService.getHello();
  }

  @EventPattern('user_created')
  handleUserCreatedEvent(data: CreateUserEvent) {
    console.log('Called handleUserCreatedEvent in noifications');

    this.notificationsService.handleUserCreatedEvent(data);
  }
}
