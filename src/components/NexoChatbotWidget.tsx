import React, { useState, useEffect, useRef } from 'react';
import { useBusiness } from '../context/BusinessContext';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  MessageCircle, 
  Minimize2, 
  Maximize2, 
  RotateCcw, 
  CreditCard, 
  Smartphone, 
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Zap
} from 'lucide-react';

interface NexoChatbotWidgetProps {
  onOpenNfcDemo: () => void;
  onOpenMiniAppDemo: () => void;
}

interface BotMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  actionButtons?: { label: string; action: () => void; icon?: 'nfc' | 'app' | 'wa' | 'scroll' }[];
}

export const NexoChatbotWidget: React.FC<NexoChatbotWidgetProps> = ({
  onOpenNfcDemo,
  onOpenMiniAppDemo,
}) => {
  const { profile } = useBusiness();
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [showTeaser, setShowTeaser] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [aiStatus, setAiStatus] = useState<{ hasKey: boolean; model: string }>({
    hasKey: false,
    model: 'Motor de Conocimiento Local',
  });

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Initial welcome message
  const [messages, setMessages] = useState<BotMessage[]>([
    {
      id: 'nexo-welcome',
      sender: 'bot',
      text: `¡Hola! Soy NEXO BOT, tu asesor comercial de NEXO DIGITAL MEXICALI.\n\nEslogan: «CONECTANDO A MEXICALI AL MUNDO».\n\n¿Tienes dudas sobre cómo implementar una Tarjeta NFC Start o una Mini App Comercial Premium en tu negocio?`,
      timestamp: 'Ahora',
      actionButtons: [
        { label: '¿Qué me conviene más?', action: () => handleSendPreset('¿Cuál es la diferencia entre NFC Start y Mini App Premium y cuál me conviene?'), icon: 'scroll' },
        { label: 'Probar Demo NFC', action: onOpenNfcDemo, icon: 'nfc' },
        { label: 'Probar Demo Mini App', action: onOpenMiniAppDemo, icon: 'app' },
        { label: 'Cotizar por WhatsApp', action: () => handleOpenWhatsApp(), icon: 'wa' },
      ],
    },
  ]);

  // Check AI API Status
  useEffect(() => {
    async function checkStatus() {
      try {
        const res = await fetch('/api/ai-status');
        if (res.ok) {
          const data = await res.json();
          setAiStatus({
            hasKey: data.hasGeminiKey,
            model: data.hasGeminiKey ? 'Gemini 2.5 Flash' : 'Motor Guiado Inteligente',
          });
        }
      } catch {
        // Fallback
      }
    }
    checkStatus();
  }, []);

  // Show a gentle teaser tooltip after 4 seconds to invite conversation
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        setShowTeaser(true);
      }
    }, 4000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  // Auto scroll to bottom
  useEffect(() => {
    if (isOpen && chatEndRef.current) {
      chatEndRef.current.scrollTop = chatEndRef.current.scrollHeight;
    }
  }, [messages, isTyping, isOpen]);

  const handleOpenWhatsApp = (customText?: string) => {
    const text = customText || 'Hola NEXO DIGITAL MEXICALI, deseo solicitar asesoría comercial para mi negocio.';
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleSendPreset = (question: string) => {
    handleSendMessage(question);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const userMsg: BotMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: 'Ahora',
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text.trim(),
          context: 'nexo_platform',
          profile,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.reply) {
          setIsTyping(false);
          setMessages((prev) => [
            ...prev,
            {
              id: `b-${Date.now()}`,
              sender: 'bot',
              text: data.reply,
              timestamp: 'Ahora',
              actionButtons: [
                { label: 'Cotizar en WhatsApp', action: () => handleOpenWhatsApp(`Hola, estuve platicando con Nexo Bot sobre: "${text.trim()}". Quisiera información de costos y tiempos.`), icon: 'wa' },
                { label: 'Ver Comparador', action: () => document.getElementById('comparador')?.scrollIntoView({ behavior: 'smooth' }), icon: 'scroll' },
              ],
            },
          ]);
          return;
        }
      }
    } catch {
      // Local fallback
    }

    // Comprehensive rule-based knowledge engine for Nexo Digital Mexicali
    setTimeout(() => {
      setIsTyping(false);
      const lower = text.toLowerCase();
      let botText = '';
      let actions: BotMessage['actionButtons'] = undefined;

      if (lower.includes('diferencia') || lower.includes('conviene') || lower.includes('cual') || lower.includes('compar')) {
        botText = `¡Excelente pregunta! Aquí la clave para decidir:\n\n• NFC MINI APP START: Es una tarjeta física con chip NDEF que transmite tus datos de contacto con 1 toque. Funciona sin internet (offline) y es ideal para ejecutivos, profesionistas y directores.\n\n• MINI APP COMERCIAL PREMIUM: Es tu aplicación comercial completa en la web (sin descargar nada). Incluye catálogo con pedidos por WhatsApp, asistente virtual, galería multimedia y horarios en tiempo real.\n\n¿Te gustaría probar una demostración interactiva de alguna?`;
        actions = [
          { label: 'Probar NFC Start', action: onOpenNfcDemo, icon: 'nfc' },
          { label: 'Probar Mini App', action: onOpenMiniAppDemo, icon: 'app' },
          { label: 'Cotizar ambas', action: () => handleOpenWhatsApp('Hola Nexo Digital, deseo cotizar el paquete de Tarjeta NFC + Mini App Comercial.'), icon: 'wa' },
        ];
      } else if (lower.includes('pequeño') || lower.includes('promoc') || lower.includes('negocio') || lower.includes('comercio')) {
        botText = `¡NEXO DIGITAL está creado pensando en el comercio local de Mexicali!\n\n1. Eliminamos el papel: En vez de imprimir tarjetas que se tiran, tienes 1 tarjeta NFC permanente.\n2. Cero comisiones: En taquerías o tiendas, tus clientes te piden directo por WhatsApp sin que ninguna app de delivery te quite el 30%.\n3. Velocidad: Se abre en 1 segundo sin descargar nada.\n4. Profesionalismo: Genera confianza inmediata con clientes de Mexicali y turistas del Valle Imperial.`;
        actions = [
          { label: 'Ver Giros Cachanillas', action: () => document.getElementById('giros-mexicali')?.scrollIntoView({ behavior: 'smooth' }), icon: 'scroll' },
          { label: 'Calcular mi Ahorro', action: () => document.getElementById('calculadora-roi')?.scrollIntoView({ behavior: 'smooth' }), icon: 'scroll' },
          { label: 'Asesoría por WhatsApp', action: () => handleOpenWhatsApp('Hola Nexo Digital, tengo un pequeño negocio en Mexicali y quiero asesoría para promocionarlo.'), icon: 'wa' },
        ];
      } else if (lower.includes('ahorro') || lower.includes('papel') || lower.includes('tarjetas de papel')) {
        botText = `Imprimir 1,000 tarjetas de presentación de papel cuesta entre $800 y $1,500 MXN cada trimestre ($3,600 a $6,000/año). Y según estudios, ¡el 88% termina en la basura en menos de una semana!\n\nCon la Tarjeta NFC Start o la Mini App de NEXO DIGITAL, tu inversión se paga sola en menos de 15 días y tus datos se actualizan sin volver a imprimir jamás.`;
        actions = [
          { label: 'Ver Calculadora de Ahorro', action: () => document.getElementById('calculadora-roi')?.scrollIntoView({ behavior: 'smooth' }), icon: 'scroll' },
          { label: 'Cotizar Solución', action: () => handleOpenWhatsApp('Hola Nexo Digital, deseo cotizar una tarjeta NFC permanente para mi negocio.'), icon: 'wa' },
        ];
      } else if (lower.includes('precio') || lower.includes('costo') || lower.includes('cuanto') || lower.includes('cotiz')) {
        botText = `En NEXO DIGITAL MEXICALI adaptamos la cotización según el número de tarjetas físicas NFC requeridas y la dimensión del catálogo o servicios de tu negocio.\n\nNo manejamos cobros forzosos ni comisiones por ventas. ¿Te gustaría que te preparemos una propuesta personalizada para tu giro en Mexicali?`;
        actions = [
          { label: 'Solicitar Cotización por WhatsApp', action: () => handleOpenWhatsApp('Hola NEXO DIGITAL, deseo una cotización personalizada para mi negocio en Mexicali.'), icon: 'wa' },
        ];
      } else if (lower.includes('tiempo') || lower.includes('entrega') || lower.includes('tarda') || lower.includes('cuando')) {
        botText = `Nuestros tiempos de entrega en Mexicali son ágiles:\n\n• NFC Mini App Start: De 3 a 5 días hábiles con entrega local en Mexicali y programación personalizada.\n• Mini App Comercial Premium: De 5 a 8 días hábiles con carga de catálogo, sesión de pruebas y configuración de WhatsApp.`;
        actions = [
          { label: 'Hablar con un asesor', action: () => handleOpenWhatsApp(), icon: 'wa' },
        ];
      } else if (lower.includes('internet') || lower.includes('offline') || lower.includes('sin conexion')) {
        botText = `¡Totalmente! La tarjeta NFC Start almacena la ficha de contacto vCard directamente dentro de la memoria del chip NTAG.\n\nEsto significa que si estás en una reunión, elevador o sótano sin señal telefónica, el cliente acerca su teléfono y guarda tu contacto en su agenda al instante.`;
        actions = [
          { label: 'Ver simulación de toque', action: onOpenNfcDemo, icon: 'nfc' },
        ];
      } else if (lower.includes('mexicali') || lower.includes('donde') || lower.includes('oficina') || lower.includes('contacto')) {
        botText = `NEXO DIGITAL opera en Mexicali, Baja California. Nuestro eslogan oficial es «CONECTANDO A MEXICALI AL MUNDO».\n\nAtendemos a todo Mexicali, Valle de Mexicali, San Luis Río Colorado y clientes de turismo médico o comercial binacional.`;
        actions = [
          { label: 'Enviar mensaje de WhatsApp', action: () => handleOpenWhatsApp(), icon: 'wa' },
        ];
      } else {
        botText = `Entiendo tu inquietud. En NEXO DIGITAL MEXICALI diseñamos tecnología para que tu negocio venda más y proyecte una imagen de nivel internacional.\n\nPuedes explorar las demostraciones interactivas o contactar directamente a nuestro equipo comercial por WhatsApp.`;
        actions = [
          { label: 'Explorar Mini App', action: onOpenMiniAppDemo, icon: 'app' },
          { label: 'Hablar por WhatsApp', action: () => handleOpenWhatsApp(`Hola Nexo Digital, tengo una duda: "${text.trim()}"`), icon: 'wa' },
        ];
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `b-${Date.now()}`,
          sender: 'bot',
          text: botText,
          timestamp: 'Ahora',
          actionButtons: actions,
        },
      ]);
    }, 600);
  };

  return (
    <>
      {/* Floating Trigger Widget at Bottom Right */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end">
        
        {/* Teaser Tooltip */}
        {showTeaser && !isOpen && (
          <div className="mb-2 max-w-xs p-3 rounded-2xl bg-[#141624] border border-red-500/40 text-white text-xs shadow-2xl animate-in slide-in-from-bottom-3 duration-300 relative flex items-start gap-2.5">
            <button
              onClick={() => setShowTeaser(false)}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-slate-800 border border-white/20 text-slate-400 hover:text-white flex items-center justify-center text-[10px]"
            >
              ×
            </button>
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-red-600 to-red-500 flex items-center justify-center flex-shrink-0 text-white shadow-md">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-red-400">¿Dudas sobre tu negocio?</p>
              <p className="text-slate-300 text-[11px] mt-0.5 leading-snug">
                Soy NEXO BOT. Pregúntame sobre tarjetas NFC y Mini Apps.
              </p>
              <button
                onClick={() => {
                  setShowTeaser(false);
                  setIsOpen(true);
                  setHasUnread(false);
                }}
                className="mt-1.5 text-[10px] font-bold text-white bg-red-600 hover:bg-red-500 px-2.5 py-1 rounded-lg inline-flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span>Chatear ahora</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}

        {/* Floating Bubble Button */}
        <button
          onClick={() => {
            setIsOpen(!isOpen);
            setShowTeaser(false);
            setHasUnread(false);
          }}
          className={`relative group w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-2xl transition-all duration-300 cursor-pointer ${
            isOpen 
              ? 'bg-slate-800 rotate-90 border border-white/20' 
              : 'bg-gradient-to-tr from-red-600 via-red-500 to-red-700 hover:scale-105 active:scale-95 animate-pulse-glow'
          }`}
          title="Asistente Comercial NEXO BOT"
        >
          {isOpen ? (
            <X className="w-6 h-6 text-slate-200" />
          ) : (
            <>
              <Bot className="w-7 h-7 drop-shadow-md group-hover:scale-110 transition-transform" />
              {hasUnread && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-400 border-2 border-black flex items-center justify-center text-[9px] font-bold text-black animate-ping">
                </span>
              )}
              {hasUnread && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-400 border-2 border-black flex items-center justify-center text-[9px] font-bold text-black">
                  1
                </span>
              )}
            </>
          )}
        </button>
      </div>

      {/* Floating Chat Window Modal */}
      {isOpen && (
        <div className="fixed bottom-22 right-3 sm:right-6 z-40 w-[92vw] sm:w-[390px] h-[540px] max-h-[82vh] bg-[#0e1017] border-2 border-red-500/40 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
          
          {/* Chat Window Header */}
          <div className="px-4 py-3 bg-[#141624] border-b border-white/10 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-red-600 to-red-500 text-white flex items-center justify-center shadow-md">
                  <Bot className="w-5 h-5" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#141624]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-extrabold text-white text-xs sm:text-sm font-heading">
                    NEXO BOT
                  </h4>
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-red-950 text-red-300 border border-red-500/30">
                    MEXICALI
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>{aiStatus.model}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  setMessages([
                    {
                      id: `r-${Date.now()}`,
                      sender: 'bot',
                      text: 'Conversación reiniciada. ¿En qué te asesoro hoy sobre las soluciones de NEXO DIGITAL?',
                      timestamp: 'Ahora',
                    },
                  ]);
                }}
                title="Reiniciar chat"
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Preset Topics Banner for Small Businesses */}
          <div className="px-3 py-2 bg-[#090a0f] border-b border-white/5 flex items-center gap-1.5 overflow-x-auto text-[10px] flex-shrink-0 select-none">
            <button
              onClick={() => handleSendPreset('¿Cómo ayuda NEXO DIGITAL a promocionar mi pequeño negocio en Mexicali?')}
              className="px-2.5 py-1 rounded-full bg-red-950/70 hover:bg-red-900/70 text-red-300 font-bold whitespace-nowrap border border-red-500/40 cursor-pointer transition-colors"
            >
              Promover mi Negocio
            </button>
            <button
              onClick={() => handleSendPreset('¿Cuánto dinero ahorro al dejar las tarjetas de papel?')}
              className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 whitespace-nowrap border border-white/5 cursor-pointer transition-colors"
            >
              Ahorro vs Papel
            </button>
            <button
              onClick={() => handleSendPreset('¿Qué diferencia hay entre NFC Start y Mini App?')}
              className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 whitespace-nowrap border border-white/5 cursor-pointer transition-colors"
            >
              Diferencias
            </button>
            <button
              onClick={() => handleSendPreset('¿Qué tiempo tardan en entregar en Mexicali?')}
              className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 whitespace-nowrap border border-white/5 cursor-pointer transition-colors"
            >
              Tiempos
            </button>
            <button
              onClick={() => handleSendPreset('¿Cómo cotizo una solución para mi negocio?')}
              className="px-2.5 py-1 rounded-full bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 whitespace-nowrap border border-emerald-500/30 cursor-pointer transition-colors"
            >
              Cotizar
            </button>
          </div>

          {/* Chat Messages Body */}
          <div 
            ref={chatEndRef}
            className="flex-1 p-3.5 space-y-3 overflow-y-auto bg-[#0a0b10] text-xs"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3 leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-red-600 to-red-700 text-white rounded-br-none shadow-md'
                      : 'bg-[#151724] text-slate-200 rounded-bl-none border border-white/10 shadow-sm'
                  }`}
                >
                  <p className="whitespace-pre-line text-[11px] sm:text-xs">{msg.text}</p>
                </div>

                {/* Optional Action Buttons inside Message */}
                {msg.actionButtons && (
                  <div className="flex flex-wrap gap-1.5 mt-2 max-w-[90%]">
                    {msg.actionButtons.map((btn, idx) => (
                      <button
                        key={idx}
                        onClick={btn.action}
                        className="text-[10px] font-semibold px-2.5 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white border border-white/10 flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                      >
                        {btn.icon === 'nfc' && <CreditCard className="w-3 h-3 text-red-400" />}
                        {btn.icon === 'app' && <Smartphone className="w-3 h-3 text-red-400" />}
                        {btn.icon === 'wa' && <MessageCircle className="w-3 h-3 text-emerald-400" />}
                        <span>{btn.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 text-slate-400 text-xs py-1">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-red-500 animate-bounce delay-100"></div>
                <div className="w-2 h-2 rounded-full bg-red-500 animate-bounce delay-200"></div>
                <span className="text-[10px] ml-1 font-mono">Nexo Bot analizando...</span>
              </div>
            )}
          </div>

          {/* Chat Input Footer */}
          <div className="p-3 bg-[#11131d] border-t border-white/10 flex-shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Pregunta a Nexo Bot sobre tus productos..."
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#171926] border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-red-500"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim()}
                className="p-2.5 rounded-xl bg-red-600 hover:bg-red-500 disabled:opacity-40 text-white transition-colors cursor-pointer flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-1.5 flex items-center justify-between text-[9px] text-slate-500">
              <span>NEXO DIGITAL MEXICALI</span>
              <span className="font-mono">CONECTANDO A MEXICALI AL MUNDO</span>
            </div>
          </div>

        </div>
      )}
    </>
  );
};
