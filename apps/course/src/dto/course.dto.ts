export interface createCourseDTO {
  courseId: String;
  courseTitle: String;
  instructorId: String;
  publishedDate: String;
  imgUrl: String; // cover for card
  price: Number;
  categories: String;
  tags: String[];
  description: String;
  WhatWillLearn: String[];
  isApproved: Boolean;
  chapters: Chapter[];
}

export interface Chapter {
  chapterId: String;
  chapterTitle: String;
  pdfUrl: String;
  videoUrl: String;
  videoLength: String;
}

export interface UpdateApprove {
  courseId: String;
  isApproved: boolean;
}

export interface NewChapter {
  courseId: String;
  newChapter: Chapter;
}
