import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import { CartProvider } from "@/context/CartContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Cerrajería SyF",
  description: "Repuestos del automotor y cerrajería en Zárate",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <CartProvider>
        <Navbar />
        
        <main className="flex-grow">
          {children}
        </main>
        
        <Footer />
        
        </CartProvider>
        
      </body>
    </html>
  );
}