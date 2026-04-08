import { Course, ManualHandler } from "./types";

export const makeManualHandler = ({
  id,
  name,
  bookLink,
  image,
  rank,
  coordinates,
  location,
  nineHoleOnly,
}: {
  id: string;
  name: string;
  bookLink: string;
  image: string;
  rank: Course["rank"];
  coordinates?: { lat: number; lng: number };
  location?: string;
  nineHoleOnly?: boolean;
}): ManualHandler => ({
  type: "manual",
  id,
  name,
  bookLink,
  image,
  rank,
  coordinates,
  location,
  nineHoleOnly,
});
