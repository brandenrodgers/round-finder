export type Coordinates = { lat: number; lng: number };

// Course types
export type Course = {
  type: "live" | "manual";
  bookLink: string;
  courseId: string;
  courseName: string;
  courseImage: string;
  location?: string;
  error?: string;
  rank: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  coordinates?: Coordinates;
  teeTimes?: Array<TeeTime>;
};

export type Courses = {
  [key: string]: Course;
};

// TeeTime types
export type TeeTime = {
  availablePlayers: number;
  courseId: string;
  courseName: string;
  holes: 9 | 18;
  startSide: "front" | "back";
  time: { hours: number; minutes: number };
};

// Params types
export type GenericFetchParams = {
  date: string;
  holes?: string | number;
  players?: 1 | 2 | 3 | 4;
  time?: string;
};

// Handler type
export type Handler = {
  type: "live";
  id: string;
  name: string;
  bookLink: string;
  image: string;
  location?: string;
  rank: Course["rank"];
  coordinates?: Coordinates;
  fetchTeeTimes: (params: GenericFetchParams) => Promise<any>;
  formatParams: (params: GenericFetchParams) => GenericFetchParams;
  formatResponse: (resp: any) => Array<TeeTime>;
};

export type ManualHandler = {
  type: "manual";
  id: string;
  name: string;
  bookLink: string;
  image: string;
  location?: string;
  rank: Course["rank"];
  coordinates?: Coordinates;
};

// PHX API response types
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

// Foreup Software API response types
export type ForeupsoftwareTeeTimeResponse = Array<ForeupsoftwareTeeTime>;

export type ForeupsoftwareTeeTime = {
  time: string;
  start_front: number;
  course_id: number;
  course_name: string;
  schedule_id: number;
  teesheet_id: number;
  schedule_name: string;
  require_credit_card: boolean;
  teesheet_holes: number;
  teesheet_side_id: number;
  teesheet_side_name: string;
  teesheet_side_order: number;
  reround_teesheet_side_id: number;
  reround_teesheet_side_name: string;
  available_spots: number;
  available_spots_9: number;
  available_spots_18: number;
  maximum_players_per_booking: string;
  minimum_players: string;
  allowed_group_sizes: Array<string>;
  holes: number;
  has_special: boolean;
  special_id: boolean;
  special_discount_percentage: number;
  group_id: boolean;
  booking_class_id: number;
  booking_fee_required: boolean;
  booking_fee_price: boolean;
  booking_fee_per_person: boolean;
  foreup_trade_discount_rate: number;
  trade_min_players: number;
  trade_available_players: number;
  green_fee_tax_rate: boolean;
  green_fee_tax: number;
  green_fee_tax_9: number;
  green_fee_tax_18: number;
  guest_green_fee_tax_rate: boolean;
  guest_green_fee_tax: number;
  guest_green_fee_tax_9: number;
  guest_green_fee_tax_18: number;
  cart_fee_tax_rate: boolean;
  cart_fee_tax: number;
  cart_fee_tax_9: number;
  cart_fee_tax_18: number;
  guest_cart_fee_tax_rate: boolean;
  guest_cart_fee_tax: number;
  guest_cart_fee_tax_9: number;
  guest_cart_fee_tax_18: number;
  foreup_discount: boolean;
  pay_online: string;
  green_fee: number;
  green_fee_9: number;
  green_fee_18: number;
  guest_green_fee: number;
  guest_green_fee_9: number;
  guest_green_fee_18: number;
  cart_fee: number;
  cart_fee_9: number;
  cart_fee_18: number;
  guest_cart_fee: number;
  guest_cart_fee_9: number;
  guest_cart_fee_18: number;
  rate_type: string;
  special_was_price: any;
  teesheet_logo: any;
  teesheet_color: string;
  teesheet_initials: string;
};

// Client-side types
export type Holes = 9 | 18;
export type Players = 1 | 2 | 3 | 4;

export type Filter = {
  holes?: Holes;
  players?: Players;
  times?: number[];
};

export type SortBy = "alphabetical" | "quality" | "distance" | "For Me";
