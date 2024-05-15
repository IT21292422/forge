import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { CourseProgress } from "../dto/course-progress.dto";

export type ProgressDocument = HydratedDocument<Progress>;

@Schema()
export class Progress{
    @Prop({ref:'student', unique: true})
    studentId: string;

    @Prop()
    courses: CourseProgress[];
}

export const ProgressSchema = SchemaFactory.createForClass(Progress);