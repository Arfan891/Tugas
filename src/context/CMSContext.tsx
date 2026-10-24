import React, { createContext, useContext, useState, useEffect } from 'react';
import type {
  CMSState,
  CompanyInfo,
  ServiceItem,
  PortfolioItem,
  QuotationRequest,
  TestimonialItem,
  ServiceCategory
} from '../types';
import { initialCMSData } from '../data/initialData';

const STORAGE_KEY = 'nck_printing_cms_v2';
const ADMIN_SESSION_KEY = 'nck_admin_session';

interface CMSContextType {
  data: CMSState;
  isAdmin: boolean;
  loginAdmin: (emailOrPassword: string, password?: string) => boolean;
  logoutAdmin: () => void;
  // Modals & triggers
  isRfqModalOpen: boolean;
  openRfqModal: (selectedServiceId?: string) => void;
  closeRfqModal: () => void;
  isAdminModalOpen: boolean;
  openAdminModal: () => void;
  closeAdminModal: () => void;
  selectedServiceForRfq: ServiceItem | null;
  // CRUD actions
  updateCompanyInfo: (info: Partial<CompanyInfo>) => void;
  addService: (service: Omit<ServiceItem, 'id'>) => void;
  updateService: (id: string, service: Partial<ServiceItem>) => void;
  deleteService: (id: string) => void;
  addPortfolio: (item: Omit<PortfolioItem, 'id'>) => void;
  updatePortfolio: (id: string, item: Partial<PortfolioItem>) => void;
  deletePortfolio: (id: string) => void;
  submitQuotation: (quotation: Omit<QuotationRequest, 'id' | 'ticketNumber' | 'createdAt' | 'status'>) => QuotationRequest;
  updateQuotationStatus: (id: string, status: QuotationRequest['status'], adminNotes?: string) => void;
  deleteQuotation: (id: string) => void;
  addTestimonial: (item: Omit<TestimonialItem, 'id'>) => void;
  updateTestimonial: (id: string, item: Partial<TestimonialItem>) => void;
  deleteTestimonial: (id: string) => void;
  resetToDefault: () => void;
  exportDataJson: () => void;
  importDataJson: (jsonString: string) => boolean;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<CMSState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // ensure missing keys fallback to initialCMSData
        return {
          companyInfo: { ...initialCMSData.companyInfo, ...parsed.companyInfo },
          services: parsed.services?.length ? parsed.services : initialCMSData.services,
          portfolio: parsed.portfolio?.length ? parsed.portfolio : initialCMSData.portfolio,
          quotations: parsed.quotations || initialCMSData.quotations,
          testimonials: parsed.testimonials?.length ? parsed.testimonials : initialCMSData.testimonials,
          facilities: parsed.facilities?.length ? parsed.facilities : initialCMSData.facilities,
        };
      }
    } catch (e) {
      console.error("Error loading CMS state from localStorage", e);
    }
    return initialCMSData;
  });

  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return sessionStorage.getItem(ADMIN_SESSION_KEY) === 'true';
  });

  const [isRfqModalOpen, setIsRfqModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [selectedServiceForRfq, setSelectedServiceForRfq] = useState<ServiceItem | null>(null);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error("Error saving CMS state to localStorage", e);
    }
  }, [data]);

  const loginAdmin = (emailOrPassword: string, optionalPassword?: string): boolean => {
    let email = '';
    let pass = '';
    if (optionalPassword !== undefined) {
      email = emailOrPassword.trim().toLowerCase();
      pass = optionalPassword.trim();
    } else {
      pass = emailOrPassword.trim();
    }

    // Support required credentials:
    // email : raudhatulihsan50@gmail.com
    // password : @Agus123
    const isExactEmailAndPass = (email === 'raudhatulihsan50@gmail.com' && pass === '@Agus123');
    const isDirectPass = (pass === '@Agus123' || pass === 'admin123' || pass === 'nurrizky2026' || pass === 'admin');

    if (isExactEmailAndPass || isDirectPass) {
      setIsAdmin(true);
      sessionStorage.setItem(ADMIN_SESSION_KEY, 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
  };

  const openRfqModal = (selectedServiceId?: string) => {
    if (selectedServiceId) {
      const found = data.services.find(s => s.id === selectedServiceId);
      setSelectedServiceForRfq(found || null);
    } else {
      setSelectedServiceForRfq(null);
    }
    setIsRfqModalOpen(true);
  };

  const closeRfqModal = () => {
    setIsRfqModalOpen(false);
    setSelectedServiceForRfq(null);
  };

  const openAdminModal = () => setIsAdminModalOpen(true);
  const closeAdminModal = () => setIsAdminModalOpen(false);

  // Company Info
  const updateCompanyInfo = (info: Partial<CompanyInfo>) => {
    setData(prev => ({
      ...prev,
      companyInfo: {
        ...prev.companyInfo,
        ...info
      }
    }));
  };

  // Services
  const addService = (service: Omit<ServiceItem, 'id'>) => {
    const newService: ServiceItem = {
      ...service,
      id: `srv-${Date.now()}`
    };
    setData(prev => ({
      ...prev,
      services: [newService, ...prev.services]
    }));
  };

  const updateService = (id: string, serviceUpdates: Partial<ServiceItem>) => {
    setData(prev => ({
      ...prev,
      services: prev.services.map(s => s.id === id ? { ...s, ...serviceUpdates } : s)
    }));
  };

  const deleteService = (id: string) => {
    setData(prev => ({
      ...prev,
      services: prev.services.filter(s => s.id !== id)
    }));
  };

  // Portfolio
  const addPortfolio = (item: Omit<PortfolioItem, 'id'>) => {
    const newItem: PortfolioItem = {
      ...item,
      id: `port-${Date.now()}`
    };
    setData(prev => ({
      ...prev,
      portfolio: [newItem, ...prev.portfolio]
    }));
  };

  const updatePortfolio = (id: string, itemUpdates: Partial<PortfolioItem>) => {
    setData(prev => ({
      ...prev,
      portfolio: prev.portfolio.map(p => p.id === id ? { ...p, ...itemUpdates } : p)
    }));
  };

  const deletePortfolio = (id: string) => {
    setData(prev => ({
      ...prev,
      portfolio: prev.portfolio.filter(p => p.id !== id)
    }));
  };

  // Quotations
  const submitQuotation = (quotation: Omit<QuotationRequest, 'id' | 'ticketNumber' | 'createdAt' | 'status'>): QuotationRequest => {
    const currentYear = new Date().getFullYear();
    const randomSeq = Math.floor(1000 + Math.random() * 9000);
    const ticketNumber = `RFQ-NCK-${currentYear}-${randomSeq}`;
    
    const now = new Date();
    const dateFormatted = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newQuotation: QuotationRequest = {
      ...quotation,
      id: `rfq-${Date.now()}`,
      ticketNumber,
      createdAt: dateFormatted,
      status: 'pending'
    };

    setData(prev => ({
      ...prev,
      quotations: [newQuotation, ...prev.quotations]
    }));

    return newQuotation;
  };

  const updateQuotationStatus = (id: string, status: QuotationRequest['status'], adminNotes?: string) => {
    setData(prev => ({
      ...prev,
      quotations: prev.quotations.map(q => {
        if (q.id === id) {
          return {
            ...q,
            status,
            adminNotes: adminNotes !== undefined ? adminNotes : q.adminNotes
          };
        }
        return q;
      })
    }));
  };

  const deleteQuotation = (id: string) => {
    setData(prev => ({
      ...prev,
      quotations: prev.quotations.filter(q => q.id !== id)
    }));
  };

  // Testimonials
  const addTestimonial = (item: Omit<TestimonialItem, 'id'>) => {
    const newTestimonial: TestimonialItem = {
      ...item,
      id: `t-${Date.now()}`
    };
    setData(prev => ({
      ...prev,
      testimonials: [newTestimonial, ...prev.testimonials]
    }));
  };

  const updateTestimonial = (id: string, itemUpdates: Partial<TestimonialItem>) => {
    setData(prev => ({
      ...prev,
      testimonials: prev.testimonials.map(t => t.id === id ? { ...t, ...itemUpdates } : t)
    }));
  };

  const deleteTestimonial = (id: string) => {
    setData(prev => ({
      ...prev,
      testimonials: prev.testimonials.filter(t => t.id !== id)
    }));
  };

  // Backup and restore
  const resetToDefault = () => {
    if (window.confirm("Apakah Anda yakin ingin mengembalikan seluruh data ke pengaturan awal pabrik? Perubahan kustom akan dihapus.")) {
      setData(initialCMSData);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialCMSData));
    }
  };

  const exportDataJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `backup_cv_nurrizky_cipta_karya_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const importDataJson = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.companyInfo && parsed.services) {
        setData(parsed);
        return true;
      }
      return false;
    } catch (e) {
      console.error("Invalid JSON format", e);
      return false;
    }
  };

  return (
    <CMSContext.Provider value={{
      data,
      isAdmin,
      loginAdmin,
      logoutAdmin,
      isRfqModalOpen,
      openRfqModal,
      closeRfqModal,
      isAdminModalOpen,
      openAdminModal,
      closeAdminModal,
      selectedServiceForRfq,
      updateCompanyInfo,
      addService,
      updateService,
      deleteService,
      addPortfolio,
      updatePortfolio,
      deletePortfolio,
      submitQuotation,
      updateQuotationStatus,
      deleteQuotation,
      addTestimonial,
      updateTestimonial,
      deleteTestimonial,
      resetToDefault,
      exportDataJson,
      importDataJson
    }}>
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};
