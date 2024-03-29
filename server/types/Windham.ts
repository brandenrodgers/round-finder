export type WindhamTeeTimeResponse = Array<{
  dayInfo: {
    dawn: string;
    sunrise: string;
    sunset: string;
    dusk: string;
  };
  teetimes: Array<WindhamTeeTime>;
}>;

export type WindhamTeeTime = {
  courseId: string;
  teetime: string;
  backNine: boolean;
  players: Array<number>;
  rates: Array<any>;
  bookedPlayers: number;
  minPlayers: number;
  maxPlayers: number;
  source: string;
  fromCache: boolean;
};
