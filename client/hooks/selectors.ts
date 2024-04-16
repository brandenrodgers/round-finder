import { createSelector } from "reselect";
import { Courses } from "../../server/types/Course";
import { TeeTime } from "../../server/types/TeeTime";
import type { RootState } from "../redux/store";
import { Filter } from "../types/Filter";
import { SORT_VALUES } from "../constants";

export const getCourses = (state: RootState) => state.courses.value;
export const getFilter = (state: RootState) => state.filter.value;
export const getDate = (state: RootState) => state.date.value;
export const getSort = (state: RootState) => state.sort.value;
export const getLocation = (state: RootState) => state.location.value;
export const getDistance = (state: RootState) => state.distance.value;

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

      if (filteredTeeTimes.length) {
        result[courseId] = {
          ...course,
          teeTimes: filteredTeeTimes,
        };
      }
    });

    return result;
  }
);

export const getSortedCourseIdsMemoized = createSelector(
  [getFilteredTeeTimesMemoized, getSort],
  (filterTeeTimes, sort) => {
    const courseIds = Object.keys(filterTeeTimes);

    if (sort === SORT_VALUES.alphabetical) {
      return courseIds.sort((a: string, b: string) => {
        const courseA = filterTeeTimes[a].courseName;
        const courseB = filterTeeTimes[b].courseName;
        if (courseA < courseB) {
          return -1;
        }
        if (courseA > courseB) {
          return 1;
        }
        return 0;
      });
    }

    if (sort === SORT_VALUES.quality) {
      return courseIds.sort((a: string, b: string) => {
        const courseA = filterTeeTimes[a].rank;
        const courseB = filterTeeTimes[b].rank;
        if (courseA < courseB) {
          return 1;
        }
        if (courseA > courseB) {
          return -1;
        }
        return 0;
      });
    }

    // TODO add distance support
    if (sort === SORT_VALUES.distance) {
      return courseIds;
    }

    return courseIds;
  }
);
