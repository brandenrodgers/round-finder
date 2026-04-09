import { makeChronogolfHandler } from "../chronogolfApi";

const ID = "blackSwan";
const NAME = "Black Swan Country Club";
const IMAGE =
  "https://static.wixstatic.com/media/059e1c_549c03e3624d483887633b84f3f9482c~mv2.jpg/v1/fill/w_960,h_719,al_c/059e1c_549c03e3624d483887633b84f3f9482c~mv2.jpg";
const RANK = 6;

const CLUB_ID = 7429;
const COURSE_ID = 8478;
const AFFILIATION_TYPE_ID = 30538;

export default makeChronogolfHandler({
  clubId: CLUB_ID,
  courseId: COURSE_ID,
  affiliationTypeId: AFFILIATION_TYPE_ID,
  bookLink: "https://www.blackswancountryclub.com/golf/tee-times",
  image: IMAGE,
  id: ID,
  name: NAME,
  rank: RANK,
  coordinates: { lat: 42.1979, lng: -71.0205 },
  location: "Georgetown, MA",
  hasRange: true,
});
