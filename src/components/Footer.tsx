import React from 'react';
import { Link } from 'react-router-dom';
import { useCMS } from '../context/CMSContext';
import { 
  Printer, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  ArrowUp
} from 'lucide-react';
import { createWhatsAppUrl } from '../utils/formatters';

export const Footer: React.FC = () => {
  const { data, isAdmin, openRfqModal } = useCMS();
  const { companyInfo } = data;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const businessUnits = [
    "Digital Printing Indoor & Outdoor",
    "Sablon Kaos & Merchandise",
    "Textile Printing & Sublimasi Jersey",
    "Jasa Desain Grafis & Branding",
    "Layout Buku, Majalah & Company Profile",
    "Percetakan Umum & Kemasan Offset"
  ];

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      
      {/* Top CTA Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div>
            <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-slate-950">
              Siap Merealisasikan Kebutuhan Cetak Anda?
            </h3>
            <p className="text-slate-900 text-xs sm:text-sm font-medium mt-1">
              Dapatkan penawaran harga terbaik dan konsultasi file desain gratis bersama tim kami.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => openRfqModal()}
              className="px-5 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition-all shadow-md cursor-pointer"
            >
              Minta Penawaran Sekarang
            </button>
            <button
              onClick={() => {
                const url = createWhatsAppUrl(
                  companyInfo.whatsapp,
                  `Halo CV Nurrizky Cipta Karya, saya ingin konsultasi mengenai pesanan cetak.`
                );
                window.open(url, '_blank', 'noopener,noreferrer');
              }}
              className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs sm:text-sm transition-all border border-slate-300 cursor-pointer"
            >
              Konsultasi WhatsApp
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 text-left">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
                <Printer className="w-5 h-5" />
              </div>
              <div>
                <span className="font-heading font-extrabold text-base text-white block">
                  {companyInfo.name}
                </span>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider">
                  Percetakan & Digital Printing
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed">
              {companyInfo.shortBio}
            </p>

            <div className="pt-2 text-slate-400 text-xs space-y-1.5">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="truncate">{companyInfo.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{companyInfo.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{companyInfo.email}</span>
              </div>
            </div>
          </div>

          {/* Business Units */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading font-bold text-white text-sm uppercase tracking-wider">
              Bidang Usaha Kami
            </h4>
            <ul className="space-y-2">
              {businessUnits.map((bu, idx) => (
                <li key={idx}>
                  <a href="#layanan" className="hover:text-amber-400 transition-colors">
                    {bu}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Nav */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-heading font-bold text-white text-sm uppercase tracking-wider">
              Navigasi Utama
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#beranda" className="hover:text-amber-400 transition-colors">
                  {companyInfo.navigation?.beranda || 'Beranda'}
                </a>
              </li>
              <li>
                <a href="#layanan" className="hover:text-amber-400 transition-colors">
                  {companyInfo.navigation?.layanan || 'Layanan & Produk'}
                </a>
              </li>
              <li>
                <a href="#tentang" className="hover:text-amber-400 transition-colors">
                  {companyInfo.navigation?.tentang || 'Tentang Kami'}
                </a>
              </li>
              <li>
                <a href="#kontak" className="hover:text-amber-400 transition-colors">
                  {companyInfo.navigation?.kontak || 'Kontak'}
                </a>
              </li>
            </ul>
          </div>

          {/* Working Hours & Management Portal */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading font-bold text-white text-sm uppercase tracking-wider">
              Jam Operasional
            </h4>
            <div className="space-y-1.5 text-slate-400">
              <p>{companyInfo.workingHours.weekdays}</p>
              <p>{companyInfo.workingHours.saturday}</p>
              <p className="text-[11px] text-slate-500">{companyInfo.workingHours.sunday}</p>
            </div>

            <div className="pt-4 border-t border-slate-800/80">
              <p className="text-[11px] text-slate-500 mb-2">Akses Pengelola Konten:</p>
              {isAdmin ? (
                <Link
                  to="/admin"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/80 text-emerald-300 border border-emerald-800 text-xs font-semibold hover:bg-emerald-900 transition-colors cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Buka CMS Admin Panel</span>
                </Link>
              ) : (
                <Link
                  to="/admin/login"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-slate-400 border border-slate-800 text-xs font-medium hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Login Pengelola Website (CMS)</span>
                </Link>
              )}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <p>© {new Date().getFullYear()} {companyInfo.name}. Seluruh Hak Cipta Dilindungi.</p>
          <div className="flex items-center gap-4">
            <span>Digital Printing • Sablon • Textile • Desain • Layout • Offset</span>
            <button
              onClick={scrollToTop}
              className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 transition-colors"
              title="Kembali ke atas"
              aria-label="Kembali ke atas"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

    </footer>
  );
};
