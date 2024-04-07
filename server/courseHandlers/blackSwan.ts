import { makeForeupsoftwareHandler } from "../utils/foreupsoftwareApi";

const ID = "blackSwan";
const NAME = "Black Swan Country Club";
const IMAGE =
  "https://static.wixstatic.com/media/059e1c_549c03e3624d483887633b84f3f9482c~mv2.jpg/v1/fill/w_960,h_719,al_c/059e1c_549c03e3624d483887633b84f3f9482c~mv2.jpg";
const RANK = 9;

const BOOKING_CLASS = 2543;
const BOOKING_ID = 19287;
const SCHEDULE_ID = 1384;

export default makeForeupsoftwareHandler({
  bookingClass: BOOKING_CLASS,
  bookingId: BOOKING_ID,
  image: IMAGE,
  id: ID,
  name: NAME,
  rank: RANK,
  scheduleId: SCHEDULE_ID,
});
