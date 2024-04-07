import { makePHXHandler } from "../utils/phxApi";

const ID = "maynard";
const NAME = "Maynard Golf Course";
const IMAGE =
  "https://www.maynardgolf.com/wp-content/uploads/sites/811/2019/02/home-box01.jpg";
const RANK = 5;

const FACILITY_ID = 15974;
const FACILITY_ALIAS = "maynard-golf-course";

export default makePHXHandler({
  facilityAlias: FACILITY_ALIAS,
  facilityId: FACILITY_ID,
  id: ID,
  image: IMAGE,
  name: NAME,
  rank: RANK,
});
