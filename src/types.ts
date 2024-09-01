export enum Direction {
  UP,
  RIGHT,
  DOWN,
  LEFT,
}

export type Cell = {
  isActive: boolean;
  isInner: boolean;
};

export enum Status {
  INTRO,
  GAME,
  WIN,
  FAIL,
}
