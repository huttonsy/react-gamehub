import Square from "./Square";

export default function Board({ squares, onPlay }) {
  function renderSquare(index) {
    return (
      <Square
        value={squares[index]}
        onSquareClick={() => onPlay(index)}
      />
    );
  }

  return (
    <div className="board">
      <div className="board-row">
        {renderSquare(0)} {renderSquare(1)} {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)} {renderSquare(4)} {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)} {renderSquare(7)} {renderSquare(8)}
      </div>
    </div>
  );
}
