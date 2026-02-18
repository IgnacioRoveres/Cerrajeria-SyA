import Link from "next/link";
import { ArrowLeft, ShieldCheck, AlertTriangle } from "lucide-react";

export default function GarantiaPage() {
  return (
    <div className="min-h-screen bg-syf-dark text-white pt-28 pb-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <Link href="/" className="inline-flex items-center gap-2 text-syf-red hover:underline mb-8 font-bold">
          <ArrowLeft size={20} /> Volver al inicio
        </Link>
        <h1 className="text-4xl font-bold mb-8 flex items-center gap-3">
          <ShieldCheck className="text-syf-red" size={36} /> Política de Garantías
        </h1>
        
        <div className="space-y-8 text-gray-300">
          <section className="bg-white/5 p-6 rounded-xl border border-white/10">
            <h2 className="text-xl font-bold text-white mb-4">Cobertura General</h2>
            <p>Todos nuestros productos nuevos cuentan con garantía por defectos de fabricación por un plazo de 3 meses a partir de la fecha de compra. Para gestionar cualquier reclamo es obligatorio presentar el comprobante de compra o remito.</p>
          </section>

          <section className="bg-white/5 p-6 rounded-xl border border-red-500/30">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <AlertTriangle className="text-red-500" /> Excepciones Importantes
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Componentes Eléctricos:</strong> Las plaquetas electrónicas, telemandos, bobinas y módulos NO tienen cambio ni devolución una vez instalados, debido a que pueden dañarse por fallas en la instalación eléctrica del vehículo.</li>
              <li><strong>Mal Uso:</strong> La garantía no cubre daños provocados por instalación incorrecta, golpes, humedad o manipulación indebida.</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}