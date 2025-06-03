// src/pages/SlotPage.jsx
import { useState } from "react";

const SlotPage = () => {
  const [balance] = useState(1000);
  const [bet, setBet] = useState(10);
  const [isSpinning, setIsSpinning] = useState(false);
  const [reels, setReels] = useState(["🍒", "🍋", "🍊"]);
  const [lastWin, setLastWin] = useState(0);

  const symbols = ["🍒", "🍋", "🍊", "🍇", "💎", "7️⃣"];

  const spin = () => {
    if (isSpinning) return;

    setIsSpinning(true);

    // Анімація спіну
    const spinInterval = setInterval(() => {
      setReels([
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
      ]);
    }, 100);

    // Зупиняємо через 2 секунди
    setTimeout(() => {
      clearInterval(spinInterval);

      const finalReels = [
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
      ];

      setReels(finalReels);

      // Перевіряємо виграш
      if (finalReels[0] === finalReels[1] && finalReels[1] === finalReels[2]) {
        setLastWin(bet * 10);
      } else if (
        finalReels[0] === finalReels[1] ||
        finalReels[1] === finalReels[2] ||
        finalReels[0] === finalReels[2]
      ) {
        setLastWin(bet * 2);
      } else {
        setLastWin(0);
      }

      setIsSpinning(false);
    }, 2000);
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "15px",
          padding: "30px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        }}
      >
        <h1
          style={{ textAlign: "center", marginBottom: "30px", color: "#333" }}
        >
          🎰 Слот-машина
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 2fr",
            gap: "30px",
          }}
        >
          {/* Панель керування */}
          <div>
            <div
              style={{
                backgroundColor: "#f8f9fa",
                padding: "20px",
                borderRadius: "10px",
                marginBottom: "20px",
              }}
            >
              <h3>💰 Баланс</h3>
              <p
                style={{ fontSize: "24px", color: "#28a745", margin: "10px 0" }}
              >
                ${balance}
              </p>
            </div>

            <div
              style={{
                backgroundColor: "#f8f9fa",
                padding: "20px",
                borderRadius: "10px",
                marginBottom: "20px",
              }}
            >
              <h3>🎯 Ставка</h3>
              <div style={{ margin: "10px 0" }}>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={bet}
                  onChange={(e) => setBet(Number(e.target.value))}
                  style={{ width: "100%" }}
                />
                <p style={{ textAlign: "center", margin: "5px 0" }}>${bet}</p>
              </div>
            </div>

            <div
              style={{
                backgroundColor: "#f8f9fa",
                padding: "20px",
                borderRadius: "10px",
              }}
            >
              <h3>📊 Статистика</h3>
              <p>
                Останній виграш:{" "}
                <span style={{ color: lastWin > 0 ? "#28a745" : "#6c757d" }}>
                  ${lastWin}
                </span>
              </p>
            </div>
          </div>

          {/* Ігрове поле */}
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "20px",
                marginBottom: "30px",
                padding: "30px",
                backgroundColor: "#1a1a1a",
                borderRadius: "15px",
                border: "3px solid #ffd700",
              }}
            >
              {reels.map((symbol, index) => (
                <div
                  key={index}
                  style={{
                    fontSize: "80px",
                    width: "120px",
                    height: "120px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "white",
                    borderRadius: "10px",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                    animation: isSpinning
                      ? "spin 0.1s infinite linear"
                      : "none",
                  }}
                >
                  {symbol}
                </div>
              ))}
            </div>

            <button
              onClick={spin}
              disabled={isSpinning}
              style={{
                fontSize: "20px",
                padding: "15px 40px",
                backgroundColor: isSpinning ? "#6c757d" : "#dc3545",
                color: "white",
                border: "none",
                borderRadius: "50px",
                cursor: isSpinning ? "not-allowed" : "pointer",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                transition: "all 0.3s",
              }}
            >
              {isSpinning ? "🎰 Крутиться..." : "🎰 КРУТИТИ"}
            </button>

            {lastWin > 0 && (
              <div
                style={{
                  marginTop: "20px",
                  padding: "15px",
                  backgroundColor: "#d4edda",
                  border: "1px solid #c3e6cb",
                  borderRadius: "10px",
                  color: "#155724",
                  fontSize: "18px",
                  fontWeight: "bold",
                }}
              >
                🎉 Вітаємо! Ви виграли ${lastWin}!
              </div>
            )}
          </div>
        </div>

        <div
          style={{
            marginTop: "30px",
            padding: "20px",
            backgroundColor: "#f8f9fa",
            borderRadius: "10px",
          }}
        >
          <h3>🏆 Таблиця виплат</h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "10px",
              fontSize: "14px",
            }}
          >
            <div>3 однакових символи: ×10</div>
            <div>2 однакових символи: ×2</div>
            <div>💎💎💎: ×50</div>
            <div>7️⃣7️⃣7️⃣: ×100</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlotPage;
