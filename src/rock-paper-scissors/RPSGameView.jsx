import { useState } from "react";
import PropTypes from "prop-types";
import RockPaperScissors from "./RPS.js";


export default function GameView({ userName }) {
  const [userScore, setUserScore] = useState(0);
  const [cpuScore, setCpuScore] = useState(0);
  const [gameHistory, setGameHistory] = useState([]);
  const [userChoice, setUserChoice] = useState("");

  const [rpsGame] = useState(new RockPaperScissors(userName));

  function playGame() {
    if (!userChoice) return; 

    const cpuChoice = rpsGame.generateCPUResponse();
    const result = rpsGame.determineWinner(userChoice, cpuChoice);

    if (result === "win") {
      setUserScore((prevScore) => prevScore + 1);
    } else if (result === "lose") {
      setCpuScore((prevScore) => prevScore + 1);
    }

    setGameHistory((prevHistory) => [
      ...prevHistory,
      `${userName} selected ${userChoice}. CPU selected ${cpuChoice}: ${userName} ${result}s`
    ]);
  }

  function handleReset() {
    setUserScore(0);
    setCpuScore(0);
    setGameHistory([]);
  }

  return (
    <div id="game-screen" className="form-group">
      <h2>Welcome, {userName}!</h2> 
      <label htmlFor="user-selection">Choose Rock, Paper, or Scissors:</label>
      <select
        id="user-selection"
        className="custom-select"
        value={userChoice}
        onChange={(e) => setUserChoice(e.target.value)}
      >
        <option value="">Choose...</option>
        <option value="rock">Rock</option>
        <option value="paper">Paper</option>
        <option value="scissors">Scissors</option>
      </select>

      <button className="btn btn-success" id="go-button" type="button" onClick={playGame}>Play</button>

      <div id="score-tally">
        <h3>Scores</h3>
        <p id="score">{userName}: {userScore} v CPU: {cpuScore}</p>
      </div>

      <h3>Game History</h3>
      <ul id="game-history">
        {gameHistory.map((entry, index) => (
          <li key={index}>{entry}</li>
        ))}
      </ul>

      <button id="reset-game-button" className="btn btn-secondary" onClick={handleReset}>Reset</button>
    </div>
  );
}

GameView.propTypes = {
  userName: PropTypes.string.isRequired,
};
