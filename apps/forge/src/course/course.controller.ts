import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthGuard } from '../auth/auth.guard';
import { CourseService } from './course.service';
import { createCourseDTO } from './dto/course.dto';

export interface testCourse {
  name: string;
  id: Number;
}

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @UseGuards(AuthGuard)
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
  //   @Body() data: TestCourse,
  // ): Promise<Observable<TestCourse>> {
  //   return this.courseService.createTestCourseService<TestCourse>();
  // }

  // @Post('testService')
  // async createTestCourse(): Promise<Observable<testCourse>> {
  //   const data: testCourse = {
  //     name: 'world',
  //     id: 123,
  //   };
  //   console.log(data);
  //   return this.courseService.createTestCourseService(data);
  // }

  @Get('getAllCourses')
  async getAllCourseService(data: testCourse): Promise<{}> {
    console.log('####################');
    return this.courseService.getAllCourseService();
  }

  // @Get('getSomeCourses/:id')
  // async getSomeCourseService(@Param('id') id: string): Promise<{}> {
  //   console.log('####################', id);
  //   return this.courseService.getOneCourseService(id);
  // }

  @Get('getOneCourse/:id')
  async getOneCourseService(@Param('id') id: string): Promise<{}> {
    console.log('####################', id);
    return this.courseService.getOneCourseService(id);
  }

  @UseGuards(AuthGuard)
  @Patch('setapproved')
  async updateIsApproved(@Body() data): Promise<Observable<{}>> {
    return this.courseService.updateIsApproved(data);
  }

  @UseGuards(AuthGuard)
  @Put('addnewchapter')
  async addChapter(@Body() data): Promise<{}> {
    return this.courseService.addChapter(data);
  }
}
