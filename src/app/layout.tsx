'use client'

import "./globals.css";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import LogoSection from "../components/LogoSection";
import Cart from "../components/Cart";
import { useCart } from "../context/CartContext";
import { CartProvider } from "../context/CartContext";
import React from 'react';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { SearchProvider } from '../context/SearchContext';
import { JsonFileProvider } from '../context/JsonFileContext';
import SessionProviderWrapper from "@/context/SessionProviderWrapper";

export default function RootLayout({ children }) {
  return (
    <SessionProviderWrapper>
      <CartProvider>
        <SearchProvider>
          <JsonFileProvider>
            <InnerRootLayout>{children}</InnerRootLayout>
          </JsonFileProvider>
        </SearchProvider>
      </CartProvider>
    </SessionProviderWrapper>
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
