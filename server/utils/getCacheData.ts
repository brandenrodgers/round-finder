import { Courses } from "../types/Course";
import { Proximity } from "../types/Proximity";

import { cache } from "./cache";

const getCachedData = (date: string, proximity: Proximity): null | Courses => {
  const cacheData = cache.get(date);
  if (!cacheData) return null;
  const cachedCoursesRes = cacheData.courses;
  const cachedProximityRes = cacheData.proximity;

  if (cachedCoursesRes && cachedProximityRes) {
    const proximityCache = cachedProximityRes as Proximity;
    const coursesCache = cachedCoursesRes as Courses;

    if (
      proximityCache.location &&
      proximityCache.location.lat === proximity.location.lat &&
      proximityCache.location.lon === proximity.location.lon &&
      proximityCache.distance === proximity.distance &&
      proximityCache.units === proximity.units
    ) {
      return coursesCache;
    }
  }
  return null;
};

export default getCachedData;

// cachedData as null | {distance: Distance, courses: Courses}
