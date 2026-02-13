export default function About() {
  return (
    <section className="bg-syf-dark py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-12 md:grid-cols-2">
          
          {/* COLUMNA DE TEXTO */}
          <div className="space-y-8">
            
            {/* Título con la línea roja abajo */}
            <div className="relative">
              <h2 className="text-4xl font-bold text-white mb-4">
                Sobre Nosotros
              </h2>
              <div className="h-1.5 w-20 bg-syf-red rounded-full"></div>
            </div>

            {/* Texto destacado */}
            <h3 className="text-xl font-medium text-white">
              Especialistas en <span className="text-syf-red">seguridad automotor</span> y copias codificadas.
            </h3>

            {/* Párrafos descriptivos */}
            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>
                En <strong>Cerrajería SyF</strong> combinamos tecnología de punta con experiencia profesional 
                para ofrecer soluciones integrales en cerrajería automotriz, programación de llaves 
                y repuestos multimarca.
              </p>
              <p>
                Trabajamos con sistemas de última generación para garantizar la máxima seguridad 
                de tu vehículo. Atención personalizada y respaldo técnico garantizado en todo La Plata.
              </p>
            </div>

            {/* Estadísticas */}
            <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-8">
              <div>
                <p className="text-3xl font-bold text-syf-red">15+</p>
                <p className="text-sm text-gray-400">Años de experiencia</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-syf-red">8000+</p>
                <p className="text-sm text-gray-400">Clientes atendidos</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-syf-red">100%</p>
                <p className="text-sm text-gray-400">Garantía total</p>
              </div>
            </div>
          </div>

          {/* COLUMNA DE IMAGEN CON "FILTRO TALLER" */}
          <div className="relative h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
            
            {/* TRUCO: 
               1. grayscale: La pone en blanco y negro (oculta colores feos).
               2. brightness-75: La oscurece un poco (oculta suciedad/desorden).
               3. hover:grayscale-0: Si le pasan el mouse, se ve a color.
            */}
            <img 
              src="/images/taller.jpg" 
              alt="Taller Cerrajería SyF" 
              className="h-full w-full object-cover grayscale brightness-75 transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0 group-hover:brightness-100"
            />
            
            {/* Sombra extra para leer mejor si la foto es clara */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
          </div>

        </div>
      </div>
    </section>
  );
}