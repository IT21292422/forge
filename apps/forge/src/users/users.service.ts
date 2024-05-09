import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import {
  CreateInstructorDTO,
  CreateStudentDTO,
  CreateStudentResponseDTO,
} from './dto/user.dto';
import { Instructor } from './instructor/model/instructor.model';
import { Student } from './student/model/student.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Student.name) private studentModel: Model<Student>,
    @InjectModel(Instructor.name) private instructorModel: Model<Instructor>,
  ) {}

  onModuleInit() {
    console.log(`UsersService has been initialized on port 3005`);
  }

  async create(
    createUserDto: CreateStudentDTO | CreateInstructorDTO,
  ): Promise<CreateStudentResponseDTO | Instructor> {
    const { password, ...rest } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('hashedPassword', hashedPassword);

    try {
      if (createUserDto.role === 'student') {
        const student = new this.studentModel({
          ...rest,
          password: hashedPassword,
        });

        const result = await student.save();
        const { password, ...resultWithoutPassword } = result.toObject();
        return resultWithoutPassword;
      } else {
        const instructor = new this.instructorModel({
          ...rest,
          password: hashedPassword,
        });

        return await instructor.save();
      }
    } catch (error) {
      throw new HttpException('Error creating user', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(role: string): Promise<Student[] | Instructor[]> {
    if (role === 'student') {
      return await this.studentModel.find().exec();
    } else {
      return await this.instructorModel.find().exec();
    }
  }

  async findOne(id: string, role: string): Promise<Student | Instructor> {
    if (role === 'student') {
      return await this.studentModel.findById(id).exec();
    } else {
      return await this.instructorModel.findById(id).exec();
    }
  }

  async updateUser(
    id: string,
    role: string,
    update: { enrolledCourses: string[] },
  ): Promise<Student | Instructor> {
    const updatedFields = {
      enrolledCourses: update.enrolledCourses,
      updatedAt: new Date(),
    };

    if (role === 'student') {
      return await this.studentModel
        .findByIdAndUpdate(id, { $set: updatedFields }, { new: true })
        .exec();
    } else {
      return await this.instructorModel
        .findByIdAndUpdate(id, updatedFields)
        .exec();
    }
  }

  async patchUser(
    id: string,
    role: string,
    update: CreateStudentDTO | CreateInstructorDTO,
  ): Promise<Student | Instructor> {
    if (role === 'student') {
      return await this.studentModel.findByIdAndUpdate(id, update).exec();
    } else {
      return await this.instructorModel.findByIdAndUpdate(id, update).exec();
    }
  }

  async deleteUser(id: string, role: string): Promise<Student | Instructor> {
    if (role === 'student') {
      return await this.studentModel.findByIdAndDelete(id).exec();
    } else {
      return await this.instructorModel.findByIdAndDelete(id).exec();
    }
  }
}
