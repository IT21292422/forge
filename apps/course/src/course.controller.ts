import { Controller, Get, Post } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
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

  @Post()
  createCourse(data: createCourseDTO): createCourseDTO {
    return this.courseService.handleCreateCourse(data);
  }
}
