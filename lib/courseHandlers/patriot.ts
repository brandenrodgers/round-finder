import { makeManualHandler } from "../manualApi";

export default makeManualHandler({
  id: "patriot",
  name: "Patriot Golf Course",
  bookLink: "https://hanscomafb.cps.golf/onlineresweb/search-teetime",
  image: "https://hanscomfss.com/wp-content/uploads/2024/05/2024-Patriot-Golf-Course.jpeg",
  rank: 5,
  coordinates: { lat: 42.5055, lng: -71.2707 }, // Bedford, MA
  location: "Bedford, MA",
  hasRange: true,
});
