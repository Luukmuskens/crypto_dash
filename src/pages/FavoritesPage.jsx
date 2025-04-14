import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CryptoDashboard from "./pages/CryptoDashboard";
import FavoritesPage from "./pages/FavoritesPage";

function App() {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (coin) => {
    setFavorites((prevFavorites) =>
      prevFavorites.some((fav) => fav.id === coin.id)
        ? prevFavorites.filter((fav) => fav.id !== coin.id)
        : [...prevFavorites, coin]
    );
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<CryptoDashboard favorites={favorites} toggleFavorite={toggleFavorite} />}
        />
        <Route
          path="/favorites"
          element={<FavoritesPage favorites={favorites} toggleFavorite={toggleFavorite} />}
        />
      </Routes>
    </Router>
  );
}

export default App;