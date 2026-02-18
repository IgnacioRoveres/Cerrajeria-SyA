import Link from "next/link";
import { ArrowLeft, ShoppingCart, MessageCircle, CreditCard, Truck } from "lucide-react";

export default function ComoComprarPage() {
  const steps = [
    { icon: <ShoppingCart size={32} />, title: "1. Elegí tus productos", desc: "Navegá por nuestro catálogo y agregá lo que necesites al carrito." },
    { icon: <MessageCircle size={32} />, title: "2. Enviá tu pedido", desc: "Desde el carrito, hacé clic en 'Enviar por WhatsApp'. Se abrirá un chat con el detalle listo." },
    { icon: <CreditCard size={32} />, title: "3. Coordiná el pago", desc: "Te confirmamos el stock y te pasamos los datos para transferir o pagar con QR." },
    { icon: <Truck size={32} />, title: "4. Recibí tu compra", desc: "Despachamos por correo o podés retirar por el local." },
  ];

  return (
    <div className="min-h-screen bg-syf-dark text-white pt-28 pb-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <Link href="/" className="inline-flex items-center gap-2 text-syf-red hover:underline mb-8 font-bold">
          <ArrowLeft size={20} /> Volver al inicio
        </Link>
        <h1 className="text-4xl font-bold mb-8 text-syf-red">¿Cómo comprar?</h1>
        <div className="grid gap-6">
          {steps.map((step, i) => (
            <div key={i} className="bg-white/5 p-6 rounded-xl border border-white/10 flex gap-4 items-start">
              <div className="text-syf-red bg-white/10 p-3 rounded-lg">{step.icon}</div>
              <div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-300">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}