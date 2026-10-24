import React from 'react';
import { PromoBanner } from '../components/PromoBanner';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { ServicesSection } from '../components/ServicesSection';
import { PortfolioSection } from '../components/PortfolioSection';
import { AboutAndFacilities } from '../components/AboutAndFacilities';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { ContactSection } from '../components/ContactSection';
import { Footer } from '../components/Footer';
import { FloatingWhatsApp } from '../components/FloatingWhatsApp';
import { QuotationWizardModal } from '../components/QuotationWizardModal';

export const HomePage: React.FC = () => (
  <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-amber-400 selection:text-slate-950">
    <PromoBanner />
    <Navbar />

    <main className="flex-grow">
      <Hero />
      <ServicesSection />
      <PortfolioSection />
      <AboutAndFacilities />
      <TestimonialsSection />
      <ContactSection />
    </main>

    <Footer />
    <FloatingWhatsApp />
    <QuotationWizardModal />
  </div>
);
