import { makeForeupsoftwareHandler } from "../utils/foreupsoftwareApi";

const ID = "brookline";
const NAME = "Brookline Golf Course";
const IMAGE = "https://golf.com/wp-content/uploads/2022/06/tcc-18.jpg";
const RANK = 9;

const BOOKING_CLASS = 7275;
const BOOKING_ID = 19865;
const SCHEDULE_ID = 2748;
const LOCATION = { lat: 42.310866, lon: -71.160862 };

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
