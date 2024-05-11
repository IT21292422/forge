import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserEvent } from 'shared/events/auth.events';
import { createCourseDTO } from './dto/course.dto';

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

  getHello(): string {
    return 'Hello World!';
  }

  handleUSerCreatedEvent(data: CreateUserEvent) {
    console.log('Received user created event ~ 🚀 Course', data);
  }

  handleCreateCourse(data: createCourseDTO) {
    try {
      // create course function
      // TODO

      // after course creation
      this.notificationsClient.send(
        { cmd: 'course_created' },
        { message: `New course ${data.courseId} pending approval` },
      );
      return data;
    } catch (error) {
      console.error('error creating course: ', error);
    }
  }

  async createTestCourseService(data: testCourse): Promise<testCourse> {
    console.log('forge test worked');
    const pattern = { cmd: 'test_course' };
    return data;
  }
}
