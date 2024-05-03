import { Inter } from "next/font/google";
import "./globals.css";
import AppBar from "../components/AppBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "lab-e app",
  description: "Seu e-commerce de análises clínicas",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <AppBar />
        {children}</body>
    </html>
  );
}
