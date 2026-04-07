import { makePHXHandler } from "../phxApi";

const ID = "braintreeMunicipal";
const NAME = "Braintree Municipal Golf Course";
const IMAGE = "https://www.braintreegolf.com/wp-content/uploads/sites/9589/2025/04/Hole-1a_e4ffd7.jpg";
const RANK = 7;

const FACILITY_ID = 16026;
const FACILITY_ALIAS = "braintree-municipal-golf-course";

export default makePHXHandler({
  facilityAlias: FACILITY_ALIAS,
  facilityId: FACILITY_ID,
  id: ID,
  image: IMAGE,
  name: NAME,
  rank: RANK,
  coordinates: { lat: 42.1958, lng: -70.9894 }, // Braintree, MA
  location: "Braintree, MA",
});
