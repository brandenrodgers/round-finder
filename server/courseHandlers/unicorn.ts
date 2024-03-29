import axios from "axios";
import { getDateParts, padDatePart, getTimeFromDate } from "../utils/time";
import { UnicornTeeTimeResponse } from "../types/Unicorn";
import { TeeTime } from "../types/TeeTime";
import { GenericFetchParams } from "../types/Params";

const ID = "unicorn";
const NAME = "Unicorn Golf Course";

const UNICORN_API_PATH =
  "https://phx-api-be-east-1b.kenna.io/v2/tee-times?facilityIds=13988";

type FetchParams = {
  date: string;
};

const fetchTeeTimes = async (params: {
  date: string;
}): Promise<UnicornTeeTimeResponse> => {
  const { data } = await axios.get(UNICORN_API_PATH, {
    headers: { "X-Be-Alias": "unicorn-golf-course" },
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

const formatResponse = (resp: UnicornTeeTimeResponse): Array<TeeTime> => {
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
  bookLink: "https://unicorn-golf-course.book.teeitup.golf/?course=13988",
  fetchTeeTimes,
  formatParams,
  formatResponse,
  id: ID,
  name: NAME,
};
