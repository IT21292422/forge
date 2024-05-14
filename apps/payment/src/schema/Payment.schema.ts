import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PaymentDocument = HydratedDocument<Payment>;

@Schema()
export class Payment {
  @Prop({ required: true })
  learnerId: string;

  @Prop({ required: true })
  courseId: string;

  @Prop({ required: true })
  orderId: string;

  @Prop({ required: true })
  amount: Number;

  @Prop({ unique: true, required: true })
  dateTime: Number;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
