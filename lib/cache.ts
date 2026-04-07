import Cache from "timed-cache";
import { Courses } from "./types";

// 5 minute TTL
export const cache = new Cache<Courses>({ defaultTtl: 300 * 1000 });
