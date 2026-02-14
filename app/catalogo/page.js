"use client";

import { useState, useEffect } from "react";
import { Search, Filter, SlidersHorizontal, ShoppingCart, ChevronDown } from "lucide-react";
import Link from "next/link";

export default function CatalogoPage() {
  // --- ESTADOS ---
  const [products, setProducts] = useState([]);           // Todos los productos
  const [filtered, setFiltered] = useState([]);           // Productos que se ven
  const [loading, setLoading] = useState(true);
  
  // Estados de Filtros
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [sortOrder, setSortOrder] = useState("default");  // default | price-asc | price-desc
  const [showMobileFilters, setShowMobileFilters] = useState(false); // Para celular

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

  // --- 2. EL CEREBRO DE LOS FILTROS (Se ejecuta cuando cambia algo) ---
  useEffect(() => {
    let result = [...products];

    // A. Filtro por Buscador (Blindado)
    if (searchTerm) {
      result = result.filter(p => 
        p.name && p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // B. Filtro por Categoría
    if (selectedCategory !== "Todas") {
      result = result.filter(p => p.category === selectedCategory);
    }

    // C. Ordenamiento
    if (sortOrder === "price-asc") {
      result.sort((a, b) => a.price - b.price); // Menor a Mayor
    } else if (sortOrder === "price-desc") {
      result.sort((a, b) => b.price - a.price); // Mayor a Menor
    }

    setFiltered(result);
  }, [products, searchTerm, selectedCategory, sortOrder]);

  // Lista de categorías (Hardcodeadas o podrías traerlas de una API)
  const categories = ["Todas", "Automotor", "Residencial", "Cerrajería", "Accesorios", "Herramientas"];

  return (
    <div className="min-h-screen bg-syf-dark text-white pt-24 pb-12">
      <div className="container mx-auto px-4">
        
        {/* === HEADER DEL CATÁLOGO === */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">Catálogo de Productos</h1>
          
          {/* Barra de Búsqueda Grande */}
          <div className="relative max-w-2xl">
            <input
              type="text"
              placeholder="Buscar por nombre, marca o modelo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-white/20 bg-white/10 py-4 pl-12 pr-4 text-white placeholder-gray-400 focus:border-syf-red focus:outline-none focus:ring-1 focus:ring-syf-red shadow-xl"
            />
            <Search className="absolute left-4 top-4 text-gray-400" size={24} />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* === SIDEBAR (FILTROS) === */}
          {/* Botón para mostrar filtros en Mobile */}
          <button 
            className="lg:hidden flex items-center gap-2 bg-white/10 p-3 rounded-lg mb-4"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
          >
            <Filter size={20} /> {showMobileFilters ? "Ocultar Filtros" : "Mostrar Filtros"}
          </button>

          <aside className={`lg:w-1/4 space-y-8 ${showMobileFilters ? "block" : "hidden lg:block"}`}>
            
            {/* Filtro: Categorías */}
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-syf-red">
                <SlidersHorizontal size={18} /> Categorías
              </h3>
              <ul className="space-y-2">
                {categories.map((cat) => (
                  <li key={cat}>
                    <button
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedCategory === cat 
                          ? "bg-syf-red text-white font-bold" 
                          : "text-gray-400 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Filtro: Ordenar */}
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <h3 className="font-bold text-lg mb-4 text-syf-red">Ordenar por</h3>
              <select 
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-syf-red cursor-pointer"
              >
                <option value="default">Más relevantes</option>
                <option value="price-asc">Menor precio</option>
                <option value="price-desc">Mayor precio</option>
              </select>
            </div>

            {/* Resumen */}
            <div className="text-gray-400 text-sm px-2">
              Mostrando {filtered.length} productos
            </div>
          </aside>


          {/* === GRILLA DE PRODUCTOS === */}
          <section className="lg:w-3/4">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                 {/* Skeletons de carga */}
                 {[1,2,3,4,5,6].map(i => (
                   <div key={i} className="h-80 bg-white/5 rounded-xl animate-pulse"></div>
                 ))}
              </div>
            ) : filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((product) => (
                  <div 
                    key={product._id} 
                    className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-syf-red hover:shadow-[0_0_20px_rgba(230,57,70,0.15)] transition-all duration-300 flex flex-col"
                  >
                    {/* Imagen */}
                    <div className="relative h-56 bg-white overflow-hidden">
                      <img 
                        src={product.image || "/images/placeholder.jpg"} 
                        alt={product.name} 
                        className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                      />
                      {product.featured && (
                        <div className="absolute top-2 right-2 bg-syf-red text-white text-[10px] font-bold px-2 py-1 rounded shadow-md uppercase tracking-wide">
                          Destacado
                        </div>
                      )}
                    </div>

                    {/* Contenido */}
                    <div className="p-5 flex flex-col flex-grow">
                      <div className="text-xs text-gray-500 mb-1 uppercase font-semibold tracking-wider">
                        {product.category}
                      </div>
                      <h3 className="font-bold text-lg text-white mb-2 leading-tight group-hover:text-syf-red transition-colors">
                        {product.name}
                      </h3>
                      
                      {/* Precio y Botón (al fondo) */}
                      <div className="mt-auto pt-4 flex items-center justify-between border-t border-white/10">
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-400 line-through">
                                {/* Opcional: Podrías poner un precio falso mayor para simular oferta */}
                            </span>
                            <span className="text-2xl font-bold text-white">
                                ${product.price}
                            </span>
                        </div>
                        <button className="bg-white/10 hover:bg-syf-red text-white p-2 rounded-full transition-all transform active:scale-95">
                          <ShoppingCart size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Estado Vacío
              <div className="flex flex-col items-center justify-center py-20 bg-white/5 rounded-xl border border-white/10 border-dashed">
                <Search size={64} className="text-gray-600 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">No encontramos resultados</h3>
                <p className="text-gray-400">Intentá con otra palabra clave o cambiá los filtros.</p>
                <button 
                  onClick={() => {setSearchTerm(""); setSelectedCategory("Todas");}}
                  className="mt-6 text-syf-red hover:text-white font-bold underline"
                >
                  Limpiar filtros
                </button>
              </div>
            )}
          </section>

        </div>
      </div>
    </div>
  );
}