import React from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { ArrowRight, TrendingUp, Shield, Globe, BarChart } from "lucide-react";

const HomePage = () => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <img src="/crypto-logo.svg" alt="Crypto Logo" className="w-32 h-32" />
        </div>
        <h1 className="text-5xl font-bold">Welkom bij NebulaBytes</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Jouw vertrouwde platform voor cryptocurrency trading en marktanalyse.
          Volg prijzen in real-time en maak weloverwogen beslissingen.
        </p>
        <Button
          size="lg"
          onClick={() => (window.location.href = "/dashboard")}
          className="gap-2"
        >
          Ga naar Dashboard
          <ArrowRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <TrendingUp className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Real-time Data</h3>
            <p className="text-muted-foreground">
              Volg cryptocurrency prijzen en trends in real-time met onze
              geavanceerde monitoring tools.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <Shield className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Veilig & Betrouwbaar</h3>
            <p className="text-muted-foreground">
              Gebruik ons platform met vertrouwen, wij gebruiken de meest
              betrouwbare data bronnen.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <Globe className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Wereldwijd Bereik</h3>
            <p className="text-muted-foreground">
              Toegang tot data van meer dan 1000 cryptocurrencies wereldwijd.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <BarChart className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Geavanceerde Analyse</h3>
            <p className="text-muted-foreground">
              Gebruik onze geavanceerde grafieken en analyses voor betere
              trading beslissingen.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-white rounded-lg p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Klaar om te beginnen?</h2>
        <p className="text-lg mb-6">
          Start vandaag nog met het volgen van cryptocurrency prijzen en trends.
        </p>
        <Button
          size="lg"
          variant="secondary"
          onClick={() => (window.location.href = "/dashboard")}
          className="gap-2"
        >
          Start met Traden
          <ArrowRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Partners Section */}
      <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Onze Partners</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
            <div className="flex flex-col items-center">
              <img
                src="https://www.plus500.com/favicon.ico"
                alt="Plus500"
                className="h-12 w-12 mb-2"
              />
              <span className="text-sm text-muted-foreground">Plus500</span>
            </div>
            <div className="flex flex-col items-center">
              <img
                src="https://www.bybit.com/favicon.ico"
                alt="Bybit"
                className="h-12 w-12 mb-2"
              />
              <span className="text-sm text-muted-foreground">Bybit</span>
            </div>
            <div className="flex flex-col items-center">
              <img
                src="https://www.etoro.com/favicon.ico"
                alt="eToro"
                className="h-12 w-12 mb-2"
              />
              <span className="text-sm text-muted-foreground">eToro</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
