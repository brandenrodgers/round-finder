import axios from "axios";
import {
  getDateParts,
  padDatePart,
  getHoursFromDate,
  getMinutesFromDate,
} from "../utils/time";
import { ForeupsoftwareTeeTimeResponse } from "../types/ForeupsoftwareResponse";
import { TeeTime } from "../types/TeeTime";
import { GenericFetchParams } from "../types/Params";

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
  (courseId: string, courseName: string) =>
  (resp: ForeupsoftwareTeeTimeResponse): Array<TeeTime> => {
    return resp.map((teeTime): TeeTime => {
      return {
        courseId,
        courseName,
        availablePlayers: teeTime.available_spots,
        startSide:
          teeTime.teesheet_side_name.toLowerCase() as TeeTime["startSide"],
        time: {
          hours: getHoursFromDate(teeTime.time),
          minutes: getMinutesFromDate(teeTime.time),
        },
        holes: teeTime.holes as TeeTime["holes"],
      };
    });
  };

export const makeForeupsoftwareHandler = ({
  bookingClass,
  bookingId,
  id,
  image,
  name,
  scheduleId,
}: {
  bookingClass: number;
  bookingId: number;
  id: string;
  image: string;
  name: string;
  scheduleId: number;
}) => ({
  id,
  name,
  image,
  bookLink: `https://foreupsoftware.com/index.php/booking/${bookingId}/${scheduleId}#teetimes`,
  fetchTeeTimes: makeFetchTeeTimes(bookingClass, scheduleId),
  formatParams,
  formatResponse: makeFormatResponse(id, name),
});
