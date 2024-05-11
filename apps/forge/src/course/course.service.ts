import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs/internal/Observable';
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
  @Inject('COURSE_SERVICE')
  private readonly courseClient: ClientProxy;

  // async handleCreateCourse(
  //   data: createCourseDTO,
  // ): Promise<Observable<createCourseDTO>> {
  //   return this.courseClient.send<testCourse>({ cmd: 'create_course' }, data);
  // }

  async handleCreateCourse(
    data: createCourseDTO,
  ): Promise<Observable<createCourseDTO>> {
    console.log(data);
    return this.courseClient.send<createCourseDTO>(
      { cmd: 'create_course' },
      data,
    );
  }

  async createTestCourse(data: testCourse): Promise<Observable<testCourse>> {
    return new Observable<testCourse>((observer) => {
      observer.next({ name: 'hello', id: 101 });
      observer.complete();
    });
  }

  async createTestCourseService(
    data: testCourse,
  ): Promise<Observable<testCourse>> {
    console.log('forge test worked');
    const pattern = { cmd: 'test_course' };
    return this.courseClient.send<testCourse>(pattern, data);
  }
}
