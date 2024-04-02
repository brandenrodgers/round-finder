import Cache from "timed-cache";
import { Courses } from "../types/Course";

// 3 minute TTL
export const cache = new Cache<Courses>({ defaultTtl: 180 * 1000 });
