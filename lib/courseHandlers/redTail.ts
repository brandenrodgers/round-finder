import { makeManualHandler } from "../manualApi";

export default makeManualHandler({
  id: "redTail",
  name: "Red Tail Golf Club",
  bookLink:
    "https://redtailgc.cps.golf/onlineresweb/search-teetime?TeeOffTimeMin=0&TeeOffTimeMax=23",
  image:
    "https://golf-pass.brightspotcdn.com/dims4/default/3e934f9/2147483647/strip/true/crop/1400x1050+0+0/resize/1920x1440!/quality/90/?url=https%3A%2F%2Fphotos-us.bazaarvoice.com%2Fphoto%2F2%2FcGhvdG86Z29sZm5vdw%2F2ed7f958-27ff-5cbe-ab68-9418ac876e07",
  rank: 9,
  coordinates: { lat: 42.5332, lng: -71.6021 }, // Devens, MA
  location: "Devens, MA",
});
