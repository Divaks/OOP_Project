import React from "react";

const Transactions = () => {
  const mockTransactions = [
    {
      id: 1,
      type: "deposit",
      amount: 100,
      date: "2024-01-15",
      status: "completed",
    },
    {
      id: 2,
      type: "bet",
      amount: -50,
      date: "2024-01-14",
      status: "completed",
    },
    {
      id: 3,
      type: "win",
      amount: 150,
      date: "2024-01-14",
      status: "completed",
    },
    {
      id: 4,
      type: "withdrawal",
      amount: -75,
      date: "2024-01-13",
      status: "pending",
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1>Історія транзакцій</h1>

      <div style={{ marginTop: "20px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f8f9fa" }}>
              <th style={{ padding: "10px", border: "1px solid #dee2e6" }}>
                ID
              </th>
              <th style={{ padding: "10px", border: "1px solid #dee2e6" }}>
                Тип
              </th>
              <th style={{ padding: "10px", border: "1px solid #dee2e6" }}>
                Сума
              </th>
              <th style={{ padding: "10px", border: "1px solid #dee2e6" }}>
                Дата
              </th>
              <th style={{ padding: "10px", border: "1px solid #dee2e6" }}>
                Статус
              </th>
            </tr>
          </thead>
          <tbody>
            {mockTransactions.map((transaction) => (
              <tr key={transaction.id}>
                <td style={{ padding: "10px", border: "1px solid #dee2e6" }}>
                  {transaction.id}
                </td>
                <td style={{ padding: "10px", border: "1px solid #dee2e6" }}>
                  {transaction.type === "deposit" && "💰 Поповнення"}
                  {transaction.type === "withdrawal" && "💸 Виведення"}
                  {transaction.type === "bet" && "🎲 Ставка"}
                  {transaction.type === "win" && "🏆 Виграш"}
                </td>
                <td
                  style={{
                    padding: "10px",
                    border: "1px solid #dee2e6",
                    color: transaction.amount > 0 ? "green" : "red",
                  }}
                >
                  {transaction.amount > 0 ? "+" : ""}
                  {transaction.amount}₴
                </td>
                <td style={{ padding: "10px", border: "1px solid #dee2e6" }}>
                  {transaction.date}
                </td>
                <td style={{ padding: "10px", border: "1px solid #dee2e6" }}>
                  <span
                    style={{
                      padding: "4px 8px",
                      borderRadius: "4px",
                      backgroundColor:
                        transaction.status === "completed"
                          ? "#d4edda"
                          : "#fff3cd",
                      color:
                        transaction.status === "completed"
                          ? "#155724"
                          : "#856404",
                    }}
                  >
                    {transaction.status === "completed"
                      ? "Завершено"
                      : "В обробці"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;
