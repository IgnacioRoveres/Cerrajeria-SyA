import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import { CartProvider } from "@/context/CartContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Cerrajería SyF | Repuestos y Copias en La plata",
  description: "Cerrajería del automotor y residencial. Venta de repuestos, carcasas, llaves codificadas y aceites. Urgencias en La Plata. Pedí online.",
  keywords: ["cerrajería La Plata", "llaves codificadas", "repuestos automotor", "cambio de aceite", "copias de llaves"],
  icons: {
    icon: '/favicon.ico',
  },
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