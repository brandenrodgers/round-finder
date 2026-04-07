import { makeManualHandler } from "../manualApi";

export default makeManualHandler({
  id: "fourOaks",
  name: "Four Oaks Country Club",
  bookLink:
    "https://fouroaks.cps.golf/onlineresweb/m/search-teetime/default?TeeOffTimeMin=0&TeeOffTimeMax=23",
  image: "https://www.fouroakscountryclub.com/Images/Library/website_photo_1.PNG",
  rank: 7,
  coordinates: { lat: 42.6807, lng: -71.2800 }, // Dracut, MA
  location: "Dracut, MA",
});
