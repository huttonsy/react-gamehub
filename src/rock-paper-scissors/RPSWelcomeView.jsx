import { useState, useContext } from "react";
import PropTypes from "prop-types";
import { UserContext } from "../UserContextInstance";

const WelcomeView = ({ onGameStart, onNameChange, name }) => {
  const { username } = useContext(UserContext);
  const [userName, setUserName] = useState(name || username || ""); 

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setUserName(newName);
    onNameChange(newName);
  };

  return (
    <div id="welcome-screen">
      <form id="name-form">
        <div className="form-group">
          <label htmlFor="username">Type your name: </label>
          <input
            value={userName}
            onChange={handleNameChange} 
            className="form-control"
            type="text"
            id="username"
            name="username"
            required
            placeholder="Enter Name Here..."
            minLength="2"
            maxLength="15"
          />
        </div>
      </form>
      {userName.trim().length >= 2 && (
        <button
          id="start-game-button" 
          className="btn btn-primary"
          type="button"
          onClick={() => onGameStart(userName)}
        >
          Start Game!
        </button>
      )}
    </div>
  );
};

WelcomeView.propTypes = {
  name: PropTypes.string.isRequired,
  onNameChange: PropTypes.func.isRequired,
  onGameStart: PropTypes.func.isRequired,
};

export default WelcomeView;
