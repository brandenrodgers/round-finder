import { makeForeupsoftwareHandler } from "../utils/foreupsoftwareApi";

const ID = "mountHood";
const NAME = "Mount Hood Golf Course";
const IMAGE =
  "http://www.mthoodgolfclub.com/images/speasyimagegallery/albums/1/images/mthood-course-51.jpg";
const RANK = 3;

const BOOKING_CLASS = 13480;
const BOOKING_ID = 22108;
const SCHEDULE_ID = 9885;
const LOCATION = { lat: 42.45164, lon: -71.037154 };

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
