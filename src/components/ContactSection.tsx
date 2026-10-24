import React from 'react';
import { useCMS } from '../context/CMSContext';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageSquare, 
  ExternalLink, 
  CheckCircle2, 
  Sparkles, 
  Send,
  Zap,
  Palette
} from 'lucide-react';
import { createWhatsAppUrl } from '../utils/formatters';

export const ContactSection: React.FC = () => {
  const { data } = useCMS();
  const { companyInfo } = data;

  const consultationChannels = [
    {
      title: "Customer Service & Penawaran Harga",
      desc: "Konsultasi harga oplah, spesifikasi kertas, sampel cetak, dan invoice.",
      badge: "Respon Utama",
      icon: <MessageSquare className="w-5 h-5 text-emerald-500" />,
      message: "Halo CS CV Nurrizky Cipta Karya, saya ingin berkonsultasi mengenai penawaran harga cetak untuk kebutuhan saya."
    },
    {
      title: "Tim Desain & Pengecekan File (Pre-Press)",
      desc: "Kirim file untuk cek resolusi DPI, warna CMYK, dan kesiapan naik mesin.",
      badge: "Teknis & File",
      icon: <Palette className="w-5 h-5 text-blue-500" />,
      message: "Halo Tim Desain & Pre-Press CV Nurrizky Cipta Karya, saya ingin konsultasi teknis terkait file desain saya apakah sudah siap cetak."
    },
    {
      title: "Layanan Order Kilat / Express",
      desc: "Kebutuhan mendadak untuk event besok? Diskusikan jadwal mesin kilat.",
      badge: "Prioritas Express",
      icon: <Zap className="w-5 h-5 text-amber-500" />,
      message: "Halo CV Nurrizky Cipta Karya, saya memiliki pesanan cetak mendadak (urgent / express order). Apakah mesin masih tersedia untuk jadwal cepat?"
    }
  ];

  const handleOpenWhatsApp = (customMsg: string) => {
    const url = createWhatsAppUrl(companyInfo.whatsapp, customMsg);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="kontak" className="py-20 bg-slate-100 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 uppercase tracking-wider">
            <Phone className="w-3.5 h-3.5 text-amber-600" />
            Hubungi Perusahaan
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Konsultasi Langsung & Kunjungi Workshop Kami
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Tim kami siap membantu merealisasikan kebutuhan cetak Anda dengan pelayanan ramah, tepat, dan cepat.
          </p>
        </div>

        {/* 3 WhatsApp Quick Channels */}
        <div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center mb-4">
            Pilih Saluran Konsultasi WhatsApp Cepat
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {consultationChannels.map((channel, idx) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between hover:border-emerald-400 transition-all group text-left"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                      {channel.icon}
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      {channel.badge}
                    </span>
                  </div>

                  <h4 className="font-heading font-bold text-slate-900 text-sm sm:text-base group-hover:text-emerald-700 transition-colors">
                    {channel.title}
                  </h4>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    {channel.desc}
                  </p>
                </div>

                <div className="pt-4 mt-2 border-t border-slate-100">
                  <button
                    onClick={() => handleOpenWhatsApp(channel.message)}
                    className="w-full py-2.5 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-500 text-emerald-700 hover:text-white border border-emerald-200 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Chat WhatsApp Sekarang</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Address, Working Hours & Maps Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Contact Info details */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6 text-left">
            <h3 className="font-heading font-extrabold text-xl text-slate-900">
              Informasi Kontak Resmi
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-amber-600 shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Alamat Workshop & Kantor:
                  </h4>
                  <p className="text-slate-800 text-sm font-medium mt-0.5">
                    {companyInfo.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-amber-600 shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Jam Operasional Produksi:
                  </h4>
                  <p className="text-slate-800 text-xs sm:text-sm mt-0.5">
                    {companyInfo.workingHours.weekdays}
                  </p>
                  <p className="text-slate-800 text-xs sm:text-sm">
                    {companyInfo.workingHours.saturday}
                  </p>
                  <p className="text-slate-500 text-xs mt-0.5">
                    {companyInfo.workingHours.sunday}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-amber-600 shrink-0 mt-0.5">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Email Korespondensi:
                  </h4>
                  <p className="text-slate-800 text-sm font-medium mt-0.5">
                    {companyInfo.email}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-amber-600 shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Telepon / WhatsApp:
                  </h4>
                  <p className="text-slate-800 text-sm font-bold mt-0.5">
                    {companyInfo.phone}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-2 text-xs">
              <span className="font-semibold text-slate-500">Media Sosial:</span>
              <span className="text-slate-800 font-medium">Instagram: {companyInfo.socialMedia.instagram}</span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-800 font-medium">TikTok: {companyInfo.socialMedia.tiktok}</span>
            </div>
          </div>

          {/* Right: Map / Location visual card */}
          <div className="lg:col-span-6 bg-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 flex flex-col justify-between relative overflow-hidden">
            <div className="space-y-4">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-800 text-amber-400 border border-slate-700 inline-block">
                Akses Lokasi Mudah
              </span>
              <h3 className="font-heading font-extrabold text-2xl text-white">
                Siap Melayani Kunjungan & Pengambilan Langsung
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Bagi pelanggan yang ingin melihat sampel bahan secara langsung, berdiskusi warna bersama tim desainer kami, atau mengambil hasil cetakan dalam jumlah besar, workshop kami selalu terbuka.
              </p>

              <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-2">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  Tersedia Layanan Pengiriman Antar-Kota & Ekspedisi Kargo
                </div>
                <p className="text-xs text-slate-300">
                  Didukung kemasan peti kayu dan bungkus waterproof untuk pengiriman luar kota / antar pulau via JNE Trucking, Dakota Cargo, Indah Cargo, dll.
                </p>
              </div>
            </div>

            <div className="pt-6">
              <a
                href={companyInfo.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>Buka Petunjuk Arah di Google Maps</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
