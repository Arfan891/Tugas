import React, { useState } from 'react';
import { CMSProvider, useCMS } from './context/CMSContext';
import { PromoBanner } from './components/PromoBanner';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { PortfolioSection } from './components/PortfolioSection';
import { AboutAndFacilities } from './components/AboutAndFacilities';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { QuotationWizardModal } from './components/QuotationWizardModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminCMSModal } from './components/AdminCMSModal';

const MainAppContent: React.FC = () => {
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-amber-400 selection:text-slate-950">
      {/* Top Notification / Promo Announcement */}
      <PromoBanner />

      {/* Main Navigation Header */}
      <Navbar onOpenAdminLogin={() => setIsAdminLoginOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-grow">
        <Hero />
        <ServicesSection />
        <PortfolioSection />
        <AboutAndFacilities />
        <TestimonialsSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onOpenAdminLogin={() => setIsAdminLoginOpen(true)} />

      {/* Floating WhatsApp Consultation Widget */}
      <FloatingWhatsApp />

      {/* Request for Quotation (RFQ) Wizard Modal */}
      <QuotationWizardModal />

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
      />

      {/* Admin Content Management System (CMS) Modal */}
      <AdminCMSModal />
    </div>
  );
};

export default function App() {
  return (
    <CMSProvider>
      <MainAppContent />
    </CMSProvider>
  );
}
