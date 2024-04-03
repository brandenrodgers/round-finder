import { createSelector } from "reselect";
import { Courses } from "../../server/types/Course";
import { TeeTime } from "../../server/types/TeeTime";
import type { RootState } from "../redux/store";
import { Filter } from "../types/Filter";

export const getCourses = (state: RootState) => state.courses.value;
export const getFilter = (state: RootState) => state.filter.value;
export const getDate = (state: RootState) => state.date.value;

const filterTeeTime = (teeTime: TeeTime, filter: Filter): boolean => {
  if (filter.players && teeTime.availablePlayers < filter.players) {
    return false;
  }
  if (filter.holes && teeTime.holes !== filter.holes) {
    return false;
  }
  if (
    filter.times &&
    (teeTime.time.hours < filter.times[0] ||
      teeTime.time.hours > filter.times[1])
  ) {
    return false;
  }
  return true;
};

export const getFilteredTeeTimesMemoized = createSelector(
  [getCourses, getFilter],
  (courses, filter) => {
    const courseIds = Object.keys(courses);

    const result = {} as Courses;

    courseIds.forEach((courseId) => {
      const course = courses[courseId];

      const filteredTeeTimes = course.teeTimes
        ? course.teeTimes.filter((teeTime) => filterTeeTime(teeTime, filter))
        : [];

      result[courseId] = {
        ...course,
        teeTimes: filteredTeeTimes,
      };
    });

    return result;
  }
);
