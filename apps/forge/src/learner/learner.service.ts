import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UsersService } from '../users/users.service';

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

  enrollCourse(sid:string , cid: string) {
    return this.usersService.enrollUser(sid,cid);
  }

  unenrollCourse(sid:string , cid: string){
    return this.usersService.unenrollUser(sid,cid);
  }

}
