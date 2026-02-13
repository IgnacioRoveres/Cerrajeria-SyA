"use client";
import { useState, useEffect } from "react";
import { Search, ShoppingCart, Filter, ChevronRight, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CatalogoPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart(); // <--- TRAER LA FUNCIÓN
  
  // Filtros
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  
  // Estado para simular feedback de "Agregado al carrito"
  const [addedProduct, setAddedProduct] = useState(null);

  // 1. Cargar productos
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Error cargando productos:", error);
    } finally {
      setLoading(false);
    }
  };

  // 2. Lógica de Filtrado
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "Todos" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Función simulada de agregar al carrito
  const handleAddToCart = (product) => { // Recibe el producto entero, no solo el ID
    addToCart(product); // <--- GUARDA DE VERDAD
    setAddedProduct(product._id);
    setTimeout(() => setAddedProduct(null), 2000);
  };

  const categories = ["Todos", "Automotor", "Cerrajería", "Accesorios"];

  return (
    <div className="min-h-screen bg-syf-dark text-white pt-28 pb-12">
      <div className="container mx-auto px-4">
        
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* ================================================= */}
          {/* BARRA LATERAL (FILTROS) - 25% de ancho en PC */}
          {/* ================================================= */}
          <aside className="w-full lg:w-1/4 space-y-8">
            
            {/* Título Sidebar */}
            <div className="flex items-center gap-2 text-syf-red mb-4 border-b border-white/10 pb-2">
              <Filter size={20} />
              <h3 className="font-bold uppercase tracking-wider">Filtros</h3>
            </div>

            {/* Lista de Categorías */}
            <div className="space-y-2">
              <p className="text-sm font-semibold text-gray-400 mb-2 uppercase text-xs">Categorías</p>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center justify-between group ${
                    selectedCategory === cat 
                      ? "bg-syf-red text-white font-bold" 
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {cat}
                  {selectedCategory === cat && <ChevronRight size={16} />}
                </button>
              ))}
            </div>

            {/* Banner Publicitario Lateral (Opcional - Relleno visual) */}
            <div className="hidden lg:block bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl border border-white/5 mt-8 text-center">
              <p className="text-syf-red font-bold text-lg mb-2">Envío Gratis</p>
              <p className="text-gray-400 text-sm">En compras superiores a $150.000 en la zona de La Plata.</p>
            </div>

          </aside>


          {/* ================================================= */}
          {/* CONTENIDO PRINCIPAL (GRILLA) - 75% de ancho */}
          {/* ================================================= */}
          <main className="w-full lg:w-3/4">

            {/* BARRA SUPERIOR (Resultados + Buscador) */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
              
              {/* Contador de resultados */}
              <p className="text-gray-400 text-sm">
                Mostrando <span className="text-white font-bold">{filteredProducts.length}</span> productos
              </p>

              {/* Buscador (A la derecha) */}
              <div className="relative w-full md:w-64">
                <input 
                  type="text" 
                  placeholder="Buscar en catálogo..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-black border border-white/20 rounded-full py-2 pl-4 pr-10 text-sm text-white focus:outline-none focus:border-syf-red focus:ring-1 focus:ring-syf-red transition-all"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              </div>
            </div>

            {/* GRILLA DE PRODUCTOS */}
            {loading ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-syf-red"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div key={product._id} className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-syf-red/30 transition-all flex flex-col h-full">
                    
                    {/* Imagen */}
                    <div className="relative h-48 bg-black/40 overflow-hidden">
                      <img 
                        src={product.images?.[0] || "/placeholder.jpg"} 
                        alt={product.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Badge Stock */}
                      <div className="absolute top-2 left-2">
                        {product.stock > 0 ? (
                          <span className="bg-black/70 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded border border-white/10">
                            STOCK: {product.stock}
                          </span>
                        ) : (
                          <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded">
                            AGOTADO
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-4 flex-grow flex flex-col justify-between">
                      <div>
                        <p className="text-xs text-syf-red font-bold uppercase mb-1">{product.category}</p>
                        <h3 className="text-base font-bold text-white leading-tight mb-2">{product.title}</h3>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-white/5 flex items-end justify-between">
                        <div>
                          <p className="text-xl font-bold text-white">
                            ${new Intl.NumberFormat('es-AR').format(product.price)}
                          </p>
                          <p className="text-xs text-gray-500">Precio final</p>
                        </div>

                        {/* Botón Carrito */}
                        <button 
                          onClick={() => handleAddToCart(product)}
                          disabled={product.stock === 0}
                          className={`h-10 w-10 flex items-center justify-center rounded-full transition-all ${
                            addedProduct === product._id 
                              ? "bg-green-500 text-white" 
                              : "bg-white text-black hover:bg-syf-red hover:text-white"
                          } ${product.stock === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                          {addedProduct === product._id ? <Check size={20} /> : <ShoppingCart size={20} />}
                        </button>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}

            {/* Mensaje Sin Resultados */}
            {!loading && filteredProducts.length === 0 && (
              <div className="text-center py-12 bg-white/5 rounded-xl border border-dashed border-white/20">
                <p className="text-gray-400">No encontramos productos con ese nombre.</p>
                <button 
                  onClick={() => setSearchTerm("")} 
                  className="text-syf-red text-sm font-bold mt-2 hover:underline"
                >
                  Limpiar búsqueda
                </button>
              </div>
            )}

          </main>
        </div>
      </div>
    </div>
  );
}