import React from 'react';
import { Check, X, Sparkles, CreditCard, Smartphone, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

interface SolutionsComparisonProps {
  onOpenNfcDemo: () => void;
  onOpenMiniAppDemo: () => void;
  onOpenAdvisor: () => void;
}

export const SolutionsComparison: React.FC<SolutionsComparisonProps> = ({
  onOpenNfcDemo,
  onOpenMiniAppDemo,
  onOpenAdvisor,
}) => {
  const features = [
    { name: 'Tarjeta física inteligente personalizada', nfc: true, miniApp: true, note: 'Plástico rígido de alta durabilidad' },
    { name: 'Chip NFC NTAG integrado con toque de 1 segundo', nfc: true, miniApp: true, note: 'Transmisión inalámbrica instantánea' },
    { name: 'Código QR dinámico personalizado', nfc: true, miniApp: true, note: 'Escaneo con cámara estándar' },
    { name: 'Almacenamiento vCard Offline en chip (Sin Internet)', nfc: true, miniApp: true, note: 'Guarda en agenda telefónica' },
    { name: 'Datos de contacto y redes sociales (WhatsApp, teléfono)', nfc: true, miniApp: true, note: 'Acceso directo' },
    { name: 'Catálogo de productos y servicios interactivo', nfc: false, miniApp: true, note: 'Con fotos, fichas y categorías' },
    { name: 'Botón "Pedir por WhatsApp" en cada producto', nfc: false, miniApp: true, note: 'Mensaje pre-configurado con el nombre' },
    { name: 'Chatbot Asistente Virtual Inteligente', nfc: false, miniApp: true, note: 'Atención automatizada 24/7' },
    { name: 'Galería multimedia & Fotografías de alta resolución', nfc: false, miniApp: true, note: 'Instalaciones y productos' },
    { name: 'Horarios dinámicos con indicador "Abierto/Cerrado"', nfc: false, miniApp: true, note: 'Horario en tiempo real de Mexicali' },
    { name: 'Arquitectura PWA lista para guardar en pantalla de inicio', nfc: false, miniApp: true, note: 'Cero descargas en App Store' },
    { name: 'Panel editable para actualizar contenido', nfc: 'Básico', miniApp: 'Completo (CMS)', note: 'Administración rápida' },
  ];

  return (
    <section id="comparador" className="py-20 lg:py-32 bg-white relative overflow-hidden border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-xs font-mono text-red-600 font-bold">
            <Sparkles className="w-3.5 h-3.5 text-red-600" />
            <span>COMPARATIVA ESTRATÉGICA</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 font-heading tracking-tight">
            ¿CUÁL ES EL MODELO IDEAL <br />
            <span className="metallic-red-text">PARA TU NEGOCIO?</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Compara frente a frente las capacidades de ambas soluciones para decidir el punto de partida que mejor se adapte a tu objetivo comercial en Mexicali.
          </p>

          {/* Visual Recommendation Banner with exact prompt quote */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center max-w-2xl mx-auto shadow-sm">
            <p className="text-slate-800 font-semibold text-sm sm:text-base font-heading italic">
              «Comienza con una conexión inteligente o lleva tu negocio a una experiencia digital completa».
            </p>
          </div>
        </div>

        {/* Comparison Matrix Table */}
        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50">
          
          {/* Header Row */}
          <div className="grid grid-cols-12 bg-slate-50/90 p-4 sm:p-6 border-b border-slate-200 items-center text-center sm:text-left">
            <div className="col-span-12 sm:col-span-6 mb-4 sm:mb-0">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-500 font-bold">
                CARACTERÍSTICAS & BENEFICIOS
              </span>
            </div>

            {/* NFC Start Column Header */}
            <div className="col-span-6 sm:col-span-3 text-center px-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-slate-200 text-slate-800 text-xs font-bold mb-1 shadow-xs">
                <CreditCard className="w-3.5 h-3.5 text-red-600" />
                <span>NFC START</span>
              </div>
              <p className="text-[11px] text-slate-500">Solución rápida y accesible</p>
              <div className="mt-2 text-[10px] font-mono text-slate-700 bg-slate-100 py-1 px-2 rounded-lg font-semibold">
                Cotización por volumen
              </div>
            </div>

            {/* Mini App Premium Column Header */}
            <div className="col-span-6 sm:col-span-3 text-center px-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gradient-to-r from-red-600 to-red-700 text-white text-xs font-black shadow-md shadow-red-600/30 mb-1">
                <Smartphone className="w-3.5 h-3.5" />
                <span>MINI APP PREMIUM</span>
              </div>
              <p className="text-[11px] text-red-600 font-bold">Experiencia comercial total</p>
              <div className="mt-2 text-[10px] font-mono text-red-700 bg-red-50 border border-red-200 py-1 px-2 rounded-lg font-bold">
                Solución personalizada
              </div>
            </div>
          </div>

          {/* Feature Rows */}
          <div className="divide-y divide-slate-100">
            {features.map((item, idx) => (
              <div 
                key={idx} 
                className="grid grid-cols-12 p-3.5 sm:p-4 items-center hover:bg-slate-50/60 transition-colors text-xs sm:text-sm"
              >
                <div className="col-span-12 sm:col-span-6 mb-2 sm:mb-0">
                  <p className="font-bold text-slate-900">{item.name}</p>
                  <p className="text-[11px] text-slate-500">{item.note}</p>
                </div>

                {/* NFC Start Value */}
                <div className="col-span-6 sm:col-span-3 flex justify-center items-center">
                  {typeof item.nfc === 'boolean' ? (
                    item.nfc ? (
                      <div className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center">
                        <X className="w-3.5 h-3.5" />
                      </div>
                    )
                  ) : (
                    <span className="text-xs font-mono font-semibold text-slate-700 px-2.5 py-0.5 rounded bg-slate-100">
                      {item.nfc}
                    </span>
                  )}
                </div>

                {/* Mini App Premium Value */}
                <div className="col-span-6 sm:col-span-3 flex justify-center items-center">
                  {typeof item.miniApp === 'boolean' ? (
                    item.miniApp ? (
                      <div className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center shadow-xs">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center">
                        <X className="w-3.5 h-3.5" />
                      </div>
                    )
                  ) : (
                    <span className="text-xs font-mono font-bold text-red-700 px-2.5 py-0.5 rounded bg-red-50 border border-red-200">
                      {item.miniApp}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Footer Action Bar */}
          <div className="grid grid-cols-12 p-6 bg-slate-50/90 border-t border-slate-200 items-center gap-4">
            <div className="col-span-12 sm:col-span-6">
              <p className="text-xs text-slate-500 font-medium">
                * Todos los proyectos incluyen configuración personalizada por el equipo de NEXO DIGITAL MEXICALI.
              </p>
            </div>

            <div className="col-span-6 sm:col-span-3">
              <button
                onClick={onOpenNfcDemo}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-sm transition-colors cursor-pointer"
              >
                Probar NFC Start
              </button>
            </div>

            <div className="col-span-6 sm:col-span-3">
              <button
                onClick={onOpenMiniAppDemo}
                className="w-full py-2.5 px-3 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-md shadow-red-600/30 transition-colors cursor-pointer"
              >
                Probar Mini App
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
