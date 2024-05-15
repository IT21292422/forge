import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { EnrollLearnerEvent } from './events/learner.events';
import { LearnerService } from './learner.service';

@Controller()
export class LearnerController {
  constructor(private readonly learnerService: LearnerService) {}

  @EventPattern('enroll_course')
  async handleEnrollEvent(data: EnrollLearnerEvent) {
    return this.learnerService.handleEnrollEvent(data);
  }

  @MessagePattern({cmd: 'get_courses'})
  getCourses() {
  return this.learnerService.getAllCourses()
  }

  @MessagePattern({cmd: 'update_progress'})
  updateProgress(data:any) {
  return this.learnerService.updateProgress(data)
  }

  @MessagePattern({cmd: 'get_progress'})
  getProgress(data:any) {
  return this.learnerService.getProgress(data)
  }

  @MessagePattern({cmd: 'get_course_by_id'})
  getCourseById(data: any) {
  const { id } = data;
  return this.learnerService.getCourseById(id)
  }
}
