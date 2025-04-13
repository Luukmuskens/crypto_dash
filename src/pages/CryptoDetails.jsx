import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "../components/ui/button";

const CryptoDetail = () => {
  const { id } = useParams(); // Haal de cryptocurrency ID uit de URL
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${id}`
        );
        setCoin(response.data);
      } catch (error) {
        setError("Er is een fout opgetreden bij het ophalen van de data.");
      } finally {
        setLoading(false);
      }
    };

    fetchCoin();
  }, [id]);

  const handleAddToWallet = () => {
    alert(`${coin.name} heb je nu gekocht!`);
  };

  if (loading) {
    return <p>Data laden...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">
          {coin.name} ({coin.symbol.toUpperCase()})
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <img src={coin.image.large} alt={coin.name} className="w-32 h-32" />
          <p className="text-lg mt-4">
            {coin.description.en || "Geen beschrijving beschikbaar."}
          </p>
        </div>
        <div>
          <h2 className="text-xl font-bold">Marktgegevens</h2>
          <ul>
            <li>Huidige prijs: ${coin.market_data.current_price.usd}</li>
            <li>Marktkapitalisatie: ${coin.market_data.market_cap.usd}</li>
            <li>24u Hoog: ${coin.market_data.high_24h.usd}</li>
            <li>24u Laag: ${coin.market_data.low_24h.usd}</li>
          </ul>
        </div>
        <Button
          className="w-full bg-green-500 hover:bg-green-600 text-white"
          onClick={handleAddToWallet}
        >
          Koop
        </Button>
      </div>
    </div>
  );
};

export default CryptoDetail;
