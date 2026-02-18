import Link from "next/link";

// Función para traer los datos (sin guardar caché vieja)
async function getFeaturedProducts() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://cerrajeria-sya.vercel.app/";
    
    const res = await fetch(`${apiUrl}/api/products`, { cache: "no-store" });
    
    if (!res.ok) return [];
    
    const products = await res.json();
    
    // Filtramos solo los que tienen el tilde "featured" activado
    return products.filter((product) => product.featured === true);
  } catch (error) {
    console.error("Error cargando destacados:", error);
    return [];
  }
}

export default async function FeaturedProducts() {
  const products = await getFeaturedProducts();

  // Si no hay destacados, no mostramos nada (o podés poner un mensaje)
  if (products.length === 0) return null;

  return (
    <section className="py-20 bg-syf-dark relative overflow-hidden">
      {/* Fondo decorativo sutil */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-syf-red/5 via-transparent to-transparent opacity-50 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-bold text-white mb-2">
              Productos destacados
            </h2>
            <p className="text-gray-400">Las mejores ofertas en insumos y repuestos.</p>
          </div>
          <Link 
            href="/catalogo" 
            className="hidden md:block text-syf-red hover:text-white font-bold border-b border-syf-red hover:border-white transition-all"
          >
            Ver Catálogo Completo &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div 
              key={product._id} 
              className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-syf-red hover:shadow-[0_0_20px_rgba(230,57,70,0.2)] transition-all duration-300"
            >
              {/* Imagen del Producto */}
              <div className="relative h-48 overflow-hidden bg-black/20">
                <img 
                  src={product.image || "/images/placeholder.jpg"} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-2 right-2 bg-syf-red text-white text-xs font-bold px-2 py-1 rounded shadow-lg">
                  OFERTA
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <div className="text-xs text-gray-500 mb-1 uppercase tracking-wider">{product.category}</div>
                <h3 className="text-lg font-bold text-white mb-2 truncate" title={product.name}>
                  {product.name}
                </h3>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-2xl font-bold text-white">
                    ${product.price}
                  </span>
                  <Link 
                    href={`/catalogo?buscar=${product.name}`} 
                    className="bg-white/10 hover:bg-syf-red text-white p-2 rounded-lg transition-colors"
                  >
                    🛒
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Botón móvil para ver catálogo */}
        <div className="mt-8 text-center md:hidden">
            <Link 
            href="/catalogo" 
            className="inline-block bg-white/10 text-white px-6 py-3 rounded-lg font-bold hover:bg-syf-red transition-colors"
            >
            Ver Todo el Catálogo
            </Link>
        </div>
      </div>
    </section>
  );
}