import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import type { PortfolioItem } from '../types';
import { 
  Sparkles, 
  Eye, 
  Calendar, 
  Building2, 
  X, 
  MessageSquare, 
  ArrowUpRight,
  CheckCircle2
} from 'lucide-react';
import { 
  getCategoryLabel, 
  getCategoryBadgeStyle, 
  createWhatsAppUrl 
} from '../utils/formatters';

export const PortfolioSection: React.FC = () => {
  const { data, openRfqModal } = useCMS();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeItem, setActiveItem] = useState<PortfolioItem | null>(null);

  const categories = [
    { id: 'all', label: 'Semua Portofolio' },
    { id: 'digital-printing', label: 'Digital Printing' },
    { id: 'sablon', label: 'Sablon' },
    { id: 'textile-printing', label: 'Textile Printing' },
    { id: 'desain-grafis', label: 'Desain Grafis' },
    { id: 'layout', label: 'Layout' },
    { id: 'percetakan-umum', label: 'Percetakan Umum' },
  ];

  const filteredPortfolio = data.portfolio.filter(item => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  const handleConsultSimilar = (item: PortfolioItem) => {
    const text = `Halo CV Nurrizky Cipta Karya, saya melihat portofolio *"${item.title}"* untuk klien *${item.client}* di website. Saya tertarik membuat pesanan dengan model / spesifikasi serupa. Mohon info estimasi biaya dan minimal ordernya. Terima kasih!`;
    const url = createWhatsAppUrl(data.companyInfo.whatsapp, text);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="portofolio" className="py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Galeri & Portofolio Karya
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Bukti Nyata Kualitas Hasil Cetakan Kami
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Berbagai proyek cetak yang telah dipercayakan oleh instansi pemerintah, BUMN, UMKM, komunitas, hingga brand nasional kepada CV Nurrizky Cipta Karya.
          </p>
        </div>

        {/* Category Filters */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPortfolio.map((item) => (
            <div
              key={item.id}
              id={`portfolio-item-${item.id}`}
              onClick={() => setActiveItem(item)}
              className="group cursor-pointer bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between hover:shadow-lg hover:border-amber-400 transition-all duration-200"
            >
              <div>
                <div className="relative h-52 overflow-hidden bg-slate-200">
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                  
                  <div className="absolute top-3 left-3">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-bold border backdrop-blur-md ${getCategoryBadgeStyle(item.category)}`}>
                      {getCategoryLabel(item.category)}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white flex items-center justify-between">
                    <span className="text-xs text-slate-300 truncate max-w-[80%]">
                      {item.client}
                    </span>
                    <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors">
                      <Eye className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

                <div className="p-4 space-y-1.5">
                  <h3 className="font-heading font-bold text-sm sm:text-base text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 text-xs line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-0 text-[11px] text-slate-400 flex items-center justify-between border-t border-slate-200/60 mt-2">
                <span>{item.date}</span>
                <span className="text-amber-600 font-semibold group-hover:underline flex items-center gap-0.5">
                  Lihat Detail <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredPortfolio.length === 0 && (
          <div className="text-center py-12 text-slate-500 text-sm">
            Belum ada portofolio pada kategori ini.
          </div>
        )}

      </div>

      {/* Portfolio Lightbox Modal */}
      {activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 relative">
            
            {/* Modal Image Header */}
            <div className="relative h-64 sm:h-80 bg-slate-900">
              <img
                src={activeItem.image}
                alt={activeItem.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setActiveItem(null)}
                className="absolute top-4 right-4 p-2 bg-slate-900/70 hover:bg-slate-900 text-white rounded-full transition-colors"
                aria-label="Tutup"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4 text-left">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`px-2.5 py-1 rounded text-xs font-bold ${getCategoryBadgeStyle(activeItem.category)}`}>
                  {getCategoryLabel(activeItem.category)}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {activeItem.date}
                </span>
              </div>

              <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
                {activeItem.title}
              </h3>

              <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                <Building2 className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Klien / Pemesan: <strong className="text-slate-900">{activeItem.client}</strong></span>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Deskripsi Pengerjaan:
                </h4>
                <p className="text-slate-700 text-sm leading-relaxed">
                  {activeItem.description}
                </p>
              </div>

              {activeItem.specs && (
                <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl text-xs space-y-1">
                  <span className="font-bold text-amber-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                    Spesifikasi Produksi:
                  </span>
                  <p className="text-amber-800">
                    {activeItem.specs}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-200 flex flex-wrap sm:flex-nowrap gap-3">
                <button
                  onClick={() => {
                    const item = activeItem;
                    setActiveItem(null);
                    handleConsultSimilar(item);
                  }}
                  className="w-full sm:w-1/2 py-3 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span>Pesan Serupa via WhatsApp</span>
                </button>

                <button
                  onClick={() => {
                    setActiveItem(null);
                    openRfqModal();
                  }}
                  className="w-full sm:w-1/2 py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm cursor-pointer transition-colors"
                >
                  <span>Minta Penawaran Harga</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </section>
  );
};
