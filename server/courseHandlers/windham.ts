import { makePHXHandler } from "../utils/phxApi";

const ID = "windham";
const NAME = "Windham Country Club";
const IMAGE =
  "https://images.newhampshiregolf.com/courselarge/windhamcc-large.jpg";
const RANK = 5;

const FACILITY_ID = 15931;
const FACILITY_ALIAS = "windham-country";
const LOCATION = { lat: 42.819347, lon: -71.313069 };

export default makePHXHandler({
  facilityAlias: FACILITY_ALIAS,
  facilityId: FACILITY_ID,
  id: ID,
  image: IMAGE,
  name: NAME,
  rank: RANK,
  location: LOCATION,
});
