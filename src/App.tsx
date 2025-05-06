import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Shop from "./components/Shop";
import Blog from "./components/Blog";
import Customers from "./components/Customers";
import Footer from "./components/Footer";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <CartProvider>
      <div className="bg-primary min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Hero />
          <Services />
          <Shop />
          <Blog />
          <Customers />
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;
