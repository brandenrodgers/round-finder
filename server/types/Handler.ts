import { GenericFetchParams } from "./Params";
import { Course } from "./Course";
import { TeeTime } from "./TeeTime";

export type Handler = {
  id: string;
  name: string;
  bookLink: string;
  image: string;
  rank: Course["rank"];
  fetchTeeTimes: (params: GenericFetchParams) => Promise<any>;
  formatParams: (params: GenericFetchParams) => GenericFetchParams;
  formatResponse: (resp: any) => Array<TeeTime>;
};
