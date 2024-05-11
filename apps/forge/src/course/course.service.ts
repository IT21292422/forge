import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NewChapter } from 'apps/course/src/dto/course.dto';
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

  async getAllCourseService(): Promise<Observable<testCourse>> {
    console.log('forge all worked');
    console.log('$$$$$$$$$$$$$$$$$$$$$');
    const pattern = { cmd: 'findall_course' };
    const data = '';
    return this.courseClient.send<testCourse>(pattern, data);
  }
  async getSomeCourseService(id: string): Promise<Observable<testCourse>> {
    console.log('forge some worked');
    const pattern = { cmd: 'findsome_course' };
    console.log('$$$$$$$$$$$$$$$$$$$$', id);
    return this.courseClient.send<testCourse>(pattern, id);
  }
  async getOneCourseService(id: string): Promise<Observable<testCourse>> {
    console.log('forge one worked');
    const pattern = { cmd: 'findone_course' };
    console.log('$$$$$$$$$$$$$$$$$$$$', id);
    return this.courseClient.send<testCourse>(pattern, id);
  }

  async updateIsApproved(updateObj): Promise<Observable<testCourse>> {
    console.log('%%%%%%%%%%%%%%%%%%%', updateObj.courseId, updateObj.status);
    return this.courseClient.send({ cmd: 'update_course_status' }, updateObj);
  }

  async addChapter(updateObj: NewChapter): Promise<{}> {
    console.log(updateObj.courseId);
    return this.courseClient.send({ cmd: 'add_new_chapter' }, updateObj);
  }
}
