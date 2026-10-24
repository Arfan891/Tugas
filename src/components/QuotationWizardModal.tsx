import React, { useState, useEffect } from 'react';
import { useCMS } from '../context/CMSContext';
import type { ServiceCategory, QuotationRequest } from '../types';
import { 
  X, 
  FileText, 
  CheckCircle2, 
  Send, 
  Printer, 
  MessageSquare, 
  Calculator, 
  ArrowRight, 
  ArrowLeft, 
  Upload, 
  AlertCircle,
  Copy,
  Check
} from 'lucide-react';
import { 
  getCategoryLabel, 
  formatRupiah, 
  createWhatsAppUrl, 
  generateQuotationWhatsAppText 
} from '../utils/formatters';

export const QuotationWizardModal: React.FC = () => {
  const { 
    isRfqModalOpen, 
    closeRfqModal, 
    data, 
    selectedServiceForRfq, 
    submitQuotation 
  } = useCMS();

  // Wizard steps: 1: Service & Specs, 2: Customer details, 3: Completed confirmation
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form states
  const [serviceCategory, setServiceCategory] = useState<ServiceCategory>('digital-printing');
  const [serviceName, setServiceName] = useState('');
  const [quantity, setQuantity] = useState<number>(100);
  const [unit, setUnit] = useState('pcs');
  const [material, setMaterial] = useState('');
  const [customMaterial, setCustomMaterial] = useState('');
  const [dimensions, setDimensions] = useState('');
  const [selectedFinishing, setSelectedFinishing] = useState<string[]>([]);
  const [deadlineDate, setDeadlineDate] = useState('');
  const [notes, setNotes] = useState('');
  const [fileLink, setFileLink] = useState('');

  // Customer info
  const [customerName, setCustomerName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');

  // Completed result
  const [submittedQuotation, setSubmittedQuotation] = useState<QuotationRequest | null>(null);
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Synchronize when a specific service is clicked from the catalog
  useEffect(() => {
    if (selectedServiceForRfq) {
      setServiceCategory(selectedServiceForRfq.category);
      setServiceName(selectedServiceForRfq.title);
      if (selectedServiceForRfq.materials.length > 0) {
        setMaterial(selectedServiceForRfq.materials[0]);
      }
      // Set appropriate units
      if (selectedServiceForRfq.category === 'digital-printing') setUnit('meter / pcs');
      else if (selectedServiceForRfq.category === 'textile-printing') setUnit('pcs / meter');
      else if (selectedServiceForRfq.category === 'sablon') setUnit('pcs');
      else if (selectedServiceForRfq.category === 'layout') setUnit('halaman');
      else if (selectedServiceForRfq.category === 'percetakan-umum') setUnit('lembar / buku');
      else setUnit('proyek');
    } else if (data.services.length > 0 && !serviceName) {
      setServiceCategory('digital-printing');
      const firstSrv = data.services.find(s => s.category === 'digital-printing') || data.services[0];
      setServiceName(firstSrv.title);
      setMaterial(firstSrv.materials[0] || 'Standar');
    }
  }, [selectedServiceForRfq, isRfqModalOpen, data.services]);

  if (!isRfqModalOpen) return null;

  const currentCategoryServices = data.services.filter(s => s.category === serviceCategory);
  const activeServiceObj = data.services.find(s => s.title === serviceName);

  const availableFinishingOptions = [
    "Laminasi Doff",
    "Laminasi Glossy",
    "Spot UV Glossy",
    "Mata Ayam (Eyelets)",
    "Lipat Mesin (Bifold/Trifold)",
    "Jilid Kawat / Spiral",
    "Jilid Lem Panas (Binding)",
    "Pond Pisau Khusus",
    "Hot Print Emas / Perak (Foil)",
    "Jahit Rantai Kaos"
  ];

  const toggleFinishing = (opt: string) => {
    if (selectedFinishing.includes(opt)) {
      setSelectedFinishing(selectedFinishing.filter(f => f !== opt));
    } else {
      setSelectedFinishing([...selectedFinishing, opt]);
    }
  };

  // Rough estimation calculation for live estimator
  const calculateEstimatedPrice = (): number => {
    let baseUnitPrice = 2000;
    if (serviceCategory === 'digital-printing') baseUnitPrice = 25000;
    else if (serviceCategory === 'sablon') baseUnitPrice = 45000;
    else if (serviceCategory === 'textile-printing') baseUnitPrice = 75000;
    else if (serviceCategory === 'desain-grafis') return 250000;
    else if (serviceCategory === 'layout') return Math.max(quantity, 1) * 20000;
    else if (serviceCategory === 'percetakan-umum') baseUnitPrice = 1500;

    let total = baseUnitPrice * Math.max(quantity, 1);
    // Add finishing overhead
    total += selectedFinishing.length * (quantity * 300);
    return Math.round(total);
  };

  const handleNextToCustomerInfo = () => {
    if (!serviceName) {
      setErrorMsg("Silakan pilih layanan yang diinginkan.");
      return;
    }
    if (quantity <= 0) {
      setErrorMsg("Kuantitas pesanan harus lebih dari 0.");
      return;
    }
    setErrorMsg('');
    setStep(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) {
      setErrorMsg("Nama pemesan wajib diisi.");
      return;
    }
    if (!phone.trim()) {
      setErrorMsg("Nomor WhatsApp wajib diisi agar tim kami dapat mengirim penawaran.");
      return;
    }

    setErrorMsg('');
    const finalMaterial = customMaterial.trim() || material || "Standar Pabrik";
    const estimatedPrice = calculateEstimatedPrice();

    const result = submitQuotation({
      customerName,
      companyName,
      phone,
      email,
      city,
      serviceCategory,
      serviceName,
      quantity,
      unit,
      material: finalMaterial,
      dimensions,
      finishing: selectedFinishing,
      deadlineDate,
      notes,
      fileLink,
      estimatedPrice
    });

    setSubmittedQuotation(result);
    setStep(3);
  };

  const handleSendToWhatsApp = () => {
    if (!submittedQuotation) return;
    const text = generateQuotationWhatsAppText(submittedQuotation, data.companyInfo.name);
    const url = createWhatsAppUrl(data.companyInfo.whatsapp, text);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCopySummary = () => {
    if (!submittedQuotation) return;
    const text = generateQuotationWhatsAppText(submittedQuotation, data.companyInfo.name);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleResetModal = () => {
    setStep(1);
    setSubmittedQuotation(null);
    closeRfqModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div 
        id="quotation-modal-box"
        className="bg-white rounded-2xl max-w-2xl w-full my-6 shadow-2xl border border-slate-200 overflow-hidden flex flex-col relative animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-5 sm:p-6 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-base sm:text-lg text-white">
                Formulir Permintaan Penawaran (RFQ)
              </h3>
              <p className="text-xs text-slate-300">
                CV Nurrizky Cipta Karya • Respon Cepat & Transparan
              </p>
            </div>
          </div>

          <button
            onClick={handleResetModal}
            className="text-slate-400 hover:text-white p-2 rounded-full hover:bg-slate-800 transition-colors"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="bg-slate-100 px-6 py-3 border-b border-slate-200 flex items-center justify-between text-xs font-semibold">
          <div className={`flex items-center gap-1.5 ${step >= 1 ? 'text-amber-700 font-bold' : 'text-slate-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 1 ? 'bg-amber-400 text-slate-950' : 'bg-slate-200'}`}>1</span>
            <span>Spesifikasi Pesanan</span>
          </div>
          <div className="w-8 h-px bg-slate-300 hidden sm:block" />
          <div className={`flex items-center gap-1.5 ${step >= 2 ? 'text-amber-700 font-bold' : 'text-slate-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 2 ? 'bg-amber-400 text-slate-950' : 'bg-slate-200'}`}>2</span>
            <span>Data Pemesan</span>
          </div>
          <div className="w-8 h-px bg-slate-300 hidden sm:block" />
          <div className={`flex items-center gap-1.5 ${step === 3 ? 'text-emerald-700 font-bold' : 'text-slate-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 3 ? 'bg-emerald-500 text-white' : 'bg-slate-200'}`}>3</span>
            <span>Tiket Penawaran</span>
          </div>
        </div>

        {errorMsg && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* STEP 1: SERVICE & SPECIFICATIONS */}
        {step === 1 && (
          <div className="p-6 space-y-5 text-left max-h-[70vh] overflow-y-auto">
            
            {/* Category selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                1. Pilih Kategori Layanan:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {(['digital-printing', 'sablon', 'textile-printing', 'desain-grafis', 'layout', 'percetakan-umum'] as ServiceCategory[]).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      setServiceCategory(cat);
                      const matching = data.services.find(s => s.category === cat);
                      if (matching) {
                        setServiceName(matching.title);
                        setMaterial(matching.materials[0] || '');
                      }
                    }}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold text-left border transition-all cursor-pointer ${
                      serviceCategory === cat
                        ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    {getCategoryLabel(cat)}
                  </button>
                ))}
              </div>
            </div>

            {/* Product selection within category */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                2. Jenis Produk / Layanan:
              </label>
              <select
                value={serviceName}
                onChange={(e) => {
                  setServiceName(e.target.value);
                  const found = data.services.find(s => s.title === e.target.value);
                  if (found && found.materials.length > 0) {
                    setMaterial(found.materials[0]);
                  }
                }}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                {currentCategoryServices.map((s) => (
                  <option key={s.id} value={s.title}>{s.title}</option>
                ))}
                <option value="Lainnya (Custom Request)">Lainnya (Custom Request)</option>
              </select>
            </div>

            {/* Quantity and Unit */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  3. Jumlah / Kuantitas Oplah:
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-amber-500"
                  />
                  <input
                    type="text"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    placeholder="Satuan (pcs/m²/rim)"
                    className="w-28 px-2.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-center"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  4. Ukuran / Dimensi (Opsional):
                </label>
                <input
                  type="text"
                  placeholder="Misal: A4, A3+, 3x1 Meter, Kaos Size L"
                  value={dimensions}
                  onChange={(e) => setDimensions(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            {/* Materials selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                5. Pilihan Bahan & Kertas:
              </label>
              {activeServiceObj && activeServiceObj.materials.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {activeServiceObj.materials.map((m, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setMaterial(m);
                        setCustomMaterial('');
                      }}
                      className={`px-3 py-1 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                        material === m && !customMaterial
                          ? 'bg-amber-400 text-slate-950 font-bold border-amber-500'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              )}
              <input
                type="text"
                placeholder="Atau tuliskan jenis bahan custom Anda di sini..."
                value={customMaterial}
                onChange={(e) => setCustomMaterial(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:bg-white"
              />
            </div>

            {/* Finishing Options */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                6. Finishing Tambahan:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                {availableFinishingOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => toggleFinishing(opt)}
                    className={`py-1.5 px-2.5 rounded-lg text-xs font-medium text-left border flex items-center justify-between cursor-pointer ${
                      selectedFinishing.includes(opt)
                        ? 'bg-amber-50 text-amber-900 border-amber-400 font-bold'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <span className="truncate">{opt}</span>
                    {selectedFinishing.includes(opt) && <Check className="w-3.5 h-3.5 text-amber-600 shrink-0" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Deadline Target */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                7. Target Selesai / Deadline Dibutuhkan:
              </label>
              <input
                type="date"
                value={deadlineDate}
                onChange={(e) => setDeadlineDate(e.target.value)}
                className="w-full sm:w-1/2 px-3.5 py-2 bg-white border border-slate-300 rounded-xl text-sm"
              />
            </div>

            {/* Live Rough Price Estimator Preview */}
            <div className="p-3.5 bg-amber-50/80 border border-amber-200 rounded-xl flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-amber-600 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-amber-950">Simulasi Estimasi Awal:</p>
                  <p className="text-[11px] text-amber-800">
                    Perkiraan kisaran: <strong className="text-amber-900 font-heading text-sm">{formatRupiah(calculateEstimatedPrice())}</strong>
                  </p>
                </div>
              </div>
              <span className="text-[10px] text-amber-700 bg-amber-200/60 px-2 py-1 rounded">
                Final dikonfirmasi Admin
              </span>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={handleNextToCustomerInfo}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm shadow-xs cursor-pointer"
              >
                <span>Lanjut: Data Pemesan</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

        {/* STEP 2: CUSTOMER INFO & FILE ATTACHMENTS */}
        {step === 2 && (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-left max-h-[70vh] overflow-y-auto">
            
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs flex items-center justify-between">
              <div>
                <span className="text-slate-400">Layanan:</span> <strong className="text-slate-900">{serviceName}</strong> ({quantity} {unit})
              </div>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-amber-600 font-bold hover:underline"
              >
                Ubah Spesifikasi
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Nama Pemesan / PIC <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Rian Pratama"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Perusahaan / Instansi / Komunitas (Opsional)
                </label>
                <input
                  type="text"
                  placeholder="Contoh: PT Kreasi Nusantara"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  No. WhatsApp Aktif <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Contoh: 081234567890"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-amber-500"
                />
                <span className="text-[11px] text-slate-400">Rincian penawaran akan dikirimkan ke nomor ini.</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Alamat Email (Opsional)
                </label>
                <input
                  type="email"
                  placeholder="Contoh: rian@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Kota / Lokasi Pengiriman
              </label>
              <input
                type="text"
                placeholder="Contoh: Jakarta Timur, Bandung, Surabaya..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Link File Desain / Google Drive / Dropbox / WeTransfer
              </label>
              <div className="relative">
                <input
                  type="url"
                  placeholder="https://drive.google.com/... atau link cloud storage Anda"
                  value={fileLink}
                  onChange={(e) => setFileLink(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-amber-500"
                />
                <Upload className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
              <span className="text-[11px] text-slate-400">
                Pastikan akses link di-setting "Anyone with the link / Siapa saja dengan link".
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Catatan Khusus / Permintaan Tambahan
              </label>
              <textarea
                rows={3}
                placeholder="Tuliskan keterangan detail warna, jenis jahitan, permintaan proof cetak, dll..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm"
              />
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs sm:text-sm font-semibold hover:bg-slate-100 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Kembali</span>
              </button>

              <button
                type="submit"
                id="btn-submit-rfq-form"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm shadow-sm cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Kirim Permintaan Penawaran</span>
              </button>
            </div>

          </form>
        )}

        {/* STEP 3: COMPLETED RECEIPT & WHATSAPP SYNC */}
        {step === 3 && submittedQuotation && (
          <div className="p-6 space-y-6 text-left max-h-[75vh] overflow-y-auto">
            
            {/* Success Banner */}
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-heading font-extrabold text-xl text-slate-900">
                Permintaan Penawaran Berhasil Dikirim!
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                Nomor tiket Anda telah terdaftar di sistem kami. Tim penjualan CV Nurrizky Cipta Karya akan segera menindaklanjuti.
              </p>
            </div>

            {/* Ticket Card Receipt */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 font-mono text-xs text-slate-800 relative">
              <div className="flex items-center justify-between border-b border-dashed border-slate-300 pb-3">
                <div>
                  <p className="text-[10px] text-slate-400 font-sans uppercase">Nomor Tiket Penawaran</p>
                  <p className="font-bold text-sm text-slate-900">{submittedQuotation.ticketNumber}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-slate-400 font-sans uppercase">Waktu Pengajuan</p>
                  <p className="font-semibold text-slate-700">{submittedQuotation.createdAt}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-sans">
                <div>
                  <span className="text-slate-400 block text-[11px]">Nama Pemesan:</span>
                  <span className="font-semibold text-slate-900">{submittedQuotation.customerName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">No. WhatsApp:</span>
                  <span className="font-semibold text-slate-900">{submittedQuotation.phone}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Layanan:</span>
                  <span className="font-semibold text-slate-900">{submittedQuotation.serviceName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Jumlah Oplah:</span>
                  <span className="font-semibold text-slate-900">{submittedQuotation.quantity} {submittedQuotation.unit}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Bahan:</span>
                  <span className="font-semibold text-slate-900">{submittedQuotation.material}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Perkiraan Nilai:</span>
                  <span className="font-semibold text-amber-600">{formatRupiah(submittedQuotation.estimatedPrice || 0)}</span>
                </div>
              </div>
            </div>

            {/* Actions for Customer */}
            <div className="space-y-3 pt-2">
              
              {/* WhatsApp direct push */}
              <button
                id="btn-rfq-push-wa"
                onClick={handleSendToWhatsApp}
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:scale-98 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20 cursor-pointer transition-all"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Kirim Rincian ke WhatsApp Kami Sekarang (Respon Cepat)</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleCopySummary}
                  className="py-2.5 px-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Tersalin!' : 'Salin Teks'}</span>
                </button>

                <button
                  onClick={handlePrint}
                  className="py-2.5 px-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Cetak / Simpan PDF</span>
                </button>
              </div>

              <div className="pt-2 text-center">
                <button
                  onClick={handleResetModal}
                  className="text-xs text-slate-500 hover:text-slate-800 underline font-medium"
                >
                  Selesai & Tutup Jendela
                </button>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};
