import { Controller, Get } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { CreateUserEvent } from 'shared/events/auth.events';
import { PaymentService } from './payment.service';

@Controller()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get()
  getHello(): string {
    return this.paymentService.getHello();
  }

  @EventPattern('user_created')
  handleUserCreatedEvent(data: CreateUserEvent) {
    this.paymentService.handleUserCreatedEvent(data);
  }

  @MessagePattern({ cmd: 'add_new_payment' })
  async addNewPaymentController(payment): Promise<{}> {
    return this.paymentService.addNewPayment(payment);
  }
}
