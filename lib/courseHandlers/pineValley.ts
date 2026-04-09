import { makeForeupsoftwareHandler } from "../foreupsoftwareApi";

const ID = "pineValley";
const NAME = "Pine Valley Golf Course";
const IMAGE = "https://golf-pass.brightspotcdn.com/2e/b9/db3df1c48f79182fea5b92c87f94/42990.jpg";
const RANK = 4;

const BOOKING_CLASS = 14033;
const BOOKING_ID = 22278;
const SCHEDULE_ID = 10318;

export default makeForeupsoftwareHandler({
  bookingClass: BOOKING_CLASS,
  bookingId: BOOKING_ID,
  image: IMAGE,
  id: ID,
  name: NAME,
  rank: RANK,
  scheduleId: SCHEDULE_ID,
  coordinates: { lat: 42.7350, lng: -71.3371 }, // Pelham, NH
  location: "Pelham, NH",
  nineHoleOnly: true,
});
