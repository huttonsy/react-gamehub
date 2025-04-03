import React from "react";
import "./App.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "./AppLayout";
import TicTacToe from "./TicTacToe";
import Wordle from './wordle/wordle';
import Home from "./Home";
import RPSContainer from "./rock-paper-scissors/RPSContainer";


function App() {
  return (
    <Router>
      <AppLayout />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game/tic-tac-toe" element={<TicTacToe />} />
        <Route path="/game/wordle" element={<Wordle />} />
        <Route path="rps" element={<RPSContainer />} />
        
        <Route path="/user/:username" element={<UserProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
