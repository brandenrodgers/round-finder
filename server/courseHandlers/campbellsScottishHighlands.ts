import { makePHXHandler } from "../utils/phxApi";

const ID = "campbellsScottishHighlands";
const NAME = "Campbell's Scottish Highlands";
const IMAGE =
  "https://golf-pass.brightspotcdn.com/dims4/default/d516e9f/2147483647/strip/true/crop/820x529+0+9/resize/930x600!/format/webp/quality/90/?url=https%3A%2F%2Fgolf-pass-brightspot.s3.amazonaws.com%2F49%2F4c%2F96d43b218675b70624e62fef65f9%2F42701.jpg";
const FACILITY_ID = 15773;
const FACILITY_ALIAS = "6391c422-2e57-4bc3-a1b3-8a6676c82588";

export default makePHXHandler({
  facilityAlias: FACILITY_ALIAS,
  facilityId: FACILITY_ID,
  id: ID,
  image: IMAGE,
  name: NAME,
});
