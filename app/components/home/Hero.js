import Link from 'next/link';
import { ArrowRight, Wrench } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative w-full py-20 md:py-32 overflow-hidden bg-syf-dark">
      {/* Fondo con efecto degradado "Industrial" */}
      <div className="absolute inset-0 bg-gradient-to-br from-syf-dark via-[#1a1a1a] to-black opacity-90" />
      
      {/* Círculos decorativos de fondo (para que no quede plano) */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 h-96 w-96 rounded-full bg-syf-red/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 h-96 w-96 rounded-full bg-white/5 blur-3xl" />

      <div className="container relative mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          
          {/* Badge superior */}
          <div className="mb-6 inline-flex items-center rounded-full border border-syf-red/30 bg-syf-red/10 px-3 py-1 text-sm font-medium text-syf-red">
            <span className="mr-2 flex h-2 w-2 rounded-full bg-syf-red"></span>
            Envíos a todo La Plata 
          </div>

          {/* Título Principal */}
          <h1 className="mb-6 max-w-4xl text-4xl font-extrabold tracking-tight text-white md:text-6xl lg:text-7xl">
            Soluciones en <span className="text-syf-red">Cerrajería</span> <br className="hidden md:block" />
            y Repuestos Automotor
          </h1>

          {/* Subtítulo */}
          <p className="mb-10 max-w-2xl text-lg text-gray-400 md:text-xl">
            Especialistas en llaves codificadas, telemandos y electrónica. 
            Encontrá el repuesto que buscás o consultá por nuestros servicios de taller.
          </p>

          {/* Botones de Acción */}
          <div className="flex flex-col w-full gap-4 sm:flex-row sm:w-auto sm:justify-center">
            {/* Botón Rojo: Ir al Catálogo */}
            <Link 
              href="/catalogo" 
              className="inline-flex items-center justify-center rounded-lg bg-syf-red px-8 py-4 text-base font-bold text-white transition-all hover:bg-red-700 hover:scale-105"
            >
              Ver Catálogo
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>

            {/* Botón Transparente: Servicios */}
            <Link 
              href="/servicios" 
              className="inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/5 px-8 py-4 text-base font-medium text-white backdrop-blur-sm transition-all hover:bg-white/10"
            >
              <Wrench className="mr-2 h-5 w-5" />
              Nuestros Servicios
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}