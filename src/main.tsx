import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { PlayersTable } from "./pages/players/PlayersTable";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <PlayersTable />
  </React.StrictMode>
);
