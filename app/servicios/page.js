"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Wrench, MessageCircle } from "lucide-react";

export default function ServiciosPage() {
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        // 🔥 MAGIA: Filtramos SOLO los que son categoría "Servicios"
        const soloServicios = data.filter(item => item.category === "Servicios");
        setServicios(soloServicios);
        setLoading(false);
      })
      .catch((err) => console.error("Error cargando servicios:", err));
  }, []);

  const handleConsultar = (nombreServicio) => {
    const phoneNumber = "5492213620962"; // Ya puse el tuyo real
    const text = `Hola SyF! 👋 Quiero consultar por el servicio de: *${nombreServicio}*`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-syf-dark text-white pt-28 pb-12">
      <div className="container mx-auto px-4 max-w-5xl">
        
        <div className="mb-12 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-syf-red hover:underline mb-4 font-bold">
            <ArrowLeft size={20} /> Volver al inicio
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold flex items-center justify-center gap-3">
            <Wrench className="text-syf-red" size={40} /> Nuestros Servicios
          </h1>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Soluciones integrales de cerrajería automotor y residencial. 
            Trabajamos con herramientas de última generación.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {[1,2,3,4].map(i => <div key={i} className="h-64 bg-white/5 rounded-xl animate-pulse border border-white/10"></div>)}
          </div>
        ) : servicios.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {servicios.map((servicio) => (
              <div key={servicio._id} className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden flex flex-col sm:flex-row hover:border-syf-red hover:shadow-lg hover:shadow-syf-red/10 transition-all group">
                
                {/* Imagen del Servicio */}
                <div className="sm:w-2/5 h-48 sm:h-auto bg-black relative overflow-hidden p-2">
                  <img 
                    src={servicio.image || "https://placehold.co/600x400/1a1a1a/crimson?text=Servicio"} 
                    alt={servicio.name} 
                    className="w-full h-full object-cover rounded-xl group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100" 
                  />
                </div>

                {/* Info del Servicio */}
                <div className="p-6 sm:w-3/5 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{servicio.name}</h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">{servicio.description}</p>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xl font-bold text-syf-red">
                      {servicio.price > 0 ? `$${servicio.price}` : "Consultar"}
                    </span>
                    <button 
                      onClick={() => handleConsultar(servicio.name)}
                      className="flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white px-4 py-2 rounded-lg font-bold transition-colors text-sm"
                    >
                      <MessageCircle size={18} />
                      Consultar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-2">Próximamente</h3>
            <p className="text-gray-400">Estamos actualizando nuestra lista de servicios. Consultanos por WhatsApp.</p>
          </div>
        )}

      </div>
    </div>
  );
}