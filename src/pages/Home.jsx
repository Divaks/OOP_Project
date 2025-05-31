import { Link } from "react-router-dom";
import "../styles/Home.css"; // Додайте свій CSS файл для стилів
import Footer from "../components/Layout/Footer";

const Home = () => {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1 className="hero-title">Вітаємо в Family Dep</h1>
        <p className="hero-subtitle">
          Ваш шлях до захоплюючих ігор починається тут
        </p>

        <div className="cta-section">
          <Link to="/dashboard" className="cta-button">
            Увійти до казино
          </Link>
        </div>
      </div>

      <div className="games-section">
        <h2 className="section-title">Що цікавого:</h2>
        <div className="games-grid">
          <div className="game-card">
            <div className="game-icon">🎰</div>
            <h3 className="game-title">Слоти</h3>
            <p className="game-description">Класичні та сучасні слот-машини</p>
          </div>
          <div className="game-card">
            <div className="game-icon">🎯</div>
            <h3 className="game-title">Рулетка</h3>
            <p className="game-description">Вінницька рулетка</p>
          </div>
          <div className="game-card">
            <div className="game-icon">📰</div>
            <h3 className="game-title">Новини</h3>
            <p className="game-description">Останні новини казино</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
