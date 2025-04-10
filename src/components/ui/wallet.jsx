import React, { useState } from "react";

const Wallet = () => {
  const [balance, setBalance] = useState(1000); // Startsaldo
  const [transactions, setTransactions] = useState([]);

  const addTransaction = (type, amount) => {
    setTransactions((prev) => [...prev, { type, amount, date: new Date() }]);
    setBalance((prev) => (type === "deposit" ? prev + amount : prev - amount));
  };

  return (
    <div className="wallet">
      <h2>Wallet</h2>
      <p>Saldo: ${balance.toFixed(2)}</p>
      <button onClick={() => addTransaction("deposit", 100)}>
        Storten $100
      </button>
      <button onClick={() => addTransaction("withdraw", 50)}>
        Opnemen $50
      </button>
      <h3>Transacties:</h3>
      <ul>
        {transactions.map((t, index) => (
          <li key={index}>
            {t.type === "deposit" ? "Gestort" : "Opgenomen"}: ${t.amount} op{" "}
            {t.date.toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Wallet;
