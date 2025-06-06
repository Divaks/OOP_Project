import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { GameProvider } from "./contexts/GameContext.jsx";
import { NotificationProvider } from "./contexts/NotificationContext.jsx";
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <GameProvider>
          <NotificationProvider>
            <App />
          </NotificationProvider>
        </GameProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
