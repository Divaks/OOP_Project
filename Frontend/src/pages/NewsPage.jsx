import React, { useState, useEffect } from "react";

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const mockNews = [
    {
      id: 1,
      title: "Новий слот-автомат вже доступний!",
      content:
        "Ми додали новий захоплюючий слот-автомат з унікальними бонусними функціями та високими виплатами.",
      category: "games",
      date: "2025-05-30",
      image: "🎰",
    },
    {
      id: 2,
      title: "Бонус для нових гравців",
      content:
        "Зареєструйтеся зараз і отримайте 100% бонус на ваш перший депозит до 1000 грн!",
      category: "promotions",
      date: "2025-05-29",
      image: "🎁",
    },
    {
      id: 3,
      title: "Доступна щомісячна підписка на наше казино",
      content:
        "Всього за 100 грн на місяць ви отримуєте доступ до ексклюзивних ігор та бонусів з особистою гарантією від розробників, якщо зацікавило, звертайтеся до служби підтримки.",
      category: "updates",
      date: "2025-06-02",
      image: "💵",
    },
    {
      id: 4,
      title: "Маємо нових спонсорів!",
      content:
        "Льюіс Хемілтон та Ферран Торрес стали нашими новими обличчями! Вони будуть брати участь у наших рекламних кампаніях та акціях.",
      category: "updates",
      date: "2025-05-28",
      image: "🔁",
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setNews(mockNews);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredNews =
    filter === "all" ? news : news.filter((item) => item.category === filter);

  const getCategoryName = (category) => {
    const categories = {
      games: "Ігри",
      promotions: "Акції",
      updates: "Оновлення",
    };
    return categories[category] || category;
  };

  if (loading) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "3rem",
          fontSize: "1.2rem",
        }}
      >
        Завантаження новин...
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
      <h1
        style={{
          textAlign: "center",
          marginBottom: "2rem",
          color: "#333",
          fontSize: "2.5rem",
        }}
      >
        Новини казино
      </h1>

      {/* Фільтри */}
      <div
        style={{
          marginBottom: "2rem",
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          justifyContent: "center",
        }}
      >
        <button
          onClick={() => setFilter("all")}
          style={{
            padding: "0.5rem 1rem",
            border: "1px solid #ddd",
            backgroundColor: filter === "all" ? "#007bff" : "white",
            color: filter === "all" ? "white" : "#333",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Всі новини
        </button>
        {["games", "promotions", "updates"].map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            style={{
              padding: "0.5rem 1rem",
              border: "1px solid #ddd",
              backgroundColor: filter === category ? "#007bff" : "white",
              color: filter === category ? "white" : "#333",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {getCategoryName(category)}
          </button>
        ))}
      </div>

      {/* Список новин */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "2rem",
        }}
      >
        {filteredNews.map((article) => (
          <div
            key={article.id}
            style={{
              backgroundColor: "white",
              padding: "1.5rem",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              border: "1px solid #eee",
            }}
          >
            <div
              style={{
                fontSize: "3rem",
                textAlign: "center",
                marginBottom: "1rem",
              }}
            >
              {article.image}
            </div>

            <div
              style={{
                display: "inline-block",
                backgroundColor: "#007bff",
                color: "white",
                padding: "0.25rem 0.5rem",
                borderRadius: "4px",
                fontSize: "0.8rem",
                marginBottom: "1rem",
              }}
            >
              {getCategoryName(article.category)}
            </div>

            <h3
              style={{
                color: "#333",
                marginBottom: "1rem",
                fontSize: "1.3rem",
              }}
            >
              {article.title}
            </h3>

            <p
              style={{
                color: "#666",
                lineHeight: "1.6",
                marginBottom: "1rem",
              }}
            >
              {article.content}
            </p>

            <div
              style={{
                color: "#999",
                fontSize: "0.9rem",
                borderTop: "1px solid #eee",
                paddingTop: "1rem",
              }}
            >
              {new Date(article.date).toLocaleDateString("uk-UA")}
            </div>
          </div>
        ))}
      </div>

      {filteredNews.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "3rem",
            color: "#666",
            fontSize: "1.1rem",
          }}
        >
          Новин у цій категорії поки немає
        </div>
      )}
    </div>
  );
};

export default NewsPage;
