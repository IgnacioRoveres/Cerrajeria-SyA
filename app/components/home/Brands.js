import Link from "next/link";
import { Zap } from "lucide-react"; // Importamos el rayito para Divaio y Vraeza

export default function Brands() {
  // En vez de un texto simple, armamos objetos con el nombre y el "Logo en Código"
  const brands = [
    {
      name: "Moura",
      logo: (
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1">
            <span className="text-blue-500 font-black italic text-3xl">M</span>
            <span className="text-white font-black italic text-2xl tracking-tighter">OURA</span>
          </div>
          <div className="flex w-full h-1 mt-1">
            <div className="w-1/2 bg-blue-500"></div>
            <div className="w-1/2 bg-yellow-400"></div>
          </div>
        </div>
      )
    },
    {
      name: "Divaio",
      logo: (
        <div className="bg-gray-100 px-3 py-1 rounded flex items-center justify-center relative overflow-hidden border border-white/20 shadow-inner">
          <span className="text-[#ff4500] font-black italic text-2xl tracking-tighter z-10 drop-shadow-sm">DIVAIO</span>
          <Zap className="text-yellow-400 fill-yellow-400 absolute w-8 h-8 opacity-60 z-0 rotate-12" />
        </div>
      )
    },
    {
      name: "Vraeza",
      logo: (
        <div className="flex flex-col items-center justify-center relative">
          <Zap className="text-yellow-400 fill-yellow-400 absolute w-10 h-10 opacity-40 z-0 -top-1" />
          <span className="text-orange-500 font-black italic text-2xl tracking-tighter z-10 drop-shadow-[0_2px_2px_rgba(0,0,0,1)]">VRAEZA</span>
          <span className="text-yellow-400 font-black text-[10px] tracking-widest z-10 uppercase mt-[-4px]">Baterías</span>
        </div>
      )
    },
    {
      name: "Bosch",
      logo: <span className="font-black text-2xl text-red-600 tracking-tighter uppercase">BOSCH</span>
    },
    {
      name: "Yale",
      logo: <span className="font-serif font-bold text-3xl text-yellow-500 tracking-widest uppercase">Yale</span>
    },
    {
      name: "Trabex",
      logo: <span className="font-black italic text-2xl text-blue-400 tracking-widest uppercase">TRABEX</span>
    },
    {
      name: "Fiat",
      logo: <span className="font-black text-2xl text-red-700 tracking-tighter uppercase">FIAT</span>
    },
    {
      name: "Volkswagen",
      logo: <span className="font-light text-xl text-white tracking-widest uppercase">Volkswagen</span>
    }
  ];

  return (
    <section className="py-20 bg-black border-t border-white/10">
      <div className="container mx-auto px-4">
        
        {/* Encabezados */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-2">
            Trabajamos con
          </h2>
          <p className="text-gray-400">
            Repuestos, baterías y sistemas de seguridad de primera línea
          </p>
        </div>

        {/* Grilla de Marcas */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6 mb-12">
          {brands.map((brand, index) => (
            <div 
              key={index}
              title={brand.name}
              className="group flex h-24 items-center justify-center rounded-xl border border-white/10 bg-white/5 p-4 transition-all hover:border-syf-red/50 hover:bg-white/10 hover:-translate-y-1 cursor-default"
            >
              {/* Contenedor del logo con el efecto blanco y negro que se colorea al pasar el mouse */}
              <div className="opacity-60 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0 scale-90 group-hover:scale-100">
                {brand.logo}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-gray-400 text-lg border-t border-white/10 pt-8 inline-block">
            Y muchas marcas más.{" "}
            <Link href="/contacto" className="text-white font-bold hover:text-syf-red transition-colors underline decoration-syf-red/30 underline-offset-4">
              Consultanos por tu vehículo específico.
            </Link>
          </p>
        </div>

      </div>
    </section>
  );
}