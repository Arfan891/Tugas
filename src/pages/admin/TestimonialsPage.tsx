import React from 'react';
import { Star } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import type { TestimonialItem } from '../../types';
import { CrudPanel, type FieldDef } from '../../components/admin/CrudPanel';

const fields: FieldDef<TestimonialItem>[] = [
  { key: 'name', label: 'Nama', required: true },
  { key: 'role', label: 'Jabatan', placeholder: 'Marketing Director' },
  { key: 'company', label: 'Perusahaan' },
  {
    key: 'rating',
    label: 'Rating',
    type: 'select',
    options: ['5', '4', '3', '2', '1'].map(v => ({ value: v, label: `${v} bintang` })),
  },
  { key: 'avatar', label: 'URL Foto (opsional)', fullWidth: true, placeholder: 'https://...' },
  { key: 'content', label: 'Isi Testimoni', type: 'textarea', required: true },
];

const emptyTestimonial: Omit<TestimonialItem, 'id'> = {
  name: '',
  role: '',
  company: '',
  content: '',
  rating: 5,
  avatar: '',
};

export const TestimonialsPage: React.FC = () => {
  const { data, addTestimonial, updateTestimonial, deleteTestimonial } = useCMS();

  // Select menyimpan rating sebagai string, jadi dikonversi kembali ke angka.
  const normalize = <T extends Partial<TestimonialItem>>(item: T): T =>
    item.rating !== undefined ? { ...item, rating: Number(item.rating) } : item;

  return (
    <CrudPanel
      title="Testimoni"
      description="Ulasan pelanggan yang tampil di website."
      itemLabel="testimoni"
      items={data.testimonials}
      fields={fields}
      emptyItem={emptyTestimonial}
      searchText={t => `${t.name} ${t.company} ${t.content}`}
      onAdd={item => addTestimonial(normalize(item))}
      onUpdate={(id, item) => updateTestimonial(id, normalize(item))}
      onDelete={deleteTestimonial}
      renderItem={t => (
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <p className="font-semibold text-slate-900">{t.name}</p>
            <span className="flex">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </span>
          </div>
          <p className="text-xs text-slate-500">
            {[t.role, t.company].filter(Boolean).join(' · ')}
          </p>
          <p className="text-sm text-slate-600 mt-1 line-clamp-2">“{t.content}”</p>
        </div>
      )}
    />
  );
};
