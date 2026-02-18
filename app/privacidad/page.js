import Link from "next/link";
import { ArrowLeft, Lock } from "lucide-react";

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen bg-syf-dark text-white pt-28 pb-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <Link href="/" className="inline-flex items-center gap-2 text-syf-red hover:underline mb-8 font-bold">
          <ArrowLeft size={20} /> Volver al inicio
        </Link>
        <h1 className="text-4xl font-bold mb-8 flex items-center gap-3">
          <Lock className="text-syf-red" size={36} /> Política de Privacidad
        </h1>
        <div className="bg-white/5 p-8 rounded-xl border border-white/10 space-y-6 text-gray-300">
          <p>En Cerrajería SyF nos comprometemos a proteger tus datos personales. Esta política explica cómo manejamos tu información:</p>
          
          <h3 className="text-xl font-bold text-white">Uso de Datos</h3>
          <p>Los datos que nos proporcionás (nombre, teléfono, dirección) se utilizan <strong>únicamente</strong> para procesar tus pedidos, coordinar envíos y realizar la facturación correspondiente.</p>

          <h3 className="text-xl font-bold text-white">No compartimos información</h3>
          <p>No vendemos ni cedemos tus datos de contacto a terceros para fines publicitarios.</p>

          <h3 className="text-xl font-bold text-white">Seguridad</h3>
          <p>Nuestro sitio no almacena datos de tarjetas de crédito ni información bancaria, ya que los pagos se procesan a través de plataformas externas seguras (Mercado Pago, Bancos) o en efectivo.</p>
        </div>
      </div>
    </div>
  );
}