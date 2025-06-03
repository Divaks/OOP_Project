// src/pages/Dashboard.jsx
import { Link } from "react-router-dom";
import "../styles/Dashboard.css";
import Toolbar from "../components/Layout/Toolbar";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Toolbar />
      <h1 className="dashboard-title">Панель управління</h1>

      <div className="dashboard-grid">
        <div className="balance-card">
          <h2>💰 Ваш баланс</h2>
          <p className="balance-amount">$1,000.00</p>
          <button className="deposit-button">Поповнити баланс</button>
        </div>
      </div>

      <div className="stats-card">
        <h3>📊 Статистика сесії</h3>
        <div className="stats-grid">
          <div className="stat-item">
            <strong>Зіграно ігор:</strong> 0
          </div>
          <div className="stat-item">
            <strong>Виграно:</strong> $0.00
          </div>
          <div className="stat-item">
            <strong>Час в грі:</strong> 0 хв
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
