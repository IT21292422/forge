import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserEvent } from 'shared/events/auth.events';
import { ProgressDto } from './dto/course-progress.dto';
import { EnrollLearnerEvent } from './events/learner.events';
import { Progress } from './model/Progress.schema';

@Injectable()
export class LearnerService {
  @Inject('COURSE_SERVICE')
  private readonly courseClient: ClientProxy;
  constructor(@InjectModel(Progress.name) private progressModel: Model<Progress>) {}

  handleUserCreated(data: CreateUserEvent) {
    console.log('Received user created event ~ 🚀 Learner', data);
  }

  async handleEnrollEvent(data: EnrollLearnerEvent){
    const sid = data.sid;
    const cid = data.cid;

    //check if a document with SID already exists
    const existingProgress = await this.progressModel.findOne({ studentId: sid });

    if(existingProgress){
      //if already exists
      existingProgress.courses.push({
        courseId: cid,
        chaptersCompleted:[],
        progress: 0
      });
      return existingProgress.save();
    }else{
      //if does not exist create a new one
      const prog: ProgressDto = {
        studentId: sid,
        courses:[{
          courseId: cid,
          chaptersCompleted: [],
          progress: 0
        }]
      }
      const result = new this.progressModel(prog).save();
      return result;
    }
  }

  updateProgress(data:any){
    const {sid} = data
    const {course} = data
    return this.progressModel.findOneAndUpdate({studentId: sid,'courses.courseId': course.courseId},{ $set:{'courses.$': course}},{new: true})
  }

  async getProgress(data:any){
    return this.progressModel.findOne({studentId:data.sid});
  }

  getAllCourses(){
    return this.courseClient.send({cmd: 'findall_course'}, {});
  }

  getCourseById(id:string){
    return this.courseClient.send({cmd: 'findone_course'}, {id});
  }

}
