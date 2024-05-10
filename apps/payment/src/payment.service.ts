import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaymentDto } from 'shared/dto/payment.dto';
import { CreateUserEvent } from 'shared/events/auth.events';
import { Payment } from './schema/Payment.schema';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment.name) private paymentModel: Model<Payment>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  handleUserCreatedEvent(data: CreateUserEvent) {
    console.log('Received user created event ~ 🚀 Payment', data);
  }

  async addNewPayment(payment: PaymentDto) {
    console.log('payment is created');
    const createPayment = new this.paymentModel(payment);
    return createPayment.save();
  }

  async getAllPayments(): Promise<Payment[]> {
    return this.paymentModel.find().exec();
  }
}
