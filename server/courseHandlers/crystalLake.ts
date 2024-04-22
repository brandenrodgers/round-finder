import { makePHXHandler } from "../utils/phxApi";

const ID = "crystalLake";
const NAME = "Crystal Lake Golf Club";
const IMAGE =
  "https://www.crystallake-golf.com/wp-content/uploads/sites/7086/2018/08/Home-page-pic-1.jpg";
const RANK = 6;

const FACILITY_ID = 13676;
const FACILITY_ALIAS = "crystal-lake-golf";
const LOCATION = { lat: 42.806071, lon: -71.139755 };

export default makePHXHandler({
  facilityAlias: FACILITY_ALIAS,
  facilityId: FACILITY_ID,
  id: ID,
  image: IMAGE,
  name: NAME,
  rank: RANK,
  location: LOCATION,
});
