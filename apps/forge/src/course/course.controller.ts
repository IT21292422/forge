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

  @Post('crate_course')
  async createCourse(
    @Body() data: createCourseDTO,
  ): Promise<Observable<createCourseDTO>> {
    // const courseExample: createCourseDTO = {
    //   courseId: 'C101',
    //   courseTitle: 'Introduction to Programming',
    //   publishedDate: new Date(),
    //   imgUrl: 'https://example.com/programming-cover.jpg',
    //   price: 49.99,
    //   categories: 'Programming',
    //   tags: ['beginner', 'coding', 'programming'],
    //   description:
    //     'Learn the basics of programming with this comprehensive course.',
    //   WhatWillLearn: ['Basic syntax', 'Control structures', 'Functions'],
    //   isApproved: true,
    //   chapters: null,
    // };
    const courseExample = data;
    return this.courseService.handleCreateCourse(courseExample);
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
