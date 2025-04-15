import { useEffect, useState } from "react";
import Square from "./memory-game-square.jsx";
import "./memory-game.css";

function MemoryGame() {
  const [sequence, setSequence] = useState([]);
  const [userInput, setUserInput] = useState([]);
  const [showingIndex, setShowingIndex] = useState(-1);
  const [isPlayingSequence, setIsPlayingSequence] = useState(false);
  const [level, setLevel] = useState(1);
  const [gameStatus, setGameStatus] = useState("idle");
  const [clickedIndex, setClickedIndex] = useState(-1);


  useEffect(() => {
    if (level === 1) {
      // Start fresh game
      const first = [generateRandomIndex()];
      setSequence(first);
      playSequence(first);
    } else {
      // Add one more to sequence
      const next = [...sequence, generateRandomIndex()];
      setSequence(next);
      playSequence(next);
    }
    // eslint-disable-next-line
  }, [level]);

  function generateRandomIndex() {
    return Math.floor(Math.random() * 9);
  }

  function playSequence(seq) {
    setUserInput([]);
    setShowingIndex(-1);
    setGameStatus("playing");
    setIsPlayingSequence(true);

    seq.forEach((val, i) => {
      setTimeout(() => {
        setShowingIndex(val);
        setTimeout(() => {
          setShowingIndex(-1);
          if (i === seq.length - 1) {
            setTimeout(() => {
              setIsPlayingSequence(false);
              setGameStatus("waiting");
            }, 400);
          }
        }, 600);
      }, i * 1000);
    });
  }

  function handleSquareClick(index) {
    if (isPlayingSequence || gameStatus !== "waiting") return;
  
    setClickedIndex(index); // Highlight the clicked square
    setTimeout(() => setClickedIndex(-1), 300); // Unhighlight after 300ms
  
    const newUserInput = [...userInput, index];
    setUserInput(newUserInput);
  
    if (sequence[newUserInput.length - 1] !== index) {
      setGameStatus("lost");
      return;
    }
  
    if (newUserInput.length === sequence.length) {
      setGameStatus("won");
    }
  }
  

  function nextLevel() {
    setLevel(level + 1);
  }

  function restartGame() {
    setLevel(1);
    setSequence([]);
  }

  return (
    <div className="app">
      <h1>Memory Game</h1>
      <h2>Level {level}</h2>

      <div className="grid">
        {Array.from({ length: 9 }, (_, i) => (
          <Square
            key={i}
            active={i === showingIndex || i === clickedIndex}
            onClick={() => handleSquareClick(i)}
          />
        ))}
      </div>

      <div className="status">
        {gameStatus === "playing" && "Watch the sequence..."}
        {gameStatus === "waiting" && "Repeat the sequence!"}
        {gameStatus === "won" && (
          <>
            ✅ Correct!{" "}
            <button className="btn" onClick={nextLevel}>
              Next Level
            </button>
          </>
        )}
        {gameStatus === "lost" && (
          <>
            ❌ Incorrect.{" "}
            <button className="btn" onClick={() => playSequence(sequence)}>
              Retry Level
            </button>{" "}
            <button className="btn" onClick={restartGame}>
              Restart Game
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default MemoryGame;