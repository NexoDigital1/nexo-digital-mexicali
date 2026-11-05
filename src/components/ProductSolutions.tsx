import React from 'react';
import { useBusiness } from '../context/BusinessContext';
import { 
  CreditCard, 
  Smartphone, 
  Check, 
  QrCode, 
  Wifi, 
  Sparkles, 
  MessageSquare, 
  Layers, 
  Share2, 
  ArrowRight,
  ShieldAlert,
  Info
} from 'lucide-react';

interface ProductSolutionsProps {
  onOpenNfcDemo: () => void;
  onOpenMiniAppDemo: () => void;
}

export const ProductSolutions: React.FC<ProductSolutionsProps> = ({
  onOpenNfcDemo,
  onOpenMiniAppDemo,
}) => {
  const { profile } = useBusiness();

  return (
    <section id="soluciones" className="py-20 lg:py-32 bg-white relative overflow-hidden border-t border-slate-200">
      {/* Decorative ambient lights */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-800/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-xs font-mono text-red-600 font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PORTAFOLIO DE PRODUCTOS DIGITALES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 font-heading tracking-tight">
            DESCUBRE LAS SOLUCIONES <br />
            <span className="metallic-red-text">NEXO DIGITAL</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Selecciona y experimenta en vivo cualquiera de nuestros dos modelos diseñados para posicionar tu marca en Mexicali y el mercado global.
          </p>

          <div className="inline-flex items-center gap-2 text-xs text-amber-900 bg-amber-50 border border-amber-200 px-3.5 py-1.5 rounded-xl">
            <Info className="w-3.5 h-3.5 flex-shrink-0 text-amber-600" />
            <span>Los datos presentados son de demostración comercial interactiva (puedes editarlos en el Panel Demo).</span>
          </div>
        </div>

        {/* Dual Premium Product Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          
          {/* TARJETA 1: NFC MINI APP START */}
          <div className="relative rounded-3xl bg-white/90 backdrop-blur-2xl border border-slate-200 hover:border-slate-400/50 p-8 sm:p-10 flex flex-col justify-between shadow-xl shadow-slate-200/50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl group">
            {/* Top Label */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                  PRODUCTO 01
                </span>
                <span className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
                  <Wifi className="w-3.5 h-3.5 text-red-600" />
                  Contacto Inmediato
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                NEXO NFC MINI APP START
              </h3>
              
              <p className="text-red-600 font-bold text-lg italic mt-1 font-heading">
                «Tu negocio siempre a un toque».
              </p>

              <p className="text-slate-600 text-sm mt-4 leading-relaxed">
                La conexión física-digital más veloz del mercado. Una tarjeta NFC física de acabado prémium que transmite tus datos de contacto y enlace comercial a cualquier teléfono celular en menos de un segundo.
              </p>

              {/* Feature Checklist */}
              <div className="mt-8 space-y-3.5">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm text-slate-700">
                    <strong className="text-slate-900">Tarjeta NFC física personalizada:</strong> Plástico rígido prémium con logotipo comercial y detalles en rojo metálico.
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm text-slate-700">
                    <strong className="text-slate-900">Funciona sin Internet (NDEF Offline):</strong> Almacena vCard de contacto directamente en la memoria del chip NFC.
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm text-slate-700">
                    <strong className="text-slate-900">Código QR de respaldo integrado:</strong> Escaneo directo para teléfonos de cualquier generación.
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm text-slate-700">
                    <strong className="text-slate-900">Datos comerciales esenciales:</strong> WhatsApp directo, llamada telefónica, redes sociales y ubicación en Mexicali.
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Action Area */}
            <div className="mt-10 pt-6 border-t border-slate-200 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Ideal para: Profesionistas, Directores, Asesores de Ventas</span>
                <span className="text-slate-700 font-mono font-semibold">Sin suscripciones</span>
              </div>
              <button
                onClick={onOpenNfcDemo}
                className="w-full py-4 px-6 rounded-2xl text-sm sm:text-base font-bold text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 shadow-md flex items-center justify-center gap-2 group cursor-pointer transition-all"
              >
                <CreditCard className="w-5 h-5 text-red-400 group-hover:scale-110 transition-transform" />
                <span>EXPLORAR NFC START</span>
                <ArrowRight className="w-4 h-4 text-red-400 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* TARJETA 2: MINI APP COMERCIAL PREMIUM */}
          <div className="relative rounded-3xl bg-white/90 backdrop-blur-2xl border-2 border-red-500/40 hover:border-red-500 p-8 sm:p-10 flex flex-col justify-between shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
            {/* Top Star Badge */}
            <div className="absolute -top-3.5 right-8 px-4 py-1 rounded-full bg-gradient-to-r from-red-600 to-red-700 text-white text-[11px] font-black uppercase tracking-wider shadow-md shadow-red-600/30 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3" />
              <span>PRODUCTO ESTRELLA</span>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-red-50 text-red-600 border border-red-200">
                  PRODUCTO 02
                </span>
                <span className="text-xs font-bold text-red-600 flex items-center gap-1">
                  Experiencia 360°
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                MINI APP COMERCIAL PREMIUM
              </h3>

              <p className="text-red-600 font-bold text-lg italic mt-1 font-heading">
                «Tu negocio, llevado a otra dimensión digital».
              </p>

              <p className="text-slate-600 text-sm mt-4 leading-relaxed">
                Una aplicación web comercial completa, ligera e instantánea. Presenta tus productos, servicios, catálogo con pedidos por WhatsApp, asistente virtual inteligente y galería multimedia con diseño de vanguardia.
              </p>

              {/* Feature Checklist */}
              <div className="mt-8 space-y-3.5">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm text-slate-700">
                    <strong className="text-slate-900">Todo el acceso NFC + QR incluido:</strong> Abre la experiencia desde tarjetas físicas, códigos QR impresos o enlace web directo.
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm text-slate-700">
                    <strong className="text-slate-900">Catálogo comercial interactivo:</strong> Productos y servicios organizados con fotos, descripciones, categorías y botón de pedido a WhatsApp.
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm text-slate-700">
                    <strong className="text-slate-900">Chatbot Inteligente (Asistente Virtual):</strong> Bienvenida, orientación, resolución de dudas frecuentes y derivación a WhatsApp.
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm text-slate-700">
                    <strong className="text-slate-900">Galería multimedia & Estética iOS:</strong> Fotos de alta resolución, videos promocionales, microanimaciones y efectos de cristal.
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Action Area */}
            <div className="mt-10 pt-6 border-t border-slate-200 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Ideal para: Restaurantes, Clínicas, Boutiques, Empresas</span>
                <span className="text-red-600 font-bold font-mono">Conversión Máxima</span>
              </div>
              <button
                onClick={onOpenMiniAppDemo}
                className="w-full py-4 px-6 rounded-2xl text-sm sm:text-base font-bold text-white bg-gradient-to-r from-red-600 via-red-500 to-red-700 shadow-xl shadow-red-600/30 hover:shadow-red-600/50 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 group cursor-pointer transition-all"
              >
                <Smartphone className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>EXPLORAR MINI APP PREMIUM</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
