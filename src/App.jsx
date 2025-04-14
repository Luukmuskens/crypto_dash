import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CryptoDashboard from "./pages/CryptoDashboard";
import CryptoDetails from "./pages/CryptoDetails";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CryptoDashboard />} />
        <Route path="/favorites" element={<CryptoDashboard />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/crypto-details/:id" element={<CryptoDetails />} />
        <Route path="/dashboard" element={<CryptoDashboard />} />
        <Route path="/crypto/:id" element={<CryptoDetails />} />
        <Route path="/homepage" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
