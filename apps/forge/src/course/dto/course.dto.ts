export interface createCourseDTO {
  courseId: String;
  courseTitle: String;
  publishedDate: Date['toISOString'];
  imgUrl: String; // cover for card
  price: Number;
  categories: String;
  tags: String[];
  description: String;
  WhatWillLearn: String[];
  isApproved: Boolean;
  chapters: [
    {
      chapterId: Number;
      chapterTitle: String;
      pdfUrl: String;
      videoUrl: String;
      videoLength: String;
    },
  ];
}
