'use client';

import Link from 'next/link';
import { ShoppingCart, Search, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-syf-dark/95 backdrop-blur supports-[backdrop-filter]:bg-syf-dark/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          
          {/* 1. LOGO (Izquierda) */}
          <Link href="/" className="flex items-center gap-2">
            {/* Simulo el logo rojo con un círculo css por ahora */}
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-syf-red text-white font-bold">
              S
            </div>
            <span className="text-xl font-bold text-white tracking-tight">
              Cerrajería <span className="text-syf-red">SyF</span>
            </span>
          </Link>

          {/* 2. BUSCADOR (Centro - Oculto en móvil) */}
          <div className="hidden md:flex flex-1 items-center justify-center px-8">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar repuesto (ej: Cilindro Yale)..."
                className="w-full rounded-md border border-white/10 bg-syf-gray py-2 pl-9 pr-4 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-syf-red"
              />
            </div>
          </div>

          {/* 3. ICONOS (Derecha) */}
          <div className="flex items-center gap-4">
            {/* Link a Servicios (Escritorio) */}
            <Link href="/servicios" className="hidden md:block text-sm font-medium text-gray-300 hover:text-white transition-colors">
              Servicios
            </Link>

            {/* Carrito */}
            <Link href="/carrito" className="relative group">
              <div className="p-2 text-gray-300 transition-colors group-hover:text-syf-red">
                <ShoppingCart className="h-6 w-6" />
                {/* Badge de contador (Hardcodeado en 0 por ahora) */}
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-syf-red text-[10px] font-bold text-white">
                  0
                </span>
              </div>
            </Link>

            {/* Menú Hamburgesa (Móvil) */}
            <button 
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* MENÚ MÓVIL DESPLEGABLE */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-white/10 py-4">
            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Buscar..."
                className="w-full rounded-md border border-white/10 bg-syf-gray p-2 text-sm text-white"
              />
              <Link href="/catalogo" className="text-gray-300 hover:text-syf-red">Catálogo</Link>
              <Link href="/servicios" className="text-gray-300 hover:text-syf-red">Servicios</Link>
              <Link href="/contacto" className="text-gray-300 hover:text-syf-red">Contacto</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}