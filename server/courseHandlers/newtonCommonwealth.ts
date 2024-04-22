import { makeForeupsoftwareHandler } from "../utils/foreupsoftwareApi";

const ID = "newtonCommonwealth";
const NAME = "Newton Commonwealth Golf Course";
const IMAGE =
  "https://fastly.4sqi.net/img/general/600x600/5277553_IVMMGQBMRE-Vz-ftBlVNLM0pwzOjISGIG7TcsB5XawA.jpg";
const RANK = 4;

const BOOKING_CLASS = 7756;
const BOOKING_ID = 21009;
const SCHEDULE_ID = 6440;
const LOCATION = { lat: 42.344594, lon: -71.17075 };

export default makeForeupsoftwareHandler({
  bookingClass: BOOKING_CLASS,
  bookingId: BOOKING_ID,
  image: IMAGE,
  id: ID,
  name: NAME,
  rank: RANK,
  scheduleId: SCHEDULE_ID,
  location: LOCATION,
});
