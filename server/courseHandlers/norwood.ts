import { makePHXHandler } from "../utils/phxApi";

const ID = "norwood";
const NAME = "Norwood Country Club";
const IMAGE =
  "https://www.norwoodcc.com/wp-content/uploads/sites/7429/2019/04/home-slider03.jpg";
const RANK = 4;

const FACILITY_ID = 5720;
const FACILITY_ALIAS = "norwood-country-club";
const LOCATION = { lat: 42.198705, lon: -71.181494 };

export default makePHXHandler({
  facilityAlias: FACILITY_ALIAS,
  facilityId: FACILITY_ID,
  id: ID,
  image: IMAGE,
  name: NAME,
  rank: RANK,
  location: LOCATION,
});
