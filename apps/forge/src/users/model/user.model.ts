import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true, minlength: 3 })
  firstName: string;

  @Prop({
    required: true,
    minlength: 3,
  })
  lastName: string;

  @Prop({ default: Date.now() })
  createdAt: Date;

  @Prop({ default: Date.now() })
  updatedAt: Date;

  @Prop({ required: true, unique: true, match: /^[^s@]+@[^s@]+.[^s@]+$/ })
  email: string;

  @Prop({ required: true, enum: ['admin', 'student', 'instructor'] })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
