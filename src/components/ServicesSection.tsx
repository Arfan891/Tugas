import React, { useState, useMemo } from 'react';
import { useCMS } from '../context/CMSContext';
import type { ServiceItem } from '../types';
import { 
  Search, 
  Sparkles, 
  MessageSquare, 
  Check, 
  Clock, 
  Package, 
  Info, 
  X,
  FileText
} from 'lucide-react';
import { 
  getCategoryLabel, 
  getCategoryBadgeStyle, 
  createWhatsAppUrl, 
  generateDirectServiceWhatsAppText 
} from '../utils/formatters';

export const ServicesSection: React.FC = () => {
  const { data, openRfqModal } = useCMS();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalService, setActiveModalService] = useState<ServiceItem | null>(null);

  const categories: { id: string; label: string }[] = [
    { id: 'all', label: 'Semua Layanan' },
    { id: 'digital-printing', label: 'Digital Printing' },
    { id: 'sablon', label: 'Sablon' },
    { id: 'textile-printing', label: 'Textile Printing' },
    { id: 'desain-grafis', label: 'Desain Grafis' },
    { id: 'layout', label: 'Layout' },
    { id: 'percetakan-umum', label: 'Percetakan Umum' },
  ];

  const filteredServices = useMemo(() => {
    return data.services.filter((service) => {
      const matchCategory = selectedCategory === 'all' || service.category === selectedCategory;
      const q = searchQuery.toLowerCase();
      const matchSearch = 
        !q ||
        service.title.toLowerCase().includes(q) ||
        service.shortDesc.toLowerCase().includes(q) ||
        service.materials.some(m => m.toLowerCase().includes(q));
      return matchCategory && matchSearch;
    });
  }, [data.services, selectedCategory, searchQuery]);

  const handleWhatsAppConsult = (service: ServiceItem) => {
    const text = generateDirectServiceWhatsAppText(
      service.title, 
      service.category, 
      data.companyInfo.name
    );
    const url = createWhatsAppUrl(data.companyInfo.whatsapp, text);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="layanan" className="py-20 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Katalog Layanan & Produk
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Solusi Percetakan Terlengkap untuk Setiap Kebutuhan
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Daftar lengkap layanan cetak digital, sablon manual/otomatis, tekstil sublimasi, desain grafis kreatif, layout editorial, hingga percetakan offset massal.
          </p>
        </div>

        {/* Filter Controls: Search & Category Tabs */}
        <div className="mt-10 space-y-4">
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari produk, spanduk, kaos, jersey, kemasan, buku..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
              >
                Hapus
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                id={`btn-cat-${cat.id}`}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              id={`service-card-${service.id}`}
              className="bg-white rounded-2xl border border-slate-200/90 hover:border-amber-400/80 transition-all duration-200 overflow-hidden flex flex-col justify-between hover:shadow-lg group"
            >
              <div>
                {/* Image Banner */}
                <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-100">
                  <img
                    src={service.image}
                    alt={service.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold border backdrop-blur-md ${getCategoryBadgeStyle(service.category)}`}>
                      {getCategoryLabel(service.category)}
                    </span>
                  </div>

                  {service.popular && (
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-400 text-slate-950 uppercase tracking-wide shadow-sm">
                        Terpopuler
                      </span>
                    </div>
                  )}

                  {/* Starting Price Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                    <span className="text-xs text-slate-200">Mulai dari</span>
                    <span className="font-heading font-extrabold text-sm sm:text-base text-amber-300 drop-shadow-xs">
                      {service.startingPrice}
                    </span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-5 space-y-3.5">
                  <h3 className="font-heading font-bold text-lg text-slate-900 group-hover:text-amber-600 transition-colors leading-snug">
                    {service.title}
                  </h3>

                  <p className="text-slate-600 text-xs sm:text-sm line-clamp-2 leading-relaxed">
                    {service.shortDesc}
                  </p>

                  {/* Specs & Info Badges */}
                  <div className="space-y-1.5 pt-1 text-xs text-slate-500">
                    <div className="flex items-center gap-2">
                      <Package className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">Min. Order: <strong className="text-slate-700">{service.minOrder}</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">Waktu: <strong className="text-slate-700">{service.leadTime}</strong></span>
                    </div>
                  </div>

                  {/* Materials Chips */}
                  <div className="pt-2 border-t border-slate-100">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                      Pilihan Bahan:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {service.materials.slice(0, 3).map((mat, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded text-[11px] bg-slate-100 text-slate-700 font-medium"
                        >
                          {mat}
                        </span>
                      ))}
                      {service.materials.length > 3 && (
                        <span className="px-1.5 py-0.5 rounded text-[11px] bg-slate-50 text-slate-400 font-medium">
                          +{service.materials.length - 3} lagi
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons Footer */}
              <div className="p-4 pt-0 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setActiveModalService(service)}
                    className="w-full py-2 px-3 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Info className="w-3.5 h-3.5" />
                    <span>Spesifikasi</span>
                  </button>

                  <button
                    onClick={() => handleWhatsAppConsult(service)}
                    className="w-full py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                    <span>WhatsApp</span>
                  </button>
                </div>

                {/* Primary RFQ Action */}
                <button
                  id={`btn-rfq-service-${service.id}`}
                  onClick={() => openRfqModal(service.id)}
                  className="w-full py-2.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 active:scale-98 text-slate-950 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  <span>Minta Penawaran Harga</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 mt-6">
            <p className="text-slate-500 text-sm">Tidak ada layanan yang cocok dengan pencarian "{searchQuery}".</p>
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              className="mt-3 px-4 py-2 text-xs font-bold text-amber-600 bg-amber-50 rounded-lg hover:bg-amber-100"
            >
              Reset Filter
            </button>
          </div>
        )}

      </div>

      {/* Service Detail Modal */}
      {activeModalService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 relative">
            
            {/* Modal Header with Image */}
            <div className="relative h-56 sm:h-64 overflow-hidden bg-slate-900">
              <img
                src={activeModalService.image}
                alt={activeModalService.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />
              
              <button
                onClick={() => setActiveModalService(null)}
                className="absolute top-4 right-4 p-2 bg-slate-900/70 hover:bg-slate-900 text-white rounded-full transition-colors"
                aria-label="Tutup modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${getCategoryBadgeStyle(activeModalService.category)} inline-block mb-1`}>
                  {getCategoryLabel(activeModalService.category)}
                </span>
                <h3 className="font-heading text-xl sm:text-2xl font-extrabold leading-tight">
                  {activeModalService.title}
                </h3>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Deskripsi Lengkap
                </h4>
                <p className="text-slate-700 text-sm leading-relaxed">
                  {activeModalService.fullDesc}
                </p>
              </div>

              {/* Specs & Pricing Overview */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 text-xs">
                <div>
                  <span className="text-slate-400 block font-medium">Estimasi Biaya:</span>
                  <strong className="text-slate-900 text-sm font-heading">{activeModalService.startingPrice}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Minimal Order:</span>
                  <strong className="text-slate-900 text-sm">{activeModalService.minOrder}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Lama Pengerjaan:</span>
                  <strong className="text-slate-900 text-sm">{activeModalService.leadTime}</strong>
                </div>
              </div>

              {/* Material Options */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Opsi Bahan & Material Rekomendasi
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeModalService.materials.map((m, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-800 border border-slate-200"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              {/* Features / Advantages */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Keunggulan & Spesifikasi Teknis
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeModalService.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                      <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons in Modal */}
              <div className="pt-4 border-t border-slate-200 flex flex-wrap sm:flex-nowrap gap-3">
                <button
                  onClick={() => {
                    const service = activeModalService;
                    setActiveModalService(null);
                    handleWhatsAppConsult(service);
                  }}
                  className="w-full sm:w-1/2 py-3 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span>Konsultasi WhatsApp</span>
                </button>

                <button
                  onClick={() => {
                    const serviceId = activeModalService.id;
                    setActiveModalService(null);
                    openRfqModal(serviceId);
                  }}
                  className="w-full sm:w-1/2 py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm cursor-pointer transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  <span>Minta Penawaran Resmi</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </section>
  );
};
