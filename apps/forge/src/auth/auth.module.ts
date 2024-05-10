import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import 'dotenv/config';
import {
  Instructor,
  InstructorSchema,
} from '../users/instructor/model/instructor.model';
import { Student, StudentSchema } from '../users/student/model/student.model';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';

// console.log('NODE_ENV', process.env.NODE_ENV);

// if (process.env.NODE_ENV === 'development') {
//   console.log('Loading environment variables from .env.development');
//   require('dotenv').config({ path: '/.env.development' });
// }

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      { name: Student.name, schema: StudentSchema },
      { name: Instructor.name, schema: InstructorSchema },
    ]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '30d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
