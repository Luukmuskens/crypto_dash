import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CryptoDashboard from "./pages/CryptoDashboard";
import CryptoDetails from "./pages/CryptoDetails";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CryptoDashboard />} />
        <Route path="/crypto-details/:id" element={<CryptoDetails />} />
        <Route path="/dashboard" element={<CryptoDashboard />} />
        <Route path="/crypto/:id" element={<CryptoDetails />} />
        <Route path="/homepage" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
