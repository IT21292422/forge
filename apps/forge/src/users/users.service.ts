import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreateInstructorRequestDTO,
  CreateStudentRequestDTO,
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
    createUserDto: CreateStudentRequestDTO | CreateInstructorRequestDTO,
  ): Promise<Student | Instructor> {
    try {
      if (createUserDto.role === 'student') {
        const createdUser = new this.studentModel(createUserDto);

        return createdUser.save();
      } else {
        const createdUser = new this.instructorModel(createUserDto);

        return createdUser.save();
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
    update: CreateStudentRequestDTO | CreateInstructorRequestDTO,
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
