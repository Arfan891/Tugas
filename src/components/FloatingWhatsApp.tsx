import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { 
  MessageSquare, 
  X, 
  Send, 
  Check, 
  Sparkles, 
  Zap, 
  Palette,
  FileCheck
} from 'lucide-react';
import { createWhatsAppUrl } from '../utils/formatters';

export const FloatingWhatsApp: React.FC = () => {
  const { data, openRfqModal } = useCMS();
  const [isOpen, setIsOpen] = useState(false);
  const [customText, setCustomText] = useState('');

  const { companyInfo } = data;

  const quickMessages = [
    {
      title: "Minta Brosur & Daftar Harga",
      icon: <FileCheck className="w-3.5 h-3.5 text-amber-500" />,
      text: "Halo CV Nurrizky Cipta Karya, saya ingin meminta katalog produk dan daftar harga lengkap terbaru."
    },
    {
      title: "Konsultasi Cek File Desain",
      icon: <Palette className="w-3.5 h-3.5 text-blue-500" />,
      text: "Halo Tim Desain, saya ingin mengirimkan file untuk dicek apakah sudah siap untuk naik cetak."
    },
    {
      title: "Order Urgent / Butuh Cepat",
      icon: <Zap className="w-3.5 h-3.5 text-emerald-500" />,
      text: "Halo, saya ada pesanan mendesak (urgent deadline). Bisakah dibantu jadwal produksi cepatnya?"
    }
  ];

  const handleSend = (textToSend: string) => {
    const message = textToSend.trim() || `Halo CV Nurrizky Cipta Karya, saya ingin berkonsultasi mengenai kebutuhan percetakan saya.`;
    const url = createWhatsAppUrl(companyInfo.whatsapp, message);
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
    setCustomText('');
  };

  return (
    <div id="floating-whatsapp-widget" className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      
      {/* Expanded Popover Card */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200 text-left">
          
          {/* Header */}
          <div className="bg-emerald-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center font-bold text-white">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <span className="w-3 h-3 rounded-full bg-emerald-300 border-2 border-emerald-600 absolute bottom-0 right-0" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-white">
                  Customer Service Online
                </h4>
                <p className="text-[11px] text-emerald-100 flex items-center gap-1">
                  <span>{companyInfo.name}</span>
                  <span>•</span>
                  <span className="text-emerald-200">Online</span>
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-emerald-100 hover:text-white p-1 rounded-lg transition-colors"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 bg-slate-50 space-y-3">
            <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs text-xs text-slate-700 leading-relaxed">
              Halo! Ada yang bisa kami bantu seputar kebutuhan <strong>Digital Printing, Sablon, Textile, Desain Grafis, atau Percetakan Umum</strong> hari ini?
            </div>

            {/* Quick Prompts */}
            <div className="space-y-1.5 pt-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Pertanyaan Cepat:
              </p>
              {quickMessages.map((qm, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(qm.text)}
                  className="w-full text-left p-2 rounded-lg bg-white hover:bg-emerald-50 hover:border-emerald-200 border border-slate-200 text-xs text-slate-700 flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <span className="shrink-0">{qm.icon}</span>
                  <span className="truncate">{qm.title}</span>
                </button>
              ))}
            </div>

            {/* RFQ Trigger inside WhatsApp box */}
            <div className="pt-2 border-t border-slate-200">
              <button
                onClick={() => {
                  setIsOpen(false);
                  openRfqModal();
                }}
                className="w-full py-2 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold text-center transition-colors cursor-pointer"
              >
                Isi Formulir Penawaran Otomatis (RFQ)
              </button>
            </div>

            {/* Direct Input */}
            <div className="pt-2 flex items-center gap-1.5">
              <input
                type="text"
                placeholder="Ketik pesan Anda di sini..."
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSend(customText);
                }}
                className="flex-1 px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              <button
                onClick={() => handleSend(customText)}
                className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition-colors cursor-pointer"
                aria-label="Kirim via WhatsApp"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Footer note */}
          <div className="px-4 py-2 bg-slate-100 text-[10px] text-slate-400 text-center border-t border-slate-200">
            Terhubung langsung ke WhatsApp resmi {companyInfo.phone}
          </div>

        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        id="btn-floating-whatsapp"
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2.5 px-4 py-3 bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-slate-950 font-bold rounded-full shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
        aria-label="Buka WhatsApp"
      >
        <div className="relative">
          <MessageSquare className="w-6 h-6 text-slate-950 fill-slate-950" />
          <span className="w-2.5 h-2.5 rounded-full bg-white absolute -top-0.5 -right-0.5 animate-ping" />
          <span className="w-2.5 h-2.5 rounded-full bg-white absolute -top-0.5 -right-0.5" />
        </div>
        <span className="font-heading font-extrabold text-sm text-slate-950 hidden sm:inline">
          {isOpen ? 'Tutup' : 'Chat WhatsApp'}
        </span>
      </button>

    </div>
  );
};
