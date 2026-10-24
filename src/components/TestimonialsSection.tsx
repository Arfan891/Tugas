import React from 'react';
import { useCMS } from '../context/CMSContext';
import { Star, Quote, MessageSquare } from 'lucide-react';
import { createWhatsAppUrl } from '../utils/formatters';

export const TestimonialsSection: React.FC = () => {
  const { data } = useCMS();
  const { testimonials, companyInfo } = data;

  const partnerTypes = [
    "Instansi Pemerintah & BUMN",
    "Komunitas Olahraga & Futsal",
    "Brand Fashion & Distro",
    "Perusahaan Korporat",
    "Event Organizer & Festival",
    "UMKM Kuliner & Retail"
  ];

  return (
    <section className="py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
            Testimoni & Kepercayaan Klien
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900">
            Dipercaya Ribuan Klien di Berbagai Sektor
          </h2>
          <p className="text-slate-500 text-sm">
            Kepuasan pelanggan adalah prioritas utama kami dalam setiap lembar dan produk yang kami cetak.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-slate-50 p-6 rounded-2xl border border-slate-200/90 flex flex-col justify-between hover:border-amber-400/80 transition-all shadow-xs"
            >
              <div className="space-y-4">
                {/* Rating stars & quote icon */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-slate-300" />
                </div>

                <p className="text-slate-700 text-sm leading-relaxed italic">
                  "{t.content}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-slate-200/60 flex items-center gap-3 mt-4">
                {t.avatar ? (
                  <img
                    src={t.avatar}
                    alt={t.name}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full object-cover border border-slate-300"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-amber-500 text-white font-bold flex items-center justify-center text-sm">
                    {t.name.charAt(0)}
                  </div>
                )}
                <div>
                  <h3 className="font-heading font-bold text-sm text-slate-900 leading-tight">
                    {t.name}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {t.role}, <strong className="text-slate-700">{t.company}</strong>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Partners Banner */}
        <div className="bg-slate-900 rounded-2xl p-6 sm:p-8 text-center text-white space-y-4">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
            Telah Membantu Produksi Berbagai Segmen Industri
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4">
            {partnerTypes.map((partner, idx) => (
              <span
                key={idx}
                className="px-3.5 py-1.5 rounded-xl text-xs font-medium bg-slate-800 border border-slate-700 text-slate-200"
              >
                {partner}
              </span>
            ))}
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                const url = createWhatsAppUrl(
                  companyInfo.whatsapp,
                  `Halo CV Nurrizky Cipta Karya, kami dari instansi/perusahaan ingin mendiskusikan peluang kerjasama vendor percetakan rutin.`
                );
                window.open(url, '_blank', 'noopener,noreferrer');
              }}
              className="inline-flex items-center gap-2 text-xs text-amber-400 hover:text-amber-300 font-semibold cursor-pointer underline underline-offset-4"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Tertarik Bermitra atau Menjadi Vendor Rutin? Diskusikan dengan Kami</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
