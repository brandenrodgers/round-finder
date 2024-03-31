import axios from "axios";
import {
  getDateParts,
  padDatePart,
  getHoursFromDate,
  getMinutesFromDate,
} from "../utils/time";
import { PHXTeeTimeRate, PHXTeeTimeResponse } from "../types/PHXResponse";
import { TeeTime } from "../types/TeeTime";
import { GenericFetchParams } from "../types/Params";

type FetchParams = {
  date: string;
};

const makeFetchTeeTimes =
  (facilityId: number, facilityAlias: string) =>
  async (params: { date: string }): Promise<PHXTeeTimeResponse> => {
    const { data } = await axios.get(
      `https://phx-api-be-east-1b.kenna.io/v2/tee-times?facilityIds=${facilityId}`,
      {
        headers: { "X-Be-Alias": facilityAlias },
        params,
      }
    );
    return data;
  };

const formatParams = (params: GenericFetchParams): FetchParams => {
  const { year, month, day } = getDateParts(params.date);
  return {
    date: `${year}-${padDatePart(month)}-${padDatePart(day)}`,
  };
};

const getHoles = (
  rates: Array<PHXTeeTimeRate>
): { 9: boolean; 18: boolean } => {
  const result = { 9: false, 18: false };

  rates.forEach((rate: PHXTeeTimeRate) => {
    if (rate.holes === 9) {
      result[9] = true;
    } else if (rate.holes === 18) {
      result[18] = true;
    }
  });

  return result;
};

const makeFormatResponse =
  (courseId: string, courseName: string) =>
  (resp: PHXTeeTimeResponse): Array<TeeTime> => {
    const result = [] as Array<TeeTime>;
    if (resp && resp[0] && resp[0].teetimes) {
      resp[0].teetimes.forEach((teeTime) => {
        const holes = getHoles(teeTime.rates);
        if (holes[9]) {
          result.push({
            courseId,
            courseName,
            availablePlayers: 4 - teeTime.bookedPlayers,
            time: {
              hours: getHoursFromDate(teeTime.teetime),
              minutes: getMinutesFromDate(teeTime.teetime),
            },
            startSide: teeTime.backNine ? "back" : "front",
            holes: 9,
          });
        }
        if (holes[18]) {
          result.push({
            courseId,
            courseName,
            availablePlayers: 4 - teeTime.bookedPlayers,
            time: {
              hours: getHoursFromDate(teeTime.teetime),
              minutes: getMinutesFromDate(teeTime.teetime),
            },
            startSide: teeTime.backNine ? "back" : "front",
            holes: 18,
          });
        }
      });
    }
    return result;
  };

export const makePHXHandler = ({
  facilityAlias,
  facilityId,
  id,
  image,
  name,
}: {
  facilityAlias: string;
  facilityId: number;
  id: string;
  image: string;
  name: string;
}) => ({
  bookLink: `https://${facilityAlias}.book.teeitup.golf/?course=${facilityId}`,
  fetchTeeTimes: makeFetchTeeTimes(facilityId, facilityAlias),
  formatParams,
  formatResponse: makeFormatResponse(id, name),
  id,
  image,
  name,
});
