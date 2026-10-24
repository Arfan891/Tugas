import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCMS } from '../context/CMSContext';
import { 
  Printer, 
  Menu, 
  X, 
  FileText, 
  MessageSquare, 
  ShieldCheck
} from 'lucide-react';
import { createWhatsAppUrl } from '../utils/formatters';

export const Navbar: React.FC = () => {
  const { data, isAdmin, openRfqModal } = useCMS();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLabels = data.companyInfo.navigation || {
    beranda: 'Beranda',
    layanan: 'Layanan & Produk',
    tentang: 'Tentang Kami',
    kontak: 'Kontak'
  };

  const navLinks = [
    { label: navLabels.beranda || 'Beranda', href: '#beranda' },
    { label: navLabels.layanan || 'Layanan & Produk', href: '#layanan' },
    { label: navLabels.tentang || 'Tentang Kami', href: '#tentang' },
    { label: navLabels.kontak || 'Kontak', href: '#kontak' },
  ];

  const handleWhatsAppClick = () => {
    const defaultMsg = `Halo CV Nurrizky Cipta Karya, saya ingin konsultasi mengenai kebutuhan percetakan/sablon/digital printing.`;
    const url = createWhatsAppUrl(data.companyInfo.whatsapp || '+6285883404488', defaultMsg);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <a href="#beranda" className="flex items-center gap-3.5 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 via-amber-600 to-slate-900 flex items-center justify-center text-white shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform duration-200">
              <Printer className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-slate-900 text-lg sm:text-xl tracking-tight leading-tight flex items-center gap-1.5">
                {data.companyInfo.name}
              </span>
              <span className="text-[11px] font-medium text-slate-500 tracking-wide uppercase">
                Percetakan • Sablon • Textile • Desain
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-amber-600 hover:bg-slate-50 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Admin status / Login trigger */}
            {isAdmin ? (
              <Link
                id="btn-admin-cms-nav"
                to="/admin"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-300 hover:bg-emerald-100 transition-colors"
                title="Buka CMS Admin Panel"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Admin CMS</span>
              </Link>
            ) : (
              <Link
                id="btn-admin-login-nav"
                to="/admin/login"
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                title="Login Pengelola / Admin"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span className="hidden xl:inline">CMS Admin</span>
              </Link>
            )}

            {/* Direct WhatsApp Consultation */}
            <button
              id="btn-nav-wa"
              onClick={handleWhatsAppClick}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/80 hover:bg-emerald-100/80 transition-all shadow-xs cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>Tanya WhatsApp</span>
            </button>

            {/* Minta Penawaran Primary CTA */}
            <button
              id="btn-nav-rfq"
              onClick={() => openRfqModal()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 active:scale-95 transition-all shadow-sm shadow-amber-400/20 cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Minta Penawaran</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              id="btn-mobile-rfq"
              onClick={() => openRfqModal()}
              className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-amber-400 text-slate-950"
            >
              Minta Penawaran
            </button>
            <button
              id="btn-toggle-mobile-menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div id="mobile-menu" className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3 shadow-lg">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 text-sm font-semibold text-slate-700 hover:text-amber-600 hover:bg-slate-50 rounded-lg"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleWhatsAppClick();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Hubungi Tim via WhatsApp</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openRfqModal();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-bold text-slate-950 bg-amber-400 shadow-sm"
            >
              <FileText className="w-4 h-4" />
              <span>Buat Permintaan Penawaran (RFQ)</span>
            </button>

            <div className="pt-2 text-center">
              {isAdmin ? (
                <Link
                  to="/admin"
                  className="text-xs text-emerald-700 font-semibold underline"
                >
                  Buka Admin CMS Panel
                </Link>
              ) : (
                <Link
                  to="/admin/login"
                  className="text-xs text-slate-400 hover:text-slate-600"
                >
                  Login Pengelola / Admin
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
