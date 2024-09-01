import { Direction } from '../types';
import getRandomInt from './getRandomInt';

const directions = [
  Direction.UP,
  Direction.DOWN,
  Direction.LEFT,
  Direction.RIGHT,
];
const getRandomDirection = () => getRandomInt(0, directions.length - 1);

export default getRandomDirection;
