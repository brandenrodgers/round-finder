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
  rates: Array<PHXTeeTimeRate>;
  bookedPlayers: number;
  minPlayers: number;
  maxPlayers: number;
  source: string;
  fromCache: boolean;
};

export type PHXTeeTimeRate = {
  acceptCreditCard: boolean;
  allowedPlayers: Array<number>;
  dueOnlineRiding: number;
  externalId: string;
  golfnow: {
    TTTeeTimeId: number;
    GolfFacilityId: number;
    GolfCourseId: number;
  };
  greenFeeCart: number;
  holes: 9 | 18;
  icons: [];
  name: string;
  tags: Array<String>;
  trade: boolean;
  _id: number;
};
