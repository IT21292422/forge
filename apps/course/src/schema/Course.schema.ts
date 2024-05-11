import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PaymentDocument = HydratedDocument<Course>;

@Schema()
export class Course {
  @Prop({ required: true })
  courseId: string;

  @Prop({ required: true })
  courseTitle: string;

  @Prop({ required: true })
  publishedDate: string;

  @Prop({ required: true })
  imgUrl: string;

  @Prop({ required: true })
  price: Number;

  @Prop({ required: true })
  categories: string;

  @Prop({ required: true })
  tags: string[];

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  WhatWillLearn: string[];

  @Prop({ required: true })
  isApproved: boolean;

  @Prop({ required: true })
  chapters: string[];
}

export const CourseSchema = SchemaFactory.createForClass(Course);
