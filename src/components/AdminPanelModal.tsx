import React, { useState } from 'react';
import { useBusiness } from '../context/BusinessContext';
import { ProductItem, FAQItem } from '../types';
import { 
  X, 
  Sliders, 
  Save, 
  RotateCcw, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  Image as ImageIcon, 
  Store, 
  Phone, 
  HelpCircle, 
  ShoppingBag, 
  Sparkles,
  RefreshCw 
} from 'lucide-react';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenMiniAppDemo: () => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  onOpenMiniAppDemo,
}) => {
  const { 
    profile, 
    updateProfile, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    addFaq, 
    deleteFaq, 
    resetToDefault, 
    loadTemplate 
  } = useBusiness();

  const [activeTab, setActiveTab] = useState<'general' | 'products' | 'faqs' | 'contacts'>('general');

  // Form states for adding a new product
  const [newProductName, setNewProductName] = useState('');
  const [newProductCategory, setNewProductCategory] = useState('Especialidades');
  const [newProductDesc, setNewProductDesc] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('$150 MXN');
  const [newProductImage, setNewProductImage] = useState('https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=800&auto=format&fit=crop');
  const [newProductBadge, setNewProductBadge] = useState('Nuevo');

  // Form states for adding FAQ
  const [newFaqQuestion, setNewFaqQuestion] = useState('');
  const [newFaqAnswer, setNewFaqAnswer] = useState('');

  // Success indicator
  const [savedNotification, setSavedNotification] = useState(false);

  if (!isOpen) return null;

  const handleSaveNotification = () => {
    setSavedNotification(true);
    setTimeout(() => setSavedNotification(false), 2000);
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProductName.trim()) return;

    addProduct({
      name: newProductName.trim(),
      category: newProductCategory.trim() || 'General',
      description: newProductDesc.trim() || 'Descripción del producto o servicio comercial.',
      price: newProductPrice.trim() || 'Consultar',
      image: newProductImage.trim() || 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=800&auto=format&fit=crop',
      badge: newProductBadge.trim() || undefined,
      featured: true,
      tags: [newProductCategory, 'Mexicali'],
    });

    setNewProductName('');
    setNewProductDesc('');
    handleSaveNotification();
  };

  const handleCreateFaq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFaqQuestion.trim() || !newFaqAnswer.trim()) return;

    addFaq({
      question: newFaqQuestion.trim(),
      answer: newFaqAnswer.trim(),
      category: 'General',
    });

    setNewFaqQuestion('');
    setNewFaqAnswer('');
    handleSaveNotification();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#10121a] border border-white/15 rounded-3xl shadow-2xl overflow-hidden my-6 flex flex-col max-h-[92vh]">
        
        {/* Panel Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#151722] flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-red-600/20 text-red-500 flex items-center justify-center">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm sm:text-base font-heading">
                Panel Administrativo CMS • Nexo Digital
              </h3>
              <p className="text-[10px] text-slate-400 font-mono">
                Personalización en vivo de la tarjeta NFC y Mini App Comercial
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {savedNotification && (
              <span className="text-xs text-emerald-400 font-bold flex items-center gap-1 animate-in fade-in">
                <Check className="w-3.5 h-3.5" /> ¡Guardado!
              </span>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Industry Presets Bar */}
        <div className="px-6 py-2.5 bg-[#0b0c10] border-b border-white/5 flex flex-wrap items-center justify-between gap-2 flex-shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Sparkles className="w-3.5 h-3.5 text-red-400" />
            <span>Cargar Plantilla de Giro Comercial:</span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => {
                loadTemplate('tacos');
                handleSaveNotification();
              }}
              className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/15 text-[11px] text-slate-200 border border-white/10 cursor-pointer"
            >
              🌮 Taquería/Asados
            </button>
            <button
              onClick={() => {
                loadTemplate('dental');
                handleSaveNotification();
              }}
              className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/15 text-[11px] text-slate-200 border border-white/10 cursor-pointer"
            >
              🦷 Dental/Salud
            </button>
            <button
              onClick={() => {
                loadTemplate('cafe');
                handleSaveNotification();
              }}
              className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/15 text-[11px] text-slate-200 border border-white/10 cursor-pointer"
            >
              ☕ Café/Bistro
            </button>
            <button
              onClick={() => {
                loadTemplate('taller');
                handleSaveNotification();
              }}
              className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/15 text-[11px] text-slate-200 border border-white/10 cursor-pointer"
            >
              🚗 Taller/Mecánica
            </button>
            <button
              onClick={() => {
                loadTemplate('barber');
                handleSaveNotification();
              }}
              className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/15 text-[11px] text-slate-200 border border-white/10 cursor-pointer"
            >
              ✂️ Barbería/Salón
            </button>
            <button
              onClick={() => {
                loadTemplate('boutique');
                handleSaveNotification();
              }}
              className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/15 text-[11px] text-slate-200 border border-white/10 cursor-pointer"
            >
              👗 Boutique
            </button>
            <button
              onClick={() => {
                resetToDefault();
                handleSaveNotification();
              }}
              title="Restablecer valores iniciales"
              className="p-1 rounded-lg bg-red-950/50 hover:bg-red-900/50 text-red-300 border border-red-500/30 cursor-pointer ml-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center border-b border-white/10 px-6 bg-[#13151f] flex-shrink-0 overflow-x-auto text-xs">
          <button
            onClick={() => setActiveTab('general')}
            className={`py-3 px-4 font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'general' ? 'border-red-500 text-white font-bold' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Store className="w-4 h-4" />
            <span>Datos del Negocio</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`py-3 px-4 font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'products' ? 'border-red-500 text-white font-bold' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Catálogo ({profile.products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('faqs')}
            className={`py-3 px-4 font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'faqs' ? 'border-red-500 text-white font-bold' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Chatbot & FAQs ({profile.faqs.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('contacts')}
            className={`py-3 px-4 font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'contacts' ? 'border-red-500 text-white font-bold' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Phone className="w-4 h-4" />
            <span>Canales de Contacto</span>
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          
          {/* ================= TAB 1: GENERAL ================= */}
          {activeTab === 'general' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Nombre Comercial del Negocio:
                  </label>
                  <input
                    type="text"
                    value={profile.businessName}
                    onChange={(e) => updateProfile({ businessName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#161824] border border-white/10 text-white focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Nombre del Propietario o Responsable:
                  </label>
                  <input
                    type="text"
                    value={profile.ownerName}
                    onChange={(e) => updateProfile({ ownerName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#161824] border border-white/10 text-white focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Giro / Industria:
                  </label>
                  <input
                    type="text"
                    value={profile.industry}
                    onChange={(e) => updateProfile({ industry: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#161824] border border-white/10 text-white focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Eslogan Oficial:
                  </label>
                  <input
                    type="text"
                    value={profile.slogan}
                    onChange={(e) => updateProfile({ slogan: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#161824] border border-white/10 text-white focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Descripción Comercial del Negocio:
                </label>
                <textarea
                  rows={3}
                  value={profile.description}
                  onChange={(e) => updateProfile({ description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#161824] border border-white/10 text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    URL del Logotipo Comercial:
                  </label>
                  <div className="flex items-center gap-2">
                    <img 
                      src={profile.logoUrl} 
                      alt="Logo preview" 
                      className="w-9 h-9 rounded-lg object-cover border border-white/10" 
                    />
                    <input
                      type="text"
                      value={profile.logoUrl}
                      onChange={(e) => updateProfile({ logoUrl: e.target.value })}
                      className="flex-1 px-3 py-2 rounded-xl bg-[#161824] border border-white/10 text-white focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    URL de la Foto de Portada:
                  </label>
                  <div className="flex items-center gap-2">
                    <img 
                      src={profile.coverUrl} 
                      alt="Cover preview" 
                      className="w-9 h-9 rounded-lg object-cover border border-white/10" 
                    />
                    <input
                      type="text"
                      value={profile.coverUrl}
                      onChange={(e) => updateProfile({ coverUrl: e.target.value })}
                      className="flex-1 px-3 py-2 rounded-xl bg-[#161824] border border-white/10 text-white focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-white/10">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Dirección Física en Mexicali:
                  </label>
                  <input
                    type="text"
                    value={profile.address}
                    onChange={(e) => updateProfile({ address: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#161824] border border-white/10 text-white focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Horario de Atención:
                  </label>
                  <input
                    type="text"
                    value={profile.schedule}
                    onChange={(e) => updateProfile({ schedule: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#161824] border border-white/10 text-white focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ================= TAB 2: PRODUCTS ================= */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              {/* Add New Product Form */}
              <div className="p-4 rounded-2xl bg-[#151724] border border-red-500/30 space-y-3">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <Plus className="w-4 h-4 text-red-500" />
                  <span>Agregar Nuevo Producto o Servicio al Catálogo</span>
                </h4>

                <form onSubmit={handleCreateProduct} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-slate-300 mb-1">Nombre:</label>
                      <input
                        type="text"
                        value={newProductName}
                        onChange={(e) => setNewProductName(e.target.value)}
                        placeholder="Ej. Tarta de Manzana Artesanal"
                        required
                        className="w-full px-3 py-1.5 rounded-xl bg-[#0e1017] border border-white/10 text-white focus:outline-none focus:border-red-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 mb-1">Categoría:</label>
                      <input
                        type="text"
                        value={newProductCategory}
                        onChange={(e) => setNewProductCategory(e.target.value)}
                        placeholder="Ej. Postres"
                        className="w-full px-3 py-1.5 rounded-xl bg-[#0e1017] border border-white/10 text-white focus:outline-none focus:border-red-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 mb-1">Precio o Indicador:</label>
                      <input
                        type="text"
                        value={newProductPrice}
                        onChange={(e) => setNewProductPrice(e.target.value)}
                        placeholder="Ej. $85 MXN o Consultar"
                        className="w-full px-3 py-1.5 rounded-xl bg-[#0e1017] border border-white/10 text-white focus:outline-none focus:border-red-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1">Descripción:</label>
                    <input
                      type="text"
                      value={newProductDesc}
                      onChange={(e) => setNewProductDesc(e.target.value)}
                      placeholder="Breve reseña para la ficha del cliente"
                      className="w-full px-3 py-1.5 rounded-xl bg-[#0e1017] border border-white/10 text-white focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-300 mb-1">URL de la Imagen:</label>
                      <input
                        type="text"
                        value={newProductImage}
                        onChange={(e) => setNewProductImage(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-xl bg-[#0e1017] border border-white/10 text-white focus:outline-none focus:border-red-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 mb-1">Etiqueta Destacada (Badge):</label>
                      <input
                        type="text"
                        value={newProductBadge}
                        onChange={(e) => setNewProductBadge(e.target.value)}
                        placeholder="Ej. Chef Especial, Bestseller, 2x1"
                        className="w-full px-3 py-1.5 rounded-xl bg-[#0e1017] border border-white/10 text-white focus:outline-none focus:border-red-500"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="py-2 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold cursor-pointer transition-colors flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Guardar Producto en el Catálogo</span>
                  </button>
                </form>
              </div>

              {/* Existing Products List */}
              <div className="space-y-3">
                <h5 className="font-bold text-white text-xs uppercase tracking-wider font-mono">
                  Ítems Actuales en el Catálogo ({profile.products.length})
                </h5>

                <div className="space-y-2">
                  {profile.products.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 rounded-xl bg-[#141622] border border-white/10 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="font-bold text-white text-xs truncate">{item.name}</p>
                          <p className="text-[11px] text-slate-400 truncate">{item.description}</p>
                          <span className="text-[10px] text-red-400 font-mono font-bold">
                            {item.category} • {item.price || 'Consultar'}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => deleteProduct(item.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-white/5 cursor-pointer transition-colors"
                          title="Eliminar producto"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ================= TAB 3: FAQS & CHATBOT ================= */}
          {activeTab === 'faqs' && (
            <div className="space-y-6">
              {/* Add New FAQ Form */}
              <div className="p-4 rounded-2xl bg-[#151724] border border-white/10 space-y-3">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <Plus className="w-4 h-4 text-red-500" />
                  <span>Agregar Pregunta Frecuente al Chatbot</span>
                </h4>

                <form onSubmit={handleCreateFaq} className="space-y-3">
                  <div>
                    <label className="block text-slate-300 mb-1">Pregunta del Cliente:</label>
                    <input
                      type="text"
                      value={newFaqQuestion}
                      onChange={(e) => setNewFaqQuestion(e.target.value)}
                      placeholder="Ej. ¿Aceptan pagos con tarjeta y transferencia?"
                      required
                      className="w-full px-3 py-1.5 rounded-xl bg-[#0e1017] border border-white/10 text-white focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1">Respuesta Oficial del Asistente:</label>
                    <textarea
                      rows={2}
                      value={newFaqAnswer}
                      onChange={(e) => setNewFaqAnswer(e.target.value)}
                      placeholder="Ej. Aceptamos todas las tarjetas de crédito, débito y transferencias SPEI."
                      required
                      className="w-full px-3 py-1.5 rounded-xl bg-[#0e1017] border border-white/10 text-white focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="py-2 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold cursor-pointer transition-colors flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Guardar Respuesta en el Asistente</span>
                  </button>
                </form>
              </div>

              {/* FAQs List */}
              <div className="space-y-3">
                <h5 className="font-bold text-white text-xs uppercase tracking-wider font-mono">
                  Preguntas Frecuentes Configuradas ({profile.faqs.length})
                </h5>

                <div className="space-y-2">
                  {profile.faqs.map((faq) => (
                    <div
                      key={faq.id}
                      className="p-3.5 rounded-xl bg-[#141622] border border-white/10 flex items-start justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <p className="font-bold text-white text-xs">{faq.question}</p>
                        <p className="text-[11px] text-slate-400 leading-relaxed">{faq.answer}</p>
                      </div>

                      <button
                        onClick={() => deleteFaq(faq.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-white/5 cursor-pointer transition-colors"
                        title="Eliminar pregunta"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ================= TAB 4: CONTACTS ================= */}
          {activeTab === 'contacts' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Número de WhatsApp (con código de país sin +):
                  </label>
                  <input
                    type="text"
                    value={profile.contacts.whatsapp}
                    onChange={(e) => updateProfile({ contacts: { ...profile.contacts, whatsapp: e.target.value } })}
                    placeholder="Ej. 526861234567"
                    className="w-full px-3 py-2 rounded-xl bg-[#161824] border border-white/10 text-white focus:outline-none focus:border-red-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Teléfono Comercial para Llamadas:
                  </label>
                  <input
                    type="text"
                    value={profile.contacts.phone}
                    onChange={(e) => updateProfile({ contacts: { ...profile.contacts, phone: e.target.value } })}
                    placeholder="Ej. 686 123 4567"
                    className="w-full px-3 py-2 rounded-xl bg-[#161824] border border-white/10 text-white focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Enlace de Instagram:
                  </label>
                  <input
                    type="text"
                    value={profile.contacts.instagram || ''}
                    onChange={(e) => updateProfile({ contacts: { ...profile.contacts, instagram: e.target.value } })}
                    placeholder="https://instagram.com/tu_negocio"
                    className="w-full px-3 py-2 rounded-xl bg-[#161824] border border-white/10 text-white focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Enlace de Facebook:
                  </label>
                  <input
                    type="text"
                    value={profile.contacts.facebook || ''}
                    onChange={(e) => updateProfile({ contacts: { ...profile.contacts, facebook: e.target.value } })}
                    placeholder="https://facebook.com/tu_negocio"
                    className="w-full px-3 py-2 rounded-xl bg-[#161824] border border-white/10 text-white focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Enlace de TikTok:
                  </label>
                  <input
                    type="text"
                    value={profile.contacts.tiktok || ''}
                    onChange={(e) => updateProfile({ contacts: { ...profile.contacts, tiktok: e.target.value } })}
                    placeholder="https://tiktok.com/@tu_negocio"
                    className="w-full px-3 py-2 rounded-xl bg-[#161824] border border-white/10 text-white focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Correo Electrónico Comercial:
                  </label>
                  <input
                    type="email"
                    value={profile.contacts.email || ''}
                    onChange={(e) => updateProfile({ contacts: { ...profile.contacts, email: e.target.value } })}
                    placeholder="contacto@tunegocio.com"
                    className="w-full px-3 py-2 rounded-xl bg-[#161824] border border-white/10 text-white focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Panel Footer */}
        <div className="px-6 py-4 bg-[#141620] border-t border-white/10 flex items-center justify-between flex-shrink-0">
          <p className="text-[11px] text-slate-400">
            Cambios guardados en tu navegador automáticamente en tiempo real.
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold cursor-pointer"
            >
              Cerrar Panel
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenMiniAppDemo();
              }}
              className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold cursor-pointer"
            >
              Ver en Mini App →
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
