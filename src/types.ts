export type ServiceCategory = 
  | 'digital-printing'
  | 'sablon'
  | 'textile-printing'
  | 'desain-grafis'
  | 'layout'
  | 'percetakan-umum';

export interface ServiceItem {
  id: string;
  title: string;
  category: ServiceCategory;
  shortDesc: string;
  fullDesc: string;
  image: string;
  startingPrice: string;
  minOrder: string;
  leadTime: string;
  materials: string[];
  popular?: boolean;
  features: string[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  client: string;
  category: ServiceCategory;
  image: string;
  description: string;
  date: string;
  specs?: string;
}

export type QuotationStatus = 'pending' | 'contacted' | 'approved' | 'completed' | 'cancelled';

export interface QuotationRequest {
  id: string;
  ticketNumber: string;
  createdAt: string;
  customerName: string;
  companyName?: string;
  phone: string;
  email: string;
  city: string;
  serviceCategory: ServiceCategory;
  serviceName: string;
  quantity: number;
  unit: string;
  material: string;
  dimensions?: string;
  finishing: string[];
  deadlineDate?: string;
  notes?: string;
  fileLink?: string;
  estimatedPrice?: number;
  status: QuotationStatus;
  adminNotes?: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar?: string;
}

export interface ProductionFacility {
  id: string;
  name: string;
  category: string;
  specs: string;
  capability: string;
  image: string;
}

export interface CompanyInfo {
  name: string;
  tagline: string;
  shortBio: string;
  fullAbout: string;
  vision: string;
  mission: string[];
  address: string;
  mapsUrl: string;
  phone: string;
  whatsapp: string;
  email: string;
  workingHours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  socialMedia: {
    instagram: string;
    facebook: string;
    tiktok: string;
  };
  stats: {
    projectsCompleted: number;
    satisfiedClients: number;
    yearsExperience: number;
    serviceTypes?: number;
    productionMachines?: number;
  };
  navigation?: {
    beranda: string;
    layanan: string;
    tentang: string;
    kontak: string;
  };
  promoBanner: {
    enabled: boolean;
    text: string;
    badge: string;
    linkText?: string;
  };
}

export interface CMSState {
  companyInfo: CompanyInfo;
  services: ServiceItem[];
  portfolio: PortfolioItem[];
  quotations: QuotationRequest[];
  testimonials: TestimonialItem[];
  facilities: ProductionFacility[];
}
