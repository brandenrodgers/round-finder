import { makeManualHandler } from "../manualApi";

export default makeManualHandler({
  id: "freshPond",
  name: "Fresh Pond Golf Course",
  bookLink:
    "https://secure.cambridgema.gov/webtrac/web/search.html?module=GR",
  image:
    "https://golf-pass-brightspot.s3.amazonaws.com/d3/71/eccdac055889b791e09ec34d0a02/97156.jpg",
  rank: 6,
  coordinates: { lat: 42.3807, lng: -71.1533 }, // Cambridge, MA
  location: "Cambridge, MA",
  nineHoleOnly: true,
});
