"use client";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { Trash2, MessageCircle, ArrowLeft } from "lucide-react";

export default function CarritoPage() {
  const { cart, removeFromCart, total, clearCart } = useCart(); // Ojo: en nuestro context le pusimos 'total', no 'totalPrice'

  // Generar mensaje de WhatsApp
  const handleCheckout = () => {
    // 1.Texto base legible
    let text = "Hola Cerrajería SyF! 👋\nQuiero consultar stock por este pedido:\n\n";
    
    cart.forEach((item) => {
      text += `▪ ${item.quantity}x ${item.name} ($${item.price * item.quantity})\n`;
    });

    text += `\n*Total Estimado: $${total}*`;
    
    // 2. Codificamos para que sea una URL válida de WhatsApp
    const encodedText = encodeURIComponent(text);
    
    // 3. Numero de Whatsapp
    const phoneNumber = "5492215544121"; 
    window.open(`https://wa.me/${phoneNumber}?text=${encodedText}`, "_blank");
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-syf-dark pt-32 pb-12 flex flex-col items-center justify-center text-center px-4">
        <div className="bg-white/5 p-8 rounded-full mb-6">
            <MessageCircle size={48} className="text-gray-500" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-4">Tu carrito está vacío</h2>
        <p className="text-gray-400 mb-8 max-w-md">Explorá nuestro catálogo para encontrar los repuestos y soluciones de seguridad que necesitás.</p>
        <Link href="/catalogo" className="bg-syf-red text-white px-8 py-3 rounded-full font-bold hover:bg-red-700 transition-colors shadow-lg shadow-syf-red/20">
          Ir al Catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-syf-dark text-white pt-28 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        
        <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
          <h1 className="text-3xl font-bold">Tu Pedido</h1>
          <button onClick={clearCart} className="text-sm text-gray-400 hover:text-syf-red underline transition-colors">
            Vaciar Carrito
          </button>
        </div>

        <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden mb-8">
          {cart.map((item) => (
            <div key={item._id} className="flex items-center gap-4 p-4 border-b border-white/10 last:border-0 hover:bg-white/5 transition-colors">
              
              {/* CORREGIDO: Usamos item.image (singular) */}
              <div className="h-20 w-20 bg-white rounded-lg overflow-hidden flex-shrink-0 border border-white/10 p-1">
                <img 
                  src={item.image || "https://placehold.co/600x400/1a1a1a/crimson?text=Sin+Imagen"} 
                  alt={item.name} 
                  className="h-full w-full object-contain" 
                />
              </div>
              
              {/* Info */}
              <div className="flex-grow">
                {/* CORREGIDO: Usamos item.name */}
                <h3 className="font-bold text-white text-lg">{item.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-gray-400">Cant: {item.quantity}</span>
                    <span className="text-sm text-gray-600">|</span>
                    <span className="text-sm text-gray-400">Unit: ${item.price}</span>
                </div>
              </div>

              {/* Total Item */}
              <div className="text-right mr-4 min-w-[80px]">
                <p className="font-bold text-syf-red text-lg">${item.price * item.quantity}</p>
              </div>

              {/* Borrar */}
              <button 
                onClick={() => removeFromCart(item._id)}
                className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-full transition-all"
                title="Eliminar producto"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>

        {/* Resumen Final */}
        <div className="bg-gradient-to-br from-black to-syf-dark p-8 rounded-2xl border border-white/10 shadow-2xl">
          <div className="flex justify-between items-end mb-8">
            <div>
                <span className="text-gray-400 block mb-1">Total Estimado</span>
                <p className="text-xs text-gray-500">Precios sujetos a confirmación de stock</p>
            </div>
            {/* CORREGIDO: Usamos total (que viene del context) */}
            <span className="text-4xl font-bold text-white">${total}</span>
          </div>

          <button 
            onClick={handleCheckout}
            className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-all transform hover:scale-[1.01] shadow-lg shadow-green-900/20"
          >
            <MessageCircle size={28} />
            <span className="text-lg">Finalizar pedido por WhatsApp</span>
          </button>
        </div>

        <div className="mt-8 text-center">
            <Link href="/catalogo" className="text-gray-400 hover:text-white flex items-center justify-center gap-2 transition-colors">
                <ArrowLeft size={16} /> Volver al catálogo
            </Link>
        </div>

      </div>
    </div>
  );
}