import React from 'react';
import { useBusiness } from '../context/BusinessContext';
import { Smartphone, CreditCard, Sliders, Sparkles, MessageCircle, ArrowRight, Printer, Calculator, Store } from 'lucide-react';

interface NavbarProps {
  onOpenNfcDemo: () => void;
  onOpenMiniAppDemo: () => void;
  onOpenAdmin: () => void;
  onOpenTableStand: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenNfcDemo,
  onOpenMiniAppDemo,
  onOpenAdmin,
  onOpenTableStand,
}) => {
  const { profile } = useBusiness();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#08090d]/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo & Slogan */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 via-red-600 to-red-800 p-[1.5px] shadow-lg shadow-red-600/30 group-hover:shadow-red-600/50 transition-all duration-300">
            <div className="w-full h-full bg-[#0d0e12] rounded-[10px] flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-red-600/20 to-transparent"></div>
              {/* Geometric N Icon */}
              <span className="font-extrabold text-white text-xl tracking-tighter font-mono group-hover:scale-110 transition-transform">
                N<span className="text-red-500">.</span>
              </span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-white text-lg tracking-wider font-heading">
                NEXO <span className="metallic-red-text font-black">DIGITAL</span>
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-red-950/80 text-red-300 border border-red-500/30 font-medium">
                MEXICALI
              </span>
            </div>
            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold font-mono">
              CONECTANDO A MEXICALI AL MUNDO
            </p>
          </div>
        </div>

        {/* Center Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs xl:text-sm font-medium text-slate-300">
          <button
            onClick={() => scrollToSection('giros-mexicali')}
            className="hover:text-white transition-colors cursor-pointer py-1 flex items-center gap-1.5"
          >
            <Store className="w-3.5 h-3.5 text-red-500" />
            <span>Giros Cachanillas</span>
          </button>
          <button
            onClick={() => scrollToSection('soluciones')}
            className="hover:text-white transition-colors cursor-pointer py-1"
          >
            Soluciones
          </button>
          <button
            onClick={() => scrollToSection('calculadora-roi')}
            className="hover:text-white transition-colors cursor-pointer py-1 flex items-center gap-1.5"
          >
            <Calculator className="w-3.5 h-3.5 text-emerald-400" />
            <span>Ahorro & ROI</span>
          </button>
          <button
            onClick={() => scrollToSection('comparador')}
            className="hover:text-white transition-colors cursor-pointer py-1"
          >
            Comparador
          </button>
          <button
            onClick={() => scrollToSection('asesor')}
            className="hover:text-white transition-colors cursor-pointer py-1"
          >
            Asesor
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Table Stand Generator button */}
          <button
            onClick={onOpenTableStand}
            title="Diseñar material de acrílico para mesas o mostrador"
            className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-red-400" />
            <span className="hidden xl:inline">Acrílico Mesas</span>
          </button>

          {/* Admin CMS Trigger */}
          <button
            onClick={onOpenAdmin}
            title="Personalizar datos del negocio en vivo"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all cursor-pointer"
          >
            <Sliders className="w-3.5 h-3.5 text-red-400" />
            <span className="hidden sm:inline">Panel Demo</span>
          </button>

          {/* Quick Demo Launchers */}
          <button
            onClick={onOpenNfcDemo}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/60 shadow-sm transition-all cursor-pointer"
          >
            <CreditCard className="w-3.5 h-3.5 text-red-400" />
            <span className="hidden md:inline">NFC Start</span>
          </button>

          <button
            onClick={onOpenMiniAppDemo}
            className="relative group overflow-hidden flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-red-600 via-red-500 to-red-700 shadow-md shadow-red-600/30 hover:shadow-red-600/50 transition-all cursor-pointer"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mini App</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </header>
  );
};
