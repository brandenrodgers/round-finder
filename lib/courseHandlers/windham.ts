import { makePHXHandler } from "../phxApi";

const ID = "windham";
const NAME = "Windham Country Club";
const IMAGE =
  "https://images.newhampshiregolf.com/courselarge/windhamcc-large.jpg";
const RANK = 6;

const FACILITY_ID = 15931;
const FACILITY_ALIAS = "windham-country";

export default makePHXHandler({
  facilityAlias: FACILITY_ALIAS,
  facilityId: FACILITY_ID,
  id: ID,
  image: IMAGE,
  name: NAME,
  rank: RANK,
  coordinates: { lat: 42.8069, lng: -71.2978 }, // Windham, NH
  location: "Windham, NH",
  hasRange: true,
});
