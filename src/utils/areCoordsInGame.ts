const areCoordsInGame = ({
  x,
  y,
  size,
}: {
  x: number;
  y: number;
  size: number;
}) => x >= 0 && x <= size - 1 && y >= 0 && y <= size - 1;
export default areCoordsInGame;
