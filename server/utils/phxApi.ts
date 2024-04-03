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
import { Course } from "../types/Course";

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

const getHoles = (rates: Array<PHXTeeTimeRate>): Array<TeeTime["holes"]> => {
  const result = [] as Array<TeeTime["holes"]>;

  rates.forEach((rate: PHXTeeTimeRate) => {
    if (rate.holes === 9 && !result.includes(9)) {
      result.push(9);
    } else if (rate.holes === 18 && !result.includes(18)) {
      result.push(18);
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
        holes.forEach((hole) => {
          result.push({
            courseId,
            courseName,
            availablePlayers: 4 - teeTime.bookedPlayers,
            time: {
              hours: getHoursFromDate(teeTime.teetime),
              minutes: getMinutesFromDate(teeTime.teetime),
            },
            startSide: teeTime.backNine ? "back" : "front",
            holes: hole,
          });
        });
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
  rank,
}: {
  facilityAlias: string;
  facilityId: number;
  id: string;
  image: string;
  name: string;
  rank: Course["rank"];
}) => ({
  bookLink: `https://${facilityAlias}.book.teeitup.golf/?course=${facilityId}`,
  fetchTeeTimes: makeFetchTeeTimes(facilityId, facilityAlias),
  formatParams,
  formatResponse: makeFormatResponse(id, name),
  id,
  image,
  name,
  rank,
});
