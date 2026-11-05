import React, { useState, useEffect } from 'react';
import { useBusiness } from '../context/BusinessContext';
import { 
  X, 
  Smartphone, 
  Wifi, 
  QrCode, 
  Download, 
  MessageCircle, 
  Phone, 
  MapPin, 
  Share2, 
  Check, 
  Sparkles, 
  RotateCw, 
  Globe, 
  HardDrive, 
  Info, 
  Instagram, 
  Facebook 
} from 'lucide-react';
import { downloadVCard, isWebNfcSupported, writeNfcTag } from '../utils/nfcUtils';
import { generateQrDataUrl } from '../utils/qrUtils';
import { playNfcTapSound } from '../utils/audioUtils';
import confetti from 'canvas-confetti';

interface NfcStartModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenMiniAppDemo: () => void;
}

export const NfcStartModal: React.FC<NfcStartModalProps> = ({
  isOpen,
  onClose,
  onOpenMiniAppDemo,
}) => {
  const { profile } = useBusiness();
  const [isFlipped, setIsFlipped] = useState(false);
  const [isTapping, setIsTapping] = useState(false);
  const [hasTapped, setHasTapped] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [qrMode, setQrMode] = useState<'vcard_offline' | 'web_online'>('vcard_offline');
  const [nfcWriteStatus, setNfcWriteStatus] = useState<string | null>(null);
  const [nfcWriteSuccess, setNfcWriteSuccess] = useState<boolean | undefined>(undefined);

  // Generate QR Code dynamically
  useEffect(() => {
    async function loadQr() {
      const qrPayload = qrMode === 'vcard_offline'
        ? `BEGIN:VCARD\nVERSION:3.0\nFN:${profile.ownerName}\nORG:${profile.businessName}\nTEL:${profile.contacts.phone}\nEND:VCARD`
        : `${window.location.origin}?profile=${encodeURIComponent(profile.businessName)}`;
      
      const url = await generateQrDataUrl(qrPayload, {
        darkColor: '#1e293b',
        lightColor: '#ffffff',
        width: 280,
      });
      setQrDataUrl(url);
    }
    loadQr();
  }, [profile, qrMode]);

  if (!isOpen) return null;

  const handleSimulateTap = () => {
    setIsTapping(true);
    setNfcWriteStatus(null);
    // Play contact sound at instant of touch
    setTimeout(() => {
      playNfcTapSound();
    }, 700);

    setTimeout(() => {
      setIsTapping(false);
      setHasTapped(true);
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#dc2626', '#ffffff', '#ef4444', '#b91c1c'],
      });
    }, 1050);
  };

  const handleWebNfcWrite = async () => {
    const contactUrl = `${window.location.origin}?nfc=true&biz=${encodeURIComponent(profile.businessName)}`;
    await writeNfcTag(contactUrl, (status, success) => {
      setNfcWriteStatus(status);
      setNfcWriteSuccess(success);
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#0f1117] border border-white/15 rounded-3xl shadow-2xl overflow-hidden my-6">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#141620]">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              DEMO EN VIVO • NFC MINI APP START
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* Key Heading & Slogan */}
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
              Tarjeta NFC Inteligente Personalizada
            </h3>
            <p className="text-red-400 font-semibold text-lg font-heading italic">
              «Un toque y tus clientes tienen tus datos de contacto».
            </p>
            <p className="text-xs sm:text-sm text-slate-400">
              Experimenta cómo un cliente en Mexicali interactúa con la tarjeta física física con chip NTAG y QR grabado.
            </p>
          </div>

          {/* Interactive Card & Phone Simulation Area */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#090a0d] p-6 rounded-2xl border border-white/10 relative">
            
            {/* Left Column: 3D Luxury Card Simulation (Col 7) */}
            <div className="lg:col-span-7 flex flex-col items-center">
              
              {/* 3D Perspective Card Container with True Flip */}
              <div 
                className="relative w-full max-w-[360px] aspect-[1.586/1] select-none [perspective:1200px]"
              >
                {/* Simulated Phone Tap Gesture */}
                {isTapping && (
                  <div className="absolute -top-14 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center animate-bounce duration-200">
                    <div className="w-36 h-22 bg-slate-900 border-2 border-red-500 rounded-2xl shadow-2xl flex flex-col items-center justify-center text-white px-3 py-2 relative overflow-hidden">
                      <div className="absolute inset-0 bg-red-600/10 animate-pulse"></div>
                      <Wifi className="w-7 h-7 text-red-500 animate-ping mb-1" />
                      <span className="text-[10px] font-mono font-black tracking-wide text-white">¡CONECTANDO NFC!</span>
                      <span className="text-[8px] text-slate-400 font-mono">1 Toque a 13.56 MHz</span>
                    </div>
                    {/* Concentric Signal Wave Ripples */}
                    <div className="absolute top-1/2 -translate-y-1/2 w-64 h-64 border-2 border-red-500/60 rounded-full animate-nfc-ripple pointer-events-none" />
                    <div className="absolute top-1/2 -translate-y-1/2 w-44 h-44 border-2 border-red-500/90 rounded-full animate-nfc-ripple pointer-events-none [animation-delay:300ms]" />
                    <div className="absolute top-1/2 -translate-y-1/2 w-28 h-28 border-2 border-white/80 rounded-full animate-nfc-ripple pointer-events-none [animation-delay:600ms]" />
                  </div>
                )}

                {/* 3D Flipping Flipper Element */}
                <div 
                  className={`w-full h-full transition-transform duration-700 [transform-style:preserve-3d] relative ${
                    isFlipped ? '[transform:rotateY(180deg)]' : '[transform:rotateY(0deg)]'
                  }`}
                >
                  {/* FRONT FACE (White Luxury + Metallic Red + Chrome Foil) */}
                  <div 
                    className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-tr from-slate-100 via-white to-slate-200 text-slate-900 p-6 flex flex-col justify-between shadow-2xl border border-white/90 overflow-hidden card-shine [backface-visibility:hidden]"
                  >
                    {/* Metallic red corner accent */}
                    <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-red-600 via-red-700 to-transparent opacity-90 [clip-path:polygon(100%_0,0_0,100%_100%)] flex items-start justify-end p-2.5">
                      <Wifi className="w-4 h-4 text-white animate-pulse" />
                    </div>

                    {/* Card Top: Logo & Brand */}
                    <div className="flex items-center gap-3">
                      <img 
                        src={profile.logoUrl} 
                        alt="Logo" 
                        className="w-12 h-12 rounded-xl object-cover border-2 border-red-600 shadow-md"
                      />
                      <div>
                        <span className="text-[10px] font-mono font-black uppercase tracking-wider text-red-600 block">
                          NEXO START • NFC
                        </span>
                        <h4 className="font-extrabold text-base sm:text-lg text-slate-900 leading-tight">
                          {profile.businessName}
                        </h4>
                      </div>
                    </div>

                    {/* Card Middle: Metallic Smart Chip with Wave Indicator */}
                    <div className="my-2 flex items-center justify-between">
                      <div className="relative">
                        <div className="w-11 h-8 rounded-md bg-gradient-to-br from-amber-200 via-amber-300 to-amber-500 border border-amber-600/50 shadow-inner flex items-center justify-center relative">
                          <div className="w-6 h-5 border border-amber-800/40 rounded-sm"></div>
                          <div className="absolute w-full h-[1px] bg-amber-800/30"></div>
                        </div>
                        {/* Glowing micro-indicator */}
                        <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-600 animate-ping"></div>
                      </div>
                      <div className="flex items-center gap-1.5 text-[9px] font-mono tracking-widest text-slate-600 uppercase bg-slate-200/60 px-2 py-0.5 rounded-md">
                        <Wifi className="w-3 h-3 text-red-600" />
                        <span>NTAG216 CHIP</span>
                      </div>
                    </div>

                    {/* Card Bottom: Cardholder & Region */}
                    <div className="flex items-end justify-between pt-2 border-t border-slate-300/60">
                      <div>
                        <p className="text-[11px] font-black uppercase text-slate-900 tracking-wide font-heading">
                          {profile.ownerName}
                        </p>
                        <p className="text-[10px] text-slate-600 truncate max-w-[200px]">
                          {profile.industry}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[9px] font-mono font-bold text-slate-700 uppercase">
                          MEXICALI, B.C.
                        </p>
                        <p className="text-[8px] text-red-700 font-bold uppercase tracking-wider">
                          NEXO DIGITAL
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* BACK FACE (Rotated 180deg) */}
                  <div 
                    className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-tr from-slate-900 via-[#13151f] to-slate-950 text-white p-5 flex flex-col justify-between shadow-2xl border border-white/20 overflow-hidden [transform:rotateY(180deg)] [backface-visibility:hidden]"
                  >
                    <div className="flex items-center justify-between border-b border-white/10 pb-2">
                      <span className="text-[10px] font-mono uppercase text-red-400 font-bold flex items-center gap-1">
                        <QrCode className="w-3 h-3" />
                        <span>ESCÁNEO ALTERNATIVO QR</span>
                      </span>
                      <span className="text-[9px] text-slate-400 font-mono">
                        NDEF vCard / Web
                      </span>
                    </div>

                    <div className="flex items-center gap-4 my-auto">
                      <div className="bg-white p-2 rounded-xl shadow-xl flex-shrink-0 border-2 border-red-500/40">
                        {qrDataUrl ? (
                          <img src={qrDataUrl} alt="QR Code" className="w-20 h-20" />
                        ) : (
                          <div className="w-20 h-20 bg-slate-200 animate-pulse" />
                        )}
                      </div>
                      <div className="text-xs space-y-1">
                        <p className="font-bold text-white text-[12px]">{profile.businessName}</p>
                        <p className="text-slate-400 text-[10px]">Tel: {profile.contacts.phone}</p>
                        <p className="text-slate-400 text-[10px] truncate max-w-[150px]">{profile.address}</p>
                        <p className="text-[9px] text-red-400 font-mono mt-1 font-semibold">
                          Compatible con cualquier celular
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[8px] text-slate-500 font-mono pt-2 border-t border-white/10">
                      <span>NEXO NFC MINI APP START</span>
                      <span>CONECTANDO A MEXICALI AL MUNDO</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Controls below card */}
              <div className="mt-4 flex items-center gap-3 w-full justify-center">
                <button
                  onClick={() => setIsFlipped(!isFlipped)}
                  className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs text-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RotateCw className="w-3.5 h-3.5 text-red-400" />
                  <span>Voltear Tarjeta ({isFlipped ? 'Frente' : 'Reverso QR'})</span>
                </button>

                <button
                  onClick={handleSimulateTap}
                  disabled={isTapping}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-xs font-bold text-white flex items-center gap-2 shadow-md shadow-red-600/30 cursor-pointer disabled:opacity-50"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>{isTapping ? 'Simulando toque...' : 'Simular Acercamiento de Teléfono'}</span>
                </button>
              </div>
            </div>

            {/* Right Column: Instant Shared Contact Preview (Col 5) */}
            <div className="lg:col-span-5 bg-[#141622] rounded-2xl p-5 border border-white/10 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold uppercase text-white">
                    Vista Previa en el Celular
                  </span>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${hasTapped ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40' : 'bg-slate-800 text-slate-400'}`}>
                  {hasTapped ? '✓ Toque Recibido' : 'Esperando Toque'}
                </span>
              </div>

              {/* Contact Card Payload */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <img
                    src={profile.logoUrl}
                    alt={profile.businessName}
                    className="w-10 h-10 rounded-xl object-cover border border-white/20"
                  />
                  <div>
                    <h5 className="font-bold text-sm text-white">{profile.businessName}</h5>
                    <p className="text-xs text-red-400">{profile.ownerName}</p>
                  </div>
                </div>

                <div className="bg-[#0b0c10] p-3 rounded-xl border border-white/5 space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Phone className="w-3.5 h-3.5 text-red-500" />
                    <span>{profile.contacts.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <MapPin className="w-3.5 h-3.5 text-red-500" />
                    <span className="truncate">{profile.address}, {profile.city}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <Share2 className="w-3.5 h-3.5 text-red-500" />
                    <span className="truncate">Redes: Instagram, WhatsApp, Facebook</span>
                  </div>
                </div>

                {/* Direct Action Buttons on phone preview */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <a
                    href={`https://wa.me/${profile.contacts.whatsapp}?text=${encodeURIComponent(`Hola ${profile.businessName}, los contacto desde su tarjeta digital NFC.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>

                  <a
                    href={`tel:${profile.contacts.phone}`}
                    className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Llamar</span>
                  </a>
                </div>

                {/* Offline Contact Download */}
                <button
                  onClick={() => downloadVCard(profile)}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 border border-white/10 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-red-400" />
                  <span>Guardar Contacto en Teléfono (.vcf)</span>
                </button>
              </div>
            </div>
          </div>

          {/* Technical Differentiation: Storage on Chip vs Internet */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#141620] p-5 rounded-2xl border border-white/10">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <HardDrive className="w-4 h-4 text-red-500" />
                <span>Información en la Tarjeta (Sin Internet)</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                El chip NFC físico graba mediante estándar <strong className="text-white">NDEF</strong> tu tarjeta de contacto (vCard 3.0). El celular del cliente puede guardarte en su agenda telefónica incluso en áreas sin señal móvil o en sótanos.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Globe className="w-4 h-4 text-red-500" />
                <span>Perfil Web & Redes (Con Internet)</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Cuando el cliente tiene datos o WiFi, la tarjeta o el código QR pueden abrir instantáneamente tu perfil digital vivo, WhatsApp y catálogo comercial sin que nadie descargue aplicaciones pesadas de la App Store.
              </p>
            </div>
          </div>

          {/* Hardware Web NFC Writer (Android Chrome) */}
          <div className="bg-[#0a0b0e] p-4 rounded-xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-red-950/80 text-red-400 flex items-center justify-center flex-shrink-0">
                <Wifi className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Grabación Hardware Web NFC (NDEF Writer)</p>
                <p className="text-[11px] text-slate-400">
                  {isWebNfcSupported() 
                    ? 'Tu navegador soporta Web NFC. Puedes grabar una tarjeta física real ahora.'
                    : 'Web NFC disponible en Google Chrome para Android con sensor NFC activo.'}
                </p>
              </div>
            </div>

            <button
              onClick={handleWebNfcWrite}
              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white border border-white/15 cursor-pointer whitespace-nowrap transition-colors"
            >
              Probar Grabación NFC Real
            </button>
          </div>

          {nfcWriteStatus && (
            <div className={`p-3 rounded-xl text-xs flex items-center gap-2 ${nfcWriteSuccess ? 'bg-emerald-950/60 border border-emerald-500 text-emerald-300' : 'bg-amber-950/60 border border-amber-500 text-amber-300'}`}>
              <Info className="w-4 h-4 flex-shrink-0" />
              <span>{nfcWriteStatus}</span>
            </div>
          )}

          {/* Upgrade Banner to Mini App Premium */}
          <div className="bg-gradient-to-r from-red-950/50 via-[#1e131d] to-[#12131d] p-5 rounded-2xl border border-red-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-red-400">
                ¿NECESITAS MÁS QUE UNA TARJETA DE CONTACTO?
              </span>
              <h4 className="text-sm sm:text-base font-bold text-white">
                Evoluciona a la MINI APP COMERCIAL PREMIUM
              </h4>
              <p className="text-xs text-slate-300">
                Incluye catálogo de productos, asistente virtual inteligente, galería y pedidos por WhatsApp.
              </p>
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenMiniAppDemo();
              }}
              className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-lg shadow-red-600/30 whitespace-nowrap cursor-pointer transition-colors"
            >
              Ver Mini App Premium →
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
