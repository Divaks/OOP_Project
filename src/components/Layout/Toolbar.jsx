// src/components/Layout/Toolbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "../../styles/Toolbar.css";

const Toolbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="toolbar">
      <div className="toolbar-logo">
        <Link to="/">🎰 Family Dep</Link>
      </div>

      <div className="toolbar-links">
        <Link to="/dashboard" className="toolbar-link">
          🏠 Головна
        </Link>
        <Link to="/slots" className="toolbar-link">
          🎰 Слоти
        </Link>
        <Link to="/roulette" className="toolbar-link">
          🎯 Рулетка
        </Link>
        <Link to="/news" className="toolbar-link">
          📰 Новини
        </Link>
      </div>

      <div className="toolbar-user">
        {currentUser ? (
          <>
            <Link to="/profile" className="toolbar-profile">
              👤 {currentUser.email}
            </Link>
            <button onClick={handleLogout} className="toolbar-logout">
              Вийти
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="toolbar-login">
              Увійти
            </Link>
            <Link to="/register" className="toolbar-register">
              Реєстрація
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Toolbar;
