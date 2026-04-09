import axios from "axios";
import { getDateParts, padDatePart } from "./time";
import { Course, TeeTime, GenericFetchParams } from "./types";

type ChronogolfTeeTime = {
  id: number;
  course_id: number;
  start_time: string; // "HH:MM"
  date: string;
  hole: number; // 1 = front, 10 = back
  out_of_capacity: boolean;
  frozen: boolean;
  green_fees: Array<unknown>;
};

const makeFetchTeeTimes =
  (clubId: number, courseId: number, affiliationTypeId: number) =>
  async (params: GenericFetchParams): Promise<Array<ChronogolfTeeTime>> => {
    const { data } = await axios.get(
      `https://www.chronogolf.com/marketplace/clubs/${clubId}/teetimes`,
      {
        params: {
          date: params.date,
          course_id: courseId,
          "affiliation_type_ids[]": affiliationTypeId,
          nb_holes: 18,
        },
      }
    );
    return data;
  };

const formatParams = (params: GenericFetchParams): GenericFetchParams => {
  const { year, month, day } = getDateParts(params.date);
  return {
    ...params,
    date: `${year}-${padDatePart(month)}-${padDatePart(day)}`,
  };
};

const makeFormatResponse =
  (courseId: string, courseName: string) =>
  (resp: Array<ChronogolfTeeTime>): Array<TeeTime> => {
    const result: Array<TeeTime> = [];
    resp
      .filter((t) => !t.out_of_capacity && !t.frozen)
      .forEach((t) => {
        const [hours, minutes] = t.start_time.split(":").map(Number);
        const base = {
          courseId,
          courseName,
          availablePlayers: 4,
          startSide: t.hole === 10 ? "back" : ("front" as TeeTime["startSide"]),
          time: { hours, minutes },
        };
        result.push({ ...base, holes: 9 });
        result.push({ ...base, holes: 18 });
      });
    return result;
  };

export const makeChronogolfHandler = ({
  clubId,
  courseId,
  affiliationTypeId,
  bookLink,
  id,
  image,
  name,
  rank,
  coordinates,
  location,
  nineHoleOnly,
  hasRange,
}: {
  clubId: number;
  courseId: number;
  affiliationTypeId: number;
  bookLink?: string;
  id: string;
  image: string;
  name: string;
  rank: Course["rank"];
  coordinates?: { lat: number; lng: number };
  location?: string;
  nineHoleOnly?: boolean;
  hasRange?: boolean;
}) => ({
  type: "live" as const,
  bookLink: bookLink ?? `https://www.chronogolf.com/club/${clubId}#!`,
  fetchTeeTimes: makeFetchTeeTimes(clubId, courseId, affiliationTypeId),
  formatParams,
  formatResponse: makeFormatResponse(id, name),
  id,
  image,
  name,
  rank,
  coordinates,
  location,
  nineHoleOnly,
  hasRange,
});
