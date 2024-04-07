import { SortBy } from "../types/Sort";

export const HIDDEN_HEADER_ID = "hidden-header-toolbar";

export const SORT_VALUES = {
  alphabetical: "Alphabetical" as SortBy,
  distance: "Distance" as SortBy,
  quality: "Quality" as SortBy,
};

// Courses that we are not able to fetch tee time for
export const ADDITIONAL_COURSES = {
  gannon: {
    name: "Gannon Municipal Golf Course",
    bookLink: "https://gannon.cps.golf/onlineresweb/search-teetime",
    image:
      "https://golf-pass.brightspotcdn.com/5a/9e/881ba67570e1c12c1a64eb58a26b/74129.jpg",
  },
  presidents: {
    name: "Presidents Golf Course",
    bookLink: "https://www.presidentsgc.com/teetimes/",
    image:
      "https://golfdigest.sports.sndimg.com/content/dam/images/golfdigest/fullset/course-photos-for-places-to-play/presidents-golf-club-massachusetts.jpg.rend.hgtvcom.966.644.suffix/1654533664631.jpeg",
  },
};
