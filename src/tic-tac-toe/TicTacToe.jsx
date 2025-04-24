import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Board from "./Board";
import "../App.css";
import "./TicTacToe.css";

const API_BASE_URL = "https://game-room-api.fly.dev/api/rooms";

export default function TicTacToe() {
  const [roomId, setRoomId] = useState(null);
  const [inputRoomId, setInputRoomId] = useState("");
  const [gameState, setGameState] = useState({
    board: Array(9).fill(null),
    currentPlayer: "X",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (roomId) {
      const interval = setInterval(() => {
        fetch(`${API_BASE_URL}/${roomId}`)
          .then((response) => response.json())
          .then((data) => {
            setGameState(data.gameState);
          });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [roomId]);

  function createRoom() {
    fetch(API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        initialState: gameState,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setRoomId(data.roomId);
        alert(`Room created! Share this code: ${data.roomId}`);
      });
  }

  function joinRoom() {
    if (inputRoomId.trim() === "") {
      alert("Please enter a valid room code.");
      return;
    }

    fetch(`${API_BASE_URL}/${inputRoomId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Room not found");
        }
        return response.json();
      })
      .then((data) => {
        setRoomId(inputRoomId);
        setGameState(data.gameState);
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  function updateGameState(index) {
    if (gameState.board[index] || calculateWinner(gameState.board)) return;

    const newBoard = gameState.board.slice();
    newBoard[index] = gameState.currentPlayer;

    const updatedState = {
      board: newBoard,
      currentPlayer: gameState.currentPlayer === "X" ? "O" : "X",
    };

    setGameState(updatedState);

    if (roomId) {
      fetch(`${API_BASE_URL}/${roomId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ gameState: updatedState }),
      });
    }
  }

  return (
    <div className="game">
      <h2>
        {calculateWinner(gameState.board) === "Draw"
          ? "It's a Draw!"
          : calculateWinner(gameState.board)
          ? `Winner: ${calculateWinner(gameState.board)}`
          : `Next player: ${gameState.currentPlayer}`}
      </h2>
      <Board squares={gameState.board} onPlay={updateGameState} />

      <div>
        {!roomId && (
          <button className="tictactoe-button" onClick={createRoom}>Generate Room Code</button>
        )}
        <div>
          <input
            type="text"
            placeholder="Enter Room Code"
            value={inputRoomId}
            onChange={(e) => setInputRoomId(e.target.value)}
            disabled={!!roomId} 
          />
          <button className="tictactoe-button" onClick={joinRoom} disabled={!!roomId}>
            Join Room
          </button>
        </div>
        {roomId && <p>Room Code: {roomId}</p>} 
      </div>

      <button className="back-button" onClick={() => navigate("/")}>Back to Game Hub</button>
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

  if (squares.every((square) => square !== null)) {
    return "Draw";
  }

  return null;
}
