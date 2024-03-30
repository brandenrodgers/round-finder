import { makePHXHandler } from "../utils/phxApi";

const ID = "merrimackValley";
const NAME = "Merrimack Valley Golf Club";
const IMAGE =
  "https://exddilid.cdn.imgeng.in/app/courses/image/preview/42924.jpg";
const FACILITY_ID = 16619;
const FACILITY_ALIAS = "merrimack-valley-golf-club";

export default makePHXHandler({
  facilityAlias: FACILITY_ALIAS,
  facilityId: FACILITY_ID,
  id: ID,
  image: IMAGE,
  name: NAME,
});
