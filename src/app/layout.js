'use client'

import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "../components/Footer";
import LogoSection from "@/components/LogoSection";
import Cart from "../components/Cart";
import { useState } from "react";



export default function RootLayout({ children }) {
  const [cartOpen, setCartOpen] = useState(false);

  const toggleCart = () => {
    setCartOpen(!cartOpen);
  };

  return (
    <html lang="pt-br">
      <body className={cartOpen ? 'drawer-open' : ''}>
        <NavBar open={cartOpen} toggleCart={toggleCart} />
        <Cart open={cartOpen} onClose={toggleCart} />
        <LogoSection />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
