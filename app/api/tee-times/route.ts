import { NextRequest, NextResponse } from "next/server";
import { Handler, ManualHandler, Course, Courses } from "@/lib/types";
import courseHandlers, { manualCourseHandlers } from "@/lib/courseHandlers";
import { cache } from "@/lib/cache";

const fetchTeeTimesForCourse = async (
  handler: Handler,
  date: string
): Promise<Course> => {
  try {
    const resp = await handler.fetchTeeTimes(handler.formatParams({ date }));
    const formattedResponse = handler.formatResponse(resp);
    if (handler.id === "butternutFarm") {
      console.log(`[butternutFarm] formatted tee times count: ${formattedResponse.length}`, formattedResponse[0]);
    }
    return {
      type: "live",
      courseId: handler.id,
      courseName: handler.name,
      bookLink: handler.bookLink,
      courseImage: handler.image,
      rank: handler.rank,
      coordinates: handler.coordinates,
      location: handler.location,
      nineHoleOnly: handler.nineHoleOnly,
      hasRange: handler.hasRange,
      teeTimes: formattedResponse,
    };
  } catch (e: any) {
    console.error(e);
    return {
      type: "live",
      courseId: handler.id,
      courseName: handler.name,
      bookLink: handler.bookLink,
      courseImage: handler.image,
      rank: handler.rank,
      coordinates: handler.coordinates,
      location: handler.location,
      nineHoleOnly: handler.nineHoleOnly,
      hasRange: handler.hasRange,
      error: `Failed to fetch tee times for ${handler.name}`,
    };
  }
};

const buildManualCourse = (handler: ManualHandler): Course => ({
  type: "manual",
  courseId: handler.id,
  courseName: handler.name,
  bookLink: handler.bookLink,
  courseImage: handler.image,
  rank: handler.rank,
  coordinates: handler.coordinates,
  location: handler.location,
  nineHoleOnly: handler.nineHoleOnly,
  hasRange: handler.hasRange,
});

export async function GET(req: NextRequest) {
  const date = req.nextUrl.searchParams.get("date");

  if (!date) {
    return NextResponse.json({ error: "date is required" }, { status: 400 });
  }

  const cachedCourses = cache.get(date);
  if (cachedCourses) {
    return NextResponse.json(cachedCourses);
  }

  const courseIds = Object.keys(courseHandlers) as Array<
    keyof typeof courseHandlers
  >;

  const teeTimesByCourse: Array<Course> = await Promise.all<Course>(
    courseIds.map((courseId) =>
      fetchTeeTimesForCourse(courseHandlers[courseId] as Handler, date)
    )
  );

  const response = teeTimesByCourse.reduce((acc, course) => {
    acc[course.courseId] = course;
    return acc;
  }, {} as Courses);

  // Add manual courses (no fetch needed — just metadata)
  const manualIds = Object.keys(manualCourseHandlers) as Array<
    keyof typeof manualCourseHandlers
  >;
  manualIds.forEach((id) => {
    const handler = manualCourseHandlers[id] as ManualHandler;
    response[handler.id] = buildManualCourse(handler);
  });

  cache.put(date, response);

  return NextResponse.json(response);
}
