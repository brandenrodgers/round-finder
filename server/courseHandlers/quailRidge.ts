import { makePHXHandler } from "../utils/phxApi";

const ID = "quailRidge";
const NAME = "Quail Ridge Country Club";
const IMAGE =
  "https://golf-pass.brightspotcdn.com/dc/70/418aaacafeab50cbbc1e37793864/53638.jpg";
const RANK = 5;

const FACILITY_ID = 13011;
const FACILITY_ALIAS = "quailridge-country-club";
const LOCATION = { lat: 42.506119, lon: -71.424219 };

export default makePHXHandler({
  facilityAlias: FACILITY_ALIAS,
  facilityId: FACILITY_ID,
  id: ID,
  image: IMAGE,
  name: NAME,
  rank: RANK,
  location: LOCATION,
});
