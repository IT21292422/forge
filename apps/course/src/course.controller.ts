import { Controller, Get } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { CreateUserEvent } from 'shared/events/auth.events';
import { CourseService } from './course.service';
import { createCourseDTO } from './dto/course.dto';

export interface testCourse {
  name: string;
  id: Number;
}

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

  @MessagePattern({ cmd: 'create_course' })
  async createCourse(data: createCourseDTO): Promise<{}> {
    console.log('create course worked');
    return this.courseService.handleCreateCourse(data);
  }

  @MessagePattern({ cmd: 'test_course' })
  async createTestCourseService(data: testCourse): Promise<{}> {
    console.log('course test worked');
    return this.courseService.createTestCourseService(data);
  }
}
