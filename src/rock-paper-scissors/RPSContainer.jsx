import { useState } from "react";
import RPSWelcomeView from "./RPSWelcomeView.jsx";
import { useNavigate } from "react-router-dom";
import RPSGameView from "./RPSGameView.jsx";

export default function RPSContainer() {
  const [userName, setUserName] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const navigate = useNavigate();

  const handleNameChange = (name) => {
    setUserName(name);
  };

  const handleGameStart = (name) => {
    setUserName(name);
    setGameStarted(true);
  };

  return (
    <div>
      <h2>Rock Paper Scissors</h2>
      {!gameStarted ? (
        <RPSWelcomeView
          name={userName}
          onNameChange={handleNameChange}
          onGameStart={handleGameStart}
        />
      ) : (
        <RPSGameView userName={userName} />
      )}
        
        <button 
        className="btn btn-secondary" 
        onClick={() => navigate("/")}
      >
        Return to Homepage
      </button>
    </div>
  );
}
