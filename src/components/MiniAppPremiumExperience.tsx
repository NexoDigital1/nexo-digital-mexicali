import React, { useState, useEffect, useRef } from 'react';
import { useBusiness } from '../context/BusinessContext';
import { ProductItem, ChatMessage, GalleryItem } from '../types';
import { 
  X, 
  Smartphone, 
  Maximize2, 
  Minimize2, 
  Home, 
  ShoppingBag, 
  Image as ImageIcon, 
  Bot, 
  PhoneCall, 
  MessageCircle, 
  MapPin, 
  Clock, 
  Send, 
  Share2, 
  Check, 
  Wifi, 
  QrCode, 
  Search, 
  Filter, 
  ExternalLink, 
  Sparkles, 
  ArrowRight, 
  Plus, 
  Play, 
  SlidersHorizontal 
} from 'lucide-react';
import { generateQrDataUrl } from '../utils/qrUtils';

interface MiniAppPremiumExperienceProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAdmin: () => void;
  onOpenNfcDemo: () => void;
}

export const MiniAppPremiumExperience: React.FC<MiniAppPremiumExperienceProps> = ({
  isOpen,
  onClose,
  onOpenAdmin,
  onOpenNfcDemo,
}) => {
  const { profile } = useBusiness();
  const [activeTab, setActiveTab] = useState<'home' | 'catalog' | 'gallery' | 'assistant' | 'contact'>('home');
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMedia, setSelectedMedia] = useState<GalleryItem | null>(null);

  // NFC & QR Access modal state
  const [showAccessModal, setShowAccessModal] = useState(false);
  const [qrCodeData, setQrCodeData] = useState('');

  // Chatbot State
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [aiEngineStatus, setAiEngineStatus] = useState<{ isLiveAi: boolean; model: string }>({
    isLiveAi: false,
    model: 'Motor de Conocimiento Local',
  });
  const chatScrollRef = useRef<HTMLDivElement>(null);

  // Initialize QR for the Mini App
  useEffect(() => {
    async function initQr() {
      const appUrl = `${window.location.origin}?miniapp=${encodeURIComponent(profile.businessName)}`;
      const url = await generateQrDataUrl(appUrl, {
        darkColor: '#0f172a',
        lightColor: '#ffffff',
        width: 260,
      });
      setQrCodeData(url);
    }
    initQr();
  }, [profile.businessName]);

  // Check backend AI status honestly
  useEffect(() => {
    async function checkAiStatus() {
      try {
        const res = await fetch('/api/ai-status');
        if (res.ok) {
          const data = await res.json();
          setAiEngineStatus({
            isLiveAi: data.hasGeminiKey,
            model: data.hasGeminiKey ? 'Gemini 2.5 Flash' : 'Motor Guiado Inteligente',
          });
        }
      } catch {
        // Local mode fallback
      }
    }
    checkAiStatus();
  }, []);

  // Initialize Chatbot with warm welcome & business orientation
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 'welcome-1',
          sender: 'bot',
          text: `¡Hola! Bienvenido a ${profile.businessName}. Soy tu asistente digital en Mexicali. ¿En qué puedo orientarte hoy?`,
          timestamp: 'Ahora',
          suggestedActions: [
            { label: 'Ver Productos Destacados', action: 'show_featured' },
            { label: 'Horarios y Ubicación', action: 'show_location' },
            { label: 'Preguntas Frecuentes', action: 'show_faqs' },
            { label: 'Hablar por WhatsApp', action: 'whatsapp' },
          ],
        },
      ]);
    }
  }, [profile.businessName]);

  // Auto scroll chat
  useEffect(() => {
    if (activeTab === 'assistant' && chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, activeTab]);

  if (!isOpen) return null;

  // Categories list
  const categories = ['all', ...Array.from(new Set(profile.products.map((p) => p.category)))];

  // Filtered products
  const filteredProducts = profile.products.filter((p) => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesQuery = 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.tags && p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCategory && matchesQuery;
  });

  // Handle Chatbot Query
  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: 'Ahora',
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsTyping(true);

    try {
      // 1. Try server endpoint with Gemini
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text.trim(),
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
              suggestedActions: [
                { label: 'Consultar por WhatsApp', action: 'whatsapp' },
                { label: 'Ver Catálogo', action: 'catalog' },
              ],
            },
          ]);
          return;
        }
      }
    } catch {
      // Fallback
    }

    // 2. Intelligent local rule-based engine
    setTimeout(() => {
      setIsTyping(false);
      const lower = text.toLowerCase();
      let botReply = '';
      let highlightItems: ProductItem[] | undefined = undefined;

      if (lower.includes('horario') || lower.includes('abierto') || lower.includes('hora')) {
        botReply = `Nuestro horario de atención en Mexicali es:\n${profile.schedule}.\n\nActualmente nos encontramos ${profile.isOpenNow ? '¡Abiertos! Te esperamos.' : 'cerrados por el momento.'}`;
      } else if (lower.includes('ubicacion') || lower.includes('donde') || lower.includes('direccion') || lower.includes('llegar')) {
        botReply = `Estamos ubicados en:\n${profile.address}, ${profile.city}, ${profile.state} (C.P. ${profile.postalCode}). Puedes pulsar el botón de abajo para abrir la ruta en Google Maps.`;
      } else if (lower.includes('producto') || lower.includes('catalogo') || lower.includes('menu') || lower.includes('servicio') || lower.includes('recomiend')) {
        const featured = profile.products.filter((p) => p.featured).slice(0, 2);
        highlightItems = featured.length > 0 ? featured : profile.products.slice(0, 2);
        botReply = `Te recomendamos nuestras opciones más solicitadas en ${profile.businessName}:`;
      } else if (lower.includes('whatsapp') || lower.includes('pedir') || lower.includes('ordenar') || lower.includes('cita') || lower.includes('precio')) {
        botReply = `Para solicitudes personalizadas, pedidos o cotizaciones inmediatas, puedes contactar a nuestro equipo por WhatsApp: ${profile.contacts.phone}.`;
      } else {
        // Search in FAQs
        const matchingFaq = profile.faqs.find((f) => 
          lower.includes(f.question.toLowerCase().slice(0, 15)) ||
          f.answer.toLowerCase().includes(lower)
        );

        if (matchingFaq) {
          botReply = matchingFaq.answer;
        } else {
          botReply = `Gracias por tu mensaje sobre ${profile.businessName}. Con gusto te atendemos. ¿Deseas ver nuestro catálogo de productos o prefieres hablar directamente con nosotros por WhatsApp?`;
        }
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `b-${Date.now()}`,
          sender: 'bot',
          text: botReply,
          timestamp: 'Ahora',
          highlightProducts: highlightItems,
          suggestedActions: [
            { label: 'Ver Catálogo Completo', action: 'catalog' },
            { label: 'Contactar por WhatsApp', action: 'whatsapp' },
          ],
        },
      ]);
    }, 650);
  };

  const handleActionClick = (action: string) => {
    if (action === 'show_featured' || action === 'catalog') {
      setActiveTab('catalog');
    } else if (action === 'show_location') {
      setActiveTab('contact');
    } else if (action === 'show_faqs') {
      handleSendMessage('¿Cuáles son las preguntas frecuentes?');
    } else if (action === 'whatsapp') {
      window.open(
        `https://wa.me/${profile.contacts.whatsapp}?text=${encodeURIComponent(`Hola ${profile.businessName}, tengo una consulta desde su Mini App Comercial.`)}`,
        '_blank'
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-2xl flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      
      {/* Outer wrapper: Responsive Phone Frame or Desktop Expanded Mode */}
      <div className={`relative w-full transition-all duration-300 flex flex-col items-center ${
        isFullScreen ? 'max-w-6xl h-[94vh]' : 'max-w-[420px] h-[92vh] max-h-[880px]'
      }`}>
        
        {/* Floating Top Control Toolbar */}
        <div className="w-full flex items-center justify-between mb-2 px-3 py-1.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-white text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono font-bold tracking-wider text-[11px] truncate max-w-[160px] sm:max-w-none">
              NEXO MINI APP PREMIUM
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setShowAccessModal(true)}
              title="Ver acceso NFC y QR"
              className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[11px] font-semibold flex items-center gap-1 transition-colors cursor-pointer"
            >
              <QrCode className="w-3.5 h-3.5 text-red-400" />
              <span className="hidden sm:inline">NFC/QR</span>
            </button>

            <button
              onClick={onOpenAdmin}
              title="Personalizar datos de esta mini app"
              className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[11px] font-semibold flex items-center gap-1 transition-colors cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-300" />
              <span className="hidden sm:inline">Editar</span>
            </button>

            <button
              onClick={() => setIsFullScreen(!isFullScreen)}
              title={isFullScreen ? 'Vista Teléfono' : 'Vista Ampliada'}
              className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              {isFullScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              title="Cerrar demostración"
              className="p-1 rounded-lg bg-red-600/80 hover:bg-red-600 text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Smartphone Shell / Canvas */}
        <div className={`w-full flex-1 bg-[#0b0c10] border-2 border-slate-700/80 rounded-[36px] shadow-2xl overflow-hidden flex flex-col relative ${
          !isFullScreen ? 'shadow-red-950/40' : ''
        }`}>
          
          {/* iOS Dynamic Island / Android Punch Hole */}
          {!isFullScreen && (
            <div className="w-full pt-3 pb-1 flex justify-center bg-[#090a0d] border-b border-white/5 relative z-30 select-none">
              <div className="w-24 h-4 bg-black rounded-full flex items-center justify-between px-2 border border-white/10">
                <div className="w-2 h-2 rounded-full bg-slate-900 border border-slate-700" />
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[8px] font-mono text-slate-400">NEXO</span>
                </div>
              </div>
            </div>
          )}

          {/* Main App Header with Cover and Business Identity */}
          <div className="relative flex-shrink-0 bg-[#12141c] border-b border-white/10">
            {/* Cover photo banner */}
            <div className="h-28 sm:h-32 w-full relative overflow-hidden">
              <img
                src={profile.coverUrl}
                alt={profile.businessName}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c10] via-black/40 to-transparent" />
              
              {/* Quick status pill */}
              <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15 flex items-center gap-1.5 text-[10px] text-white">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span>{profile.isOpenNow ? 'Abierto en Mexicali' : 'Cerrado ahora'}</span>
              </div>
            </div>

            {/* Profile info overlap */}
            <div className="px-4 pb-3 -mt-9 relative z-10 flex items-end justify-between">
              <div className="flex items-end gap-3">
                <img
                  src={profile.logoUrl}
                  alt={profile.businessName}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-xl bg-slate-800"
                />
                <div className="pb-0.5">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-extrabold text-white text-base leading-tight font-heading truncate max-w-[200px]">
                      {profile.businessName}
                    </h3>
                    <span className="w-3.5 h-3.5 rounded-full bg-red-600 text-white text-[9px] flex items-center justify-center font-bold">
                      ✓
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 truncate max-w-[210px]">
                    {profile.slogan}
                  </p>
                </div>
              </div>

              {/* Share Button */}
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: profile.businessName,
                      text: profile.slogan,
                      url: window.location.href,
                    });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Enlace copiado al portapapeles');
                  }
                }}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                title="Compartir Mini App"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Scrollable View Content based on Active Tab */}
          <div className="flex-1 overflow-y-auto bg-[#0b0c10] text-slate-200">
            
            {/* ================= TAB 1: INICIO ================= */}
            {activeTab === 'home' && (
              <div className="p-4 space-y-5 animate-in fade-in duration-200">
                {/* Presentation Card */}
                <div className="bg-[#131622] p-4 rounded-2xl border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-red-400 font-bold">
                      {profile.industry}
                    </span>
                    <span className="text-[10px] text-slate-400">Mexicali, B.C.</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {profile.description}
                  </p>
                </div>

                {/* Quick Action Matrix (iOS style touch buttons) */}
                <div className="grid grid-cols-4 gap-2 text-center">
                  <a
                    href={`https://wa.me/${profile.contacts.whatsapp}?text=${encodeURIComponent(`Hola ${profile.businessName}, vi su catálogo digital y deseo información.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-2xl bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-500/30 flex flex-col items-center justify-center gap-1.5 transition-colors"
                  >
                    <MessageCircle className="w-5 h-5 text-emerald-400" />
                    <span className="text-[10px] font-bold text-white">WhatsApp</span>
                  </a>

                  <a
                    href={`tel:${profile.contacts.phone}`}
                    className="p-3 rounded-2xl bg-[#151824] hover:bg-[#1a1e2d] border border-white/10 flex flex-col items-center justify-center gap-1.5 transition-colors"
                  >
                    <PhoneCall className="w-5 h-5 text-red-400" />
                    <span className="text-[10px] font-bold text-white">Llamar</span>
                  </a>

                  <button
                    onClick={() => setActiveTab('contact')}
                    className="p-3 rounded-2xl bg-[#151824] hover:bg-[#1a1e2d] border border-white/10 flex flex-col items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <MapPin className="w-5 h-5 text-amber-400" />
                    <span className="text-[10px] font-bold text-white">Ubicación</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('assistant')}
                    className="p-3 rounded-2xl bg-red-950/60 hover:bg-red-900/60 border border-red-500/40 flex flex-col items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Bot className="w-5 h-5 text-red-400" />
                    <span className="text-[10px] font-bold text-white">Asistente</span>
                  </button>
                </div>

                {/* Featured Products Carousel / Grid */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white font-heading">
                      Especialidades Destacadas
                    </h4>
                    <button
                      onClick={() => setActiveTab('catalog')}
                      className="text-xs text-red-400 hover:text-red-300 font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      Ver todo ({profile.products.length}) <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {profile.products.slice(0, 4).map((product) => (
                      <div
                        key={product.id}
                        onClick={() => setSelectedProduct(product)}
                        className="p-2.5 rounded-2xl bg-[#141620] hover:bg-[#191c28] border border-white/10 flex items-center gap-3 transition-colors cursor-pointer group"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          {product.badge && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-red-950 text-red-300 border border-red-500/30 font-semibold uppercase font-mono">
                              {product.badge}
                            </span>
                          )}
                          <h5 className="text-xs font-bold text-white truncate mt-0.5 group-hover:text-red-400 transition-colors">
                            {product.name}
                          </h5>
                          <p className="text-[10px] text-slate-400 truncate">
                            {product.description}
                          </p>
                          <p className="text-xs font-extrabold text-red-400 mt-1">
                            {product.price || 'Consultar'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Promotional Banner */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-red-950 via-[#1e131d] to-[#12131d] border border-red-500/30 space-y-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-red-400" />
                    <span className="text-xs font-bold text-white font-heading">
                      Atención Personalizada en Mexicali
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    Pregunta a nuestro Asistente Inteligente por disponibilidad, reservas o cotizaciones especiales.
                  </p>
                  <button
                    onClick={() => setActiveTab('assistant')}
                    className="w-full py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Iniciar Chat con Asistente</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* ================= TAB 2: CATÁLOGO ================= */}
            {activeTab === 'catalog' && (
              <div className="p-4 space-y-4 animate-in fade-in duration-200">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar producto o servicio..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#141622] border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-red-500"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
                    >
                      ×
                    </button>
                  )}
                </div>

                {/* Category Pills (horizontal scroll) */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs select-none">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded-xl font-medium whitespace-nowrap transition-colors cursor-pointer ${
                        selectedCategory === cat
                          ? 'bg-red-600 text-white font-bold shadow-md shadow-red-600/30'
                          : 'bg-[#141622] text-slate-400 hover:text-white border border-white/5'
                      }`}
                    >
                      {cat === 'all' ? 'Todos' : cat}
                    </button>
                  ))}
                </div>

                {/* Products Count & Add Button */}
                <div className="flex items-center justify-between text-xs text-slate-400 px-1">
                  <span>Mostrando {filteredProducts.length} ítems</span>
                  <button
                    onClick={onOpenAdmin}
                    className="text-red-400 hover:text-red-300 font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Agregar al catálogo</span>
                  </button>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => setSelectedProduct(product)}
                      className="rounded-2xl bg-[#13151f] hover:bg-[#181a27] border border-white/10 overflow-hidden shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
                    >
                      <div className="h-36 w-full relative overflow-hidden bg-slate-900">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {product.badge && (
                          <span className="absolute top-2.5 left-2.5 text-[9px] px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md text-red-300 border border-red-500/30 font-bold uppercase font-mono">
                            {product.badge}
                          </span>
                        )}
                      </div>

                      <div className="p-3 space-y-2 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-[10px] text-slate-400 font-mono">
                              {product.category}
                            </span>
                            <span className="text-xs font-black text-red-400">
                              {product.price || 'Consultar'}
                            </span>
                          </div>
                          <h4 className="text-sm font-bold text-white group-hover:text-red-400 transition-colors mt-0.5 line-clamp-1">
                            {product.name}
                          </h4>
                          <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">
                            {product.description}
                          </p>
                        </div>

                        {/* WhatsApp Inquire button */}
                        <a
                          href={`https://wa.me/${profile.contacts.whatsapp}?text=${encodeURIComponent(`Hola ${profile.businessName}, deseo solicitar información o pedir: ${product.name} (${product.price || ''})`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold flex items-center justify-center gap-1.5 transition-colors mt-2"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>Pedir por WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                {filteredProducts.length === 0 && (
                  <div className="text-center py-12 text-slate-500 space-y-2">
                    <p className="text-sm">No se encontraron productos en esta categoría.</p>
                    <button
                      onClick={() => {
                        setSelectedCategory('all');
                        setSearchQuery('');
                      }}
                      className="text-xs text-red-400 hover:underline"
                    >
                      Restablecer filtros
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* ================= TAB 3: GALERÍA ================= */}
            {activeTab === 'gallery' && (
              <div className="p-4 space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white font-heading">
                    Galería & Experiencia
                  </h4>
                  <span className="text-xs text-slate-400 font-mono">
                    {profile.gallery.length} fotos y medios
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {profile.gallery.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setSelectedMedia(item)}
                      className="group relative rounded-2xl overflow-hidden bg-slate-900 aspect-square border border-white/10 cursor-pointer shadow-md"
                    >
                      <img
                        src={item.thumbnail || item.url}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2.5">
                        <span className="text-[9px] font-mono text-red-300 font-bold uppercase">
                          {item.tag}
                        </span>
                        <p className="text-[11px] font-bold text-white leading-tight truncate">
                          {item.title}
                        </p>
                      </div>
                      {item.type === 'video' && (
                        <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-red-600/90 text-white flex items-center justify-center">
                          <Play className="w-3 h-3 fill-white ml-0.5" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ================= TAB 4: ASISTENTE INTELIGENTE ================= */}
            {activeTab === 'assistant' && (
              <div className="flex flex-col h-full min-h-[460px] animate-in fade-in duration-200">
                {/* Assistant Info Banner */}
                <div className="p-3 bg-[#131622] border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-red-600 to-red-500 text-white flex items-center justify-center">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white flex items-center gap-1.5">
                        <span>Asistente de {profile.businessName}</span>
                      </p>
                      <p className="text-[10px] text-slate-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                        <span>{aiEngineStatus.model}</span>
                      </p>
                    </div>
                  </div>

                  <a
                    href={`https://wa.me/${profile.contacts.whatsapp}?text=${encodeURIComponent(`Hola ${profile.businessName}, quiero hablar con un asesor humano.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-bold text-emerald-400 hover:text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-1 rounded-lg flex items-center gap-1"
                  >
                    <MessageCircle className="w-3 h-3" />
                    <span>WhatsApp</span>
                  </a>
                </div>

                {/* Chat Messages */}
                <div 
                  ref={chatScrollRef} 
                  className="flex-1 p-4 space-y-3.5 overflow-y-auto max-h-[380px]"
                >
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                          msg.sender === 'user'
                            ? 'bg-red-600 text-white rounded-br-none shadow-md'
                            : 'bg-[#181a26] text-slate-200 rounded-bl-none border border-white/10'
                        }`}
                      >
                        <p className="whitespace-pre-line">{msg.text}</p>

                        {/* Highlighted Catalog Items in Chat */}
                        {msg.highlightProducts && (
                          <div className="mt-2.5 space-y-2 pt-2 border-t border-white/10">
                            {msg.highlightProducts.map((p) => (
                              <div
                                key={p.id}
                                onClick={() => setSelectedProduct(p)}
                                className="flex items-center gap-2 p-1.5 rounded-xl bg-black/40 hover:bg-black/60 transition-colors cursor-pointer border border-white/5"
                              >
                                <img
                                  src={p.image}
                                  alt={p.name}
                                  className="w-9 h-9 rounded-lg object-cover"
                                />
                                <div className="flex-1 min-w-0">
                                  <p className="font-bold text-white text-[11px] truncate">
                                    {p.name}
                                  </p>
                                  <p className="text-red-400 text-[10px] font-semibold">
                                    {p.price || 'Consultar'}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Suggested quick chips */}
                      {msg.suggestedActions && (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {msg.suggestedActions.map((act, i) => (
                            <button
                              key={i}
                              onClick={() => handleActionClick(act.action)}
                              className="text-[10px] px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
                            >
                              {act.label}
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
                      <span className="text-[10px] ml-1">Escribiendo...</span>
                    </div>
                  )}
                </div>

                {/* Chat Input Bar */}
                <div className="p-3 bg-[#10121a] border-t border-white/10">
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
                      placeholder="Escribe tu pregunta o duda..."
                      className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#181a26] border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-red-500"
                    />
                    <button
                      type="submit"
                      disabled={!inputMessage.trim()}
                      className="p-2.5 rounded-xl bg-red-600 hover:bg-red-500 disabled:opacity-40 text-white transition-colors cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* ================= TAB 5: CONTACTO ================= */}
            {activeTab === 'contact' && (
              <div className="p-4 space-y-4 animate-in fade-in duration-200">
                <h4 className="text-sm font-bold text-white font-heading">
                  Contacto Comercial & Ubicación
                </h4>

                {/* Direct Touch Options */}
                <div className="space-y-2.5">
                  <a
                    href={`https://wa.me/${profile.contacts.whatsapp}?text=${encodeURIComponent(`Hola ${profile.businessName}, los contacto desde su Mini App Comercial.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 rounded-2xl bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-500/30 flex items-center justify-between transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                        <MessageCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white">WhatsApp Directo</p>
                        <p className="text-[11px] text-emerald-400">Atención inmediata</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-emerald-400" />
                  </a>

                  <a
                    href={`tel:${profile.contacts.phone}`}
                    className="p-3.5 rounded-2xl bg-[#141622] hover:bg-[#1a1d2c] border border-white/10 flex items-center justify-between transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-red-600 text-white flex items-center justify-center">
                        <PhoneCall className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white">Llamada Telefónica</p>
                        <p className="text-[11px] text-slate-400">{profile.contacts.phone}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </a>
                </div>

                {/* Location & Hours Card */}
                <div className="p-4 rounded-2xl bg-[#141622] border border-white/10 space-y-3">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-white">Dirección en Mexicali</p>
                      <p className="text-xs text-slate-300 mt-0.5">
                        {profile.address}, {profile.city}, {profile.state} (C.P. {profile.postalCode})
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 pt-2 border-t border-white/10">
                    <Clock className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-white">Horario de Operación</p>
                      <p className="text-xs text-slate-300 mt-0.5">{profile.schedule}</p>
                    </div>
                  </div>

                  {/* Google Maps link */}
                  {profile.contacts.googleMapsUrl && (
                    <a
                      href={profile.contacts.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <MapPin className="w-3.5 h-3.5 text-amber-400" />
                      <span>Abrir en Google Maps</span>
                      <ExternalLink className="w-3 h-3 text-slate-400 ml-1" />
                    </a>
                  )}
                </div>

                {/* Social Networks List */}
                <div className="p-3.5 rounded-2xl bg-[#141622] border border-white/10 space-y-2">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                    Redes Sociales Oficiales
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {profile.contacts.facebook && (
                      <a
                        href={profile.contacts.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-slate-300 hover:text-white border border-white/5"
                      >
                        Facebook
                      </a>
                    )}
                    {profile.contacts.instagram && (
                      <a
                        href={profile.contacts.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-slate-300 hover:text-white border border-white/5"
                      >
                        Instagram
                      </a>
                    )}
                    {profile.contacts.tiktok && (
                      <a
                        href={profile.contacts.tiktok}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-slate-300 hover:text-white border border-white/5"
                      >
                        TikTok
                      </a>
                    )}
                  </div>
                </div>

              </div>
            )}

          </div>

          {/* Bottom Dock Navigation Bar (iOS Tab Bar Style with Micro-Animations) */}
          <div className="flex-shrink-0 bg-[#0d0f17] border-t border-white/10 px-2 py-2 flex items-center justify-around select-none">
            <button
              onClick={() => setActiveTab('home')}
              className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all duration-200 cursor-pointer active:scale-90 ${
                activeTab === 'home' ? 'text-red-500 font-bold scale-105' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Home className={`w-5 h-5 transition-transform ${activeTab === 'home' ? '-translate-y-0.5' : ''}`} />
              <span className="text-[10px]">Inicio</span>
            </button>

            <button
              onClick={() => setActiveTab('catalog')}
              className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all duration-200 cursor-pointer active:scale-90 ${
                activeTab === 'catalog' ? 'text-red-500 font-bold scale-105' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ShoppingBag className={`w-5 h-5 transition-transform ${activeTab === 'catalog' ? '-translate-y-0.5' : ''}`} />
              <span className="text-[10px]">Catálogo</span>
            </button>

            <button
              onClick={() => setActiveTab('gallery')}
              className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all duration-200 cursor-pointer active:scale-90 ${
                activeTab === 'gallery' ? 'text-red-500 font-bold scale-105' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ImageIcon className={`w-5 h-5 transition-transform ${activeTab === 'gallery' ? '-translate-y-0.5' : ''}`} />
              <span className="text-[10px]">Galería</span>
            </button>

            <button
              onClick={() => setActiveTab('assistant')}
              className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all duration-200 cursor-pointer relative active:scale-90 ${
                activeTab === 'assistant' ? 'text-red-500 font-bold scale-105' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <Bot className={`w-5 h-5 transition-transform ${activeTab === 'assistant' ? '-translate-y-0.5' : ''}`} />
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
              </div>
              <span className="text-[10px]">Asistente</span>
            </button>

            <button
              onClick={() => setActiveTab('contact')}
              className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all duration-200 cursor-pointer active:scale-90 ${
                activeTab === 'contact' ? 'text-red-500 font-bold scale-105' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <PhoneCall className={`w-5 h-5 transition-transform ${activeTab === 'contact' ? '-translate-y-0.5' : ''}`} />
              <span className="text-[10px]">Contacto</span>
            </button>
          </div>

        </div>

      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-60 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-md bg-[#13151f] border border-white/20 rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-150">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="h-56 w-full relative">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#13151f] via-transparent to-transparent" />
            </div>

            <div className="p-6 space-y-4 -mt-6 relative z-10">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-red-400 uppercase">
                  {selectedProduct.category}
                </span>
                <span className="text-base font-black text-white">
                  {selectedProduct.price || 'Consultar'}
                </span>
              </div>

              <h3 className="text-xl font-extrabold text-white font-heading">
                {selectedProduct.name}
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedProduct.description}
              </p>

              {selectedProduct.tags && selectedProduct.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {selectedProduct.tags.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-400"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              )}

              <div className="pt-2">
                <a
                  href={`https://wa.me/${profile.contacts.whatsapp}?text=${encodeURIComponent(`Hola ${profile.businessName}, me interesa ordenar o recibir más información sobre: ${selectedProduct.name} (${selectedProduct.price || ''})`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Pedir o Cotizar por WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Modal for Gallery */}
      {selectedMedia && (
        <div 
          onClick={() => setSelectedMedia(null)}
          className="fixed inset-0 z-60 bg-black/90 backdrop-blur-lg flex items-center justify-center p-4"
        >
          <div className="relative max-w-3xl max-h-[85vh] overflow-hidden rounded-2xl border border-white/20">
            <button
              onClick={() => setSelectedMedia(null)}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/70 text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={selectedMedia.url}
              alt={selectedMedia.title}
              className="max-h-[80vh] w-auto object-contain"
            />
            <div className="p-3 bg-black/80 text-white text-center">
              <p className="text-sm font-bold">{selectedMedia.title}</p>
              <p className="text-xs text-slate-400 font-mono">Mexicali, B.C.</p>
            </div>
          </div>
        </div>
      )}

      {/* Access Modal: NFC + QR integration */}
      {showAccessModal && (
        <div className="fixed inset-0 z-60 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-sm bg-[#141622] border border-white/20 rounded-3xl p-6 text-center space-y-4 shadow-2xl">
            <button
              onClick={() => setShowAccessModal(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-red-600/20 text-red-500 flex items-center justify-center mx-auto">
              <QrCode className="w-6 h-6" />
            </div>

            <h4 className="text-lg font-bold text-white font-heading">
              Acceso a la Mini App
            </h4>
            <p className="text-xs text-slate-400">
              Escanea con la cámara de cualquier teléfono celular o acerca tu tarjeta NFC física.
            </p>

            <div className="bg-white p-3 rounded-2xl inline-block shadow-inner">
              {qrCodeData && (
                <img src={qrCodeData} alt="Mini App QR" className="w-48 h-48 mx-auto" />
              )}
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setShowAccessModal(false);
                  onOpenNfcDemo();
                }}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white flex items-center justify-center gap-2 cursor-pointer"
              >
                <Wifi className="w-4 h-4 text-red-500" />
                <span>Simular Apertura por Tarjeta NFC</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
