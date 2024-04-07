import { makePHXHandler } from "../utils/phxApi";

const ID = "braintreeMunicipal";
const NAME = "Braintree Municipal Golf Course";
const IMAGE = "https://www.braintreegolf.com/images/Banner4.jpg";
const RANK = 6;

const FACILITY_ID = 16026;
const FACILITY_ALIAS = "braintree-municipal-golf-course";

export default makePHXHandler({
  facilityAlias: FACILITY_ALIAS,
  facilityId: FACILITY_ID,
  id: ID,
  image: IMAGE,
  name: NAME,
  rank: RANK,
});
