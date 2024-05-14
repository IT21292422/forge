import { Controller, Get, Param, Put } from '@nestjs/common';
import { LearnerService } from './learner.service';

@Controller('learner')
export class LearnerController {
  constructor(private readonly learnerService: LearnerService) {}

  @Get()
  findAll() {
    return this.learnerService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
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

  @Put('/:sid/unenrollcourse/:cid')
  unenrollCourse(@Param('sid') sid: string, @Param('cid') cid: string) {
    return this.learnerService.unenrollCourse(sid,cid);
  }
}
