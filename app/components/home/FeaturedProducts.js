import connectDB from "@/lib/db";
import Product from "@/models/Product";
import ProductCard from "../shop/ProductCard"; // Ajustá la ruta según donde esté tu componente
import Link from "next/link"; // Usamos Link en vez de <a> para que sea más rápido

export default async function FeaturedProducts() {
  
  // 1. Conexión y Búsqueda (Igual que antes)
  await connectDB();
  const productsDocs = await Product.find({ featured: true }).limit(4).lean();

  // 2. Limpieza de datos
  const products = productsDocs.map((product) => ({
    ...product,
    _id: product._id.toString(), // Convertimos a string
    id: product._id.toString(),  // Por si tu card usa 'id' o '_id'
  }));

  return (
    <section className="py-16 bg-syf-dark">
      <div className="container mx-auto px-4">
        
        {/* Encabezado de la Sección */}
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Repuestos <span className="text-syf-red">Destacados</span>
            </h2>
            <p className="text-gray-400 text-sm">Lo más buscado por nuestros clientes</p>
          </div>
          
          <Link 
            href="/catalogo" 
            className="hidden md:flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white hover:text-syf-red transition-colors"
          >
            Ver todo el catálogo →
          </Link>
        </div>

        {/* Grilla de Productos */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <p className="text-gray-500 col-span-4 text-center py-10 border border-white/10 rounded-xl">
              No hay productos destacados por el momento.
            </p>
          )}
        </div>

        {/* Botón ver todo para Móvil (opcional, queda bien) */}
        <div className="mt-8 text-center md:hidden">
            <Link href="/catalogo" className="text-syf-red font-bold text-sm">
                Ver catálogo completo
            </Link>
        </div>

      </div>
    </section>
  );
}