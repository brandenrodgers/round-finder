import { makeManualHandler } from "../manualApi";

export default makeManualHandler({
  id: "gannon",
  name: "Gannon Municipal Golf Course",
  bookLink: "https://gannon.cps.golf/onlineresweb/search-teetime",
  image:
    "https://golf-pass.brightspotcdn.com/5a/9e/881ba67570e1c12c1a64eb58a26b/74129.jpg",
  rank: 7,
  coordinates: { lat: 42.4697, lng: -70.9640 }, // Lynn, MA
  location: "Lynn, MA",
});
