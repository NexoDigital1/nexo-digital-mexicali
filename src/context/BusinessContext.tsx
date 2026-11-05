import React, { createContext, useContext, useState, useEffect } from 'react';
import { BusinessProfile, ProductItem, FAQItem } from '../types';
import { 
  DEMO_BUSINESS_PROFILE, 
  MEXICALI_INDUSTRY_PRESETS 
} from '../data/initialData';

export type IndustryPresetKey = 'cafe' | 'tacos' | 'dental' | 'taller' | 'barber' | 'boutique';

interface BusinessContextType {
  profile: BusinessProfile;
  updateProfile: (updates: Partial<BusinessProfile>) => void;
  addProduct: (product: Omit<ProductItem, 'id'>) => void;
  updateProduct: (id: string, product: Partial<ProductItem>) => void;
  deleteProduct: (id: string) => void;
  addFaq: (faq: Omit<FAQItem, 'id'>) => void;
  deleteFaq: (id: string) => void;
  resetToDefault: () => void;
  loadTemplate: (templateName: IndustryPresetKey) => void;
  activeView: 'landing' | 'nfc_start' | 'mini_app_premium' | 'admin' | 'advisor';
  setActiveView: (view: 'landing' | 'nfc_start' | 'mini_app_premium' | 'admin' | 'advisor') => void;
}

const STORAGE_KEY = 'nexo_digital_business_profile_v2';

const BusinessContext = createContext<BusinessContextType | undefined>(undefined);

export const BusinessProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<BusinessProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return DEMO_BUSINESS_PROFILE;
  });

  const [activeView, setActiveView] = useState<'landing' | 'nfc_start' | 'mini_app_premium' | 'admin' | 'advisor'>('landing');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch {
      // ignore
    }
  }, [profile]);

  const updateProfile = (updates: Partial<BusinessProfile>) => {
    setProfile((prev) => ({
      ...prev,
      ...updates,
      contacts: {
        ...prev.contacts,
        ...(updates.contacts || {}),
      },
    }));
  };

  const addProduct = (productData: Omit<ProductItem, 'id'>) => {
    const newProduct: ProductItem = {
      ...productData,
      id: `p-${Date.now()}`,
    };
    setProfile((prev) => ({
      ...prev,
      products: [newProduct, ...prev.products],
    }));
  };

  const updateProduct = (id: string, updates: Partial<ProductItem>) => {
    setProfile((prev) => ({
      ...prev,
      products: prev.products.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    }));
  };

  const deleteProduct = (id: string) => {
    setProfile((prev) => ({
      ...prev,
      products: prev.products.filter((p) => p.id !== id),
    }));
  };

  const addFaq = (faqData: Omit<FAQItem, 'id'>) => {
    const newFaq: FAQItem = {
      ...faqData,
      id: `f-${Date.now()}`,
    };
    setProfile((prev) => ({
      ...prev,
      faqs: [...prev.faqs, newFaq],
    }));
  };

  const deleteFaq = (id: string) => {
    setProfile((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((f) => f.id !== id),
    }));
  };

  const resetToDefault = () => {
    setProfile(DEMO_BUSINESS_PROFILE);
    localStorage.removeItem(STORAGE_KEY);
  };

  const loadTemplate = (templateName: IndustryPresetKey) => {
    const targetPreset = MEXICALI_INDUSTRY_PRESETS[templateName];
    if (targetPreset) {
      setProfile(targetPreset);
    }
  };

  return (
    <BusinessContext.Provider
      value={{
        profile,
        updateProfile,
        addProduct,
        updateProduct,
        deleteProduct,
        addFaq,
        deleteFaq,
        resetToDefault,
        loadTemplate,
        activeView,
        setActiveView,
      }}
    >
      {children}
    </BusinessContext.Provider>
  );
};

export const useBusiness = () => {
  const context = useContext(BusinessContext);
  if (!context) {
    throw new Error('useBusiness must be used within a BusinessProvider');
  }
  return context;
};
