import React, { useState, useEffect } from "react";
import "../hangman/Hangman.css";

const Hangman = () => {
const [word, setWord] = useState("");
const [guessed, setGuessed] = useState([]);
const [wrong, setWrong] = useState(0);
const [currentLetter, setCurrentLetter] = useState("");
const maxWrong = 6;

const fetchNewWord = () => {
fetch("https://random-word-api.herokuapp.com/word")
.then((res) => res.json())
.then((data) => {
setWord(data[0].toLowerCase());
setGuessed([]);
setWrong(0);
setCurrentLetter("");
})
.catch(() => setWord("fallback"));
};

useEffect(() => {
fetchNewWord();
}, []);

const displayWord = word
.split("")
.map((letter) => (guessed.includes(letter) ? letter : "_"))
.join(" ");

const handleKeyPress = (e) => {
if (e.key === "Enter" && /^[a-zA-Z]$/.test(currentLetter)) {
const letter = currentLetter.toLowerCase();
if (!guessed.includes(letter)) {
setGuessed([...guessed, letter]);
if (!word.includes(letter)) {
setWrong(wrong + 1);
}
}
setCurrentLetter("");
}
};

const isLost = wrong >= maxWrong;
const isWon = word && word.split("").every((l) => guessed.includes(l));

if (!word) return <p className="text-center mt-10">Loading word...</p>;

return (
<div className="hangman-wrapper">
<h1 className="hangman-title">Hangman</h1>

<div className="hangman-container">
<div className="hangman-box">
<p>[Hangman animation goes here]</p>
</div>

<div className="hangman-game">
<p className="hangman-label">Guess the word:</p>
<p className="hangman-word">{displayWord}</p>

{!isLost && !isWon && (
<input
type="text"
maxLength="1"
value={currentLetter}
onChange={(e) => setCurrentLetter(e.target.value)}
onKeyDown={handleKeyPress}
className="hangman-input"
placeholder="Enter a letter"
/>
)}

<p className="hangman-wrong">
Wrong guesses: {wrong} / {maxWrong}
</p>

{guessed.length > 0 && (
<div className="hangman-guessed">
<p>Guessed letters:</p>
<p>{guessed.join(", ")}</p>
</div>
)}

{isLost && (
<p className="hangman-result lost">
You lost! The word was: <strong>{word}</strong>
</p>
)}

{isWon && (
<p className="hangman-result won">You won!</p>
)}

<button onClick={fetchNewWord} className="btn btn-secondary">
New Game
</button>
</div>
</div>
</div>
);
};

export default Hangman;