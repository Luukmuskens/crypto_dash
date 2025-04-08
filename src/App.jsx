import React from "react";
import CryptoDashboard from "./pages/CryptoDashboard";
import { Toaster } from "./components/ui/toaster";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Wallet from "./pages/Wallet";

const App = () => {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<CryptoDashboard />} />
          <Route path="/wallet" element={<Wallet />} />
        </Routes>
      </Router>
    );
  };

export default App;
