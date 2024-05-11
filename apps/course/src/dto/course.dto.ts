export interface createCourseDTO {
  courseId: String;
  courseTitle: String;
  publishedDate: String;
  imgUrl: String; // cover for card
  price: Number;
  categories: String;
  tags: String[];
  description: String;
  WhatWillLearn: String[];
  isApproved: Boolean;
  chapters: string[];
}
