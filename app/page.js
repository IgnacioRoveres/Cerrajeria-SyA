import connectDB from "@/lib/db";
import Product from "@/models/Product";
import Hero from "./components/home/Hero"; 
import ProductCard from "./components/shop/ProductCard";

// 1. Convertimos la Home en una función ASYNC para poder pedir datos
export default async function Home() {
  
  // 2. Conectamos a la DB
  await connectDB();

  // 3. Buscamos productos reales (filtramos solo los "featured" y limitamos a 4)
  // .lean() convierte los datos complejos de Mongo en objetos simples de JS
  const productsDocs = await Product.find({ featured: true }).limit(4).lean();

  // 4. Limpieza de datos (Truco pro: Mongo devuelve _id como objeto, lo pasamos a texto)
  const products = productsDocs.map((product) => ({
    ...product,
    id: product._id.toString(), // Convertimos el _id raro de Mongo a un string normal
  }));

  return (
    <main className="flex min-h-screen flex-col bg-syf-dark">
      <Hero />
      
      <div className="container mx-auto px-4 py-16">
        <div className="mb-10 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-white">
            Repuestos <span className="text-syf-red">Destacados</span>
          </h2>
          <a href="/catalogo" className="text-sm font-medium text-gray-400 hover:text-white hover:underline">
            Ver todo el catálogo →
          </a>
        </div>

        {/* 5. Renderizamos los productos REALES */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className="text-white">No hay productos destacados por ahora.</p>
          )}
        </div>
      </div>
    </main>
  );
}