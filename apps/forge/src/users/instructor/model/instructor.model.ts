import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { USERROLES } from '../../constants/user.constants';

export type UserDocument = HydratedDocument<Instructor>;

@Schema()
export class Instructor {
  @Prop({ required: true, minlength: 3 })
  firstName: string;

  @Prop({
    required: true,
    minlength: 3,
  })
  lastName: string;

  @Prop({ default: Date.now() })
  createdAt: Date;

  @Prop({ required: true, minlength: 8 })
  password: string;

  @Prop({ default: Date.now() })
  updatedAt: Date;

  @Prop({ required: true, unique: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })
  email: string;

  @Prop({ required: true, enum: Object.values(USERROLES) })
  role: string;

  //TODO: Add publishedCourses as an array of course ids after course model is created

  // @Prop({
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'courses',
  //   required: true,
  // })
  // publishedCourses: mongoose.Types.ObjectId[];

  @Prop({
    ref: 'course',
    required: true,
  })
  publishedCourses: string[];
}

export const InstructorSchema = SchemaFactory.createForClass(Instructor);
