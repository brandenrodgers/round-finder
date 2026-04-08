import { makeForeupsoftwareHandler } from "../foreupsoftwareApi";

const ID = "hickoryHill";
const NAME = "Hickory Hill Golf Course";
const IMAGE =
  "https://golf-pass.brightspotcdn.com/dims4/default/23a3459/2147483647/strip/true/crop/1400x1050+0+0/resize/1920x1440!/quality/90/?url=https%3A%2F%2Fphotos-us.bazaarvoice.com%2Fphoto%2F2%2FcGhvdG86Z29sZm5vdw%2F14163e4d-f580-5a40-b25d-439808c53f8b";
const RANK = 6;

const BOOKING_CLASS = 0;
const BOOKING_ID = 19557;
const SCHEDULE_ID = 1829;

export default makeForeupsoftwareHandler({
  bookingClass: BOOKING_CLASS,
  bookingId: BOOKING_ID,
  image: IMAGE,
  id: ID,
  name: NAME,
  rank: RANK,
  scheduleId: SCHEDULE_ID,
  coordinates: { lat: 42.7285, lng: -71.1861 }, // Methuen, MA
  location: "Methuen, MA",
});
