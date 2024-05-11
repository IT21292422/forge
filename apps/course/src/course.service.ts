import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserEvent } from 'shared/events/auth.events';
import { createCourseDTO } from './dto/course.dto';
import { Course } from './schema/Course.schema';

export interface testCourse {
  name: string;
  id: Number;
}

@Injectable()
export class CourseService {
  @Inject('NOTIFICATIONS_SERVICE')
  private readonly notificationsClient: ClientProxy;
  @Inject('LEARNER_SERVICE')
  private readonly learnerClient: ClientProxy;
  @Inject('FORGE')
  private readonly forgeClient: ClientProxy;

  constructor(@InjectModel(Course.name) private courseModel: Model<Course>) {}

  getHello(): string {
    return 'Hello World!';
  }

  handleUSerCreatedEvent(data: CreateUserEvent) {
    console.log('Received user created event ~ 🚀 Course', data);
  }

  handleCreateCourse(data: createCourseDTO) {
    const result = new this.courseModel(data).save();
    return result;
  }

  async createTestCourseService(data: testCourse): Promise<testCourse> {
    console.log('forge test worked');
    const pattern = { cmd: 'test_course' };
    return data;
  }

  async findAllCourses(): Promise<{}> {
    console.log('&&&&&&&&&&&&&&&');
    return this.courseModel.find().exec();
  }

  async findAllByCourseId(courseId: string): Promise<{}> {
    console.log('&&&&&&&&&&&&&&&', courseId);
    return this.courseModel.find({ courseId }).exec();
  }

  async findOneCourseById(courseId: string): Promise<{}> {
    console.log('&&&&&&&&&&&&&&&', courseId);
    return this.courseModel.findOne({ courseId }).exec();
  }
}
