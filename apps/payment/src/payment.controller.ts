import { Controller, Get } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { CreateUserEvent } from 'shared/events/auth.events';
import { PaymentService } from './payment.service';

@Controller()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get()
  getHello(): string {
    return this.paymentService.getHello();
  }

  @EventPattern('test_event')
  handleUserCreatedEvent(data: CreateUserEvent) {
    this.paymentService.handleUserCreatedEvent(data);
  }
}
