import Link from "next/link";
import { Wrench, CarFront, Package, ArrowRight } from "lucide-react";

const categories = [
  {
    id: 1,
    title: "Cerrajería",
    description: "Llaves codificadas, telemandos y carcasas.",
    icon: Wrench,
    link: "/catalogo?category=Cerrajería",
  },
  {
    id: 2,
    title: "Repuestos",
    description: "Inyección, encendido y partes de motor.",
    icon: CarFront,
    link: "/catalogo?category=Automotor",
  },
  {
    id: 3,
    title: "Accesorios",
    description: "Complementos, estética y seguridad.",
    icon: Package,
    link: "/catalogo?category=Accesorios",
  },
];

export default function Categories() {
  return (
    <section className="py-20 bg-syf-dark">
      <div className="container mx-auto px-4">
        
        {/* Título de la Sección */}
        <div className="mb-12 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Categorías</h2>
            <p className="text-gray-400">Encontrá rápido lo que tu auto necesita</p>
          </div>
          {/* Enlace opcional "Ver todo" para desktop */}
          <Link href="/catalogo" className="hidden md:flex items-center gap-2 text-syf-red hover:text-white transition-colors">
            Ver todo el catálogo <ArrowRight size={18} />
          </Link>
        </div>

        {/* Grilla de Tarjetas */}
        <div className="grid gap-6 md:grid-cols-3">
          {categories.map((cat) => (
            <Link 
              key={cat.id} 
              href={cat.link}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 transition-all hover:-translate-y-1 hover:border-syf-red/50 hover:bg-white/10"
            >
              {/* Ícono con fondo rojo */}
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-lg bg-syf-red text-white shadow-lg shadow-red-900/20 transition-transform group-hover:scale-110">
                <cat.icon size={28} strokeWidth={1.5} />
              </div>

              {/* Texto */}
              <h3 className="mb-2 text-xl font-bold text-white group-hover:text-syf-red transition-colors">
                {cat.title}
              </h3>
              <p className="text-sm text-gray-400 group-hover:text-gray-300">
                {cat.description}
              </p>

              {/* Decoración sutil de fondo (Glow) */}
              <div className="absolute -right-4 -bottom-4 h-24 w-24 rounded-full bg-syf-red/10 blur-2xl transition-all group-hover:bg-syf-red/20" />
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}