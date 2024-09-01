import getRandomInt from './getRandomInt';

const getRandomActiveCellCoords = (size: number) => {
  const y = getRandomInt(1, size - 2);
  const x = getRandomInt(1, size - 2);

  return { y, x };
};

export default getRandomActiveCellCoords;
