import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Player } from "./model/player";
import { PlayersTable } from "./pages/players/PlayersTable";
const dummy: Player[] = [
  { id: 1, name: "ff", memo: "" },
  { id: 2, name: "bb", memo: "f" },
];
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <PlayersTable players={dummy} />
  </React.StrictMode>
);
