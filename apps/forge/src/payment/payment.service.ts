import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs/internal/Observable';
import { PaymentDto } from 'shared/dto/payment.dto';

@Injectable()
export class PaymentService {
  @Inject('NOTIFICATIONS_SERVICE')
  private readonly notificationsClient: ClientProxy;
  @Inject('PAYMENT_SERVICE')
  private readonly paymentClient: ClientProxy;
  @Inject('LEARNER_SERVICE')
  private readonly learnerClient: ClientProxy;
  @Inject('COURSE_SERVICE')
  private readonly courseClient: ClientProxy;

  async addNewPayment(payment: PaymentDto): Promise<Observable<PaymentDto>> {
    console.log('payment is received');
    const pattern = { cmd: 'add_new_payment' };
    return this.paymentClient.send<PaymentDto>(pattern, payment);
  }
}
