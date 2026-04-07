import { makePHXHandler } from "../phxApi";

const ID = "presidents";
const NAME = "Presidents Golf Course";
const IMAGE =
  "https://www.presidentsgc.com/wp-content/uploads/sites/7480/2019/05/page-slider-pic02.jpg";
const RANK = 6;

const FACILITY_ID = 17943;
const FACILITY_ALIAS = "presidents-golf-course";

export default makePHXHandler({
  facilityAlias: FACILITY_ALIAS,
  facilityId: FACILITY_ID,
  id: ID,
  image: IMAGE,
  name: NAME,
  rank: RANK,
  coordinates: { lat: 42.2409, lng: -71.0290 }, // Quincy, MA
  location: "Quincy, MA",
});
