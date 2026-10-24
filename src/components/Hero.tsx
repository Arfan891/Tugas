import React from 'react';
import { useCMS } from '../context/CMSContext';
import { 
  FileCheck2, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  ArrowRight, 
  Eye
} from 'lucide-react';
import { createWhatsAppUrl } from '../utils/formatters';

export const Hero: React.FC = () => {
  const { data, openRfqModal } = useCMS();
  const { companyInfo } = data;

  const corePillars = [
    { label: "Digital Printing", desc: "Spanduk, banner, stiker vinyl hi-res" },
    { label: "Sablon Presisi", desc: "Kaos plastisol, rubber, tote bag" },
    { label: "Textile Printing", desc: "Sublimasi jersey, kain voal & DTF" },
    { label: "Desain Grafis", desc: "Brand identity, logo & packaging" },
    { label: "Layout & Tata Letak", desc: "Buku ISBN, majalah, annual report" },
    { label: "Percetakan Umum", desc: "Brosur, kalender, nota, dus kemasan" },
  ];

  return (
    <section id="beranda" className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white pt-12 pb-20 lg:pt-20 lg:pb-28">
      {/* Subtle background glow & grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Heading & Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Pill tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 text-amber-400 text-xs font-semibold tracking-wide backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>Percetakan Manufaktur & Kreatif Terpercaya</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
              Cetak Berkualitas, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-200">
                Warna Presisi & Tepat Waktu.
              </span>
            </h1>

            {/* Tagline & Bio */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-normal">
              {companyInfo.shortBio} Melayani kebutuhan cetak personal, UMKM, instansi pemerintah, hingga korporasi besar dengan dukungan mesin teknologi mutakhir.
            </p>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Kalibrasi Warna CMYK Akurat</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Garansi Tepat Deadline</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Gratis Cek Kesiapan File</span>
              </div>
            </div>

            {/* Call to Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                id="btn-hero-rfq"
                onClick={() => openRfqModal()}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-heading font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 hover:shadow-lg hover:shadow-amber-400/20 active:scale-95 transition-all text-sm sm:text-base cursor-pointer"
              >
                <FileCheck2 className="w-5 h-5" />
                <span>Minta Penawaran Harga</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <a
                id="btn-hero-katalog"
                href="#layanan"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-slate-200 bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 hover:border-slate-600 transition-all text-sm sm:text-base"
              >
                <Eye className="w-4 h-4 text-amber-400" />
                <span>Lihat Katalog Layanan</span>
              </a>
            </div>

            {/* Live Stats Counters */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <p className="font-heading font-extrabold text-2xl sm:text-3xl text-amber-400">
                  {companyInfo.stats.yearsExperience || 15}+
                </p>
                <p className="text-xs text-slate-300 font-medium">Tahun Pengalaman</p>
              </div>
              <div>
                <p className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
                  {companyInfo.stats.serviceTypes || 7}+
                </p>
                <p className="text-xs text-slate-300 font-medium">Jenis Layanan</p>
              </div>
              <div>
                <p className="font-heading font-extrabold text-2xl sm:text-3xl text-amber-400">
                  {(companyInfo.stats.projectsCompleted || 2500).toLocaleString('id-ID')}+
                </p>
                <p className="text-xs text-slate-300 font-medium">Pesanan Selesai</p>
              </div>
              <div>
                <p className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
                  {(companyInfo.stats.satisfiedClients || 800).toLocaleString('id-ID')}+
                </p>
                <p className="text-xs text-slate-300 font-medium">Pelanggan</p>
              </div>
            </div>

          </div>

          {/* Right Column: 6 Business Pillars Interactive Grid */}
          <div className="lg:col-span-5">
            <div className="bg-slate-800/60 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-slate-700/80 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Bidang Usaha Kami
                </span>
                <span className="text-[11px] text-slate-400">CV Nurrizky Cipta Karya</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {corePillars.map((pillar, idx) => (
                  <a
                    key={idx}
                    href="#layanan"
                    className="p-3.5 rounded-xl bg-slate-900/70 hover:bg-slate-700/60 border border-slate-700/50 hover:border-amber-400/50 transition-all text-left group flex flex-col justify-between"
                  >
                    <div>
                      <h3 className="font-heading font-bold text-sm text-slate-100 group-hover:text-amber-300 transition-colors">
                        {pillar.label}
                      </h3>
                      <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 leading-snug">
                        {pillar.desc}
                      </p>
                    </div>
                    <div className="mt-2 text-[10px] text-slate-500 group-hover:text-amber-400 flex items-center gap-1 font-semibold">
                      <span>Cek Spesifikasi</span>
                      <ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </a>
                ))}
              </div>

              {/* Quick WhatsApp Consultation Snippet */}
              <div className="pt-2">
                <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/50 flex items-center justify-between gap-3">
                  <div className="text-left">
                    <p className="text-xs font-bold text-emerald-300">Punya Desain atau File Sendiri?</p>
                    <p className="text-[11px] text-emerald-400/80">Kirim untuk kami cek resolusi cetaknya</p>
                  </div>
                  <button
                    onClick={() => {
                      const url = createWhatsAppUrl(
                        companyInfo.whatsapp,
                        `Halo CV Nurrizky Cipta Karya, saya punya file desain dan ingin minta tolong dicek apakah sudah siap cetak.`
                      );
                      window.open(url, '_blank', 'noopener,noreferrer');
                    }}
                    className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shrink-0 cursor-pointer transition-colors"
                  >
                    Cek Gratis
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
