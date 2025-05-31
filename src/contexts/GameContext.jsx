import React, { createContext, useContext, useState, useReducer } from "react";

const GameContext = createContext();

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};

// Game reducer для управління станом ігор
const gameReducer = (state, action) => {
  switch (action.type) {
    case "START_GAME":
      return {
        ...state,
        currentGame: action.payload.gameType,
        isPlaying: true,
        lastBet: action.payload.bet,
      };

    case "END_GAME":
      return {
        ...state,
        currentGame: null,
        isPlaying: false,
        gameHistory: [
          ...state.gameHistory,
          {
            id: Date.now(),
            ...action.payload,
            timestamp: new Date().toISOString(),
          },
        ],
      };

    case "UPDATE_GAME_STATE":
      return {
        ...state,
        gameState: { ...state.gameState, ...action.payload },
      };

    case "CLEAR_HISTORY":
      return {
        ...state,
        gameHistory: [],
      };

    default:
      return state;
  }
};

const initialGameState = {
  currentGame: null,
  isPlaying: false,
  gameHistory: [],
  gameState: {},
  lastBet: 0,
};

export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialGameState);
  const [statistics, setStatistics] = useState({
    totalGames: 0,
    totalWins: 0,
    totalLosses: 0,
    totalWinnings: 0,
    totalLosses: 0,
    biggestWin: 0,
    favoriteGame: null,
  });

  const startGame = (gameType, bet = 0) => {
    dispatch({
      type: "START_GAME",
      payload: { gameType, bet },
    });
  };

  const endGame = (result) => {
    dispatch({
      type: "END_GAME",
      payload: result,
    });

    // Оновлення статистики
    setStatistics((prev) => {
      const newStats = { ...prev };
      newStats.totalGames += 1;

      if (result.won) {
        newStats.totalWins += 1;
        newStats.totalWinnings += result.winAmount || 0;
        if (result.winAmount > newStats.biggestWin) {
          newStats.biggestWin = result.winAmount;
        }
      } else {
        newStats.totalLosses += 1;
        newStats.totalLosses += result.betAmount || 0;
      }

      return newStats;
    });
  };

  const updateGameState = (updates) => {
    dispatch({
      type: "UPDATE_GAME_STATE",
      payload: updates,
    });
  };

  const clearHistory = () => {
    dispatch({ type: "CLEAR_HISTORY" });
    setStatistics({
      totalGames: 0,
      totalWins: 0,
      totalLosses: 0,
      totalWinnings: 0,
      totalLosses: 0,
      biggestWin: 0,
      favoriteGame: null,
    });
  };

  const getGameStats = (gameType) => {
    const gameGames = state.gameHistory.filter(
      (game) => game.gameType === gameType
    );
    return {
      totalGames: gameGames.length,
      wins: gameGames.filter((game) => game.won).length,
      losses: gameGames.filter((game) => !game.won).length,
      totalWinnings: gameGames.reduce(
        (sum, game) => sum + (game.won ? game.winAmount : 0),
        0
      ),
      totalLosses: gameGames.reduce(
        (sum, game) => sum + (!game.won ? game.betAmount : 0),
        0
      ),
    };
  };

  const value = {
    ...state,
    statistics,
    startGame,
    endGame,
    updateGameState,
    clearHistory,
    getGameStats,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
