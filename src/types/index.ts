export interface ProductItem {
  id: string;
  name: string;
  category: string;
  description: string;
  price?: string; // Optional commercial indicator, e.g. "$120 MXN" or "Consultar"
  featured?: boolean;
  image: string;
  badge?: string;
  tags?: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  type: 'image' | 'video';
  url: string;
  thumbnail: string;
  tag: string;
}

export interface SocialLinks {
  whatsapp: string;
  phone: string;
  facebook?: string;
  instagram?: string;
  tiktok?: string;
  email?: string;
  website?: string;
  googleMapsUrl?: string;
}

export interface BusinessProfile {
  id: string;
  businessName: string;
  slogan: string;
  industry: string;
  ownerName: string;
  description: string;
  logoUrl: string;
  coverUrl: string;
  primaryColor: string; // Metallic red / hex
  secondaryColor: string;
  accentColor: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  schedule: string;
  isOpenNow: boolean;
  contacts: SocialLinks;
  products: ProductItem[];
  faqs: FAQItem[];
  gallery: GalleryItem[];
}

export interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  suggestedActions?: { label: string; action: string }[];
  highlightProducts?: ProductItem[];
}

export type SolutionType = 'nfc_start' | 'mini_app_premium' | 'both';

export interface LeadInquiry {
  solution: SolutionType;
  businessName: string;
  contactName: string;
  industry: string;
  phone: string;
  notes?: string;
}
