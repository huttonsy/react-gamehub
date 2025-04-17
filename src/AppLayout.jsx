import { Outlet, NavLink } from "react-router-dom";
import "./AppLayout.css";

export default function AppLayout() {
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
      </header>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
