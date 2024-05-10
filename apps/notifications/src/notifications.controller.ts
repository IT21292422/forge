import { Controller, Get } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { NewUserCreatedEvent } from 'apps/forge/src/users/events/user.events';
import { NotificationsService } from './notifications.service';

@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  getHello(): string {
    return this.notificationsService.getHello();
  }

  @EventPattern('test_event')
  async testUserCreate() {
    return this.notificationsService.getHello();
  }

  @EventPattern('new_user_created')
  async handleUserCreatedEvent(data: NewUserCreatedEvent) {
    const result = await this.notificationsService.handleUserCreatedEvent(
      data.email,
    );
    console.log('email result', result.id, result.status);
  }

  @MessagePattern({ cmd: 'notifications_health_check' })
  getHealth(data: { testData: string }) {
    return this.notificationsService.getHealth(data);
  }
}
