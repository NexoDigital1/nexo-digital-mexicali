import React, { useState, useEffect } from 'react';
import { useBusiness } from '../context/BusinessContext';
import { X, Printer, QrCode, Wifi, Download, Sparkles, Check } from 'lucide-react';
import { generateQrDataUrl } from '../utils/qrUtils';

interface TableStandGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TableStandGeneratorModal: React.FC<TableStandGeneratorModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { profile } = useBusiness();
  const [qrUrl, setQrUrl] = useState<string>('');

  useEffect(() => {
    async function loadQr() {
      const appUrl = `${window.location.origin}?mesa=true&negocio=${encodeURIComponent(profile.businessName)}`;
      const data = await generateQrDataUrl(appUrl, {
        width: 320,
        darkColor: '#0f172a',
        lightColor: '#ffffff',
      });
      setQrUrl(data);
    }
    loadQr();
  }, [profile.businessName]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#0f1118] border border-white/20 rounded-3xl shadow-2xl overflow-hidden my-6">
        
        {/* Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#141624]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
            <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              MATERIAL DE MESA & MOSTRADOR • NEXO DIGITAL
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="text-center max-w-md mx-auto space-y-1">
            <h3 className="text-xl sm:text-2xl font-extrabold text-white font-heading">
              Acrílico de Mesa & Mostrador Inteligente
            </h3>
            <p className="text-xs text-slate-400">
              Coloca este material en tus mesas, barra de cobro o recepción para que tus clientes en Mexicali abran tu catálogo con un toque o escaneo.
            </p>
          </div>

          {/* Printable Stand Preview Card */}
          <div 
            id="printable-stand" 
            className="max-w-sm mx-auto bg-gradient-to-b from-white via-slate-50 to-slate-100 text-slate-900 rounded-3xl p-6 border-4 border-slate-900 shadow-2xl text-center space-y-4 relative overflow-hidden select-none"
          >
            {/* Top red header */}
            <div className="bg-red-600 text-white -mx-6 -mt-6 p-4">
              <span className="text-[10px] font-mono uppercase tracking-widest block font-bold">
                EXPERIENCIA COMERCIAL DIGITAL
              </span>
              <h4 className="text-lg font-black tracking-tight leading-tight mt-0.5">
                {profile.businessName}
              </h4>
            </div>

            {/* Logo */}
            <div className="flex justify-center -mt-2">
              <img
                src={profile.logoUrl}
                alt={profile.businessName}
                className="w-16 h-16 rounded-2xl object-cover border-4 border-white shadow-xl"
              />
            </div>

            <div className="space-y-1">
              <p className="text-xs text-slate-700 font-medium">
                {profile.slogan}
              </p>
            </div>

            {/* Tap instruction */}
            <div className="bg-slate-900 text-white py-2 px-3 rounded-2xl flex items-center justify-center gap-2">
              <Wifi className="w-4 h-4 text-red-500 animate-pulse" />
              <span className="text-xs font-black tracking-wide">
                ACERCA TU CELULAR AQUÍ (NFC)
              </span>
            </div>

            {/* QR Code */}
            <div className="bg-white p-3 rounded-2xl inline-block shadow-md border border-slate-200">
              {qrUrl ? (
                <img src={qrUrl} alt="QR de mesa" className="w-40 h-40 mx-auto" />
              ) : (
                <div className="w-40 h-40 bg-slate-200 animate-pulse" />
              )}
            </div>

            <p className="text-[10px] text-slate-600 font-medium">
              O escanea este código con la cámara de tu celular. <br />
              <strong className="text-slate-900">¡Cero descargas de apps!</strong>
            </p>

            <div className="pt-2 border-t border-slate-300 flex items-center justify-between text-[9px] font-mono text-slate-500">
              <span>MEXICALI, B.C.</span>
              <span className="text-red-600 font-bold">NEXO DIGITAL</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={handlePrint}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-red-600/30 cursor-pointer transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir / Guardar en PDF</span>
            </button>
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-slate-300 font-semibold text-xs cursor-pointer transition-colors"
            >
              Cerrar Vista Previa
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
