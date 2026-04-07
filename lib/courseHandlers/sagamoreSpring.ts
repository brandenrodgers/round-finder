import { makeForeupsoftwareHandler } from "../foreupsoftwareApi";

const ID = "sagamoreSpring";
const NAME = "Sagamore Spring Golf Club";
const IMAGE =
  "https://www.sagamoregolf.com/images/Sagamore-SPRING/images/photo-gallery-sagamore-SPRING/SAGAMORE%20SPRING-22.jpg";
const RANK = 6;

const BOOKING_CLASS = 48598;
const BOOKING_ID = 21089;
const SCHEDULE_ID = 6834;

export default makeForeupsoftwareHandler({
  bookingClass: BOOKING_CLASS,
  bookingId: BOOKING_ID,
  image: IMAGE,
  id: ID,
  name: NAME,
  rank: RANK,
  scheduleId: SCHEDULE_ID,
  coordinates: { lat: 42.5330, lng: -71.0443 }, // Lynnfield, MA
  location: "Lynnfield, MA",
});
