import { TeeTime } from "./TeeTime";

export type Course = {
  bookLink: string;
  courseId: string;
  courseName: string;
  courseImage: string;
  error?: string;
  rank: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  teeTimes?: Array<TeeTime>;
};

export type Courses = {
  [key: string]: Course;
};
