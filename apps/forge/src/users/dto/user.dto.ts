import { Types } from 'mongoose';
import { USERROLES } from '../constants/user.constants';
import { Student } from '../student/model/student.model';

export interface CreateStudentRequestDTO {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  year: string;
  password: string;
  enrolledCourses: string[];
}
export interface CreateInstructorRequestDTO {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  password: string;
  publishedCourses: string[];
}

export interface GetAllStudentsResponseDTO {
  users: Student[];
}
export interface GetOneStudentsResponseDTO {
  user: Student;
}

export interface LoginUserRequestDTO {
  email: string;
  password: string;
  role: USERROLES;
}

export interface CreateStudentResponseDTO {
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  role: string;
  year: string;
  enrolledCourses: string[];
  _id: Types.ObjectId;
}
export interface CreateInstructorResponseDTO {
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  role: string;
  publishedCourses: string[];
  _id: Types.ObjectId;
}

export interface LoginStudentResponseDTO {
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  role: string;
  year: string;
  enrolledCourses: string[];
  _id?: Types.ObjectId;
}
export interface LoginInstructorResponseDTO {
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  role: string;
  publishedCourses: string[];
  _id?: Types.ObjectId;
}
