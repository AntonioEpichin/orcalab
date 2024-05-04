import "./globals.css";
import AppBar from "../components/AppBar";
import Footer from "../components/Footer";
import LogoSection from "@/components/LogoSection";


export const metadata = {
  title: "lab-e app",
  description: "Seu e-commerce de análises clínicas",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>
          <AppBar />
          <LogoSection/>
          {children}
          <Footer />
      </body>
    </html>
  );
}