import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { CourseProgress } from 'apps/learner/src/dto/course-progress.dto';
import { LearnerService } from './learner.service';

@Controller('learner')
export class LearnerController {
  constructor(private readonly learnerService: LearnerService) {}

  @Get()
  findAllCourses() {
    return this.learnerService.findAll();
  }

  @Get('/:id')
  findOneCourse(@Param('id') id: string) {
    return this.learnerService.findOne(id);
  }

  @Get('/getInstructor/:id')
  findInstructor(@Param('id') id: string) {
    return this.learnerService.findInstructor(id);
  }

  @Put('/:sid/enrollcourse/:cid')
  enrollCourse(@Param('sid') sid: string, @Param('cid') cid: string) {
    return this.learnerService.enrollCourse(sid,cid);
  }

  @Put('updateprogress/:sid')
  updateProgress(@Param('sid') sid: string, @Body() course:CourseProgress) {
    return this.learnerService.updateProgress(sid,course);
  }

  @Get('/getprogress/:sid')
  getProgress(@Param('sid') sid: string){
    return this.learnerService.getProgress(sid);
  }

  @Put('/:sid/unenrollcourse/:cid')
  unenrollCourse(@Param('sid') sid: string, @Param('cid') cid: string) {
    return this.learnerService.unenrollCourse(sid,cid);
  }
}
