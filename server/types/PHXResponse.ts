export type PHXTeeTimeResponse = Array<{
  dayInfo: {
    dawn: string;
    sunrise: string;
    sunset: string;
    dusk: string;
  };
  teetimes: Array<PHXTeeTime>;
}>;

export type PHXTeeTime = {
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
