import axios from "axios";
import {
  getDateParts,
  padDatePart,
  getHoursFromDate,
  getMinutesFromDate,
} from "./time";
import { ForeupsoftwareTeeTimeResponse, Course, TeeTime, GenericFetchParams } from "./types";

type FetchParams = {
  date: string;
  holes?: "all" | number;
  players?: 1 | 2 | 3 | 4;
  time?: "all" | "morning" | "midday" | "evening";
};

const makeFetchTeeTimes =
  (bookingClass: number, scheduleId: number) =>
  async ({
    date,
    holes = "all",
    players,
    time = "all",
  }: FetchParams): Promise<ForeupsoftwareTeeTimeResponse> => {
    const { data } = await axios.get(
      `https://foreupsoftware.com/index.php/api/booking/times?booking_class=${bookingClass}&schedule_id=${scheduleId}&schedule_ids%5B%5D=${scheduleId}&specials_only=0&api_key=no_limits`,
      {
        params: { date, holes, players, time },
      }
    );
    return data;
  };

const formatParams = (params: GenericFetchParams): FetchParams => {
  const { year, month, day } = getDateParts(params.date);
  return {
    date: `${padDatePart(month)}-${padDatePart(day)}-${year}`,
  };
};

const makeFormatResponse =
  (courseId: string, courseName: string, nineHoleOnly?: boolean) =>
  (resp: ForeupsoftwareTeeTimeResponse): Array<TeeTime> => {
    if (!Array.isArray(resp)) return [];
    const seen = new Set<string>();
    const result = [] as Array<TeeTime>;

    resp.forEach((teeTime) => {
      const holesArray =
        typeof teeTime.holes === "string"
          ? nineHoleOnly ? [9] : [9, 18]
          : [teeTime.holes];

      holesArray.forEach((hole) => {
        const hours = getHoursFromDate(teeTime.time);
        const minutes = getMinutesFromDate(teeTime.time);
        const key = `${hours}-${minutes}-${hole}`;
        if (seen.has(key)) return;
        seen.add(key);
        result.push({
          courseId,
          courseName,
          availablePlayers: teeTime.available_spots,
          startSide:
            teeTime.teesheet_side_name.toLowerCase() as TeeTime["startSide"],
          time: { hours, minutes },
          holes: hole as TeeTime["holes"],
        });
      });
    });

    return result;
  };

export const makeForeupsoftwareHandler = ({
  bookingClass,
  bookingId,
  id,
  image,
  name,
  rank,
  scheduleId,
  coordinates,
  location,
  nineHoleOnly,
  hasRange,
}: {
  bookingClass: number;
  bookingId: number;
  id: string;
  image: string;
  name: string;
  rank: Course["rank"];
  scheduleId: number;
  coordinates?: { lat: number; lng: number };
  location?: string;
  nineHoleOnly?: boolean;
  hasRange?: boolean;
}) => ({
  type: "live" as const,
  bookLink: `https://foreupsoftware.com/index.php/booking/${bookingId}/${scheduleId}#teetimes`,
  fetchTeeTimes: makeFetchTeeTimes(bookingClass, scheduleId),
  formatParams,
  formatResponse: makeFormatResponse(id, name, nineHoleOnly),
  id,
  image,
  name,
  rank,
  coordinates,
  location,
  nineHoleOnly,
  hasRange,
});
