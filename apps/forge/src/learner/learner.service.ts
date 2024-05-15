import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CourseProgress } from 'apps/learner/src/dto/course-progress.dto';
import { UsersService } from '../users/users.service';
import { EnrollLearnerEvent } from './events/learner.events';

@Injectable()
export class LearnerService {

  constructor(
    @Inject('LEARNER_SERVICE') private readonly learnerClient: ClientProxy,
    private readonly usersService: UsersService
  ) {}
  

  findAll() {
    return this.learnerClient.send({ cmd: 'get_courses' }, {});
  }

  findOne(id: string) {
    return this.learnerClient.send({ cmd: 'get_course_by_id' }, {id});
  }

  findInstructor(id: string){
    return this.usersService.findOne(id.valueOf(),"instructor");
  }

  findStudent(id: string){
    return this.usersService.findOne(id.valueOf(),"student");
  }

  enrollCourse(sid:string , cid: string) {
    this.learnerClient.emit(
      'enroll_course',
      new EnrollLearnerEvent(sid,cid),
    );
    return this.usersService.enrollUser(sid,cid);
  }

  updateProgress(sid:string , course:CourseProgress){
    return this.learnerClient.send({ cmd: 'update_progress' }, {sid,course});
  }

  getProgress(sid: string){
    return this.learnerClient.send({ cmd: 'get_progress' }, {sid});
  }

  unenrollCourse(sid:string , cid: string){
    return this.usersService.unenrollUser(sid,cid);
  }

}
