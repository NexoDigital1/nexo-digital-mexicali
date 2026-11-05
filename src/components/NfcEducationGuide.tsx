import React, { useState } from 'react';
import { 
  Wifi, 
  QrCode, 
  Smartphone, 
  Layers, 
  TrendingUp, 
  MessageCircle, 
  ChevronDown, 
  CheckCircle, 
  HelpCircle, 
  Sparkles,
  Zap
} from 'lucide-react';

interface NfcEducationGuideProps {
  onOpenNfcDemo: () => void;
  onOpenMiniAppDemo: () => void;
  onOpenAdvisor: () => void;
}

export const NfcEducationGuide: React.FC<NfcEducationGuideProps> = ({
  onOpenNfcDemo,
  onOpenMiniAppDemo,
  onOpenAdvisor,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const guides = [
    {
      id: 1,
      icon: Wifi,
      title: '1. ¿Qué es una tarjeta NFC y cómo funciona?',
      subtitle: 'Transmisión inalámbrica por proximidad de menos de 1 segundo',
      answer: `Una tarjeta NFC (Near Field Communication) contiene un microchip pasivo ultradelgado con una antena circular integrada. Al acercar la tarjeta a la parte superior de un iPhone o a la parte trasera de un dispositivo Android, el teléfono emite un campo magnético de baja potencia que despierta el chip y lee sus datos instantáneamente. No requiere batería, no se descarga y dura años de uso continuo.`,
      highlight: 'Funciona al instante sin tocar botones ni instalar apps.',
      actionLabel: 'Ver simulación de toque NFC',
      action: onOpenNfcDemo,
    },
    {
      id: 2,
      icon: QrCode,
      title: '2. ¿Cómo funciona el código QR integrado?',
      subtitle: 'Compatibilidad universal para el 100% de los teléfonos',
      answer: `El código QR impreso en el reverso de la tarjeta funciona como un canal de acceso secundario infalible. Si una persona tiene un teléfono antiguo sin chip NFC activado o prefiere escanear con su cámara fotográfica nativa, solo apunta el lente y en un instante se despliega el contacto o la mini app comercial.`,
      highlight: 'Garantiza que ningún cliente potencial quede sin recibir tu información.',
      actionLabel: 'Probar generador QR',
      action: onOpenNfcDemo,
    },
    {
      id: 3,
      icon: Smartphone,
      title: '3. ¿Qué ventajas tiene una Mini App frente a una app de tienda o web pesada?',
      subtitle: 'Cero barreras de descarga, velocidad extrema y conversión inmediata',
      answer: `A diferencia de una app tradicional de la App Store o Google Play (que pesa 80MB, pide contraseñas y el cliente casi nunca descarga), una Mini App de NEXO DIGITAL se abre en 0.8 segundos directamente en el navegador del teléfono. Tiene aspecto, animaciones y fluidez de una aplicación nativa, pero sin fricción. Además, cuenta con botones directos para pedir por WhatsApp con un solo clic.`,
      highlight: '9 de cada 10 clientes abandonan si les pides instalar una app. La Mini App abre al instante.',
      actionLabel: 'Explorar Mini App Premium',
      action: onOpenMiniAppDemo,
    },
    {
      id: 4,
      icon: Layers,
      title: '4. ¿Cuál es la diferencia entre los dos productos?',
      subtitle: 'NFC START (Contacto físico veloz) vs. MINI APP PREMIUM (Catálogo + Chatbot + Experiencia)',
      answer: `• NFC START: Es una tarjeta física con acabado de lujo que transmite tus datos de contacto (nombre, teléfono, WhatsApp, redes) y guarda la ficha vCard en la agenda del cliente incluso sin señal de internet.
• MINI APP PREMIUM: Es la experiencia comercial completa alojada en la web. Incluye todo el acceso NFC/QR, pero suma tu catálogo de productos/servicios, asistente virtual con inteligencia artificial, galería multimedia y pedidos a WhatsApp.`,
      highlight: 'Puedes comenzar con NFC Start y escalar a Mini App Premium cuando tu negocio crezca.',
      actionLabel: 'Ver tabla comparativa',
      action: () => {
        const el = document.getElementById('comparador');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      id: 5,
      icon: TrendingUp,
      title: '5. ¿Cómo puede mejorar la presentación y ventas de mi negocio en Mexicali?',
      subtitle: 'Imagen de vanguardia, retención de clientes y rapidez de cotización',
      answer: `En un mercado competitivo como Mexicali y la frontera norte, proyectar una imagen tecnológica distingue de inmediato a tu negocio frente a la competencia tradicional con tarjetas de papel que terminan en la basura. Facilita que clientes corporativos, turistas y locales guarden tu contacto o revisen tu menú y precios al instante, multiplicando tus conversiones por WhatsApp.`,
      highlight: 'Las tarjetas de papel se tiran en el 88% de los casos. La tarjeta NFC y Mini App se guardan.',
      actionLabel: 'Descubrir impacto comercial',
      action: onOpenAdvisor,
    },
    {
      id: 6,
      icon: MessageCircle,
      title: '6. ¿Cómo solicito mi propia solución con NEXO DIGITAL MEXICALI?',
      subtitle: 'Proceso ágil en 3 pasos con entrega personalizada',
      answer: `1. Define si requieres NFC Start, Mini App Premium o el paquete completo.
2. Envíanos tu logotipo, colores e información básica (nosotros nos encargamos del diseño y configuración técnica).
3. Recibe tu tarjeta física personalizada en Mexicali y el enlace activo de tu mini app listo para compartir al mundo.`,
      highlight: 'Soporte local en Mexicali, Baja California con atención directa por WhatsApp.',
      actionLabel: 'Iniciar solicitud por WhatsApp',
      action: onOpenAdvisor,
    },
  ];

  return (
    <section id="educacion" className="py-20 lg:py-32 bg-[#0a0b10] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-300">
            <HelpCircle className="w-3.5 h-3.5 text-red-500" />
            <span>GUÍA EDUCATIVA COMERCIAL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading tracking-tight">
            TODO LO QUE UN COMERCIANTE DE MEXICALI <br />
            <span className="metallic-red-text">DEBE SABER EN 5 MINUTOS</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Tecnología transparente explicada de forma clara y sin tecnicismos complejos.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {guides.map((item, index) => {
            const isOpen = openIndex === index;
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-[#141624] border-red-500/40 shadow-xl'
                    : 'bg-[#10121a] border-white/5 hover:border-white/15'
                }`}
              >
                {/* Header Row */}
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                      isOpen ? 'bg-red-600 text-white' : 'bg-white/5 text-slate-400'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-white font-heading">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className={`p-1.5 rounded-lg bg-white/5 text-slate-400 transition-transform ${
                    isOpen ? 'rotate-180 text-white' : ''
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Expanded Content */}
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-white/10 space-y-4 text-xs sm:text-sm text-slate-300 animate-in fade-in duration-200">
                    <p className="whitespace-pre-line leading-relaxed">
                      {item.answer}
                    </p>

                    <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/30 flex items-start gap-2.5">
                      <Sparkles className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-red-200 font-medium">
                        <strong>Clave comercial:</strong> {item.highlight}
                      </span>
                    </div>

                    <div className="pt-1 flex justify-end">
                      <button
                        onClick={item.action}
                        className="text-xs font-bold text-red-400 hover:text-red-300 flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>{item.actionLabel}</span>
                        <span>→</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
