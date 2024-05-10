import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import {
  LoginInstructorResponseDTO,
  LoginStudentResponseDTO,
} from '../users/dto/user.dto';
import { Instructor } from '../users/instructor/model/instructor.model';
import { Student } from '../users/student/model/student.model';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    @InjectModel(Student.name) private studentModel: Model<Student>,
    @InjectModel(Instructor.name) private instructorModel: Model<Instructor>,
  ) {}

  onModuleInit() {
    console.log(`Auth service has been initialized on port 3005`);
  }

  async validateUser(
    email: string,
    password: string,
    role: string,
  ): Promise<{
    userObject?: LoginStudentResponseDTO | LoginInstructorResponseDTO;
    error?: 'nouser' | 'invalidpassword';
  }> {
    let user;

    if (role === 'student') {
      user = await this.studentModel.findOne({ email }).exec();
    } else {
      user = await this.instructorModel.findOne({ email }).exec();
    }

    if (!user) {
      return { userObject: null, error: 'nouser' };
    }
    console.log('🚀 ~ AuthService ~ user after checking:', user);
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return { userObject: null, error: 'invalidpassword' };
    }

    const plainObject = user.toJSON();
    const { password: pass, ...result } = plainObject;
    return { userObject: result, error: null };
  }
}
