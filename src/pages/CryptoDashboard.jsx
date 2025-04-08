import React, { useEffect, useState, useCallback } from "react";
import { Card, CardContent } from "../components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Moon, Sun, Home, RefreshCw } from "lucide-react";
import axios from "axios";
import { useToast } from "../components/ui/use-toast";

const COLORS = [
  "#FF8C00", // Oranje
  "#1E3A8A", // Donkerblauw
  "#60A5FA", // Lichtblauw
  "#FF8C00", // Oranje
  "#1E3A8A", // Donkerblauw
  "#60A5FA", // Lichtblauw
  "#FF8C00", // Oranje
  "#1E3A8A", // Donkerblauw
  "#60A5FA", // Lichtblauw
  "#FF8C00", // Oranje
];

const CryptoDashboard = () => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState("light");
  const [username, setUsername] = useState("Meester");
  const [error, setError] = useState(null);
  const { toast } = useToast();

  const fetchCoins = useCallback(
    async (retryCount = 0) => {
      try {
        setLoading(true);
        setError(null);

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
            timeout: 10000, // 10 seconden timeout
            headers: {
              Accept: "application/json",
            },
          }
        );

        if (!response.data || !Array.isArray(response.data)) {
          throw new Error("Ongeldige data ontvangen van de API");
        }

        setCoins(response.data);
        toast({
          title: "Data bijgewerkt",
          description: "De cryptocurrency data is succesvol bijgewerkt.",
        });
      } catch (error) {
        console.error("Error fetching data:", error);

        // Controleer of het een netwerkfout is
        if (error.code === "ECONNABORTED" || !error.response) {
          if (retryCount < 3) {
            // Wacht 2 seconden en probeer opnieuw
            setTimeout(() => {
              fetchCoins(retryCount + 1);
            }, 2000);
            return;
          }
        }

        // Toon specifieke foutmeldingen
        let errorMessage =
          "Er is een fout opgetreden bij het ophalen van de data.";
        if (error.response?.status === 429) {
          errorMessage =
            "Te veel verzoeken. Probeer het over een paar minuten opnieuw.";
        } else if (error.response?.status === 404) {
          errorMessage = "De API endpoint is niet gevonden.";
        }

        setError(errorMessage);
        toast({
          title: "Fout",
          description: errorMessage,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    },
    [toast]
  );

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

  const marketData = coins.map((coin) => ({
    name: coin.name,
    value: coin.market_cap,
    symbol: coin.symbol.toUpperCase(),
  }));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img src="/crypto-logo.svg" alt="Crypto Logo" className="w-24 h-24" />
          <div>
            <h1 className="text-3xl font-bold">NebulaBytes Dashboard</h1>
            <p className="text-lg text-muted-foreground">
              Welkom terug, {username}!
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => (window.location.href = "/HomePage.jsx")}
            className="hover:bg-primary hover:text-primary-foreground"
          >
            <Home className="h-5 w-5" />
          </Button>
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
      </div>

      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Zoek een crypto..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <Button
          onClick={() => fetchCoins()}
          disabled={loading}
          className="gap-2"
        >
          {loading ? (
            <>
              <RefreshCw className="h-4 w-4 animate-spin" />
              Laden...
            </>
          ) : (
            <>
              <RefreshCw className="h-4 w-4" />
              Vernieuwen
            </>
          )}
        </Button>
      </div>

      {/* Market Share Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Marktaandeel Top 10 Cryptocurrencies
        </h2>
        <div className="h-[400px] w-full">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground">Laden...</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={marketData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} (${(percent * 100).toFixed(1)}%)`
                  }
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {marketData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => `${(value / 1000000000).toFixed(2)}B`}
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    border: "none",
                    borderRadius: "0.5rem",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {error ? (
        <div className="text-center py-8">
          <p className="text-red-500 mb-4">{error}</p>
          <Button onClick={() => fetchCoins()}>Opnieuw proberen</Button>
        </div>
      ) : (
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
                      data={
                        coin.sparkline_in_7d?.price?.map((price, index) => ({
                          x: index,
                          y: price,
                        })) || []
                      }
                    >
                      <XAxis dataKey="x" hide />
                      <YAxis hide domain={["dataMin", "dataMax"]} />
                      <Tooltip
                        formatter={(value) => `$${value?.toFixed(2) || "0.00"}`}
                        contentStyle={{
                          backgroundColor:
                            theme === "dark" ? "#1f2937" : "#ffffff",
                          border: "none",
                          borderRadius: "0.5rem",
                          color: theme === "dark" ? "#ffffff" : "#000000",
                        }}
                      />
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
      )}

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

