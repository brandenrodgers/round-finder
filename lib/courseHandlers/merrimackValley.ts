import { makePHXHandler } from "../phxApi";

const ID = "merrimackValley";
const NAME = "Merrimack Valley Golf Club";
const IMAGE =
  "https://exddilid.cdn.imgeng.in/app/courses/image/preview/42924.jpg";
const RANK = 8;

const FACILITY_ID = 16619;
const FACILITY_ALIAS = "merrimack-valley-golf-club";

export default makePHXHandler({
  facilityAlias: FACILITY_ALIAS,
  facilityId: FACILITY_ID,
  id: ID,
  image: IMAGE,
  name: NAME,
  rank: RANK,
  coordinates: { lat: 42.7362, lng: -71.2090 }, // Methuen, MA
  location: "Methuen, MA",
});
