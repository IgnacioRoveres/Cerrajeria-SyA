'use client'; 

import Link from 'next/link';
import { ShoppingCart, Search, Menu, X, Key } from 'lucide-react';
import { useState } from 'react';
import { useCart } from "@/context/CartContext";
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { totalItems } = useCart(); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  // Función para que el buscador funcione y lleve al catálogo
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/catalogo?buscar=${encodeURIComponent(searchTerm)}`);
      setIsMenuOpen(false); 
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-black">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between gap-4 md:gap-8">
          
          {/* 1. LOGO (Izquierda) */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">          
            <img src="/images/Logo-syf-blanco.png" alt="Cerrajería SyF" className="h-12 w-12 object-contain" />
            <div className="flex flex-col">
              <span className="text-xl font-bold text-white tracking-tight leading-tight">
                Cerrajería SyF
              </span>
              <span className="text-xs text-gray-400">Automotor & Repuestos</span>
            </div>
          </Link>

          {/* 2. BUSCADOR (Centro - Oculto en móvil muy chico) */}
          <div className="hidden sm:flex flex-1 items-center justify-center max-w-2xl">
            <form onSubmit={handleSearch} className="flex w-full shadow-lg">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar repuesto o llave..."
                className="w-full rounded-l-md border border-r-0 border-white/10 bg-[#121212] py-3 pl-4 pr-4 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-syf-red focus:ring-1 focus:ring-syf-red transition-all"
              />
              <button 
                type="submit" 
                className="flex items-center justify-center rounded-r-md bg-[#CC2027] px-6 text-white hover:bg-red-700 transition-colors border border-[#CC2027]"
              >
                <Search size={20} />
              </button>
            </form>
          </div>

          {/* 3. CARRITO Y MENÚ (Derecha) */}
          <div className="flex items-center gap-3 shrink-0">
            
            {/* Botón Carrito Cuadrado */}
            <Link 
              href="/carrito" 
              className="relative flex h-11 w-11 items-center justify-center rounded-md border border-white/10 bg-[#121212] text-white hover:border-syf-red hover:text-syf-red transition-all"
            >
                <ShoppingCart size={20} />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#CC2027] text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-black">
                    {totalItems}
                  </span>
                )}
            </Link>

            {/* Menú Hamburgesa (Solo visible en pantallas chicas para buscar) */}
            <button 
              className="sm:hidden flex h-11 w-11 items-center justify-center rounded-md border border-white/10 bg-[#121212] text-white hover:text-syf-red"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={20} /> : <Search size={20} />} {/* Cambié el ícono por la lupa en móvil */}
            </button>
          </div>
        </div>

        {/* BUSCADOR MÓVIL DESPLEGABLE */}
        {isMenuOpen && (
          <div className="sm:hidden border-t border-white/10 py-4 pb-6 animate-fade-in-down">
            <form onSubmit={handleSearch} className="flex w-full shadow-lg">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar repuesto..."
                className="w-full rounded-l-md border border-r-0 border-white/10 bg-[#121212] py-3 pl-4 pr-4 text-sm text-white focus:outline-none focus:border-syf-red"
              />
              <button 
                type="submit" 
                className="flex items-center justify-center rounded-r-md bg-[#CC2027] px-5 text-white"
              >
                <Search size={20} />
              </button>
            </form>
          </div>
        )}
      </div>
    </nav>
  );
}