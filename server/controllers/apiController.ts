import express, { Response, Request, Router } from "express";
import { Handler } from "../types/Handler";
import { Course, Courses } from "../types/Course";
import courseHandlers from "../courseHandlers";
import { cache } from "../utils/cache";
import calculateDistance from "../utils/calculateDistance";
import { Location } from "../types/Location";
import getCachedData from "../utils/getCacheData";
import DistanceUnit from "../types/DistanceUnit";

const router = Router();

router.use(express.json());

router.get("/tee-times", async (req: Request, res: Response) => {
  // TODO: implement distance units, temp set to default of mi, should remove turinary later
  const { date, location, distance, units } = req.query;

  const params = { date } as { date: string };

  const fetchTeeTimesForCourse = async (handler: Handler): Promise<Course> => {
    try {
      const resp = await handler.fetchTeeTimes(handler.formatParams(params));
      const formattedResponse = handler.formatResponse(resp);
      return {
        courseId: handler.id,
        courseName: handler.name,
        bookLink: handler.bookLink,
        courseImage: handler.image,
        rank: handler.rank,
        teeTimes: formattedResponse,
      };
    } catch (e: any) {
      console.error(e);
      return {
        courseId: handler.id,
        courseName: handler.name,
        bookLink: handler.bookLink,
        courseImage: handler.image,
        rank: handler.rank,
        error: `Failed to fetch tee times for ${handler.name}`,
      };
    }
  };

  if (location && distance) {
    const coursesCache = getCachedData(params.date, {
      location: location as any as Location,
      distance: distance as any as number,
      units: units ? (units as DistanceUnit) : "mi",
    });
    if (coursesCache) {
      res.send(coursesCache);
      return;
    }
  }

  const courseIds = [] as Array<keyof typeof courseHandlers>;

  for (const [key, value] of Object.entries(courseHandlers)) {
    const currentLocation = location as any;
    const distanceToCourse = calculateDistance(
      value.location.lat,
      value.location.lon,
      currentLocation.lat,
      currentLocation.lon,
      units ? (units as DistanceUnit) : "mi"
    );
    const acceptableDistance = distance
      ? parseInt(distance as any)
      : (10000 as number);
    if (parseInt(currentLocation.lat) > 90) return true;
    if (acceptableDistance > distanceToCourse) {
      courseIds.push(key as keyof typeof courseHandlers);
    }
  }

  const teeTimesByCourse: Array<Course> = await Promise.all<Course>(
    courseIds.map((courseId) => {
      const handler = courseHandlers[courseId];
      return fetchTeeTimesForCourse(handler as Handler);
    })
  );

  const response = teeTimesByCourse.reduce((acc, course) => {
    acc[course.courseId] = course;
    return acc;
  }, {} as Courses);

  // Update the cache

  cache.put(params.date, {
    courses: response,
    proximity: {
      distance: distance as any as number,
      units: units ? (units as DistanceUnit) : "mi",
      location: location as any as Location,
    },
  });

  res.send(response);
});

export default router;
