import { Student } from '../student/model/student.model';

export interface CreateStudentRequestDTO {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  year: string;
  enrolledCourses: string[];
}
export interface CreateInstructorRequestDTO {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  publishedCourses: string[];
}

export interface GetAllStudentsResponseDTO {
  users: Student[];
}
export interface GetOneStudentsResponseDTO {
  user: Student;
}
