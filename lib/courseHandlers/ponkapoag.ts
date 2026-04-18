import { makePHXHandler } from "../phxApi";

const ID = "ponkapoag";
const NAME = "Ponkapoag Golf Course";
const IMAGE = "https://golf-pass-brightspot.s3.amazonaws.com/03/e4/d85325070854df5645165c67fcc8/120176.jpg";
const RANK = 2;

const FACILITY_ID = 17927;
const FACILITY_ALIAS = "ponkapoag-golf-course";

export default makePHXHandler({
  facilityAlias: FACILITY_ALIAS,
  facilityId: FACILITY_ID,
  id: ID,
  image: IMAGE,
  name: NAME,
  rank: RANK,
  coordinates: { lat: 42.1914, lng: -71.1177 }, // Canton, MA
  location: "Canton, MA",
  hasRange: true,
});
