import { TeeTime } from "./TeeTime";

export type Course = {
  bookLink: string;
  courseId: string;
  courseName: string;
  error?: string;
  teeTimes?: Array<TeeTime>;
};

export type Courses = {
  [key: string]: Course;
};
