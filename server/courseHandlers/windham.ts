import axios from "axios";
import { getDateParts, padDatePart, getTimeFromDate } from "../utils/time";
import { WindhamTeeTimeResponse } from "../types/Windham";
import { TeeTime } from "../types/TeeTime";
import { GenericFetchParams } from "../types/Params";

const ID = "windham";
const NAME = "Windham Country Club";

const WINDHAM_API_PATH =
  "https://phx-api-be-east-1b.kenna.io/v2/tee-times?facilityIds=15931";

type FetchParams = {
  date: string;
};

const fetchTeeTimes = async (params: {
  date: string;
}): Promise<WindhamTeeTimeResponse> => {
  const { data } = await axios.get(WINDHAM_API_PATH, {
    headers: { "X-Be-Alias": "windham-country" },
    params,
  });
  return data;
};

const formatParams = (params: GenericFetchParams): FetchParams => {
  const { year, month, day } = getDateParts(params.date);
  return {
    date: `${year}-${padDatePart(month)}-${padDatePart(day)}`,
  };
};

const formatResponse = (resp: WindhamTeeTimeResponse): Array<TeeTime> => {
  if (resp && resp[0] && resp[0].teetimes) {
    return resp[0].teetimes.map((teeTime): TeeTime => {
      return {
        courseId: ID,
        courseName: NAME,
        availablePlayers: 4 - teeTime.bookedPlayers,
        time: getTimeFromDate(teeTime.teetime),
      };
    });
  }
  return [];
};

export default {
  bookLink: "https://windham-country.book.teeitup.com/?course=15931",
  fetchTeeTimes,
  formatParams,
  formatResponse,
  id: ID,
  name: NAME,
};
