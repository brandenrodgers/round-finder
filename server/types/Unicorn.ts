export type UnicornTeeTimeResponse = Array<{
  dayInfo: {
    dawn: string;
    sunrise: string;
    sunset: string;
    dusk: string;
  };
  teetimes: Array<UnicornTeeTime>;
}>;

export type UnicornTeeTime = {
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
