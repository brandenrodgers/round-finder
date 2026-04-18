import { makePHXHandler } from "../phxApi";

const ID = "rockland";
const NAME = "Rockland Golf Course";
const IMAGE =
  "https://www.rocklandgc.com/wp-content/uploads/sites/7246/2018/12/home_pic02.jpg";
const RANK = 6;

const FACILITY_ID = 11063;
const FACILITY_ALIAS = "rockland-golf-course";

export default makePHXHandler({
  facilityAlias: FACILITY_ALIAS,
  facilityId: FACILITY_ID,
  id: ID,
  image: IMAGE,
  name: NAME,
  rank: RANK,
  coordinates: { lat: 42.1256, lng: -70.9259 }, // Rockland, MA
  location: "Rockland, MA",
});
