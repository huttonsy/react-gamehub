import { NavLink } from "react-router-dom";
import React from "react";
import "./App.css";
import ticTacToeImg from "./tic-tac-toe/tictactoess.png";
import wordleImg from "./wordle/wordless.png";
import rpsImg from "./rock-paper-scissors/rpsss.png";
import memoryGameImg from "./memory-game/memorygamess.png";
import hangmanImg from "./hangman/hangmanss.png";

export default function Home() {
    return (
        <div>
            <h1>Welcome to the Game Hub!</h1>
            <p>Choose a game to play:</p>
            <nav>
                <ul style={{ display: 'flex', listStyleType: 'none', padding: 0, justifyContent: 'center', alignItems: 'center' }}>
                    <li style={{ margin: '0 20px', textAlign: 'center' }}>
                        <NavLink to="/game/tic-tac-toe">Play Tic-Tac-Toe</NavLink>
                        <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                            <li>
                                <img src={ticTacToeImg} alt="Tic Tac Toe" style={{ width: '150px', height: '150px', marginTop: '10px' }} />
                            </li>
                        </ul>
                    </li>
                    <li style={{ margin: '0 20px', textAlign: 'center' }}>
                        <NavLink to="/wordle">Play Wordle</NavLink>
                        <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                            <li>
                                <img src={wordleImg} alt="Wordle" style={{ width: '150px', height: '150px', marginTop: '10px' }} />
                            </li>
                        </ul>
                    </li> 
                    <li style={{ margin: '0 20px', textAlign: 'center' }}>
                        <NavLink to="/rps">Rock Paper Scissors</NavLink>
                        <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                            <li>
                                <img src={rpsImg} alt="Rock Paper Scissors" style={{ width: '150px', height: '150px', marginTop: '10px' }} />
                            </li>
                        </ul>
                    </li>
                    <li style={{ margin: '0 20px', textAlign: 'center' }}>
                        <NavLink to="/memory">Memory Game</NavLink>
                        <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                            <li>
                                <img src={memoryGameImg} alt="Memory Game" style={{ width: '150px', height: '150px', marginTop: '10px' }} />
                            </li>
                        </ul>
                    </li>
                    <li style={{ margin: '0 20px', textAlign: 'center' }}>
                        <NavLink to="/hangman">Hangman</NavLink>
                        <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                            <li>
                                <img src={hangmanImg} alt="Hangman" style={{ width: '150px', height: '150px', marginTop: '10px' }} />
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
