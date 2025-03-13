import { useState } from 'react';
import './App.css';

export default function Board() {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [xIsNext, setXIsNext] = useState(true);
  const [currentMove, setCurrentMove] = useState(0);

  const currentSquares = history[currentMove].squares;
  const winner = calculateWinner(currentSquares);
  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${xIsNext ? 'X' : 'O'}`;

  function handleClick(index) {
    if (currentSquares[index] || calculateWinner(currentSquares)) return;

    const nextSquares = currentSquares.slice();
    nextSquares[index] = xIsNext ? 'X' : 'O';
    
    const newHistory = history.slice(0, currentMove + 1); // Remove any forward moves if we go back
    setHistory([...newHistory, { squares: nextSquares }]);
    setXIsNext(!xIsNext);
    setCurrentMove(newHistory.length); // Move to the latest step in history
  }

  function jumpTo(move) {
    setCurrentMove(move);
    setXIsNext(move % 2 === 0); // Alternate player turn when jumping
  }

  return (
    <div className="board">
      <h2>{status}</h2>
      <div className="board-row">
        <Square value={currentSquares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={currentSquares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={currentSquares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={currentSquares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={currentSquares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={currentSquares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={currentSquares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={currentSquares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={currentSquares[8]} onSquareClick={() => handleClick(8)} />
      </div>

      <div>
        <h3>Game History</h3>
        <ul>
          {history.map((step, move) => {
            const description = move ? `Go to move #${move}` : 'Go to game start';
            return (
              <li key={move}>
                <button onClick={() => jumpTo(move)}>{description}</button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );

  function calculateWinner(squares) {
    const winningLines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6], // Diagonals
    ];

    for (let [a, b, c] of winningLines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]; // Winner
      }
    }
    return null;
  }
}

export function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}
