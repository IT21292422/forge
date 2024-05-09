import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { STUDENTYEARS, USERROLES } from '../../constants/user.constants';

export type UserDocument = HydratedDocument<Student>;

@Schema()
export class Student {
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

  @Prop({ required: true, unique: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })
  email: string;

  @Prop({ required: true, enum: Object.values(USERROLES) })
  role: string;

  @Prop({ required: true, enum: Object.values(STUDENTYEARS) })
  year: string;

  //TODO: Add enrolledCourses as an array of course ids after course model is created

  // @Prop({
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'course',
  //   required: true,
  // })
  // enrolledCourses: mongoose.Types.ObjectId[];

  @Prop({
    ref: 'course',
    required: true,
  })
  enrolledCourses: string[];
}

export const StudentSchema = SchemaFactory.createForClass(Student);
