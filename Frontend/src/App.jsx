import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { GameProvider } from "./contexts/GameContext";
import { NotificationProvider } from "./contexts/NotificationContext";

// Pages
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import DashboardPage from "./pages/Dashboard";
import SlotPage from "./pages/SlotPage";
import RoulettePage from "./pages/RoulettePage";
import NewsPage from "./pages/NewsPage";
import ProfilePage from "./pages/Profile";
import TransactionsPage from "./pages/Transactions";
import NotFoundPage from "./pages/NotFound";

// Components
import ProtectedRoute from "./components/Auth/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <GameProvider>
        <NotificationProvider>
          <div className="App">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/slots"
                element={
                  <ProtectedRoute>
                    <SlotPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/roulette"
                element={
                  <ProtectedRoute>
                    <RoulettePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/news"
                element={
                  <ProtectedRoute>
                    <NewsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/transactions"
                element={
                  <ProtectedRoute>
                    <TransactionsPage />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </NotificationProvider>
      </GameProvider>
    </AuthProvider>
  );
}

export default App;
