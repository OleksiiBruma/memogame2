import './App.css';
import classNames from 'classnames';
import useGame from './hooks/useGame';
import { Direction, Status } from './types';

const size = 5;

function App() {
  const {
    cells,
    handleNextClick,
    handleOutOfBoardClick,
    status,
    directionState,
    step,
  } = useGame(size);

  return (
    <div className="wrapper">
      <div className="step">{`Step: ${step}`}</div>
      <div
        key={step}
        className={classNames(`grid grid-animation`, {
          'grid-animation--up': directionState === Direction.UP,
          'grid-animation--right': directionState === Direction.RIGHT,
          'grid-animation--down': directionState === Direction.DOWN,
          'grid-animation--left': directionState === Direction.LEFT,
        })}
        style={{ '--size': size } as React.CSSProperties}
      >
        {cells.flat().map(({ isActive, isInner = true }) => (
          <div
            className={classNames('cell', {
              'cell--active': status !== Status.GAME && isActive,
              'cell--out': !isInner,
              'cell--out-active':
                status !== Status.GAME && !isInner && isActive,
            })}
          />
        ))}
      </div>
      <div className="controls">
        {status === Status.GAME && (
          <button className="control" onClick={handleOutOfBoardClick}>
            Out of board
          </button>
        )}
        <button className="control" onClick={handleNextClick}>
          {status === Status.INTRO && 'Start'}
          {status === Status.GAME && 'Next'}
          {status === Status.WIN && 'You Won - Restart :)'}
          {status === Status.FAIL && 'You Failed - Restart :('}
        </button>
      </div>
    </div>
  );
}

export default App;
