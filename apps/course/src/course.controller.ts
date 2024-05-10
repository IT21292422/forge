import { Controller, Get } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { CreateUserEvent } from 'shared/events/auth.events';
import { CourseService } from './course.service';
import { createCourseDTO } from './dto/course.dto';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  getHello(): string {
    return this.courseService.getHello();
  }

  @EventPattern('user_created')
  handleUSerCreatedEvent(data: CreateUserEvent) {
    this.courseService.handleUSerCreatedEvent(data);
  }

  @MessagePattern('create_course')
  createCourse(data: createCourseDTO): createCourseDTO {
    return this.courseService.handleCreateCourse(data);
  }
}
