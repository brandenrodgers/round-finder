import { makeForeupsoftwareHandler } from "../foreupsoftwareApi";

const ID = "farCorner";
const NAME = "Far Corner Golf";
const IMAGE =
  "https://golf-pass.brightspotcdn.com/dims4/default/4d01af8/2147483647/strip/true/crop/1229x793+0+63/resize/930x600!/format/webp/quality/90/?url=https%3A%2F%2Fgolf-pass-brightspot.s3.amazonaws.com%2F2c%2F48%2F08138952ffc311ab40106e1885bf%2F57754.jpg";
const RANK = 7;

const BOOKING_CLASS = 49942;
const BOOKING_ID = 22586;
const SCHEDULE_ID = 11259;

export default makeForeupsoftwareHandler({
  bookingClass: BOOKING_CLASS,
  bookingId: BOOKING_ID,
  image: IMAGE,
  id: ID,
  name: NAME,
  rank: RANK,
  scheduleId: SCHEDULE_ID,
  coordinates: { lat: 42.6544, lng: -71.2097 }, // Boxford, MA
  location: "Boxford, MA",
});
