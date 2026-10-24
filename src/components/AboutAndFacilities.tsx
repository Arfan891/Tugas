import React from 'react';
import { useCMS } from '../context/CMSContext';
import { 
  Building, 
  Target, 
  Compass, 
  CheckCircle2, 
  Cpu, 
  ShieldCheck, 
  Sparkles, 
  Truck, 
  FileSearch, 
  Wrench,
  Award
} from 'lucide-react';

export const AboutAndFacilities: React.FC = () => {
  const { data } = useCMS();
  const { companyInfo, facilities } = data;

  const workflows = [
    {
      step: "01",
      title: "Konsultasi & Estimasi Cepat",
      desc: "Diskusikan kebutuhan spesifikasi bahan, ukuran, dan oplah. Dapatkan penawaran harga transparan dalam hitungan menit.",
      icon: <FileSearch className="w-5 h-5 text-amber-500" />
    },
    {
      step: "02",
      title: "Pengecekan File & Proofing",
      desc: "Tim pre-press memeriksa resolusi, bleed, dan profil warna CMYK agar terhindar dari cacat cetak sebelum naik mesin.",
      icon: <CheckCircle2 className="w-5 h-5 text-amber-500" />
    },
    {
      step: "03",
      title: "Produksi Mesin Mutakhir",
      desc: "Pengerjaan langsung di workshop mandiri dengan mesin berkapasitas besar dan kontrol berkala pada setiap batch.",
      icon: <Wrench className="w-5 h-5 text-amber-500" />
    },
    {
      step: "04",
      title: "Finishing & Quality Control",
      desc: "Pemotongan presisi, laminasi, jilid/jahit rapi, pengepakan terlindung plastik, dan siap kirim ke alamat Anda.",
      icon: <Truck className="w-5 h-5 text-amber-500" />
    }
  ];

  return (
    <section id="tentang" className="py-20 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Top: About Company & Vision Mission */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-6 space-y-5 text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 uppercase tracking-wider">
              <Building className="w-3.5 h-3.5 text-amber-600" />
              Tentang Kami
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {companyInfo.name}
            </h2>
            <p className="text-amber-600 font-semibold text-base sm:text-lg">
              {companyInfo.tagline}
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {companyInfo.fullAbout}
            </p>

            {/* Vision & Mission Cards */}
            <div className="space-y-4 pt-2">
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
                <h3 className="font-heading font-bold text-slate-900 text-sm flex items-center gap-2 mb-1.5">
                  <Target className="w-4 h-4 text-amber-500" />
                  Visi Perusahaan
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {companyInfo.vision}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
                <h3 className="font-heading font-bold text-slate-900 text-sm flex items-center gap-2 mb-2">
                  <Compass className="w-4 h-4 text-amber-500" />
                  Misi Utama
                </h3>
                <ul className="space-y-1.5">
                  {companyInfo.mission.map((m, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>

          {/* Right: Why Choose Us & Trust Badges */}
          <div className="lg:col-span-6">
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-xl border border-slate-800">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="relative space-y-6">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                  <Award className="w-4 h-4" />
                  Keunggulan Bekerjasama Bersama Kami
                </div>

                <h3 className="font-heading text-2xl font-bold leading-snug">
                  Mengapa Ratusan Klien Memilih CV Nurrizky Cipta Karya?
                </h3>

                <div className="space-y-4 text-left">
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 text-amber-400">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-sm text-white">Workshop & Mesin Sendiri</h4>
                      <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                        Kami adalah produsen langsung dengan workshop lengkap, bukan calo atau perantara pihak ketiga. Harga terjamin kompetitif dari tangan pertama.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 text-amber-400">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-sm text-white">Garansi Hasil Cetak & Warna</h4>
                      <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                        Standarisasi profil warna ICC dan kalibrasi tinta berkala memastikan hasil cetak Anda sesuai dengan persetujuan mock-up/proofing.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 text-amber-400">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-sm text-white">Layanan Terpadu Satu Pintu</h4>
                      <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                        Mulai dari pembuatan konsep desain grafis, penataan layout buku, produksi cetak, hingga finishing dan pengemasan rapi dilakukan dalam satu atap.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Stat Footnote */}
                <div className="p-3.5 bg-slate-800/80 rounded-xl border border-slate-700 flex items-center justify-between">
                  <div className="text-xs text-slate-300">
                    Kapasitas cetak bulanan:
                  </div>
                  <div className="font-heading font-bold text-amber-400 text-sm">
                    &gt; 500.000+ Eksemplar & Pcs
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>

        {/* Middle: 4-Step Production Workflow */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
              Alur Kerja Profesional
            </span>
            <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900">
              4 Langkah Mudah Memulai Pesanan Anda
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm">
              Proses transparan dan terpantau dari pemesanan hingga barang tiba di tangan Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflows.map((wf, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center">
                      {wf.icon}
                    </div>
                    <span className="font-heading font-extrabold text-2xl text-slate-300">
                      {wf.step}
                    </span>
                  </div>
                  <h4 className="font-heading font-bold text-slate-900 text-base">
                    {wf.title}
                  </h4>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    {wf.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom: Machinery & Production Facilities Showcase */}
        <div id="fasilitas" className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
              Armada Mesin & Fasilitas
            </span>
            <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900">
              Teknologi Cetak Modern Siap Menunjang Oplah Besar
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm">
              Investasi berkelanjutan pada mesin cetak mutakhir menjamin ketajaman warna dan kecepatan produksi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {facilities.map((fac) => (
              <div
                key={fac.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-44 overflow-hidden bg-slate-900">
                    <img
                      src={fac.image}
                      alt={fac.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-slate-900/80 text-amber-400 border border-slate-700 backdrop-blur-xs">
                        {fac.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 space-y-2 text-left">
                    <h4 className="font-heading font-bold text-slate-900 text-sm sm:text-base leading-snug">
                      {fac.name}
                    </h4>
                    <p className="text-xs text-amber-700 font-medium bg-amber-50/80 p-2 rounded-lg border border-amber-100">
                      {fac.specs}
                    </p>
                    <p className="text-slate-500 text-xs leading-relaxed">
                      {fac.capability}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
