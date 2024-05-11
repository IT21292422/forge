import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs/internal/Observable';
import { createCourseDTO } from './dto/course.dto';

export interface testCourse {
  name: string;
  id: Number;
}

@Injectable()
export class CourseService {
  @Inject('NOTIFICATIONS_SERVICE')
  private readonly notificationsClient: ClientProxy;
  @Inject('LEARNER_SERVICE')
  private readonly learnerClient: ClientProxy;
  @Inject('COURSE_SERVICE')
  private readonly courseClient: ClientProxy;

  async handleCreateCourse(
    data: createCourseDTO,
  ): Promise<Observable<createCourseDTO>> {
    // return this.courseClient.send({ cmd: 'create_course' }, { data });
    const sampleCourse: createCourseDTO = {
      courseId: 'c01',
      courseTitle: 'Sample Course',
      publishedDate: new Date(),
      imgUrl: 'http://imgurl.com/sample.png',
      price: 99.99,
      categories: 'programming',
      tags: ['typescript', 'javascript', 'web development'],
      description: 'This is a sample course description.',
      WhatWillLearn: [
        'TypeScript Basics',
        'Advanced JavaScript',
        'Web Development Concepts',
      ],
      isApproved: true,
      chapters: [
        {
          chapterId: 1,
          chapterTitle: 'Introduction to TypeScript',
          pdfUrl: 'http://pdfurl.com/intro.pdf',
          videoUrl: 'http://videourl.com/intro.mp4',
          videoLength: '15:00',
        },
      ],
    };

    return sampleCourse;
  }

  async createTestCourse(data: testCourse): Promise<Observable<testCourse>> {
    return new Observable<testCourse>((observer) => {
      observer.next({ name: 'hello', id: 101 });
      observer.complete();
    });
  }

  async createTestCourseService(
    data: testCourse,
  ): Promise<Observable<testCourse>> {
    console.log('forge test worked');
    const pattern = { cmd: 'test_course' };
    return this.courseClient.send<testCourse>(pattern, data);
  }
}
