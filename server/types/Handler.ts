import { GenericFetchParams } from "./Params";
import { TeeTime } from "./TeeTime";

export type Handler = {
  id: string;
  name: string;
  bookLink: string;
  fetchTeeTimes: (params: GenericFetchParams) => Promise<any>;
  formatParams: (params: GenericFetchParams) => GenericFetchParams;
  formatResponse: (resp: any) => Array<TeeTime>;
};
