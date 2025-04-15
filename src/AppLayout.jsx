import { Outlet, NavLink } from "react-router-dom";

export default function AppLayout() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <header>
        <nav>
          <NavLink to="/">Home</NavLink> |  
          <NavLink to="/game/tic-tac-toe"> Tic Tac Toe </NavLink> |
          <NavLink to="/wordle"> Wordle </NavLink> |
          <NavLink to="/rps"> Rock Paper Scissors </NavLink> |
          <NavLink to="/memory"> Memory Game </NavLink> |
          <NavLink to="/hangman"> Hangman </NavLink>

        </nav>
      </header>
      <main style={{ flexGrow: 1, overflowY: "auto" }}>
        <Outlet />
      </main>
    </div>
  );
}
