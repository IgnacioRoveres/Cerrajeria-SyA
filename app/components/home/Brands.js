import Link from "next/link";

export default function Brands() {
  const brands = [
    "Fiat",
    "Volkswagen",
    "Ford",
    "Chevrolet",
    "Toyota",
    "Yale",
    "Bosch",
    "Moura",
  ];

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        
        {/* Encabezados */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-2">
            Trabajamos con
          </h2>
          <p className="text-gray-400">
            Repuestos y sistemas de seguridad multimarca
          </p>
        </div>

        {/* Grilla de Marcas */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {brands.map((brand, index) => (
            <div 
              key={index}
              className="group flex h-24 items-center justify-center rounded-xl border border-white/10 bg-white/5 p-4 transition-all hover:border-syf-red/50 hover:bg-white/10 hover:-translate-y-1"
            >
              {/* TIP PRO: Cuando tengas los logos, comentá la línea del <span> 
                 y descomentá la de la <img> de abajo.
              */}
              
              {/* OPCIÓN A: TEXTO (Como tu diseño actual) */}
              <span className="text-xl font-bold text-gray-300 group-hover:text-white transition-colors">
                {brand}
              </span>

              {/* OPCIÓN B: LOGO (Para el futuro) */}
              {/* <img 
                src={`/logos/${brand.toLowerCase()}.svg`} 
                alt={brand} 
                className="h-8 w-auto opacity-50 grayscale transition-all group-hover:opacity-100 group-hover:grayscale-0" 
              /> 
              */}
              
            </div>
          ))}
        </div>
        <div className="text-center">
          <p className="text-gray-400 text-lg">
            Y muchas marcas más.{" "}
            <Link href="/contacto" className="text-white font-bold hover:text-syf-red transition-colors">
              Consultanos por tu vehículo específico.
            </Link>
          </p>
        </div>

      </div>
    </section>
  );
}