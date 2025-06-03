// src/pages/RoulettePage.jsx
import { useState } from "react";

const RoulettePage = () => {
  const [balance] = useState(1000);
  const [isSpinning, setIsSpinning] = useState(false);
  const [lastNumber, setLastNumber] = useState(null);
  const [history, setHistory] = useState([]);
  const [bets, setBets] = useState({});
  const [totalBet, setTotalBet] = useState(0);

  const numbers = Array.from({ length: 37 }, (_, i) => i);
  const redNumbers = [
    1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36,
  ];

  const placeBet = (type, value, amount = 10) => {
    const betKey = `${type}-${value}`;
    const currentBet = bets[betKey] || 0;
    const newBets = { ...bets, [betKey]: currentBet + amount };
    setBets(newBets);
    setTotalBet(Object.values(newBets).reduce((sum, bet) => sum + bet, 0));
  };

  const clearBets = () => {
    setBets({});
    setTotalBet(0);
  };

  const spin = () => {
    if (isSpinning || totalBet === 0) return;

    setIsSpinning(true);

    setTimeout(() => {
      const winningNumber = Math.floor(Math.random() * 37);
      setLastNumber(winningNumber);
      setHistory((prev) => [winningNumber, ...prev.slice(0, 9)]);

      // Тут була б логіка підрахунку виграшів

      setIsSpinning(false);
      setBets({});
      setTotalBet(0);
    }, 3000);
  };

  const getNumberColor = (num) => {
    if (num === 0) return "#22c55e";
    return redNumbers.includes(num) ? "#ef4444" : "#1f2937";
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        🎯 Європейська рулетка
      </h1>

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px" }}
      >
        {/* Колесо рулетки */}
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "15px",
            padding: "30px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: "300px",
              height: "300px",
              borderRadius: "50%",
              border: "10px solid #8B5A00",
              margin: "0 auto 30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background:
                "conic-gradient(from 0deg, red 0deg 20deg, black 20deg 40deg, red 40deg 60deg, black 60deg 80deg, red 80deg 100deg, black 100deg 120deg, red 120deg 140deg, black 140deg 160deg, red 160deg 180deg, black 180deg 200deg, red 200deg 220deg, black 220deg 240deg, red 240deg 260deg, black 260deg 280deg, red 280deg 300deg, black 300deg 320deg, red 320deg 340deg, black 340deg 360deg)",
              position: "relative",
              animation: isSpinning ? "rouletteSpin 3s ease-out" : "none",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                backgroundColor: "white",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                fontWeight: "bold",
                color:
                  lastNumber !== null ? getNumberColor(lastNumber) : "#333",
              }}
            >
              {lastNumber !== null ? lastNumber : "?"}
            </div>
          </div>

          <button
            onClick={spin}
            disabled={isSpinning || totalBet === 0}
            style={{
              fontSize: "18px",
              padding: "12px 30px",
              backgroundColor:
                isSpinning || totalBet === 0 ? "#6c757d" : "#dc3545",
              color: "white",
              border: "none",
              borderRadius: "25px",
              cursor: isSpinning || totalBet === 0 ? "not-allowed" : "pointer",
              marginRight: "10px",
            }}
          >
            {isSpinning ? "🎯 Крутиться..." : "🎯 КРУТИТИ"}
          </button>

          <button
            onClick={clearBets}
            style={{
              fontSize: "18px",
              padding: "12px 30px",
              backgroundColor: "#6c757d",
              color: "white",
              border: "none",
              borderRadius: "25px",
              cursor: "pointer",
            }}
          >
            Очистити ставки
          </button>
        </div>

        {/* Стіл для ставок */}
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "15px",
            padding: "20px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          }}
        >
          <div style={{ marginBottom: "20px" }}>
            <h3>💰 Баланс: ${balance}</h3>
            <h3>🎯 Загальна ставка: ${totalBet}</h3>
          </div>

          {/* Числа 1-36 */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "5px",
              marginBottom: "20px",
            }}
          >
            {numbers.slice(1).map((num) => (
              <button
                key={num}
                onClick={() => placeBet("number", num)}
                style={{
                  padding: "15px 10px",
                  backgroundColor: getNumberColor(num),
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "bold",
                  position: "relative",
                }}
              >
                {num}
                {bets[`number-${num}`] && (
                  <span
                    style={{
                      position: "absolute",
                      top: "2px",
                      right: "2px",
                      backgroundColor: "#ffd700",
                      color: "#000",
                      borderRadius: "50%",
                      width: "16px",
                      height: "16px",
                      fontSize: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {bets[`number-${num}`]}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Зеро */}
          <button
            onClick={() => placeBet("number", 0)}
            style={{
              width: "100%",
              padding: "15px",
              backgroundColor: "#22c55e",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold",
              marginBottom: "20px",
              position: "relative",
            }}
          >
            0
            {bets["number-0"] && (
              <span
                style={{
                  position: "absolute",
                  top: "2px",
                  right: "2px",
                  backgroundColor: "#ffd700",
                  color: "#000",
                  borderRadius: "50%",
                  width: "20px",
                  height: "20px",
                  fontSize: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {bets["number-0"]}
              </span>
            )}
          </button>

          {/* Зовнішні ставки */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "10px",
            }}
          >
            <button
              onClick={() => placeBet("color", "red")}
              style={{
                padding: "12px",
                backgroundColor: "#ef4444",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Червоне (2:1)
            </button>
            <button
              onClick={() => placeBet("color", "black")}
              style={{
                padding: "12px",
                backgroundColor: "#1f2937",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Чорне (2:1)
            </button>
            <button
              onClick={() => placeBet("range", "low")}
              style={{
                padding: "12px",
                backgroundColor: "#3b82f6",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              1-18 (2:1)
            </button>
            <button
              onClick={() => placeBet("range", "high")}
              style={{
                padding: "12px",
                backgroundColor: "#3b82f6",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              19-36 (2:1)
            </button>
          </div>
        </div>
      </div>

      {/* Історія */}
      {history.length > 0 && (
        <div
          style={{
            marginTop: "30px",
            backgroundColor: "white",
            borderRadius: "15px",
            padding: "20px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          }}
        >
          <h3>📊 Останні числа</h3>
          <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
            {history.map((number, index) => (
              <div
                key={index}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: getNumberColor(number),
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                }}
              >
                {number}
              </div>
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes rouletteSpin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(1440deg);
          }
        }
      `}</style>
    </div>
  );
};

export default RoulettePage;
