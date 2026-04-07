import { makeForeupsoftwareHandler } from "../foreupsoftwareApi";

const ID = "brookline";
const NAME = "Brookline Golf Course";
const IMAGE = "https://golf.com/wp-content/uploads/2022/06/tcc-18.jpg";
const RANK = 4;

const BOOKING_CLASS = 7275;
const BOOKING_ID = 19865;
const SCHEDULE_ID = 2748;

export default makeForeupsoftwareHandler({
  bookingClass: BOOKING_CLASS,
  bookingId: BOOKING_ID,
  image: IMAGE,
  id: ID,
  name: NAME,
  rank: RANK,
  scheduleId: SCHEDULE_ID,
  coordinates: { lat: 42.3146, lng: -71.1614 }, // Chestnut Hill, MA
  location: "Chestnut Hill, MA",
});
