import Cache from "timed-cache";
import { Courses } from "../types/Course";
import { Proximity } from "../types/Proximity";

// 5 minute TTL
export const cache = new Cache<{ proximity: Proximity; courses: Courses }>({
  defaultTtl: 300 * 1000,
});
