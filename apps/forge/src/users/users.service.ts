import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Document, Model } from 'mongoose';
import { UserAlreadyExistsException } from 'shared/exceptions/user.exceptions';
import {
  CreateInstructorRequestDTO,
  CreateInstructorResponseDTO,
  CreateStudentRequestDTO,
  CreateStudentResponseDTO,
} from './dto/user.dto';
import { NewUserCreatedEvent } from './events/user.events';
import { Instructor } from './instructor/model/instructor.model';
import { Student } from './student/model/student.model';

@Injectable()
export class UsersService {
  constructor(
    @Inject('NOTIFICATIONS_SERVICE')
    private readonly notificationsClient: ClientProxy,
    @InjectModel(Student.name) private studentModel: Model<Student>,
    @InjectModel(Instructor.name) private instructorModel: Model<Instructor>,
    private jwtService: JwtService,
  ) {}

  onModuleInit() {
    console.log(`Users module has been loaded on port 3005`);
  }

  async create(
    createUserDto: CreateStudentRequestDTO | CreateInstructorRequestDTO,
  ): Promise<CreateStudentResponseDTO | CreateInstructorResponseDTO> {
    const { password, ...rest } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      if (createUserDto.role === 'student') {
        const student = new this.studentModel({
          ...rest,
          password: hashedPassword,
        });

        const result = await student.save();
        const plainObject = (result as Document).toObject();
        const token = await this.jwtService.signAsync({
          email: rest.email,
          role: rest.role,
          //@ts-ignore
          id: rest._id,
        });
        const { password, ...resultWithoutPassword } = plainObject;
        this.notificationsClient.emit(
          'new_user_created',
          new NewUserCreatedEvent(rest.email),
        );
        return { ...resultWithoutPassword, token };
      } else {
        const instructor = new this.instructorModel({
          ...rest,
          password: hashedPassword,
        });

        const result = await instructor.save();
        const plainObject = (result as Document).toObject();
        const token = await this.jwtService.signAsync({
          email: rest.email,
          role: rest.role,
          // @ts-ignore
          id: rest._id,
        });
        const { password, ...resultWithoutPassword } = plainObject;
        this.notificationsClient.emit(
          'new_user_created',
          new NewUserCreatedEvent(rest.email),
        );
        return { ...resultWithoutPassword, token };
      }
    } catch (error) {
      console.log('error', error);

      if (error.code === 11000) {
        throw UserAlreadyExistsException(error);
      }
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

  async enrollUser(sid: string, cid: string){
    return await this.studentModel.findByIdAndUpdate(sid, {$push: {enrolledCourses: cid}})
  }

  async unenrollUser(sid: string, cid: string){
    return await this.studentModel.findByIdAndUpdate(sid, {$pull: {enrolledCourses: cid}})
  }
}
