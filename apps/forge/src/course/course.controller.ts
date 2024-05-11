import { Body, Controller, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CourseService } from './course.service';
import { createCourseDTO } from './dto/course.dto';

export interface testCourse {
  name: string;
  id: Number;
}

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  async createCourse(
    @Body() data: createCourseDTO,
  ): Promise<Observable<createCourseDTO>> {
    return this.courseService.handleCreateCourse(data);
  }

  // @Post('test')
  // async createTestCourse(
  //   @Body() data: testCourse,
  // ): Promise<Observable<testCourse>> {
  //   return this.courseService.createTestCourseService<testCourse>();
  // }

  @Post('testService')
  async createTestCourse(): Promise<Observable<testCourse>> {
    const data: testCourse = {
      name: 'world',
      id: 123,
    };
    console.log(data);
    return this.courseService.createTestCourseService(data);
  }
}
