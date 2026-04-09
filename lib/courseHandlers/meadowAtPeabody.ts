import { makeManualHandler } from "../manualApi";

export default makeManualHandler({
  id: "meadowAtPeabody",
  name: "The Meadow At Peabody",
  bookLink:
    "https://peabody.cps.golf/onlineresweb/search-teetime",
  image:
    "https://golf-pass.brightspotcdn.com/eb/b6/aa1386560c853140924ed898671f/26110.jpg",
  rank: 5,
  coordinates: { lat: 42.5138, lng: -70.9385 }, // Peabody, MA
  location: "Peabody, MA",
});
