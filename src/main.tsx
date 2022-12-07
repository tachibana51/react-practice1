import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Player } from "./model/player";
import { PlayersTable } from "./pages/players/PlayersTable";
const dummy: Player[] = [
  { id: 1, name: "yukari", memo: "aaa" },
  { id: 2, name: "akane", memo: "bbb" },
];

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <PlayersTable players={dummy} />
  </React.StrictMode>
);
