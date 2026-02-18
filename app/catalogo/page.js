"use client";

import { useState, useEffect } from "react";
import { Search, Filter, SlidersHorizontal, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext"; // <--- 1. IMPORTAMOS EL CONTEXTO

export default function CatalogoPage() {
  const { addToCart } = useCart(); // <--- 2. SACAMOS LA FUNCIÓN
  
  // --- ESTADOS ---
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Estados de Filtros
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [sortOrder, setSortOrder] = useState("default");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // --- 1. CARGA INICIAL ---
  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFiltered(data);
        setLoading(false);
      })
      .catch((err) => console.error("Error cargando catálogo:", err));
  }, []);

  // --- 2. EL CEREBRO DE LOS FILTROS ---
  useEffect(() => {
    let result = [...products];

    // Filtros... (igual que antes)
    if (searchTerm) {
      result = result.filter(p => p.name && p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (selectedCategory !== "Todas") {
      result = result.filter(p => p.category === selectedCategory);
    }
    if (sortOrder === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    }

    setFiltered(result);
  }, [products, searchTerm, selectedCategory, sortOrder]);

  const categories = ["Todas", "Automotor", "Residencial", "Cerrajería", "Accesorios", "Herramientas"];

  return (
    <div className="min-h-screen bg-syf-dark text-white pt-24 pb-12">
      <div className="container mx-auto px-4">
        
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">Catálogo de Productos</h1>
          <div className="relative max-w-2xl">
            <input
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-white/20 bg-white/10 py-4 pl-12 pr-4 text-white focus:border-syf-red focus:outline-none"
            />
            <Search className="absolute left-4 top-4 text-gray-400" size={24} />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* SIDEBAR */}
          <button 
            className="lg:hidden flex items-center gap-2 bg-white/10 p-3 rounded-lg mb-4"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
          >
            <Filter size={20} /> Filtros
          </button>

          <aside className={`lg:w-1/4 space-y-8 ${showMobileFilters ? "block" : "hidden lg:block"}`}>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <h3 className="font-bold text-lg mb-4 text-syf-red flex gap-2"><SlidersHorizontal size={18}/> Categorías</h3>
              <ul className="space-y-2">
                {categories.map((cat) => (
                  <li key={cat}>
                    <button
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${selectedCategory === cat ? "bg-syf-red font-bold" : "text-gray-400 hover:bg-white/10"}`}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
             {/* Filtro Ordenar (simplificado para ahorrar espacio en la respuesta) */}
             <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <h3 className="font-bold text-lg mb-4 text-syf-red">Ordenar</h3>
                <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="w-full bg-black/40 border border-white/10 p-2 rounded text-white">
                    <option value="default">Relevancia</option>
                    <option value="price-asc">Menor precio</option>
                    <option value="price-desc">Mayor precio</option>
                </select>
             </div>
          </aside>

          {/* GRILLA */}
          <section className="lg:w-3/4">
            {loading ? (
              <p>Cargando...</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((product) => (
                  <div key={product._id} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-syf-red transition-all flex flex-col">
                    <div className="relative h-56 bg-white p-4">
                      <img src={product.image || "/images/placeholder.jpg"} alt={product.name} className="w-full h-full object-contain" />
                      {product.featured && <span className="absolute top-2 right-2 bg-syf-red text-white text-[10px] px-2 py-1 rounded font-bold">DESTACADO</span>}
                    </div>
                    <div className="p-5 flex flex-col flex-grow">
                      <div className="text-xs text-gray-500 uppercase">{product.category}</div>
                      <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                      <div className="mt-auto pt-4 flex items-center justify-between border-t border-white/10">
                        <span className="text-2xl font-bold">${product.price}</span>
                        
                        {/* --- 3. EL BOTÓN QUE AGREGA AL CARRITO --- */}
                        <button 
                          onClick={() => addToCart(product)} 
                          className="bg-white/10 hover:bg-syf-red text-white p-2 rounded-full transition-all active:scale-95"
                        >
                          <ShoppingCart size={20} />
                        </button>

                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}