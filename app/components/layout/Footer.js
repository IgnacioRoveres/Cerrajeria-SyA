import Link from "next/link";
import { MapPin, Phone, Clock, Instagram, Facebook, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 pt-16 pb-8 border-t border-white/10">
      <div className="container mx-auto px-4">
        
        {/* GRILLA PRINCIPAL (3 Columnas) */}
        <div className="grid gap-12 md:grid-cols-3 mb-16">
          
          {/* COLUMNA 1: CONTACTO */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-syf-red uppercase tracking-wider">Contacto</h4>
            
            <ul className="space-y-4 text-sm">
              {/* Dirección */}
              <li className="flex items-start gap-3">
                <MapPin className="text-syf-red shrink-0" size={20} />
                <span>
                  Av. 7 3504, <br/> 
                  Villa Elvira, Buenos Aires <br/>
                  CP B1914
                </span>
              </li>

              {/* Teléfono */}
              <li className="flex items-center gap-3">
                <Phone className="text-syf-red shrink-0" size={20} />
                <span>+54 9 022 544121</span>
              </li>

              {/* Horarios */}
              <li className="flex items-start gap-3">
                <Clock className="text-syf-red shrink-0" size={20} />
                <div className="space-y-1">
                  <p className="font-bold text-white">Horarios de Atención:</p>
                  <p>Lunes a Viernes: 8:30 - 19:00</p>
                  <p>Sábados: 9:00 - 13:00</p>
                  <p>Domingos: Cerrado</p>
                </div>
              </li>
            </ul>
          </div>

          {/* COLUMNA 2: REDES Y DATA FISCAL */}
          <div className="flex flex-col items-center text-center space-y-8">
            
            {/* Redes */}
            <div className="w-full">
              <h4 className="text-lg font-bold text-syf-red uppercase tracking-wider mb-4 text-left md:text-center">
                Redes Sociales
              </h4>
              <p className="text-sm mb-4 text-left md:text-center">Seguinos para ofertas y novedades</p>
              
              <div className="flex gap-3 justify-start md:justify-center">
                <a href="https://www.instagram.com/cerrajeriasyf01/" className="flex h-10 w-10 items-center justify-center rounded bg-white/10 hover:bg-syf-red hover:text-white transition-all">
                  <Instagram size={20} />
                </a>
                <a href="#" className="flex h-10 w-10 items-center justify-center rounded bg-white/10 hover:bg-syf-red hover:text-white transition-all">
                  <Facebook size={20} />
                </a>
                <a href="#" className="flex h-10 w-10 items-center justify-center rounded bg-white/10 hover:bg-syf-red hover:text-white transition-all">
                  <MessageCircle size={20} />
                </a>
              </div>
            </div>

            {/* DATA FISCAL (Simulación del Cartel de AFIP) */}
            <div className="mt-4 bg-white p-2 rounded w-32 h-auto hover:opacity-90 transition-opacity cursor-pointer">
               {/* Acá va la imagen real del QR de AFIP cuando la tenga */}
               <div className="border border-gray-300 p-1 flex flex-col items-center justify-center h-full text-center">
                  <span className="text-black font-bold text-[10px] leading-tight">DATA FISCAL</span>
                  <span className="text-gray-500 text-[8px]">AFIP - Datos registrados</span>
                  {/* Icono simulado de QR */}
                  <div className="mt-1 grid grid-cols-2 gap-0.5 opacity-50">
                    <div className="w-2 h-2 bg-black"></div>
                    <div className="w-2 h-2 bg-black"></div>
                    <div className="w-2 h-2 bg-black"></div>
                    <div className="w-2 h-2 bg-black"></div>
                  </div>
               </div>
            </div>

          </div>

          {/* COLUMNA 3: INFORMACIÓN LEGAL */}
          <div className="md:text-right">
            <h4 className="text-lg font-bold text-syf-red uppercase tracking-wider mb-6">Información Legal</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="#" className="hover:text-white transition-colors">Cómo comprar</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Preguntas Frecuentes</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Política de Garantías</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Términos y Condiciones</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Política de Privacidad</Link></li>
              <li>
                <Link href="#" className="hover:text-white transition-colors font-semibold mt-2 block">
                  Defensa al Consumidor
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* BARRA INFERIOR (Copyright) */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Logo Pequeño */}
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-syf-red text-white font-bold text-sm">
              S
            </div>
            <span className="font-bold text-white">Cerrajería SyF</span>
          </div>

          {/* Copyright y Developer */}
          <p className="text-xs text-gray-500 text-center md:text-right">
            © {new Date().getFullYear()} Cerrajería SyF - Developed by <span className="text-gray-300">Ignacio Roveres</span>
          </p>
        </div>

      </div>
    </footer>
  );
}