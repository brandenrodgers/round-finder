import axios from "axios";
import { Course, TeeTime, GenericFetchParams } from "./types";
import { getDateParts, padDatePart } from "./time";

type TenforeBookingTimesResponse = {
  successful: boolean;
  data: Array<TenforeTeeTime>;
};

type TenforeTeeTime = {
  id: number;
  date: string;
  time: string; // "HH:MM:SS"
  back9: boolean;
  spots: number;
  maxHoles: 9 | 18;
  customers: Array<unknown>;
};

const makeFetchTeeTimes =
  (golfCourseId: number, appId: number) =>
  async (params: GenericFetchParams): Promise<TenforeBookingTimesResponse> => {
    const { data } = await axios.post(
      "https://swan.tenfore.golf/api/BookingEngineV4/booking-times",
      { golfCourseId, subCourseId: null, dateFrom: params.date, appId }
    );
    return data;
  };

const formatParams = (params: GenericFetchParams): GenericFetchParams => {
  const { year, month, day } = getDateParts(params.date);
  return { ...params, date: `${year}-${padDatePart(month)}-${padDatePart(day)}` };
};

const makeFormatResponse =
  (courseId: string, courseName: string) =>
  (resp: TenforeBookingTimesResponse): Array<TeeTime> =>
    resp.data
      .filter((t) => t.spots > 0)
      .map((t) => {
        const [hours, minutes] = t.time.split(":").map(Number);
        return {
          courseId,
          courseName,
          availablePlayers: t.spots,
          startSide: t.back9 ? "back" : ("front" as TeeTime["startSide"]),
          holes: t.maxHoles as TeeTime["holes"],
          time: { hours, minutes },
        };
      });

export const makeTenforeHandler = ({
  golfCourseId,
  appId,
  courseSlug,
  id,
  image,
  name,
  rank,
  coordinates,
  location,
  nineHoleOnly,
  hasRange,
}: {
  golfCourseId: number;
  appId: number;
  courseSlug: string;
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
  bookLink: `https://fox.tenfore.golf/${courseSlug}`,
  fetchTeeTimes: makeFetchTeeTimes(golfCourseId, appId),
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
