import React, { useState } from 'react';
import { useBusiness, IndustryPresetKey } from '../context/BusinessContext';
import { 
  UtensilsCrossed, 
  Stethoscope, 
  Coffee, 
  Wrench, 
  Scissors, 
  ShoppingBag, 
  ArrowRight, 
  Sparkles, 
  Check, 
  Smartphone, 
  CreditCard,
  MapPin,
  TrendingUp,
  MessageCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface MexicaliIndustriesShowcaseProps {
  onOpenMiniAppDemo: () => void;
  onOpenNfcDemo: () => void;
}

export const MexicaliIndustriesShowcase: React.FC<MexicaliIndustriesShowcaseProps> = ({
  onOpenMiniAppDemo,
  onOpenNfcDemo,
}) => {
  const { loadTemplate, profile } = useBusiness();
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryPresetKey>('tacos');
  const [justActivated, setJustActivated] = useState<string | null>(null);

  const industries: {
    key: IndustryPresetKey;
    icon: React.ElementType;
    title: string;
    tagline: string;
    sampleBiz: string;
    address: string;
    benefits: string[];
    highlight: string;
  }[] = [
    {
      key: 'tacos',
      icon: UtensilsCrossed,
      title: 'Taquerías & Asaderos',
      tagline: 'Pedidos directos sin pagar 30% de comisión a apps de delivery',
      sampleBiz: 'Asadero & Tacos Los Pioneros',
      address: 'Blvd. Lázaro Cárdenas, Col. Carbajal',
      benefits: [
        'Menú digital con fotos apetitosas de tacos, cortes y aguas frescas.',
        'Pedidos exprés por WhatsApp para recoger sin filas en horas pico.',
        'Código QR para acrílico en mesas: los clientes ven el menú en 1 segundo.',
        'Ahorro total en reimpresiones de cartas de papel maltratadas.',
      ],
      highlight: '¡Ideal para asados, taquerías, mariscos y food trucks en Mexicali!',
    },
    {
      key: 'dental',
      icon: Stethoscope,
      title: 'Clínicas & Turismo Médico',
      tagline: 'Atención bilingüe para pacientes de Mexicali, Calexico y Valle Imperial',
      sampleBiz: 'Dental Vanguardia & Turismo Médico',
      address: 'Av. Reforma, Segunda Sección (Garita Centro)',
      benefits: [
        'Tarjeta NFC Start de lujo para el doctor con descarga de contacto vCard.',
        'Catálogo de procedimientos con precios en MXN / USD para extranjeros.',
        'Botón directo a WhatsApp para agendar valoraciones y enviar ubicación.',
        'Información sobre seguros dentales de EE.UU. (formatos ADA).',
      ],
      highlight: '¡Convierte más pacientes transfronterizos sin pagar publicidad costosa!',
    },
    {
      key: 'cafe',
      icon: Coffee,
      title: 'Cafeterías & Repostería',
      tagline: 'Experiencia moderna para clientes ejecutivos y nómadas digitales',
      sampleBiz: 'Bistro & Specialty Coffee Mexicali',
      address: 'Calzada Justo Sierra #1240, Col. Los Pinos',
      benefits: [
        'Menú dinámico de cafés fríos, postres y desayunos con fotos HD.',
        'Tarjeta física con chip NFC para eventos de networking y baristas.',
        'Horarios actualizados en tiempo real y clave de Wi-Fi visible.',
        'Asistente virtual que responde dudas sobre opciones sin gluten o leche vegetal.',
      ],
      highlight: '¡Proyecta una imagen a la altura de las mejores barras de café de la frontera!',
    },
    {
      key: 'taller',
      icon: Wrench,
      title: 'Talleres Mecánicos & Auto A/C',
      tagline: 'Cotizaciones rápidas para el calor extremo de Mexicali',
      sampleBiz: 'AutoSpa & Taller Mecánico Cachanilla',
      address: 'Calzada Independencia, Col. San Marcos',
      benefits: [
        'Paquetes claros de carga de gas para A/C, afinación y frenos.',
        'Ubicación satelital en Google Maps para que la grúa o cliente llegue directo.',
        'Tarjeta NFC física para dar a cada cliente con su próximo recordatorio.',
        'Galería de instalaciones y diagnósticos por scanner por WhatsApp.',
      ],
      highlight: '¡Genera confianza inmediata y aumenta la retención de clientes anuales!',
    },
    {
      key: 'barber',
      icon: Scissors,
      title: 'Barberías & Salones de Belleza',
      tagline: 'Citas llenas sin contestar llamadas a cada minuto',
      sampleBiz: 'Barber Club & Lounge Mexicali',
      address: 'Blvd. Benito Juárez, Fracc. Residencias',
      benefits: [
        'Portafolio visual de cortes fade, barbas y peinados de tendencia.',
        'Agenda de citas instantánea por WhatsApp con el barbero favorito.',
        'Tarjeta digital que los clientes guardan en su celular para siempre volver.',
        'Redes sociales (Instagram y TikTok) conectadas a un toque.',
      ],
      highlight: '¡La solución favorita de estilistas y barberos independientes en Mexicali!',
    },
    {
      key: 'boutique',
      icon: ShoppingBag,
      title: 'Boutiques & Moda Local',
      tagline: 'Catálogo de novedades y apartado de prendas por WhatsApp',
      sampleBiz: 'Atelier & Moda Plaza San Pedro',
      address: 'Calzada Cetys #2200, Plaza San Pedro',
      benefits: [
        'Catálogo de prendas con etiquetas de temporada y tallas disponibles.',
        'Botón "Apartar por WhatsApp" para cerrar ventas al instante.',
        'Galería multimedia tipo historias de Instagram para mostrar el showroom.',
        'Tarjeta NFC para eventos, bazares locales y clientes VIP.',
      ],
      highlight: '¡Vende más ropa y accesorios sin rentar costosos sistemas de e-commerce!',
    },
  ];

  const current = industries.find((i) => i.key === selectedIndustry) || industries[0];

  const handleActivateIndustry = (key: IndustryPresetKey) => {
    loadTemplate(key);
    setSelectedIndustry(key);
    setJustActivated(key);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#dc2626', '#ffffff', '#ef4444'],
    });
    setTimeout(() => setJustActivated(null), 2500);
  };

  return (
    <section id="giros-mexicali" className="py-20 lg:py-32 bg-slate-50/60 relative overflow-hidden border-t border-slate-200">
      {/* Background glow */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-xs font-mono text-red-600 font-bold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>SOLUCIONES POR GIRO EN MEXICALI</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 font-heading tracking-tight">
            DISEÑADO PARA TU TIPO <br />
            <span className="metallic-red-text">DE NEGOCIO CACHANILLA</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            No importa si tienes una taquería, clínica dental, taller, barbería, café o tienda. Activa tu giro y experimenta cómo se adaptan la tarjeta NFC y la Mini App con fotos y datos reales.
          </p>
        </div>

        {/* Industry Selector Grid (6 Buttons) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3 mb-10">
          {industries.map((ind) => {
            const Icon = ind.icon;
            const isSelected = selectedIndustry === ind.key;
            return (
              <button
                key={ind.key}
                onClick={() => handleActivateIndustry(ind.key)}
                className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-white border-2 border-red-600 shadow-lg shadow-red-500/10 scale-[1.02]'
                    : 'bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                    isSelected ? 'bg-red-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                  )}
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 font-heading line-clamp-1">
                    {ind.title}
                  </h4>
                  <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">
                    {ind.sampleBiz}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Industry Showcase Card */}
        <div className="bg-white border-2 border-red-500/30 rounded-3xl p-6 sm:p-10 shadow-xl shadow-slate-200/60 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content (Col 7) */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-red-50 text-red-600 border border-red-200">
                  GIRO SELECCIONADO
                </span>
                <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-red-600" />
                  {current.address}
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                  {current.sampleBiz}
                </h3>
                <p className="text-sm sm:text-base text-red-600 font-bold mt-1">
                  «{current.tagline}»
                </p>
              </div>

              {/* Benefits Checklist */}
              <div className="space-y-2.5 pt-1">
                {current.benefits.map((b, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <div className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>{b}</span>
                  </div>
                ))}
              </div>

              <div className="p-3.5 rounded-2xl bg-red-50/70 border border-red-200 text-xs text-red-900">
                <strong>Impacto en Mexicali:</strong> {current.highlight}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={onOpenMiniAppDemo}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-xs sm:text-sm font-bold shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <Smartphone className="w-4 h-4" />
                  <span>Ver Mini App de {current.title}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </button>

                <button
                  onClick={onOpenNfcDemo}
                  className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200/80 text-slate-800 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer border border-slate-200 transition-colors"
                >
                  <CreditCard className="w-4 h-4 text-red-600" />
                  <span>Ver Tarjeta NFC del Giro</span>
                </button>
              </div>
            </div>

            {/* Right Live Teaser Preview (Col 5) */}
            <div className="lg:col-span-5 bg-slate-50/80 p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-xs font-mono font-bold text-slate-800 uppercase">
                    Datos Cargados en Vivo
                  </span>
                </div>
                <span className="text-[10px] text-red-600 font-mono font-bold">
                  {profile.products.length} productos / servicios
                </span>
              </div>

              {/* Snapshot of the Business in Context */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <img
                    src={profile.logoUrl}
                    alt={profile.businessName}
                    className="w-12 h-12 rounded-xl object-cover border-2 border-red-500/40 shadow-xs"
                  />
                  <div className="min-w-0">
                    <h5 className="font-bold text-slate-900 text-sm truncate">
                      {profile.businessName}
                    </h5>
                    <p className="text-[11px] text-slate-600 truncate">
                      {profile.industry}
                    </p>
                    <p className="text-[10px] text-slate-500 font-mono truncate">
                      {profile.address}
                    </p>
                  </div>
                </div>

                {/* Sample product item */}
                {profile.products[0] && (
                  <div className="p-3 rounded-xl bg-white border border-slate-200/90 shadow-xs flex items-center gap-3">
                    <img
                      src={profile.products[0].image}
                      alt={profile.products[0].name}
                      className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-slate-900 truncate">
                        {profile.products[0].name}
                      </p>
                      <p className="text-[10px] text-slate-500 truncate">
                        {profile.products[0].description}
                      </p>
                      <span className="text-xs font-black text-red-600">
                        {profile.products[0].price || 'Consultar'}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-2 text-center">
                <p className="text-[11px] text-slate-500">
                  {justActivated === current.key ? (
                    <span className="text-emerald-600 font-bold flex items-center justify-center gap-1 animate-in fade-in">
                      <Check className="w-3.5 h-3.5" /> ¡Giro {current.title} activado en toda la plataforma!
                    </span>
                  ) : (
                    'Pulsa cualquiera de los 6 giros arriba para cambiar la demo.'
                  )}
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
