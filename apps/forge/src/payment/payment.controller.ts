import { Body, Controller, Post } from '@nestjs/common';
import { Payment } from 'apps/payment/src/schema/Payment.schema';
import { Observable } from 'rxjs/internal/Observable';
import { PaymentDto } from 'shared/dto/payment.dto';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('add')
  async addNewPayment(
    @Body() payment: Payment,
  ): Promise<Observable<PaymentDto>> {
    return this.paymentService.addNewPayment(payment);
  }
}
