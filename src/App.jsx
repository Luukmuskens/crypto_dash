import React from "react";
import CryptoDashboard from "./pages/CryptoDashboard";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto py-6">
        <CryptoDashboard />
      </main>
      <Toaster />
    </div>
  );
}

export default App;
