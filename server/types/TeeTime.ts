export type TeeTime = {
  availablePlayers: number;
  courseId: string;
  courseName: string;
  holes: 9 | 18;
  startSide: "front" | "back";
  time: { hours: number; minutes: number };
};
