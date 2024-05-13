import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserEvent } from 'shared/events/auth.events';

@Injectable()
export class LearnerService {
  @Inject('COURSE_SERVICE')
  private readonly courseClient: ClientProxy;
  
  getHello(): string {
    return 'Hello World!';
  }

  handleUserCreated(data: CreateUserEvent) {
    console.log('Received user created event ~ 🚀 Learner', data);
  }

  getAllCourses(){
    return this.courseClient.send({cmd: 'findall_course'}, {});
  }

  getUserCourses(){
    //Get Enrolled courses of user
  }

  getCourseById(id:string){
    return this.courseClient.send({cmd: 'findone_course'}, {id});
  }

  enrollCourse(){

  }

  getInstructor(){

  }

  getProgress(){
    
  }

}
