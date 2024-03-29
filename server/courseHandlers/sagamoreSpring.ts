import axios from "axios";
import { getDateParts, padDatePart, getTimeFromDate } from "../utils/time";
import { SagamoreSpringTeeTimeResponse } from "../types/SagamoreSpring";
import { TeeTime } from "../types/TeeTime";
import { GenericFetchParams } from "../types/Params";

const ID = "sagamoreSpring";
const NAME = "Sagamore Spring Golf Club";

const SAGAMORE_SPRING_API_PATH =
  "https://foreupsoftware.com/index.php/api/booking/times?booking_class=48598&schedule_id=6834&schedule_ids%5B%5D=6834&specials_only=0&api_key=no_limits";

type FetchParams = {
  date: string;
  holes?: "all" | number;
  players?: 1 | 2 | 3 | 4;
  time?: "all" | "morning" | "midday" | "evening";
};

const fetchTeeTimes = async ({
  date,
  holes = "all",
  players,
  time = "all",
}: FetchParams): Promise<SagamoreSpringTeeTimeResponse> => {
  const { data } = await axios.get(SAGAMORE_SPRING_API_PATH, {
    params: { date, holes, players, time },
  });
  return data;
};

const formatParams = (params: GenericFetchParams): FetchParams => {
  const { year, month, day } = getDateParts(params.date);
  return {
    date: `${padDatePart(month)}-${padDatePart(day)}-${year}`,
  };
};

const formatResponse = (
  resp: SagamoreSpringTeeTimeResponse
): Array<TeeTime> => {
  return resp.map((teeTime): TeeTime => {
    return {
      courseId: ID,
      courseName: NAME,
      availablePlayers: teeTime.available_spots,
      time: getTimeFromDate(teeTime.time),
    };
  });
};

export default {
  bookLink: "https://foreupsoftware.com/index.php/booking/21089/6834#/teetimes",
  fetchTeeTimes,
  formatParams,
  formatResponse,
  id: ID,
  name: NAME,
};
