import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";

export default function TerminosPage() {
  return (
    <div className="min-h-screen bg-syf-dark text-white pt-28 pb-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <Link href="/" className="inline-flex items-center gap-2 text-syf-red hover:underline mb-8 font-bold">
          <ArrowLeft size={20} /> Volver al inicio
        </Link>
        <h1 className="text-4xl font-bold mb-8 flex items-center gap-3">
          <FileText className="text-syf-red" size={36} /> Términos y Condiciones
        </h1>
        <div className="bg-white/5 p-8 rounded-xl border border-white/10 space-y-6 text-gray-300">
          <p>Bienvenido al sitio web de Cerrajería SyF. Al utilizar nuestro catálogo y servicios, aceptás los siguientes términos:</p>
          
          <h3 className="text-xl font-bold text-white">1. Precios y Stock</h3>
          <p>Los precios publicados están expresados en pesos argentinos y pueden sufrir modificaciones sin previo aviso. La confirmación del stock se realiza al momento de procesar el pedido por WhatsApp.</p>

          <h3 className="text-xl font-bold text-white">2. Imágenes Ilustrativas</h3>
          <p>Las fotos de los productos son de carácter ilustrativo. Los repuestos pueden variar levemente en diseño según la partida del fabricante, sin afectar su compatibilidad o funcionamiento.</p>

          <h3 className="text-xl font-bold text-white">3. Responsabilidad del Usuario</h3>
          <p>Es responsabilidad del cliente verificar la compatibilidad del repuesto con su vehículo antes de confirmar la compra. Ofrecemos asesoramiento, pero la decisión final es del comprador.</p>
        </div>
      </div>
    </div>
  );
}