import React, { useEffect, useState, useCallback } from "react";
import { Card, CardContent } from "../components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Moon, Sun } from "lucide-react";
import axios from "axios";
import { useToast } from "../components/ui/use-toast";

const CryptoDashboard = () => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState("light");
  const { toast } = useToast();

  const fetchCoins = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets",
        {
          params: {
            vs_currency: "usd",
            order: "market_cap_desc",
            per_page: 10,
            page: 1,
            sparkline: true,
          },
        }
      );
      setCoins(response.data);
      toast({
        title: "Data bijgewerkt",
        description: "De cryptocurrency data is succesvol bijgewerkt.",
      });
    } catch (error) {
      console.error("Error fetching data", error);
      toast({
        title: "Fout",
        description: "Er is een fout opgetreden bij het ophalen van de data.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchCoins();
  }, [fetchCoins]);

  const handleBuy = (coin) => {
    toast({
      title: "Koop Order",
      description: `Je hebt een koop order geplaatst voor ${
        coin.name
      } (${coin.symbol.toUpperCase()})`,
    });
  };

  const handleSell = (coin) => {
    toast({
      title: "Verkoop Order",
      description: `Je hebt een verkoop order geplaatst voor ${
        coin.name
      } (${coin.symbol.toUpperCase()})`,
    });
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img src="/crypto-logo.svg" alt="Crypto Logo" className="w-24 h-24" />
          <h1 className="text-3xl font-bold">NebulaBytes Dashboard</h1>
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            const newTheme = theme === "dark" ? "light" : "dark";
            setTheme(newTheme);
            document.documentElement.classList.toggle("dark");
          }}
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>
      </div>

      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Zoek een crypto..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <Button onClick={fetchCoins} disabled={loading}>
          {loading ? "Laden..." : "Vernieuwen"}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCoins.map((coin) => (
          <Card key={coin.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <img src={coin.image} alt={coin.name} className="w-8 h-8" />
                  <div>
                    <h2 className="text-lg font-semibold">{coin.name}</h2>
                    <p className="text-sm text-muted-foreground">
                      {coin.symbol.toUpperCase()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">
                    ${coin.current_price.toFixed(2)}
                  </p>
                  <p
                    className={`text-sm ${
                      coin.price_change_percentage_24h > 0
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </p>
                </div>
              </div>
              <div className="h-24 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={coin.sparkline_in_7d.price.map((price, index) => ({
                      x: index,
                      y: price,
                    }))}
                  >
                    <XAxis dataKey="x" hide />
                    <YAxis hide domain={["dataMin", "dataMax"]} />
                    <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                    <Line
                      type="monotone"
                      dataKey="y"
                      stroke={theme === "dark" ? "#60a5fa" : "#3b82f6"}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="flex gap-2">
                <Button
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                  onClick={() => handleBuy(coin)}
                >
                  Koop
                </Button>
                <Button
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white"
                  onClick={() => handleSell(coin)}
                >
                  Verkoop
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Advertentie Sectie */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">
          Aanbevolen Trading Platforms
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Plus500 Advertentie */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="https://www.plus500.com/favicon.ico"
                  alt="Plus500"
                  className="w-8 h-8"
                />
                <h3 className="text-lg font-semibold">Plus500</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Handel in CFD's op meer dan 2000+ instrumenten met een
                gereguleerde broker.
              </p>
              <a
                href="https://www.plus500.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Start met Handelen
                </Button>
              </a>
            </CardContent>
          </Card>

          {/* Bybit Advertentie */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 flex items-center justify-center bg-[#2B2B2B] rounded-full">
                  <img
                    src="https://www.bybit.com/favicon.ico"
                    alt="Bybit"
                    className="w-6 h-6"
                  />
                </div>
                <h3 className="text-lg font-semibold">Bybit</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Een van de snelstgroeiende crypto exchanges met geavanceerde
                trading tools en hoge liquiditeit.
              </p>
              <a
                href="https://www.bybit.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="w-full bg-[#2B2B2B] hover:bg-[#3B3B3B] text-white">
                  Open een Account
                </Button>
              </a>
            </CardContent>
          </Card>

          {/* eToro Advertentie */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="https://www.etoro.com/favicon.ico"
                  alt="eToro"
                  className="w-8 h-8"
                />
                <h3 className="text-lg font-semibold">eToro</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Sociale trading platform met copy trading en een breed aanbod
                aan crypto's.
              </p>
              <a
                href="https://www.etoro.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                  Begin met Traden
                </Button>
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CryptoDashboard;
