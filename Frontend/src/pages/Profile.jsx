import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNotification } from "../contexts/NotificationContext";

const Profile = () => {
  const { user, updateBalance } = useAuth();
  const { addNotification } = useNotification();

  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    birthDate: user?.birthDate || "",
  });

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    // Тут би був API запит для збереження даних
    addNotification("Профіль оновлено!", "success");
    setIsEditing(false);
  };

  const handleAddFunds = () => {
    // Симуляція поповнення балансу
    const amount = prompt("Введіть суму для поповнення:");
    if (amount && !isNaN(amount) && parseFloat(amount) > 0) {
      updateBalance(user.balance + parseFloat(amount));
      addNotification(`Баланс поповнено на ${amount} грн`, "success");
    }
  };

  const stats = {
    totalGames: 42,
    totalWins: 18,
    totalBets: 2340,
    biggestWin: 850,
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem" }}>
      <h1 style={{ textAlign: "center", marginBottom: "2rem", color: "#333" }}>
        Мій профіль
      </h1>

      <div style={{ display: "grid", gap: "2rem" }}>
        {/* Основна інформація */}
        <div
          style={{
            backgroundColor: "white",
            padding: "2rem",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "2rem",
            }}
          >
            <h2 style={{ color: "#333", margin: 0 }}>Особиста інформація</h2>
            <button
              onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: isEditing ? "#28a745" : "#007bff",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              {isEditing ? "Зберегти" : "Редагувати"}
            </button>
          </div>

          <div style={{ display: "grid", gap: "1rem" }}>
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  color: "#555",
                }}
              >
                Ім'я:
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={profileData.name}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                  }}
                />
              ) : (
                <div style={{ padding: "0.5rem", color: "#333" }}>
                  {profileData.name}
                </div>
              )}
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  color: "#555",
                }}
              >
                Email:
              </label>
              <div style={{ padding: "0.5rem", color: "#333" }}>
                {profileData.email}
              </div>
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  color: "#555",
                }}
              >
                Телефон:
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                  }}
                />
              ) : (
                <div style={{ padding: "0.5rem", color: "#333" }}>
                  {profileData.phone || "Не вказано"}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Баланс */}
        <div
          style={{
            backgroundColor: "white",
            padding: "2rem",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h2 style={{ color: "#333", marginBottom: "1rem" }}>Баланс</h2>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{ fontSize: "2rem", fontWeight: "bold", color: "#28a745" }}
            >
              {user?.balance?.toFixed(2) || "0.00"} грн
            </div>
            <button
              onClick={handleAddFunds}
              style={{
                padding: "0.75rem 1.5rem",
                backgroundColor: "#ffc107",
                color: "#000",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "1rem",
                fontWeight: "bold",
              }}
            >
              Поповнити баланс
            </button>
          </div>
        </div>

        {/* Статистика */}
        <div
          style={{
            backgroundColor: "white",
            padding: "2rem",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h2 style={{ color: "#333", marginBottom: "2rem" }}>
            Статистика ігор
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1rem",
            }}
          >
            <div style={{ textAlign: "center", padding: "1rem" }}>
              <div
                style={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                  color: "#007bff",
                }}
              >
                {stats.totalGames}
              </div>
              <div style={{ color: "#666" }}>Всього ігор</div>
            </div>
            <div style={{ textAlign: "center", padding: "1rem" }}>
              <div
                style={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                  color: "#28a745",
                }}
              >
                {stats.totalWins}
              </div>
              <div style={{ color: "#666" }}>Виграшів</div>
            </div>
            <div style={{ textAlign: "center", padding: "1rem" }}>
              <div
                style={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                  color: "#ffc107",
                }}
              >
                {stats.totalBets}
              </div>
              <div style={{ color: "#666" }}>Всього ставок</div>
            </div>
            <div style={{ textAlign: "center", padding: "1rem" }}>
              <div
                style={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                  color: "#dc3545",
                }}
              >
                {stats.biggestWin}
              </div>
              <div style={{ color: "#666" }}>Найбільший виграш</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
