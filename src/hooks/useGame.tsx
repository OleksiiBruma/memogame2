import { useState, useEffect, useRef } from 'react';
import generateInitialCells from '../utils/generateInitialCells';
import getRandomActiveCellCoords from '../utils/getRandomActiveCellCoords';
import getRandomDirection from '../utils/getRandomDirection';
import moveCoords from '../utils/moveCoords';
import areCoordsInGame from '../utils/areCoordsInGame';
import areCoordsOutOfBoard from '../utils/areCoordsOutOfBoard';
import { Cell, Status, Direction } from '../types';

const useGame = (size: number) => {
  const prevStepOutOfBoard = useRef<boolean>(false);
  const innerCells = useRef<Cell[][]>([]);
  const [cells, setCells] = useState<Cell[][]>([]);
  const activeCoords = useRef<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [status, setStatus] = useState(Status.INTRO);
  const [directionState, setDirectionState] = useState<Direction | null>(null);
  const [step, setStep] = useState(0);

  const setActiveCoords = ({ x, y }: { x: number; y: number }) => {
    innerCells.current[activeCoords.current.x][
      activeCoords.current.y
    ].isActive = false;
    innerCells.current[x][y].isActive = true;
    activeCoords.current = { x, y };
  };

  const resetBoard = () => {
    setDirectionState(null);
    setStep(0);
    prevStepOutOfBoard.current = false;
    innerCells.current = generateInitialCells(size);
    const initialActiveCellCoords = getRandomActiveCellCoords(size);
    setActiveCoords(initialActiveCellCoords);

    setCells([...innerCells.current]);
  };

  useEffect(() => {
    resetBoard();
  }, [size]);

  const handleNextClick = () => {
    if (status === Status.WIN || status === Status.FAIL) {
      resetBoard();
      setStatus(Status.INTRO);
      return;
    }
    if (status === Status.INTRO) {
      setStatus(Status.GAME);
    }
    if (prevStepOutOfBoard.current) {
      setStatus(Status.FAIL);
      return;
    }

    const direction = getRandomDirection();
    const movedCoords = moveCoords({ direction, ...activeCoords.current });

    if (!areCoordsInGame({ size, ...movedCoords })) {
      console.log(`selecting new direction. Prev direction ${direction}`);
      handleNextClick();
      return;
    }
    setDirectionState(direction);

    if (areCoordsOutOfBoard({ size, ...movedCoords })) {
      prevStepOutOfBoard.current = true;
    }

    setActiveCoords(movedCoords);
    setCells([...innerCells.current]);
    setStep((prev) => prev + 1);
  };

  const handleOutOfBoardClick = () => {
    if (prevStepOutOfBoard.current) {
      setStatus(Status.WIN);
      return;
    }
    setStatus(Status.FAIL);
  };

  return {
    cells,
    handleNextClick,
    status,
    handleOutOfBoardClick,
    directionState,
    step,
  };
};

export default useGame;
