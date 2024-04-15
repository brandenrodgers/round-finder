import express, { Response, Request, Router } from "express";
import { Handler } from "../types/Handler";
import { Course, Courses } from "../types/Course";
import courseHandlers from "../courseHandlers";
import { cache } from "../utils/cache";
import { locationByIds } from "../utils/locationMap";
import calculateDistance from "../utils/calculateDistance";

const router = Router();

router.use(express.json());

router.get("/tee-times", async (req: Request, res: Response) => {
  const { date, location, distance } = req.query;

  console.log(distance);
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

  // Check to see if we have the courses cached
  const cachedCourses = cache.get(params.date);
  if (cachedCourses) {
    res.send(cachedCourses);
    return;
  }

  const courseIds = Object.keys(courseHandlers).filter((courseId) => {
    const courseLocation = locationByIds[courseId];
    const currentLocation = location as any;
    const distanceToCourse = calculateDistance(
      courseLocation.lat,
      courseLocation.lon,
      currentLocation.lat,
      currentLocation.lon,
      "mi"
    ) as number;
    const acceptableDistance = distance
      ? parseInt(distance as any)
      : (10000 as number);
    return acceptableDistance > distanceToCourse;
  }) as Array<keyof typeof courseHandlers>;

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
  cache.put(params.date, response);

  res.send(response);
});

export default router;
