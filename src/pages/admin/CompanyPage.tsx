import React, { useEffect, useState } from 'react';
import { CheckCircle2, Save } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import type { CompanyInfo } from '../../types';
import { Card, Field, PageHeader, btnPrimary, inputClass } from '../../components/admin/ui';

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <Card className="p-5">
    <h2 className="font-heading font-bold text-slate-900 mb-4">{title}</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>
  </Card>
);

const DEFAULT_NAV = { beranda: 'Beranda', layanan: 'Layanan & Produk', tentang: 'Tentang Kami', kontak: 'Kontak' };

export const CompanyPage: React.FC = () => {
  const { data, updateCompanyInfo } = useCMS();
  const [draft, setDraft] = useState<CompanyInfo>(data.companyInfo);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!saved) return;
    const t = setTimeout(() => setSaved(false), 2500);
    return () => clearTimeout(t);
  }, [saved]);

  const set = <K extends keyof CompanyInfo>(key: K, value: CompanyInfo[K]) => setDraft(prev => ({ ...prev, [key]: value }));

  // Untuk field bertingkat seperti workingHours.weekdays
  const setNested = <K extends 'workingHours' | 'socialMedia' | 'stats' | 'navigation' | 'promoBanner'>(
    key: K,
    sub: string,
    value: unknown
  ) => setDraft(prev => ({ ...prev, [key]: { ...(key === 'navigation' ? DEFAULT_NAV : {}), ...prev[key], [sub]: value } }));

  const text = (key: keyof CompanyInfo, label: string, full = false) => (
    <Field label={label} className={full ? 'sm:col-span-2' : ''}>
      <input value={String(draft[key] ?? '')} onChange={e => set(key, e.target.value as never)} className={inputClass} />
    </Field>
  );

  const area = (key: keyof CompanyInfo, label: string) => (
    <Field label={label} className="sm:col-span-2">
      <textarea rows={3} value={String(draft[key] ?? '')} onChange={e => set(key, e.target.value as never)} className={inputClass} />
    </Field>
  );

  const nested = <K extends 'workingHours' | 'socialMedia' | 'navigation' | 'promoBanner'>(key: K, sub: string, label: string, full = false) => (
    <Field label={label} className={full ? 'sm:col-span-2' : ''}>
      <input
        value={String((draft[key] as Record<string, unknown> | undefined)?.[sub] ?? '')}
        onChange={e => setNested(key, sub, e.target.value)}
        className={inputClass}
      />
    </Field>
  );

  const stat = (sub: keyof CompanyInfo['stats'], label: string) => (
    <Field label={label}>
      <input
        type="number"
        min={0}
        value={draft.stats[sub] ?? 0}
        onChange={e => setNested('stats', sub, Number(e.target.value))}
        className={inputClass}
      />
    </Field>
  );

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateCompanyInfo(draft);
    setSaved(true);
  };

  return (
    <form onSubmit={handleSave}>
      <PageHeader
        title="Profil Perusahaan"
        description="Identitas, kontak, statistik, navigasi, dan banner promo website."
        actions={
          <>
            {saved && (
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700">
                <CheckCircle2 className="w-4 h-4" />
                Tersimpan
              </span>
            )}
            <button type="submit" className={btnPrimary}>
              <Save className="w-4 h-4" />
              Simpan Perubahan
            </button>
          </>
        }
      />

      <div className="space-y-5">
        <Section title="Identitas">
          {text('name', 'Nama Perusahaan', true)}
          {text('tagline', 'Tagline', true)}
          {area('shortBio', 'Bio Singkat')}
          {area('fullAbout', 'Tentang Perusahaan')}
          {area('vision', 'Visi')}
          <Field label="Misi" hint="Satu misi per baris." className="sm:col-span-2">
            <textarea
              rows={4}
              value={draft.mission.join('\n')}
              onChange={e => set('mission', e.target.value.split('\n'))}
              onBlur={() => set('mission', draft.mission.map(m => m.trim()).filter(Boolean))}
              className={inputClass}
            />
          </Field>
        </Section>

        <Section title="Kontak & Lokasi">
          {text('phone', 'Telepon')}
          {text('whatsapp', 'WhatsApp')}
          {text('email', 'Email')}
          {text('mapsUrl', 'URL Google Maps')}
          {text('address', 'Alamat', true)}
          {nested('workingHours', 'weekdays', 'Jam Kerja (Senin - Jumat)')}
          {nested('workingHours', 'saturday', 'Jam Kerja (Sabtu)')}
          {nested('workingHours', 'sunday', 'Jam Kerja (Minggu & Libur)', true)}
        </Section>

        <Section title="Media Sosial">
          {nested('socialMedia', 'instagram', 'Instagram')}
          {nested('socialMedia', 'facebook', 'Facebook')}
          {nested('socialMedia', 'tiktok', 'TikTok')}
        </Section>

        <Section title="Statistik">
          {stat('projectsCompleted', 'Proyek Selesai')}
          {stat('satisfiedClients', 'Klien Puas')}
          {stat('yearsExperience', 'Tahun Pengalaman')}
          {stat('serviceTypes', 'Jenis Layanan')}
          {stat('productionMachines', 'Mesin Produksi')}
        </Section>

        <Section title="Label Navigasi">
          {nested('navigation', 'beranda', 'Beranda')}
          {nested('navigation', 'layanan', 'Layanan')}
          {nested('navigation', 'tentang', 'Tentang')}
          {nested('navigation', 'kontak', 'Kontak')}
        </Section>

        <Section title="Banner Promo">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 sm:col-span-2">
            <input
              type="checkbox"
              checked={draft.promoBanner.enabled}
              onChange={e => setNested('promoBanner', 'enabled', e.target.checked)}
              className="w-4 h-4 accent-amber-500"
            />
            Tampilkan banner promo di atas website
          </label>
          {nested('promoBanner', 'badge', 'Label Badge')}
          {nested('promoBanner', 'linkText', 'Teks Tombol')}
          {nested('promoBanner', 'text', 'Teks Promo', true)}
        </Section>
      </div>
    </form>
  );
};
