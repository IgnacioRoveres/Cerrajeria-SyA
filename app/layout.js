import { Inter } from "next/font/google"; // O la fuente que tengas
import "./globals.css";
import Navbar from "./components/layout/Navbar";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Cerrajería SyF",
  description: "Repuestos del automotor y cerrajería en Zárate",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Navbar />  {/* <--- AGREGADO AQUÍ */}
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}