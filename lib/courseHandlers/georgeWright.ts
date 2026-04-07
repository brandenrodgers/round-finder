import { makeManualHandler } from "../manualApi";

export default makeManualHandler({
  id: "georgeWright",
  name: "George Wright Golf Course",
  bookLink:
    "https://georgewright.cps.golf/onlineresweb/search-teetime?TeeOffTimeMin=0&TeeOffTimeMax=23",
  image: "https://cityofbostongolf.com/wp-content/uploads/2026/03/gw1.jpg",
  rank: 9,
  coordinates: { lat: 42.2576, lng: -71.1378 }, // Hyde Park, Boston, MA
  location: "Hyde Park, Boston, MA",
});
