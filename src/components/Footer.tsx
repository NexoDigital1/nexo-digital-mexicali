import React from 'react';
import { OFFICIAL_NEXO_INFO } from '../data/initialData';
import { Sparkles, MapPin, Mail, Globe, ArrowUp, Wifi, Smartphone, CreditCard } from 'lucide-react';

interface FooterProps {
  onOpenNfcDemo: () => void;
  onOpenMiniAppDemo: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenNfcDemo,
  onOpenMiniAppDemo,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-50 border-t border-slate-200 text-slate-600 text-xs relative overflow-hidden">
      {/* Decorative accent top line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-red-600 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Presentation */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-red-800 p-[1.5px] shadow-md shadow-red-600/25">
                <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                  <span className="font-extrabold text-white text-xl font-mono">
                    N<span className="text-red-500">.</span>
                  </span>
                </div>
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-lg font-heading tracking-wider">
                  NEXO DIGITAL <span className="metallic-red-text font-black">MEXICALI</span>
                </h3>
                <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-red-600">
                  CONECTANDO A MEXICALI AL MUNDO
                </p>
              </div>
            </div>

            <p className="text-slate-600 text-xs sm:text-sm max-w-md leading-relaxed">
              «Creamos conexiones inteligentes y experiencias digitales que impulsan los negocios». Plataforma comercial de nueva generación diseñada y desarrollada en Mexicali, Baja California.
            </p>

            <div className="flex items-center gap-3 text-slate-500 pt-1">
              <div className="flex items-center gap-1.5 font-medium">
                <MapPin className="w-3.5 h-3.5 text-red-600" />
                <span>Mexicali, Baja California, México</span>
              </div>
            </div>
          </div>

          {/* Solutions Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-900">
              PRODUCTOS DIGITALES
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <button
                  onClick={onOpenNfcDemo}
                  className="hover:text-red-600 transition-colors cursor-pointer flex items-center gap-1.5 text-slate-600"
                >
                  <CreditCard className="w-3.5 h-3.5 text-red-600" />
                  <span>NFC Mini App Start</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenMiniAppDemo}
                  className="hover:text-red-600 transition-colors cursor-pointer flex items-center gap-1.5 text-slate-600"
                >
                  <Smartphone className="w-3.5 h-3.5 text-red-600" />
                  <span>Mini App Comercial Premium</span>
                </button>
              </li>
              <li>
                <a
                  href="#comparador"
                  className="hover:text-red-600 transition-colors text-slate-600"
                >
                  Comparador de Modelos
                </a>
              </li>
              <li>
                <a
                  href="#educacion"
                  className="hover:text-red-600 transition-colors text-slate-600"
                >
                  Tecnología NFC & QR
                </a>
              </li>
            </ul>
          </div>

          {/* Standards & Philosophy */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-900">
              ESTÁNDARES TECNOLÓGICOS
            </h4>
            <div className="space-y-1.5 text-slate-600 text-xs font-medium">
              <p>• Compatible con Android e iOS</p>
              <p>• Chip NDEF NTAG216 de alta densidad</p>
              <p>• Códigos QR de corrección de error M</p>
              <p>• Catálogo PWA sin descargas en tienda</p>
              <p>• Asistente virtual seguro</p>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Slogan Bar */}
        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-[11px] text-center sm:text-left">
            © {new Date().getFullYear()} NEXO DIGITAL MEXICALI. Todos los derechos reservados.
            <span className="block sm:inline sm:ml-2 text-slate-700 font-mono font-bold">
              CONECTANDO A MEXICALI AL MUNDO.
            </span>
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200 shadow-xs transition-colors cursor-pointer text-xs font-semibold"
          >
            <span>Volver arriba</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
