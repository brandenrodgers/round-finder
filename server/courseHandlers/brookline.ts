import { makeForeupsoftwareHandler } from "../utils/foreupsoftwareApi";

const ID = "brookline";
const NAME = "Brookline Golf Course";
const IMAGE = "https://golf.com/wp-content/uploads/2022/06/tcc-18.jpg";
const BOOKING_CLASS = 7275;
const BOOKING_ID = 19865;
const SCHEDULE_ID = 2748;

export default makeForeupsoftwareHandler({
  bookingClass: BOOKING_CLASS,
  bookingId: BOOKING_ID,
  image: IMAGE,
  id: ID,
  name: NAME,
  scheduleId: SCHEDULE_ID,
});
