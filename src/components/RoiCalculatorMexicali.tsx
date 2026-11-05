import React, { useState } from 'react';
import { Calculator, DollarSign, TrendingUp, Sparkles, ArrowRight, MessageCircle, AlertCircle, CheckCircle2 } from 'lucide-react';

export const RoiCalculatorMexicali: React.FC = () => {
  const [dailyCustomers, setDailyCustomers] = useState<number>(25);
  const [averageTicket, setAverageTicket] = useState<number>(200);
  const [paperPrintSpend, setPaperPrintSpend] = useState<number>(2400);

  // Calculations
  // Monthly customers = daily * 26 working days
  const monthlyCustomers = dailyCustomers * 26;
  // Estimated 12% additional conversions due to fast catalog & WhatsApp direct ordering
  const additionalMonthlySalesCount = Math.round(monthlyCustomers * 0.08);
  const additionalMonthlyRevenue = additionalMonthlySalesCount * averageTicket;
  const annualSavedPaper = paperPrintSpend;

  const handleConsultWhatsApp = () => {
    const text = `Hola NEXO DIGITAL MEXICALI, utilicé la Calculadora de Retorno en su plataforma.
• Clientes diarios que atiendo: ${dailyCustomers}
• Ticket promedio: $${averageTicket} MXN
• Ahorro e ingresos proyectados: +$${additionalMonthlyRevenue.toLocaleString('es-MX')} MXN/mes

Me interesa una propuesta comercial para implementar mi Tarjeta NFC y Mini App.`;

    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="calculadora-roi" className="py-20 lg:py-28 bg-[#0b0d14] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/60 border border-red-500/30 text-xs font-mono text-red-300">
            <Calculator className="w-3.5 h-3.5" />
            <span>MÉTRICAS & IMPACTO ECONÓMICO</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-heading tracking-tight">
            ¿CUÁNTO DINERO PIERDE TU NEGOCIO <br />
            <span className="metallic-red-text">EN TARJETAS DE PAPEL Y VENTAS PERDIDAS?</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Calcula en segundos el ahorro y las ventas adicionales que una presencia digital inteligente generará para tu comercio en Mexicali.
          </p>
        </div>

        {/* Interactive Calculator Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#121420] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl">
          
          {/* Sliders Input Column (Col 6) */}
          <div className="lg:col-span-6 space-y-7">
            <div>
              <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-white mb-2">
                <span>Clientes o prospectos que te contactan al día:</span>
                <span className="text-base font-black text-red-400 font-mono">{dailyCustomers} clientes/día</span>
              </div>
              <input
                type="range"
                min="5"
                max="100"
                step="5"
                value={dailyCustomers}
                onChange={(e) => setDailyCustomers(Number(e.target.value))}
                className="w-full accent-red-600 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                <span>5 al día</span>
                <span>50 al día</span>
                <span>100 al día</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-white mb-2">
                <span>Ticket o venta promedio por cliente:</span>
                <span className="text-base font-black text-red-400 font-mono">${averageTicket} MXN</span>
              </div>
              <input
                type="range"
                min="50"
                max="1000"
                step="25"
                value={averageTicket}
                onChange={(e) => setAverageTicket(Number(e.target.value))}
                className="w-full accent-red-600 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                <span>$50 MXN (Tacos/Café)</span>
                <span>$500 MXN</span>
                <span>$1,000+ MXN (Salud/Taller)</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-white mb-2">
                <span>Gasto anual actual en papel (tarjetas, volantes, menús):</span>
                <span className="text-base font-black text-slate-300 font-mono">${paperPrintSpend} MXN/año</span>
              </div>
              <input
                type="range"
                min="800"
                max="5000"
                step="200"
                value={paperPrintSpend}
                onChange={(e) => setPaperPrintSpend(Number(e.target.value))}
                className="w-full accent-red-600 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                <span>$800 MXN</span>
                <span>$2,500 MXN</span>
                <span>$5,000+ MXN</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-950/40 border border-amber-500/30 text-xs text-amber-200 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Dato real del comercio:</strong> El 88% de las tarjetas de papel tradicionales se pierden o terminan en la basura en menos de 7 días. Con NFC, tu contacto queda guardado para siempre en la agenda de tu cliente.
              </span>
            </div>
          </div>

          {/* Results Column (Col 6) */}
          <div className="lg:col-span-6 bg-[#0a0b10] border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-red-400">
                PROYECCIÓN COMERCIAL ESTIMADA
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white font-heading mt-1">
                Retorno para tu Negocio en Mexicali
              </h3>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-400">Ahorro anual en tarjetas de papel e impresiones:</p>
                  <p className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">
                    ${annualSavedPaper.toLocaleString('es-MX')} MXN
                  </p>
                </div>
                <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0" />
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-r from-red-950/70 to-[#1e131d] border border-red-500/40 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-300">Ventas extra estimadas al mes por catálogo y WhatsApp:</p>
                  <p className="text-2xl sm:text-3xl font-black text-white font-mono">
                    +${additionalMonthlyRevenue.toLocaleString('es-MX')} <span className="text-xs text-red-400">MXN/mes</span>
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5 font-mono">
                    (~{additionalMonthlySalesCount} pedidos o citas cerradas adicionales)
                  </p>
                </div>
                <TrendingUp className="w-7 h-7 text-red-500 flex-shrink-0" />
              </div>
            </div>

            <div className="pt-2 border-t border-white/10">
              <p className="text-xs text-slate-400 mb-3 text-center sm:text-left">
                El costo de tu tarjeta NFC y Mini App se amortiza típicamente en los primeros <strong>7 a 15 días</strong> de uso.
              </p>
              <button
                onClick={handleConsultWhatsApp}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-red-600 via-red-500 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-xl shadow-red-600/35 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Solicitar Asesoría con estas Métricas por WhatsApp</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
