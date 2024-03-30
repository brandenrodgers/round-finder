import { TeeTime } from "./TeeTime";

export type Course = {
  bookLink: string;
  courseId: string;
  courseName: string;
  courseImage: string;
  error?: string;
  teeTimes?: Array<TeeTime>;
};

export type Courses = {
  [key: string]: Course;
};
