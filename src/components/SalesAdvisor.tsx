import React, { useState } from 'react';
import { SolutionType } from '../types';
import { OFFICIAL_NEXO_INFO } from '../data/initialData';
import { 
  CreditCard, 
  Smartphone, 
  Layers, 
  MessageCircle, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Building2, 
  User, 
  Briefcase 
} from 'lucide-react';

interface SalesAdvisorProps {
  onOpenNfcDemo: () => void;
  onOpenMiniAppDemo: () => void;
}

export const SalesAdvisor: React.FC<SalesAdvisorProps> = ({
  onOpenNfcDemo,
  onOpenMiniAppDemo,
}) => {
  const [selectedSolution, setSelectedSolution] = useState<SolutionType>('both');
  const [businessName, setBusinessName] = useState('');
  const [contactName, setContactName] = useState('');
  const [industry, setIndustry] = useState('Gastronomía / Restaurante');
  const [hasCatalog, setHasCatalog] = useState(true);

  // Generate WhatsApp message formatted for Nexo Digital Mexicali
  const generateWhatsAppMessage = () => {
    const solutionText = 
      selectedSolution === 'nfc_start' 
        ? 'NFC MINI APP START (Tarjeta física inteligente)' 
        : selectedSolution === 'mini_app_premium' 
          ? 'MINI APP COMERCIAL PREMIUM (Catálogo + Chatbot + Web App)' 
          : 'SOLUCIÓN INTEGRAL (Tarjeta NFC + Mini App Comercial Premium)';

    const msg = `¡Hola NEXO DIGITAL MEXICALI!
Eslogan: "Conectando a Mexicali al Mundo"

Me interesa solicitar información comercial para mi negocio:
• Negocio: ${businessName || '[Nombre de mi negocio]'}
• Contacto: ${contactName || '[Mi nombre]'}
• Giro Comercial: ${industry}
• Solución que me interesa: ${solutionText}
• Cuenta con catálogo/productos: ${hasCatalog ? 'Sí' : 'No (requiero asesoría)'}

¿Podrían brindarme información de propuesta y tiempos de implementación en Mexicali? Gracias.`;

    return encodeURIComponent(msg);
  };

  const handleSendWhatsApp = () => {
    // Uses official WhatsApp link without inventing fake phone numbers
    const msg = generateWhatsAppMessage();
    // If WhatsApp number is configured, use it, else use generic wa.me link
    window.open(`https://wa.me/?text=${msg}`, '_blank');
  };

  return (
    <section id="asesor" className="py-20 lg:py-32 bg-[#0c0d13] relative overflow-hidden">
      {/* Decorative gradient overlay */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/60 border border-red-500/30 text-xs font-mono text-red-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ASESOR COMERCIAL INTERACTIVO</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-heading tracking-tight">
            ¿QUÉ SOLUCIÓN NECESITA <br />
            <span className="metallic-red-text">TU NEGOCIO?</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Selecciona tu objetivo y te ayudaremos a estructurar la mejor estrategia digital para cautivar a tus clientes en Mexicali.
          </p>
        </div>

        {/* 3 Main Choice Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          
          {/* Option 1: Quiero una tarjeta NFC */}
          <div
            onClick={() => setSelectedSolution('nfc_start')}
            className={`p-6 rounded-3xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
              selectedSolution === 'nfc_start'
                ? 'bg-[#181a26] border-red-500 shadow-xl shadow-red-950/40 ring-1 ring-red-500'
                : 'bg-[#12141c] border-white/10 hover:border-white/20'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-red-500">
                  <CreditCard className="w-6 h-6" />
                </div>
                {selectedSolution === 'nfc_start' && (
                  <CheckCircle2 className="w-5 h-5 text-red-500" />
                )}
              </div>
              <h4 className="text-lg font-bold text-white font-heading">
                Quiero una tarjeta NFC
              </h4>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Ideal si buscas una tarjeta física de presentación inteligente que comparta tus datos al instante sin internet y dirija a tus clientes a tu WhatsApp.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="text-red-400 font-semibold font-mono">NFC START</span>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenNfcDemo();
                }}
                className="text-slate-300 hover:text-white underline text-[11px]"
              >
                Ver demo
              </button>
            </div>
          </div>

          {/* Option 2: Quiero una mini app comercial */}
          <div
            onClick={() => setSelectedSolution('mini_app_premium')}
            className={`p-6 rounded-3xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
              selectedSolution === 'mini_app_premium'
                ? 'bg-[#181a26] border-red-500 shadow-xl shadow-red-950/40 ring-1 ring-red-500'
                : 'bg-[#12141c] border-white/10 hover:border-white/20'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-red-950/60 border border-red-500/30 flex items-center justify-center text-red-400">
                  <Smartphone className="w-6 h-6" />
                </div>
                {selectedSolution === 'mini_app_premium' && (
                  <CheckCircle2 className="w-5 h-5 text-red-500" />
                )}
              </div>
              <h4 className="text-lg font-bold text-white font-heading">
                Quiero una mini app comercial
              </h4>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Ideal para negocios con catálogo, productos, galería, horarios y que desean un asistente virtual inteligente para responder dudas y recibir pedidos.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="text-red-400 font-semibold font-mono">MINI APP PREMIUM</span>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenMiniAppDemo();
                }}
                className="text-slate-300 hover:text-white underline text-[11px]"
              >
                Ver demo
              </button>
            </div>
          </div>

          {/* Option 3: Quiero conocer ambas opciones */}
          <div
            onClick={() => setSelectedSolution('both')}
            className={`p-6 rounded-3xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
              selectedSolution === 'both'
                ? 'bg-[#181a26] border-red-500 shadow-xl shadow-red-950/40 ring-1 ring-red-500'
                : 'bg-[#12141c] border-white/10 hover:border-white/20'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-red-600 to-red-800 text-white flex items-center justify-center">
                  <Layers className="w-6 h-6" />
                </div>
                {selectedSolution === 'both' && (
                  <CheckCircle2 className="w-5 h-5 text-red-500" />
                )}
              </div>
              <h4 className="text-lg font-bold text-white font-heading">
                Quiero conocer ambas opciones
              </h4>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                El ecosistema completo: tarjeta física NFC para ti o tus colaboradores + Mini App comercial alojada en la web con catálogo y chatbot.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="text-red-400 font-semibold font-mono">PAQUETE COMPLETO</span>
              <span className="text-slate-400 text-[11px]">Recomendado</span>
            </div>
          </div>

        </div>

        {/* Lead Capture and WhatsApp Inquiry Card */}
        <div className="bg-[#141622] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="border-b border-white/10 pb-4">
            <h4 className="text-lg font-bold text-white font-heading">
              Configura tu solicitud para NEXO DIGITAL MEXICALI
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Completa los datos básicos de tu negocio para generar tu solicitud comercial directa por WhatsApp.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-red-500" />
                <span>Nombre de tu negocio o marca:</span>
              </label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="Ej. Taquería El Cachanilla, Clínica Dental, etc."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e1017] border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-red-500" />
                <span>Nombre del titular o responsable:</span>
              </label>
              <input
                type="text"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="Ej. Ing. Carlos Mendoza"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e1017] border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-red-500" />
                <span>Giro comercial en Mexicali:</span>
              </label>
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e1017] border border-white/10 text-white text-xs focus:outline-none focus:border-red-500"
              >
                <option value="Gastronomía / Restaurante / Café">Gastronomía / Restaurante / Café</option>
                <option value="Salud / Dental / Médico">Salud / Dental / Médico</option>
                <option value="Servicios Profesionales / Legal / Contable">Servicios Profesionales / Legal / Contable</option>
                <option value="Automotriz / Taller / Detallado">Automotriz / Taller / Detallado</option>
                <option value="Boutique / Moda / Retail">Boutique / Moda / Retail</option>
                <option value="Construcción / Arquitectura / Inmobiliaria">Construcción / Arquitectura / Inmobiliaria</option>
                <option value="Otro giro comercial">Otro giro comercial</option>
              </select>
            </div>

            <div className="flex flex-col justify-end">
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                ¿Requieres catálogo de productos o menú?
              </label>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="radio"
                    name="hasCatalog"
                    checked={hasCatalog}
                    onChange={() => setHasCatalog(true)}
                    className="accent-red-600"
                  />
                  <span>Sí, tengo productos/servicios</span>
                </label>
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="radio"
                    name="hasCatalog"
                    checked={!hasCatalog}
                    onChange={() => setHasCatalog(false)}
                    className="accent-red-600"
                  />
                  <span>Solo datos de contacto</span>
                </label>
              </div>
            </div>
          </div>

          {/* Action CTA Button */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
            <div className="text-xs text-slate-400">
              <span>El número de WhatsApp de NEXO DIGITAL se configurará oficialmente. Este enlace genera el mensaje listo para enviar.</span>
            </div>

            <button
              onClick={handleSendWhatsApp}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Solicitar Información Comercial por WhatsApp</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
