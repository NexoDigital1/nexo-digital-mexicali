import React, { useState } from 'react';
import { BusinessProvider } from './context/BusinessContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MexicaliIndustriesShowcase } from './components/MexicaliIndustriesShowcase';
import { ProductSolutions } from './components/ProductSolutions';
import { RoiCalculatorMexicali } from './components/RoiCalculatorMexicali';
import { SolutionsComparison } from './components/SolutionsComparison';
import { SalesAdvisor } from './components/SalesAdvisor';
import { NfcEducationGuide } from './components/NfcEducationGuide';
import { NfcStartModal } from './components/NfcStartModal';
import { MiniAppPremiumExperience } from './components/MiniAppPremiumExperience';
import { AdminPanelModal } from './components/AdminPanelModal';
import { TableStandGeneratorModal } from './components/TableStandGeneratorModal';
import { NexoChatbotWidget } from './components/NexoChatbotWidget';
import { Footer } from './components/Footer';

function MainApp() {
  const [isNfcModalOpen, setIsNfcModalOpen] = useState(false);
  const [isMiniAppModalOpen, setIsMiniAppModalOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isTableStandOpen, setIsTableStandOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-red-600 selection:text-white">
      {/* Navigation Header */}
      <Navbar
        onOpenNfcDemo={() => setIsNfcModalOpen(true)}
        onOpenMiniAppDemo={() => setIsMiniAppModalOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenTableStand={() => setIsTableStandOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onExploreExperience={() => scrollToSection('giros-mexicali')}
          onExploreSolutions={() => scrollToSection('soluciones')}
          onOpenNfcDemo={() => setIsNfcModalOpen(true)}
          onOpenMiniAppDemo={() => setIsMiniAppModalOpen(true)}
        />

        {/* 2. Section: Giros Comerciales en Mexicali (Taquerías, Clínicas, Talleres, Cafés, Barberías, Boutiques) */}
        <MexicaliIndustriesShowcase
          onOpenMiniAppDemo={() => setIsMiniAppModalOpen(true)}
          onOpenNfcDemo={() => setIsNfcModalOpen(true)}
        />

        {/* 3. Section: Descubre las Soluciones Nexo Digital (Dual Cards: NFC Start vs Mini App) */}
        <ProductSolutions
          onOpenNfcDemo={() => setIsNfcModalOpen(true)}
          onOpenMiniAppDemo={() => setIsMiniAppModalOpen(true)}
        />

        {/* 4. Section: Calculadora de Retorno de Inversión y Ahorro en Papel */}
        <RoiCalculatorMexicali />

        {/* 5. Section: Comparador de Modelos */}
        <SolutionsComparison
          onOpenNfcDemo={() => setIsNfcModalOpen(true)}
          onOpenMiniAppDemo={() => setIsMiniAppModalOpen(true)}
          onOpenAdvisor={() => scrollToSection('asesor')}
        />

        {/* 6. Section: Asesor Comercial "¿Qué solución necesita tu negocio?" */}
        <SalesAdvisor
          onOpenNfcDemo={() => setIsNfcModalOpen(true)}
          onOpenMiniAppDemo={() => setIsMiniAppModalOpen(true)}
        />

        {/* 7. Section: Guía Educativa para Comerciantes de Mexicali */}
        <NfcEducationGuide
          onOpenNfcDemo={() => setIsNfcModalOpen(true)}
          onOpenMiniAppDemo={() => setIsMiniAppModalOpen(true)}
          onOpenAdvisor={() => scrollToSection('asesor')}
        />
      </main>

      {/* Interactive Simulators & Modals */}
      <NfcStartModal
        isOpen={isNfcModalOpen}
        onClose={() => setIsNfcModalOpen(false)}
        onOpenMiniAppDemo={() => setIsMiniAppModalOpen(true)}
      />

      <MiniAppPremiumExperience
        isOpen={isMiniAppModalOpen}
        onClose={() => setIsMiniAppModalOpen(false)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenNfcDemo={() => setIsNfcModalOpen(true)}
      />

      <AdminPanelModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        onOpenMiniAppDemo={() => setIsMiniAppModalOpen(true)}
      />

      <TableStandGeneratorModal
        isOpen={isTableStandOpen}
        onClose={() => setIsTableStandOpen(false)}
      />

      {/* Persistent Commercial AI Chatbot Widget */}
      <NexoChatbotWidget
        onOpenNfcDemo={() => setIsNfcModalOpen(true)}
        onOpenMiniAppDemo={() => setIsMiniAppModalOpen(true)}
      />

      {/* Footer */}
      <Footer
        onOpenNfcDemo={() => setIsNfcModalOpen(true)}
        onOpenMiniAppDemo={() => setIsMiniAppModalOpen(true)}
      />
    </div>
  );
}

export default function App() {
  return (
    <BusinessProvider>
      <MainApp />
    </BusinessProvider>
  );
}
