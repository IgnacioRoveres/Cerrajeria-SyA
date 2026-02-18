import Link from "next/link";
import { ArrowLeft, HelpCircle } from "lucide-react";

export default function FAQPage() {
  const faqs = [
    { q: "¿Tienen local a la calle?", a: "Sí, estamos en Zárate, Buenos Aires. Podés retirar tu pedido coordinando previamente el horario." },
    { q: "¿Hacen envíos a todo el país?", a: "Sí, despachamos a través de Correo Argentino y Vía Cargo. El costo del envío corre por cuenta del comprador." },
    { q: "¿Qué medios de pago aceptan?", a: "Aceptamos efectivo, transferencia bancaria, Cuenta DNI y Mercado Pago (tarjetas de crédito/débito)." },
    { q: "¿Hacen copias de llaves codificadas?", a: "Sí, realizamos copias y programación de llaves para la mayoría de las marcas y modelos de vehículos." },
    { q: "¿Los precios incluyen IVA?", a: "Los precios publicados en el catálogo son finales para consumidor final." },
  ];

  return (
    <div className="min-h-screen bg-syf-dark text-white pt-28 pb-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <Link href="/" className="inline-flex items-center gap-2 text-syf-red hover:underline mb-8 font-bold">
          <ArrowLeft size={20} /> Volver al inicio
        </Link>
        <h1 className="text-4xl font-bold mb-8 flex items-center gap-3">
          <HelpCircle className="text-syf-red" size={36} /> Preguntas Frecuentes
        </h1>
        <div className="space-y-4">
          {faqs.map((item, i) => (
            <div key={i} className="bg-white/5 p-6 rounded-xl border border-white/10">
              <h3 className="text-lg font-bold text-white mb-2">{item.q}</h3>
              <p className="text-gray-400">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}