import React, { useMemo, useState } from 'react';
import { MessageSquare, Search, Trash2 } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import type { QuotationRequest, QuotationStatus } from '../../types';
import { Card, Dialog, Field, PageHeader, btnDanger, btnPrimary, btnSecondary, inputClass } from '../../components/admin/ui';
import {
  QUOTATION_STATUS_LABELS,
  QUOTATION_STATUS_STYLES,
  createWhatsAppUrl,
  formatRupiah,
  getCategoryLabel,
} from '../../utils/formatters';

const STATUSES = Object.keys(QUOTATION_STATUS_LABELS) as QuotationStatus[];

const Detail: React.FC<{ label: string; value?: React.ReactNode }> = ({ label, value }) =>
  value ? (
    <div>
      <dt className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{label}</dt>
      <dd className="text-sm text-slate-900 break-words">{value}</dd>
    </div>
  ) : null;

export const QuotationsPage: React.FC = () => {
  const { data, updateQuotationStatus, deleteQuotation } = useCMS();
  const [filter, setFilter] = useState<QuotationStatus | 'all'>('all');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<QuotationRequest | null>(null);
  const [status, setStatus] = useState<QuotationStatus>('pending');
  const [notes, setNotes] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return data.quotations.filter(item => {
      if (filter !== 'all' && item.status !== filter) return false;
      if (!q) return true;
      return [item.ticketNumber, item.customerName, item.companyName, item.serviceName, item.phone, item.email]
        .join(' ')
        .toLowerCase()
        .includes(q);
    });
  }, [data.quotations, filter, query]);

  const openDetail = (item: QuotationRequest) => {
    setSelected(item);
    setStatus(item.status);
    setNotes(item.adminNotes || '');
  };

  const handleSave = () => {
    if (!selected) return;
    updateQuotationStatus(selected.id, status, notes);
    setSelected(null);
  };

  const handleDelete = () => {
    if (selected && window.confirm(`Hapus penawaran ${selected.ticketNumber}?`)) {
      deleteQuotation(selected.id);
      setSelected(null);
    }
  };

  const countFor = (s: QuotationStatus | 'all') =>
    s === 'all' ? data.quotations.length : data.quotations.filter(q => q.status === s).length;

  return (
    <div>
      <PageHeader title="Permintaan Penawaran" description="Tindak lanjuti RFQ yang masuk dari formulir website." />

      <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
        <div className="flex flex-wrap gap-1.5">
          {(['all', ...STATUSES] as const).map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                filter === s ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {s === 'all' ? 'Semua' : QUOTATION_STATUS_LABELS[s]} ({countFor(s)})
            </button>
          ))}
        </div>
        <div className="relative md:ml-auto md:w-64">
          <input
            type="search"
            placeholder="Cari tiket, nama, layanan..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className={`${inputClass} pl-9 bg-white`}
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      <Card className="divide-y divide-slate-100">
        {filtered.length === 0 && <p className="p-8 text-center text-sm text-slate-500">Tidak ada penawaran.</p>}
        {filtered.map(q => (
          <button
            key={q.id}
            onClick={() => openDetail(q)}
            className="w-full text-left flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-4 hover:bg-slate-50 cursor-pointer"
          >
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-slate-900 truncate">
                {q.customerName}
                {q.companyName && <span className="text-slate-500 font-normal"> · {q.companyName}</span>}
              </p>
              <p className="text-xs text-slate-500 truncate">
                {q.ticketNumber} · {q.createdAt} · {q.serviceName} · {q.quantity} {q.unit}
              </p>
            </div>
            {q.estimatedPrice ? (
              <span className="text-sm font-semibold text-slate-700">{formatRupiah(q.estimatedPrice)}</span>
            ) : null}
            <span className={`self-start sm:self-auto text-[11px] font-bold px-2 py-0.5 rounded-full border ${QUOTATION_STATUS_STYLES[q.status]}`}>
              {QUOTATION_STATUS_LABELS[q.status]}
            </span>
          </button>
        ))}
      </Card>

      {selected && (
        <Dialog title={selected.ticketNumber} onClose={() => setSelected(null)}>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <Detail label="Pelanggan" value={selected.customerName} />
            <Detail label="Perusahaan / Instansi" value={selected.companyName} />
            <Detail label="WhatsApp" value={selected.phone} />
            <Detail label="Email" value={selected.email} />
            <Detail label="Kota" value={selected.city} />
            <Detail label="Tanggal Masuk" value={selected.createdAt} />
            <Detail label="Layanan" value={`${selected.serviceName} (${getCategoryLabel(selected.serviceCategory)})`} />
            <Detail label="Jumlah" value={`${selected.quantity} ${selected.unit}`} />
            <Detail label="Bahan" value={selected.material} />
            <Detail label="Ukuran" value={selected.dimensions} />
            <Detail label="Finishing" value={selected.finishing.join(', ')} />
            <Detail label="Target Selesai" value={selected.deadlineDate} />
            <Detail label="Estimasi Nilai" value={selected.estimatedPrice ? formatRupiah(selected.estimatedPrice) : undefined} />
            <Detail
              label="File Desain"
              value={
                selected.fileLink && (
                  <a href={selected.fileLink} target="_blank" rel="noreferrer" className="text-amber-700 underline break-all">
                    {selected.fileLink}
                  </a>
                )
              }
            />
            <div className="sm:col-span-2">
              <Detail label="Catatan Pelanggan" value={selected.notes} />
            </div>
          </dl>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
            <Field label="Status">
              <select value={status} onChange={e => setStatus(e.target.value as QuotationStatus)} className={inputClass}>
                {STATUSES.map(s => (
                  <option key={s} value={s}>
                    {QUOTATION_STATUS_LABELS[s]}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Catatan Admin" className="sm:col-span-2">
              <textarea rows={2} value={notes} onChange={e => setNotes(e.target.value)} className={inputClass} />
            </Field>
          </div>

          <div className="flex flex-wrap justify-between gap-2 mt-6">
            <div className="flex gap-2">
              <button onClick={handleDelete} className={btnDanger}>
                <Trash2 className="w-3.5 h-3.5" />
                Hapus
              </button>
              <a
                href={createWhatsAppUrl(
                  selected.phone,
                  `Halo ${selected.customerName}, terima kasih atas permintaan penawaran ${selected.ticketNumber} di ${data.companyInfo.name}.`
                )}
                target="_blank"
                rel="noreferrer"
                className={`${btnSecondary} !py-2 !px-3 text-xs`}
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                Hubungi via WhatsApp
              </a>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setSelected(null)} className={btnSecondary}>
                Batal
              </button>
              <button onClick={handleSave} className={btnPrimary}>
                Simpan
              </button>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
};
