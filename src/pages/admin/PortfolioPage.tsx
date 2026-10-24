import React from 'react';
import { useCMS } from '../../context/CMSContext';
import type { PortfolioItem } from '../../types';
import { CrudPanel, type FieldDef } from '../../components/admin/CrudPanel';
import { SERVICE_CATEGORIES, getCategoryBadgeStyle, getCategoryLabel } from '../../utils/formatters';

const fields: FieldDef<PortfolioItem>[] = [
  { key: 'title', label: 'Judul Proyek', required: true, fullWidth: true },
  { key: 'client', label: 'Klien', required: true },
  {
    key: 'category',
    label: 'Kategori',
    type: 'select',
    options: SERVICE_CATEGORIES.map(c => ({ value: c, label: getCategoryLabel(c) })),
  },
  { key: 'date', label: 'Tanggal / Periode', placeholder: 'Agustus 2026' },
  { key: 'specs', label: 'Spesifikasi', placeholder: 'Flexi Korea 440g, 3x1 m' },
  { key: 'image', label: 'URL Gambar', required: true, fullWidth: true, placeholder: 'https://...' },
  { key: 'description', label: 'Deskripsi', type: 'textarea', required: true },
];

const emptyPortfolio: Omit<PortfolioItem, 'id'> = {
  title: '',
  client: '',
  category: 'digital-printing',
  image: '',
  description: '',
  date: '',
  specs: '',
};

export const PortfolioPage: React.FC = () => {
  const { data, addPortfolio, updatePortfolio, deletePortfolio } = useCMS();

  return (
    <CrudPanel
      title="Portofolio"
      description="Hasil kerja yang ditampilkan di galeri portofolio."
      itemLabel="portofolio"
      items={data.portfolio}
      fields={fields}
      emptyItem={emptyPortfolio}
      searchText={p => `${p.title} ${p.client}`}
      onAdd={addPortfolio}
      onUpdate={updatePortfolio}
      onDelete={deletePortfolio}
      renderItem={p => (
        <div className="flex items-center gap-4">
          <img src={p.image} alt="" className="w-16 h-16 rounded-xl object-cover bg-slate-100 shrink-0" />
          <div className="min-w-0">
            <p className="font-semibold text-slate-900 truncate">{p.title}</p>
            <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-slate-500">
              <span className={`px-2 py-0.5 rounded-full border text-[11px] font-semibold ${getCategoryBadgeStyle(p.category)}`}>
                {getCategoryLabel(p.category)}
              </span>
              <span>{p.client}</span>
              {p.date && <span>· {p.date}</span>}
            </div>
          </div>
        </div>
      )}
    />
  );
};
