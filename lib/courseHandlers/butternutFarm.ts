import { makePHXHandler } from "../phxApi";

const ID = "butternutFarm";
const NAME = "Butternut Farm Golf Club";
const IMAGE =
  "https://lh3.googleusercontent.com/gps-cs-s/AHVAwep6jr2tXUfP7Avp670jb_lZ0tsJwF4Pm4qH8LR1ljx9BKHfhZt_jnd07KioB6lHP7tO0PvSVYWGMqe0EqFkMFTKPXXVmUh2sm80DiOv_NsvS2jcqNqQDG6nA0esjJXDzf_CZlVr=s1360-w1360-h1020-rw";
const RANK = 7;

const FACILITY_ID = 17036;
const FACILITY_ALIAS = "butternut-farm-golf-club";

export default makePHXHandler({
  facilityAlias: FACILITY_ALIAS,
  facilityId: FACILITY_ID,
  id: ID,
  image: IMAGE,
  name: NAME,
  rank: RANK,
  coordinates: { lat: 42.4312, lng: -71.5031 }, // Stow, MA
  location: "Stow, MA",
});
