import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [balance, setBalance] = useState(1000);
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      // Симуляція API запиту
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (email && password) {
        const userData = {
          id: 1,
          email,
          name: email.split("@")[0],
          avatar: null,
          registrationDate: new Date().toISOString(),
        };

        setUser(userData);
        setIsAuthenticated(true);
        setLoading(false);
        return { success: true, user: userData };
      }

      setLoading(false);
      return { success: false, error: "Невірні дані для входу" };
    } catch (error) {
      setLoading(false);
      return { success: false, error: "Помилка з`єднання" };
    }
  };

  const register = async (email, password, name) => {
    setLoading(true);
    try {
      // Симуляція API запиту
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (email && password && name) {
        const userData = {
          id: Date.now(),
          email,
          name,
          avatar: null,
          registrationDate: new Date().toISOString(),
        };

        setUser(userData);
        setIsAuthenticated(true);
        setBalance(1000); // Стартовий бонус
        setLoading(false);
        return { success: true, user: userData };
      }

      setLoading(false);
      return { success: false, error: "Заповніть всі поля" };
    } catch (error) {
      setLoading(false);
      return { success: false, error: "Помилка реєстрації" };
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setBalance(0);
  };

  const updateBalance = (amount) => {
    setBalance((prev) => Math.max(0, prev + amount));
  };

  const updateProfile = (updates) => {
    setUser((prev) => ({ ...prev, ...updates }));
  };

  const value = {
    user,
    isAuthenticated,
    balance,
    loading,
    login,
    register,
    logout,
    updateBalance,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
