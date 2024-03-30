import axios from "axios";
import { getDateParts, padDatePart, getTimeFromDate } from "../utils/time";
import { PHXTeeTimeResponse } from "../types/PHXResponse";
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

const makeFormatResponse =
  (courseId: string, courseName: string) =>
  (resp: PHXTeeTimeResponse): Array<TeeTime> => {
    if (resp && resp[0] && resp[0].teetimes) {
      return resp[0].teetimes.map((teeTime): TeeTime => {
        return {
          courseId,
          courseName,
          availablePlayers: 4 - teeTime.bookedPlayers,
          time: getTimeFromDate(teeTime.teetime),
        };
      });
    }
    return [];
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
