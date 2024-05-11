import { Controller, Get } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { CreateUserEvent } from 'shared/events/auth.events';
import { LearnerService } from './learner.service';

@Controller()
export class LearnerController {
  constructor(private readonly learnerService: LearnerService) {}

  @Get()
  getHello(): string {
    return this.learnerService.getHello();
  }
  @EventPattern('test_event')
  handleUserCreatedEvent(data: CreateUserEvent) {
    this.learnerService.handleUserCreated(data);
  }

  @MessagePattern({cmd: 'get_courses'})
  getCourses() {
  return this.learnerService.getAllCourses()
  }

  @MessagePattern({cmd: 'get_course_by_id'})
  getCourseById(data: any) {
  const { id } = data;
  return this.learnerService.getCourseById(id)
  }
}
