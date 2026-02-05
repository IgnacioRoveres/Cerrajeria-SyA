import { ShoppingCart } from 'lucide-react';

export default function ProductCard({ product }) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-white/10 bg-syf-gray transition-all hover:border-syf-red/50 hover:shadow-lg hover:shadow-syf-red/10">
      
      {/* 1. ZONA DE IMAGEN */}
      <div className="relative aspect-square w-full overflow-hidden bg-white/5 p-4">
        
        {/* Lógica: Si tiene imagen, mostramos la foto. Si no, el ícono. */}
        {product.image ? (
          <img 
            src={product.image} 
            alt={product.name} 
            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-gray-500">
            <span className="text-4xl">🔧</span>
          </div>
        )}
        
        {/* Cartelito de Stock Bajo */}
        {product.stock > 0 && product.stock < 5 && (
          <span className="absolute right-2 top-2 rounded-full border border-orange-500/20 bg-orange-500/20 px-2 py-0.5 text-xs font-bold text-orange-500">
            Últimos {product.stock}
          </span>
        )}
        
         {/* Cartelito de Sin Stock */}
         {product.stock === 0 && (
          <span className="absolute right-2 top-2 rounded-full border border-red-500/20 bg-red-500/20 px-2 py-0.5 text-xs font-bold text-red-500">
            Agotado
          </span>
        )}
      </div>

      {/* 2. INFO DEL PRODUCTO */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 text-lg font-bold text-white" title={product.name}>
          {product.name}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-gray-400">
          {product.description}
        </p>

        <div className="mt-4 flex items-end justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500">Precio Lista</span>
            <span className="text-xl font-bold text-syf-red">
              ${product.price?.toLocaleString('es-AR')}
            </span>
          </div>

          <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-syf-dark transition-colors hover:bg-syf-red hover:text-white">
            <ShoppingCart className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}