export type TeeTime = {
  courseId: string;
  courseName: string;
  availablePlayers: number;
  time: { hours: number; minutes: number };
  startSide: "front" | "back";
  holes: 9 | 18;
};
