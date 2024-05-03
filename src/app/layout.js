import { Inter } from "next/font/google";
import "./globals.css";
import AppBar from "../components/AppBar";
import Footer from "../components/Footer";


export const metadata = {
  title: "lab-e app",
  description: "Seu e-commerce de análises clínicas",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>
          <AppBar />
          {children}
          <Footer />
      </body>
    </html>
  );
}