import { Controller, Get } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { CreateUserEvent } from 'shared/events/auth.events';
import { CourseService } from './course.service';

@Controller()
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  getHello(): string {
    return this.courseService.getHello();
  }
  @EventPattern('test_event')
  handleUSerCreatedEvent(data: CreateUserEvent) {
    this.courseService.handleUSerCreatedEvent(data);
  }
}
