import { Outlet, NavLink } from "react-router-dom";

export default function AppLayout() {
  return (
    <div>
      <header>
        <nav>
          <NavLink to="/">Home</NavLink> |  
          <NavLink to="/game/tic-tac-toe"> Tic Tac Toe </NavLink> |
          <NavLink to="/wordle"> Wordle </NavLink> |
          <NavLink to="/rps"> Rock Paper Scissors</NavLink>
        </nav>
      </header>
      <main>
        <Outlet /> {/* This will render Home or TicTacToe */}
      </main>
    </div>
  );
}
