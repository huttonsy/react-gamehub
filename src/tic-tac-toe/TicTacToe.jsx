import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Board from "./Board";
import "../App.css";

export default function TicTacToe() {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [xIsNext, setXIsNext] = useState(true);
  const [currentMove, setCurrentMove] = useState(0);
  const navigate = useNavigate(); 

  const currentSquares = history[currentMove].squares;
  const winner = calculateWinner(currentSquares);
  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${xIsNext ? "X" : "O"}`;

  function handlePlay(index) {
    if (currentSquares[index] || winner) return;

    const nextSquares = currentSquares.slice();
    nextSquares[index] = xIsNext ? "X" : "O";

    const newHistory = history.slice(0, currentMove + 1);
    setHistory([...newHistory, { squares: nextSquares }]);
    setXIsNext(!xIsNext);
    setCurrentMove(newHistory.length);
  }

  function jumpTo(move) {
    setCurrentMove(move);
    setXIsNext(move % 2 === 0);
  }

  return (
    <div className="game">
      <h2>{status}</h2>
      <Board squares={currentSquares} onPlay={handlePlay} />

      <div>
        <h3>Game History</h3>
        <ul>
          {history.map((step, move) => {
            const description = move ? `Go to move #${move}` : "Go to game start";
            return (
              <li key={move}>
                <button onClick={() => jumpTo(move)}>{description}</button>
              </li>
            );
          })}
        </ul>
      </div>

      <button onClick={() => navigate("/")}>Back to Game Hub</button>
    </div>
  );
}

function calculateWinner(squares) {
  const winningLines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];

  for (let [a, b, c] of winningLines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
