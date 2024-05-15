export interface ProgressDto{
    studentId: string,
    courses: CourseProgress[];
}

export interface CourseProgress{
    courseId: string;
    chaptersCompleted: string[];
    progress: number;
}