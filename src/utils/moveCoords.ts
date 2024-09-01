import { Direction } from '../types';
const moveCoords = ({
  direction,
  x,
  y,
}: {
  direction: Direction;
  x: number;
  y: number;
}) => {
  switch (direction) {
    case Direction.UP:
      x--;
      break;
    case Direction.RIGHT:
      y++;
      break;
    case Direction.DOWN:
      x++;
      break;
    case Direction.LEFT:
      y--;
      break;
  }

  return { x, y };
};

export default moveCoords;
