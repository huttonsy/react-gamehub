import React, { useContext, useState } from "react";
import { UserContext } from "./UserContextInstance";
import { Outlet, NavLink } from "react-router-dom";
import "./AppLayout.css";

export default function AppLayout() {
  const { username, setUsername } = useContext(UserContext);
  const [tempUsername, setTempUsername] = useState("");

  const handleSubmit = () => {
    if (tempUsername.trim()) {
      setUsername(tempUsername);
    }
  };

  if (!username) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <h1>Welcome to the Game Hub!</h1>
        <p>Please enter your username to continue:</p>
        <input
          type="text"
          placeholder="Enter your username"
          value={tempUsername}
          onChange={(e) => setTempUsername(e.target.value)}
          style={{ padding: "10px", fontSize: "16px" }}
        />
        <button onClick={handleSubmit} style={{ marginLeft: "10px", padding: "10px", fontSize: "16px" }}>
          Submit
        </button>
      </div>
    );
  }

  return (
    <div className="layout">
      <header className="navbar">
        <nav className="nav-links">
          <NavLink to="/">Home</NavLink> |  
          <NavLink to="/game/tic-tac-toe"> Tic Tac Toe </NavLink> |
          <NavLink to="/wordle"> Wordle </NavLink> |
          <NavLink to="/rps"> Rock Paper Scissors </NavLink> |
          <NavLink to="/memory"> Memory Game </NavLink> |
          <NavLink to="/hangman"> Hangman </NavLink>
        </nav>
        <p>Welcome, {username}!</p>
      </header>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
