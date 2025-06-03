import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Тимчасово повертаємо true, щоб не блокувати доступ
  // Замініть на реальну логіку аутентифікації
  const isAuthenticated = true;

  // Коли створите useAuth хук, замініть на:
  // const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
