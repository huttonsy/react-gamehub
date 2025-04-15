import { NavLink } from "react-router-dom";
import React from "react";
import "./App.css";

export default function Home() {
    return (
        <div>
            <h1>Welcome to the Game Hub!</h1>
            <p>Choose a game to play:</p>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/game/tic-tac-toe">Play Tic-Tac-Toe</NavLink>
                    </li>
                    <li>
                        <NavLink to="/wordle">Play Wordle</NavLink>
                    </li> 
                    <li>
                        <NavLink to="/rps">Rock Paper Scissors</NavLink>
                    </li>
                    <li>
                        <NavLink to="/memory">Memory Game</NavLink>
                    </li>
                    <li>
                        <NavLink to="/hangman">Hangman</NavLink>
                    </li>
                    </ul>
            </nav>
        </div>
    );
}
