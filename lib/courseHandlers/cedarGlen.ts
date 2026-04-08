import { makeForeupsoftwareHandler } from "../foreupsoftwareApi";

const ID = "cedarGlen";
const NAME = "Cedar Glen Golf Course";
const IMAGE =
  "https://golf-pass.brightspotcdn.com/dims4/default/3fb4082/2147483647/strip/true/crop/800x516+0+42/resize/930x600!/format/webp/quality/90/?url=https%3A%2F%2Fgolf-pass-brightspot.s3.amazonaws.com%2Fab%2F2c%2F6fcfefd8e8fe6199072613dc5f5f%2F42732.jpg";
const RANK = 5;

const BOOKING_CLASS = 51848;
const BOOKING_ID = 22957;
const SCHEDULE_ID = 12411;

export default makeForeupsoftwareHandler({
  bookingClass: BOOKING_CLASS,
  bookingId: BOOKING_ID,
  image: IMAGE,
  id: ID,
  name: NAME,
  rank: RANK,
  scheduleId: SCHEDULE_ID,
  coordinates: { lat: 42.4956, lng: -71.0253 }, // Saugus, MA
  location: "Saugus, MA",
  nineHoleOnly: true,
});
