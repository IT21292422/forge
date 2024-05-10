import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { createCourseDTO } from './dto/course.dto';

@Injectable()
export class CourseService {
  @Inject('NOTIFICATIONS_SERVICE')
  private readonly notificationsClient: ClientProxy;
  @Inject('LEARNER_SERVICE')
  private readonly learnerClient: ClientProxy;
  @Inject('COURSE_SERVICE')
  private readonly courseClient: ClientProxy;

  handleCreateCourse(data: createCourseDTO) {
    return this.courseClient.send({ cmd: 'create_course' }, { data });
  }
}
