import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Payment } from 'apps/payment/src/schema/Payment.schema';
import { Observable } from 'rxjs/internal/Observable';
import { PaymentDto } from 'shared/dto/payment.dto';
import { AuthGuard } from '../auth/auth.guard';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @UseGuards(AuthGuard)
  @Post('add')
  async addNewPayment(
    @Body() payment: Payment,
  ): Promise<Observable<PaymentDto>> {
    return this.paymentService.addNewPayment(payment);
  }
}
