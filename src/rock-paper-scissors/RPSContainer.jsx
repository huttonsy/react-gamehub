import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContextInstance";
import RPSWelcomeView from "./RPSWelcomeView.jsx";
import RPSGameView from "./RPSGameView.jsx";
import "../App.css";

const API_BASE_URL = "https://game-room-api.fly.dev/api/rooms";

export default function RPSContainer() {
  const { username: name, setUsername } = useContext(UserContext);
  const [inputRoomId, setInputRoomId] = useState("");
  const [roomId, setRoomId] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameState, setGameState] = useState({
    player1: null,
    player2: null,
    player1Move: null,
    player2Move: null,
    result: null,
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (roomId) {
      const interval = setInterval(() => {
        fetch(`${API_BASE_URL}/${roomId}`)
          .then((res) => res.json())
          .then((data) => {
            setGameState(data.gameState);
          });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [roomId]);

  const handleNameChange = (name) => {
    setUsername(name);
  };

  const createRoom = () => {
    if (!name.trim()) {
      alert("Enter your name before creating a room.");
      return;
    }

    fetch(API_BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ initialState: gameState }),
    })
      .then((res) => res.json())
      .then((data) => {
        setRoomId(data.roomId);
        alert(`Room created! Share this code: ${data.roomId}`);
      })
      .catch(() => alert("Failed to create room."));
  };

  const joinRoom = () => {
    if (!inputRoomId.trim()) {
      alert("Please enter a room code.");
      return;
    }

    if (!name.trim()) {
      alert("Please enter your name before joining.");
      return;
    }

    fetch(`${API_BASE_URL}/${inputRoomId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Room not found");
        return res.json();
      })
      .then((data) => {
        const joinedGameState = {
          ...data.gameState,
          player1: data.gameState.player1 || name,
          player2: data.gameState.player1 && !data.gameState.player2 ? name : data.gameState.player2,
        };

        setRoomId(inputRoomId);
        setGameState(joinedGameState);
        setGameStarted(true);

        return fetch(`${API_BASE_URL}/${inputRoomId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ gameState: joinedGameState }),
        });
      })
      .catch((err) => alert(err.message));
  };

  const handleGameStart = () => {
    if (!roomId) {
      alert("You must create or join a room first!");
      return;
    }

    const newState = {
      ...gameState,
      player1: gameState.player1 || name,
      player2: gameState.player1 && !gameState.player2 ? name : gameState.player2,
    };

    setGameState(newState);
    fetch(`${API_BASE_URL}/${roomId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ gameState: newState }),
    });

    setInputRoomId("");
    setGameStarted(true);
  };

  return (
    <div>
      <h2>Rock Paper Scissors</h2>

      {!gameStarted && (
        <>
          <RPSWelcomeView
            name={name}
            onNameChange={handleNameChange}
            onGameStart={handleGameStart}
          />
          <div>
            <button className="btn btn-outline-primary m-2" onClick={createRoom}>Create Room</button>
            <input
              className="form-control d-inline-block w-auto m-2"
              type="text"
              placeholder="Enter Room Code"
              value={inputRoomId}
              onChange={(e) => setInputRoomId(e.target.value)}
            />
            <button className="btn btn-outline-success m-2" onClick={joinRoom}>Join Room</button>
          </div>
        </>
      )}

      {gameStarted && (
        <RPSGameView
          userName={name}
          roomId={roomId}
          gameState={gameState}
          setGameState={setGameState}
        />
      )}

      <button className="btn btn-secondary mt-3" onClick={() => navigate("/")}>
        Back to Game Hub
      </button>
    </div>
  );
}