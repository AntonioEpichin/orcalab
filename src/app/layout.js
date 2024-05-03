import { Inter } from "next/font/google";
import "./globals.css";
import AppBar from "../components/AppBar";
import Footer from "../components/Footer";
import theme from "@/theme";
import { ThemeProvider } from '@mui/material/styles';

export const metadata = {
  title: "lab-e app",
  description: "Seu e-commerce de análises clínicas",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>
        <ThemeProvider theme={theme}>
          <AppBar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}