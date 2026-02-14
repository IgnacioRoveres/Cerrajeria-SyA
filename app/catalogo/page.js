"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import { Search } from "lucide-react";

export default function CatalogoPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Cargar productos
  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => console.error("Error cargando catálogo:", err));
  }, []);

  // --- 🔥 EL FILTRO BLINDADO ---
  const filteredProducts = products.filter((product) => {
    // Protección anti-crash:
    if (!product.name) return false; 
    
    return product.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <main className="min-h-screen bg-syf-dark text-white pt-24 pb-12">
      <div className="container mx-auto px-4">
        
        {/* Encabezado y Buscador */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-syf-red mb-4">Catálogo Completo</h1>
          
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="Buscar repuesto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-full border border-white/20 bg-white/10 py-3 pl-12 pr-4 text-white focus:border-syf-red focus:outline-none focus:ring-1 focus:ring-syf-red"
            />
            <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
          </div>
        </div>

        {/* Grilla de Productos */}
        {loading ? (
          <p className="text-center text-gray-400 animate-pulse">Cargando inventario...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div key={product._id} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-syf-red transition-all group">
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src={product.image || "/images/placeholder.jpg"} 
                      alt={product.name || "Producto sin nombre"} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                    <p className="text-sm text-gray-400 mb-3 truncate">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-syf-red">${product.price}</span>
                      <button className="bg-white/10 hover:bg-white/20 px-3 py-1 rounded text-sm">Ver +</button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-gray-500">No encontramos productos con ese nombre.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}