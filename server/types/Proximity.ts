import DistanceUnit from "./DistanceUnit";
import { Location } from "./Location";

export type Proximity = {
  distance: number;
  units: DistanceUnit;
  location: Location;
};
