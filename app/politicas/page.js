import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PoliticasPage() {
  return (
    <div className="min-h-screen bg-syf-dark text-white pt-32 pb-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <Link href="/" className="inline-flex items-center gap-2 text-syf-red hover:underline mb-8">
          <ArrowLeft size={16} /> Volver al inicio
        </Link>
        
        <h1 className="text-4xl font-bold mb-8 text-white border-b border-white/10 pb-4">Políticas y Condiciones</h1>
        
        <div className="space-y-8 text-gray-300">
          <section>
            <h2 className="text-2xl font-bold text-white mb-2">1. Precios y Stock</h2>
            <p>Los precios publicados en el sitio web están expresados en pesos argentinos. Debido a la inestabilidad del mercado, los mismos pueden sufrir modificaciones sin previo aviso. La confirmación final del precio y la disponibilidad del stock se realizará vía WhatsApp al momento de procesar el pedido.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-2">2. Envíos y Retiros</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Retiro en Local:</strong> Podés retirar tu pedido sin cargo por nuestro taller en Zárate (horarios a coordinar).</li>
              <li><strong>Envíos:</strong> Realizamos envíos por moto-mensajería en Zárate y alrededores. El costo del envío corre por cuenta del comprador.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-2">3. Garantía y Devoluciones</h2>
            <p>Todos nuestros trabajos de cerrajería y repuestos cuentan con garantía por defectos de fabricación. Para validar la garantía, es necesario presentar el comprobante de compra. No se aceptan cambios de repuestos eléctricos una vez instalados, salvo falla comprobable de fábrica.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-2">4. Privacidad</h2>
            <p>Tus datos de contacto (teléfono, nombre) se utilizan únicamente para gestionar el pedido y coordinar la entrega. No compartimos tu información con terceros.</p>
          </section>
        </div>
      </div>
    </div>
  );
}