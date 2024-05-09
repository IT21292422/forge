import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Instructor,
  InstructorSchema,
} from '../users/instructor/model/instructor.model';
import { Student, StudentSchema } from '../users/student/model/student.model';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      { name: Student.name, schema: StudentSchema },
      { name: Instructor.name, schema: InstructorSchema },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
