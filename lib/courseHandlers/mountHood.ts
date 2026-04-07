import { makeForeupsoftwareHandler } from "../foreupsoftwareApi";

const ID = "mountHood";
const NAME = "Mount Hood Golf Course";
const IMAGE =
  "http://www.mthoodgolfclub.com/images/speasyimagegallery/albums/1/images/mthood-course-51.jpg";
const RANK = 4;

const BOOKING_CLASS = 13480;
const BOOKING_ID = 22108;
const SCHEDULE_ID = 9885;

export default makeForeupsoftwareHandler({
  bookingClass: BOOKING_CLASS,
  bookingId: BOOKING_ID,
  image: IMAGE,
  id: ID,
  name: NAME,
  rank: RANK,
  scheduleId: SCHEDULE_ID,
  coordinates: { lat: 42.4644, lng: -71.0590 }, // Melrose, MA
  location: "Melrose, MA",
});
