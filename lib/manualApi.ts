import { Course, ManualHandler } from "./types";

export const makeManualHandler = ({
  id,
  name,
  bookLink,
  image,
  rank,
  coordinates,
  location,
}: {
  id: string;
  name: string;
  bookLink: string;
  image: string;
  rank: Course["rank"];
  coordinates?: { lat: number; lng: number };
  location?: string;
}): ManualHandler => ({
  type: "manual",
  id,
  name,
  bookLink,
  image,
  rank,
  coordinates,
  location,
});
