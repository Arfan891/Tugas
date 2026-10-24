import React from 'react';
import { useCMS } from '../../context/CMSContext';
import type { ServiceItem } from '../../types';
import { CrudPanel, type FieldDef } from '../../components/admin/CrudPanel';
import { SERVICE_CATEGORIES, getCategoryBadgeStyle, getCategoryLabel } from '../../utils/formatters';

const fields: FieldDef<ServiceItem>[] = [
  { key: 'title', label: 'Nama Layanan', required: true, fullWidth: true },
  {
    key: 'category',
    label: 'Kategori',
    type: 'select',
    options: SERVICE_CATEGORIES.map(c => ({ value: c, label: getCategoryLabel(c) })),
  },
  { key: 'startingPrice', label: 'Harga Mulai', placeholder: 'Rp 18.000 / m²' },
  { key: 'minOrder', label: 'Minimal Order', placeholder: '1 meter' },
  { key: 'leadTime', label: 'Lama Pengerjaan', placeholder: '1 - 2 Hari Kerja' },
  { key: 'image', label: 'URL Gambar', required: true, fullWidth: true, placeholder: 'https://...' },
  { key: 'shortDesc', label: 'Deskripsi Singkat', type: 'textarea', required: true },
  { key: 'fullDesc', label: 'Deskripsi Lengkap', type: 'textarea' },
  { key: 'materials', label: 'Pilihan Bahan', type: 'list' },
  { key: 'features', label: 'Keunggulan', type: 'list' },
  { key: 'popular', label: 'Tandai sebagai layanan populer', type: 'checkbox' },
];

const emptyService: Omit<ServiceItem, 'id'> = {
  title: '',
  category: 'digital-printing',
  shortDesc: '',
  fullDesc: '',
  image: '',
  startingPrice: '',
  minOrder: '',
  leadTime: '',
  materials: [],
  features: [],
  popular: false,
};

export const ServicesPage: React.FC = () => {
  const { data, addService, updateService, deleteService } = useCMS();

  return (
    <CrudPanel
      title="Layanan & Produk"
      description="Daftar layanan yang tampil di bagian Layanan pada website."
      itemLabel="layanan"
      items={data.services}
      fields={fields}
      emptyItem={emptyService}
      searchText={s => `${s.title} ${getCategoryLabel(s.category)}`}
      onAdd={addService}
      onUpdate={updateService}
      onDelete={deleteService}
      renderItem={s => (
        <div className="flex items-center gap-4">
          <img src={s.image} alt="" className="w-16 h-16 rounded-xl object-cover bg-slate-100 shrink-0" />
          <div className="min-w-0">
            <p className="font-semibold text-slate-900 truncate">
              {s.title}
              {s.popular && <span className="ml-2 text-[10px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">POPULER</span>}
            </p>
            <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-slate-500">
              <span className={`px-2 py-0.5 rounded-full border text-[11px] font-semibold ${getCategoryBadgeStyle(s.category)}`}>
                {getCategoryLabel(s.category)}
              </span>
              <span>{s.startingPrice}</span>
            </div>
          </div>
        </div>
      )}
    />
  );
};
