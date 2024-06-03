'use client'

import "./globals.css";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import LogoSection from "../components/LogoSection";
import Cart from "../components/Cart";
import { useCart } from "../components/CartContext";
import { CartProvider } from "../components/CartContext";
import React from 'react';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { SearchProvider } from '../components/SearchContext';


export default function RootLayout({ children }) {
  return (
      <CartProvider>
          <SearchProvider> 
              <InnerRootLayout>{children}</InnerRootLayout>
          </SearchProvider>
      </CartProvider>
  );
}

function InnerRootLayout({ children }) {
  const { isCartOpen } = useCart();

  return (
    <html lang="pt-br">
      <body className={isCartOpen ? 'drawer-open' : ''}>
        <NavBar />
        <Cart />
        <LogoSection />
        <main>
          {children}
          <SpeedInsights />
        </main>
        <Footer />
      </body>
    </html>
  );
}
