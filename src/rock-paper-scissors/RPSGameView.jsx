import { useState } from "react";
import PropTypes from "prop-types";

const API_BASE_URL = "https://game-room-api.fly.dev/api/rooms";

export default function GameView({ userName, roomId, gameState, setGameState }) {
  const [playerMove, setPlayerMove] = useState(null);

  const isPlayer1 = gameState.player1 === userName;
  const opponentName = isPlayer1 ? gameState.player2 : gameState.player1;
  const opponentMove = isPlayer1 ? gameState.player2Move : gameState.player1Move;

  const handleMove = (move) => {
    if (playerMove || gameState.result) return;

    const updatedGameState = {
      ...gameState,
      [isPlayer1 ? "player1Move" : "player2Move"]: move,
    };

    const player1Move = updatedGameState.player1Move;
    const player2Move = updatedGameState.player2Move;

    if (player1Move && player2Move) {
      updatedGameState.result = determineWinner(player1Move, player2Move, gameState.player1, gameState.player2);
    }

    setPlayerMove(move);
    setGameState(updatedGameState);

    fetch(`${API_BASE_URL}/${roomId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ gameState: updatedGameState }),
    });
  };

  function determineWinner(p1, p2, name1, name2) {
    if (p1 === p2) return "Draw";
    if (
      (p1 === "rock" && p2 === "scissors") ||
      (p1 === "paper" && p2 === "rock") ||
      (p1 === "scissors" && p2 === "paper")
    ) {
      return `${name1} wins!`;
    } else {
      return `${name2} wins!`;
    }
  }

  function resetGame() {
    const resetState = {
      player1: gameState.player1,
      player2: gameState.player2,
      player1Move: null,
      player2Move: null,
      result: null,
    };

    setPlayerMove(null);
    setGameState(resetState);

    fetch(`${API_BASE_URL}/${roomId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ gameState: resetState }),
    });
  }

  return (
    <div id="game-screen" className="form-group">
      <h2>Welcome, {userName}!</h2>
      <p>Room ID: <strong>{roomId}</strong></p>
      <p>Opponent: <strong>{opponentName || "Waiting for opponent..."}</strong></p>

      {gameState.result ? (
        <>
          <h3>Result: {gameState.result}</h3>
          <p>{gameState.player1} chose {gameState.player1Move}</p>
          <p>{gameState.player2} chose {gameState.player2Move}</p>
          <button className="btn btn-primary" onClick={resetGame}>Play Again</button>
        </>
      ) : (
        <>
          <label htmlFor="user-selection">Choose Rock, Paper, or Scissors:</label>
          <select
            id="user-selection"
            className="custom-select"
            value={playerMove || ""}
            onChange={(e) => handleMove(e.target.value)}
          >
            <option value="">Choose...</option>
            <option value="rock">Rock</option>
            <option value="paper">Paper</option>
            <option value="scissors">Scissors</option>
          </select>

          {playerMove && <p>You chose: {playerMove}</p>}
          {!opponentMove && <p>Waiting for opponent's move...</p>}
        </>
      )}
    </div>
  );
}

GameView.propTypes = {
  userName: PropTypes.string.isRequired,
  roomId: PropTypes.string.isRequired,
  gameState: PropTypes.object.isRequired,
  setGameState: PropTypes.func.isRequired,
};
