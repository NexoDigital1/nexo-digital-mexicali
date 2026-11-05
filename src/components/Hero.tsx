import React from 'react';
import { useBusiness } from '../context/BusinessContext';
import { Smartphone, CreditCard, ArrowRight, Wifi, ShieldCheck, Zap, Sparkles } from 'lucide-react';

interface HeroProps {
  onExploreExperience: () => void;
  onExploreSolutions: () => void;
  onOpenNfcDemo: () => void;
  onOpenMiniAppDemo: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreExperience,
  onExploreSolutions,
  onOpenNfcDemo,
  onOpenMiniAppDemo,
}) => {
  const { profile } = useBusiness();

  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-32 bg-white">
      {/* Background soft ambient radial glow & subtle grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(220,38,38,0.06),rgba(255,255,255,0))] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-red-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Subtle Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(0,0,0,0.6) 1px, transparent 0)`,
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Announcement Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200/90 text-xs font-semibold text-slate-700 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-red-600 animate-pulse" />
            <span className="text-slate-900 font-mono tracking-wide">NEXO DIGITAL EXPERIENCE 2.0</span>
            <span className="text-slate-400">•</span>
            <span className="text-red-600 font-bold">Baja California, México</span>
          </div>
        </div>

        {/* Main Heading with Exact Requirements */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <div className="space-y-3">
            <h2 className="text-xs sm:text-sm md:text-base font-bold tracking-[0.28em] uppercase text-red-600 font-mono">
              NEXO DIGITAL MEXICALI
            </h2>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight font-heading leading-[1.08]">
              CONECTANDO A <br className="hidden sm:inline" />
              <span className="metallic-red-text">MEXICALI</span> AL MUNDO.
            </h1>
          </div>

          <p className="text-lg sm:text-xl md:text-2xl font-light text-slate-700 max-w-2xl mx-auto leading-relaxed">
            «Creamos conexiones inteligentes y experiencias digitales que impulsan los negocios».
          </p>

          <p className="text-sm md:text-base text-slate-500 max-w-xl mx-auto leading-relaxed">
            Descubre y experimenta en vivo los dos nuevos estándares comerciales de la región: 
            <strong className="text-slate-900 font-semibold"> NFC Mini App Start</strong> y <strong className="text-slate-900 font-semibold">Mini App Comercial Premium</strong>.
          </p>

          {/* Call to Actions with Exact Labels */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4">
            <button
              onClick={onExploreExperience}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl text-sm sm:text-base font-bold text-white bg-gradient-to-r from-red-600 via-red-500 to-red-700 shadow-xl shadow-red-600/30 hover:shadow-red-600/45 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>EXPLORAR EXPERIENCIA</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              onClick={onExploreSolutions}
              className="w-full sm:w-auto px-7 py-4 rounded-2xl text-sm sm:text-base font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200/80 border border-slate-200 hover:border-slate-300 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <span>CONOCE NUESTRAS SOLUCIONES</span>
            </button>
          </div>
        </div>

        {/* Dual Interactive Product Teasers Showcase with Enhanced Animations */}
        <div className="mt-14 lg:mt-20 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {/* Card 1: NFC Mini App Start Teaser */}
          <div 
            onClick={onOpenNfcDemo}
            className="group relative rounded-3xl p-6 lg:p-7 bg-white/90 backdrop-blur-2xl border border-slate-200/90 hover:border-red-500/50 transition-all duration-300 shadow-xl shadow-slate-200/60 hover:shadow-2xl hover:shadow-red-500/10 cursor-pointer overflow-hidden transform hover:-translate-y-1.5"
          >
            <div className="absolute top-0 right-0 w-44 h-44 bg-red-500/5 rounded-full blur-2xl group-hover:bg-red-500/15 transition-all" />

            <div className="flex items-center justify-between mb-5">
              <span className="text-[11px] font-mono font-bold tracking-wider uppercase px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                PRODUCTO 01 • NFC START
              </span>
              <span className="flex items-center gap-1 text-xs font-semibold text-red-600 group-hover:translate-x-1 transition-transform">
                Probar toque <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>

            {/* Visual representation of NFC Luxury White & Red Card with float animation */}
            <div className="relative my-4 p-5 rounded-2xl bg-gradient-to-tr from-slate-50 via-white to-slate-100 text-slate-900 shadow-lg border border-slate-200 card-shine transform transition-all duration-300 group-hover:rotate-1 group-hover:scale-[1.02]">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
                    <span className="text-xs font-black tracking-widest uppercase font-heading text-slate-900">
                      NEXO START
                    </span>
                  </div>
                  <h4 className="text-base font-extrabold text-slate-900 mt-1 truncate">
                    {profile.businessName}
                  </h4>
                  <p className="text-[11px] text-slate-600 truncate">{profile.ownerName}</p>
                </div>
                {/* Chip Graphic with wave indicator */}
                <div className="relative">
                  <div className="w-8 h-7 rounded-md bg-gradient-to-br from-amber-200 via-amber-300 to-amber-500 border border-amber-600/40 shadow-inner flex items-center justify-center">
                    <div className="w-4 h-4 border border-amber-800/40 rounded-sm"></div>
                  </div>
                  <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-600 animate-ping"></div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between pt-3 border-t border-slate-200">
                <div className="flex items-center gap-1.5 text-xs text-slate-700 font-medium">
                  <Wifi className="w-3.5 h-3.5 text-red-600 animate-pulse" />
                  <span>Chip NDEF + QR Offline</span>
                </div>
                <span className="text-[10px] font-mono bg-red-600 text-white px-2.5 py-0.5 rounded-full font-bold shadow-sm">
                  1 Toque
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-900 font-bold mt-3">
              «Tu negocio siempre a un toque».
            </p>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Tarjeta física personalizada con chip NFC y QR. Funciona sin descargar aplicaciones y almacena datos localmente.
            </p>
          </div>

          {/* Card 2: Mini App Comercial Premium Teaser */}
          <div 
            onClick={onOpenMiniAppDemo}
            className="group relative rounded-3xl p-6 lg:p-7 bg-white/90 backdrop-blur-2xl border-2 border-red-500/30 hover:border-red-500 transition-all duration-300 shadow-xl shadow-slate-200/60 hover:shadow-2xl hover:shadow-red-500/15 cursor-pointer overflow-hidden transform hover:-translate-y-1.5"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-red-500/10 rounded-full blur-3xl group-hover:bg-red-500/20 transition-all" />

            <div className="flex items-center justify-between mb-5">
              <span className="text-[11px] font-mono font-bold tracking-wider uppercase px-3 py-1 rounded-full bg-red-50 text-red-600 border border-red-200">
                PRODUCTO 02 • PRODUCTO ESTRELLA
              </span>
              <span className="flex items-center gap-1 text-xs font-semibold text-red-600 group-hover:translate-x-1 transition-transform">
                Abrir simulador <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>

            {/* Visual representation of Mini App Mobile Interface with subtle float */}
            <div className="relative my-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-md transform transition-all duration-300 group-hover:-rotate-1 group-hover:scale-[1.02]">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <img
                    src={profile.logoUrl}
                    alt={profile.businessName}
                    className="w-7 h-7 rounded-lg object-cover border border-red-500/40"
                  />
                  <div>
                    <span className="text-xs font-bold text-slate-900 block truncate max-w-[170px]">
                      {profile.businessName}
                    </span>
                    <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                      Abierto ahora en Mexicali
                    </span>
                  </div>
                </div>
                <div className="flex gap-1.5">
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-mono font-medium">
                    Catálogo
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-red-100 text-red-700 border border-red-200 font-mono font-bold">
                    Chatbot
                  </span>
                </div>
              </div>

              {/* Sample Product item inside teaser */}
              <div className="mt-3 flex items-center gap-3 p-2.5 rounded-xl bg-white border border-slate-200/90 shadow-xs">
                <img 
                  src={profile.products[0]?.image} 
                  alt="Product" 
                  className="w-12 h-12 rounded-lg object-cover border border-slate-100"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-slate-900 truncate">
                    {profile.products[0]?.name || 'Especialidad'}
                  </p>
                  <p className="text-[10px] text-slate-500 truncate">
                    {profile.products[0]?.description}
                  </p>
                </div>
                <span className="text-xs font-black text-red-600">
                  {profile.products[0]?.price || 'Ver'}
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-900 font-bold mt-3">
              «Tu negocio, llevado a otra dimensión digital».
            </p>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Mini app completa alojada en la web con catálogo interactivo, asistente virtual, galería multimedia y pedidos directos a WhatsApp.
            </p>
          </div>
        </div>

        {/* Region Trust Banner */}
        <div className="mt-14 pt-8 border-t border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-3">
            <p className="text-xl sm:text-2xl font-black text-slate-900 font-heading">0%</p>
            <p className="text-xs text-slate-500 mt-0.5 font-medium">Apps por descargar</p>
          </div>
          <div className="p-3">
            <p className="text-xl sm:text-2xl font-black text-red-600 font-heading">1 Toque</p>
            <p className="text-xs text-slate-500 mt-0.5 font-medium">Acceso NFC + QR</p>
          </div>
          <div className="p-3">
            <p className="text-xl sm:text-2xl font-black text-slate-900 font-heading">Android & iOS</p>
            <p className="text-xs text-slate-500 mt-0.5 font-medium">100% Compatible</p>
          </div>
          <div className="p-3">
            <p className="text-xl sm:text-2xl font-black text-red-600 font-heading">Mexicali, B.C.</p>
            <p className="text-xs text-slate-500 mt-0.5 font-medium">Soporte y entrega local</p>
          </div>
        </div>
      </div>
    </section>
  );
};
