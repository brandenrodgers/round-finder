import Cache from "timed-cache";
import { Courses } from "../types/Course";

// 2 minute TTL
export const cache = new Cache<Courses>({ defaultTtl: 120 * 1000 });
