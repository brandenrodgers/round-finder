export type Holes = 9 | 18;
export type Players = 1 | 2 | 3 | 4;

export type Filter = {
  holes?: Holes;
  players?: Players;
  times?: number[];
};
