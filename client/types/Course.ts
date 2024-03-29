import { TeeTime } from "../../server/types/TeeTime";

export type Course = {
  courseId: string;
  courseName: string;
  teeTimes: Array<TeeTime>;
};
