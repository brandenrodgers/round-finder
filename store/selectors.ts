import { createSelector } from "reselect";
import { Courses, TeeTime, Filter } from "@/lib/types";
import { haversineDistance } from "@/lib/distance";
import type { RootState } from "./index";
import { SORT_VALUES } from "@/lib/constants";

export const getCourses = (state: RootState) => state.courses.value;
export const getFilter = (state: RootState) => state.filter.value;
export const getDate = (state: RootState) => state.date.value;
export const getSort = (state: RootState) => state.sort.value;
export const getLocation = (state: RootState) => state.location.coords;
export const getLocationStatus = (state: RootState) => state.location.status;
export const getFavorites = (state: RootState) => state.favorites.courseIds;

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

      if (course.type === "manual") return;
      if (filter.range && !course.hasRange) return;

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

export const getManualCoursesMemoized = createSelector(
  [getCourses, getFilter],
  (courses, filter) =>
    Object.values(courses)
      .filter((course) => course.type === "manual")
      .filter((course) => !filter.range || course.hasRange)
      .sort((a, b) => a.courseName.localeCompare(b.courseName))
);

export const getSortedCourseIdsMemoized = createSelector(
  [getFilteredTeeTimesMemoized, getSort, getLocation, getFavorites],
  (filterTeeTimes, sort, location, favoriteIds) => {
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

    if (sort === SORT_VALUES.distance) {
      if (!location) return courseIds;
      return courseIds.sort((a, b) => {
        const coordsA = filterTeeTimes[a].coordinates;
        const coordsB = filterTeeTimes[b].coordinates;
        if (!coordsA) return 1;
        if (!coordsB) return -1;
        return (
          haversineDistance(location, coordsA) -
          haversineDistance(location, coordsB)
        );
      });
    }

    if (sort === SORT_VALUES.forMe) {
      const favoriteSet = new Set(favoriteIds);
      return courseIds.sort((a, b) => {
        const aFav = favoriteSet.has(a);
        const bFav = favoriteSet.has(b);
        if (aFav !== bFav) return aFav ? -1 : 1;
        const courseA = filterTeeTimes[a];
        const courseB = filterTeeTimes[b];
        if (courseB.rank !== courseA.rank) return courseB.rank - courseA.rank;
        if (location && courseA.coordinates && courseB.coordinates) {
          return (
            haversineDistance(location, courseA.coordinates) -
            haversineDistance(location, courseB.coordinates)
          );
        }
        return 0;
      });
    }

    return courseIds;
  }
);
