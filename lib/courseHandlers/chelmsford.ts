import { makePHXHandler } from "../phxApi";

const ID = "chelmsford";
const NAME = "Chelmsford Country Club";
const IMAGE =
  "https://www.chelmsfordcountryclub.com/wp-content/uploads/sites/7282/2019/01/CCC-7-fantastic.jpg";
const RANK = 4;

const FACILITY_ID = 5723;
const FACILITY_ALIAS = "chelmsford-country-club";

export default makePHXHandler({
  facilityAlias: FACILITY_ALIAS,
  facilityId: FACILITY_ID,
  id: ID,
  image: IMAGE,
  name: NAME,
  rank: RANK,
  coordinates: { lat: 42.5752, lng: -71.3696 }, // Chelmsford, MA
  location: "Chelmsford, MA",
  nineHoleOnly: true,
  hasRange: true,
});
