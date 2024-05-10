import { Body, Controller, Post } from '@nestjs/common';
import { CourseService } from './course.service';
import { createCourseDTO } from './dto/course.dto';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  createCourse(@Body() data: createCourseDTO) {
    this.courseService.handleCreateCourse(data);
  }
}
