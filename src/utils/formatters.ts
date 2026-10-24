import type { ServiceCategory, QuotationRequest } from '../types';

export const formatRupiah = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(amount);
};

export const getCategoryLabel = (category: ServiceCategory): string => {
  switch (category) {
    case 'digital-printing':
      return 'Digital Printing';
    case 'sablon':
      return 'Sablon';
    case 'textile-printing':
      return 'Textile Printing';
    case 'desain-grafis':
      return 'Desain Grafis';
    case 'layout':
      return 'Layout';
    case 'percetakan-umum':
      return 'Percetakan Umum';
    default:
      return category;
  }
};

export const getCategoryBadgeStyle = (category: ServiceCategory): string => {
  switch (category) {
    case 'digital-printing':
      return 'bg-blue-50 text-blue-700 border-blue-200';
    case 'sablon':
      return 'bg-amber-50 text-amber-700 border-amber-200';
    case 'textile-printing':
      return 'bg-purple-50 text-purple-700 border-purple-200';
    case 'desain-grafis':
      return 'bg-rose-50 text-rose-700 border-rose-200';
    case 'layout':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    case 'percetakan-umum':
      return 'bg-indigo-50 text-indigo-700 border-indigo-200';
    default:
      return 'bg-slate-50 text-slate-700 border-slate-200';
  }
};

export const createWhatsAppUrl = (
  phone: string,
  message: string
): string => {
  let cleanPhone = (phone || '6285883404488').replace(/[^0-9]/g, '');
  if (cleanPhone.startsWith('0')) {
    cleanPhone = '62' + cleanPhone.slice(1);
  }
  if (!cleanPhone) {
    cleanPhone = '6285883404488';
  }
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
};

export const generateQuotationWhatsAppText = (
  quotation: QuotationRequest,
  companyName: string
): string => {
  return `Halo Tim *${companyName}*,

Saya ingin mengonfirmasi Permintaan Penawaran Cetak via Website:
📋 *Nomor Tiket*: ${quotation.ticketNumber}
📅 *Tanggal*: ${quotation.createdAt}

👤 *Data Pemesan*:
- Nama: ${quotation.customerName}
${quotation.companyName ? `- Perusahaan/Instansi: ${quotation.companyName}` : ''}
- WhatsApp: ${quotation.phone}
- Email: ${quotation.email}
- Kota: ${quotation.city}

📦 *Rincian Pesanan*:
- Layanan: ${quotation.serviceName} (${getCategoryLabel(quotation.serviceCategory)})
- Jumlah: ${quotation.quantity} ${quotation.unit}
- Bahan: ${quotation.material}
${quotation.dimensions ? `- Ukuran: ${quotation.dimensions}` : ''}
${quotation.finishing.length > 0 ? `- Finishing: ${quotation.finishing.join(', ')}` : ''}
${quotation.deadlineDate ? `- Target Selesai: ${quotation.deadlineDate}` : ''}
${quotation.fileLink ? `- Link File Desain: ${quotation.fileLink}` : ''}
${quotation.estimatedPrice ? `- Estimasi Nilai: ${formatRupiah(quotation.estimatedPrice)}` : ''}

📝 *Catatan*:
${quotation.notes || 'Tidak ada catatan tambahan'}

Mohon informasi rincian biaya resmi dan instruksi langkah berikutnya. Terima kasih!`;
};

export const generateDirectServiceWhatsAppText = (
  serviceTitle: string,
  category: ServiceCategory,
  companyName: string
): string => {
  return `Halo Tim *${companyName}*,

Saya tertarik dan ingin berkonsultasi mengenai layanan:
👉 *${serviceTitle}* (${getCategoryLabel(category)})

Mohon info spesifikasi bahan yang direkomendasikan, estimasi biaya, dan lama pengerjaannya. Terima kasih!`;
};
