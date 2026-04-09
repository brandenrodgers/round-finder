import { makeTenforeHandler } from "../tenforeApi";

const ID = "sagamoreSpring";
const NAME = "Sagamore Spring Golf Club";
const IMAGE =
  "https://www.sagamoregolf.com/images/Sagamore-SPRING/images/photo-gallery-sagamore-SPRING/SAGAMORE%20SPRING-22.jpg";
const RANK = 6;

export default makeTenforeHandler({
  golfCourseId: 16524,
  appId: 23,
  courseSlug: "sagamorespring",
  id: ID,
  image: IMAGE,
  name: NAME,
  rank: RANK,
  coordinates: { lat: 42.533, lng: -71.0443 }, // Lynnfield, MA
  location: "Lynnfield, MA",
});
