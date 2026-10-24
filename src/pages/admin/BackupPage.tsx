import React, { useRef, useState } from 'react';
import { AlertCircle, CheckCircle2, Download, RotateCcw, Upload } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { Card, PageHeader, btnDanger, btnPrimary, btnSecondary } from '../../components/admin/ui';

export const BackupPage: React.FC = () => {
  const { exportDataJson, importDataJson, resetToDefault } = useCMS();
  const fileInput = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const ok = importDataJson(await file.text());
    setMessage(ok ? { ok, text: `Data dari ${file.name} berhasil dipulihkan.` } : { ok, text: 'File JSON tidak valid.' });
    e.target.value = '';
  };

  return (
    <div>
      <PageHeader
        title="Backup & Reset"
        description="Data CMS saat ini tersimpan di browser (localStorage). Unduh backup secara berkala agar tidak hilang."
      />

      {message && (
        <div
          className={`mb-4 p-3 rounded-xl border text-sm flex items-center gap-2 ${
            message.ok ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-rose-50 border-rose-200 text-rose-700'
          }`}
        >
          {message.ok ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          {message.text}
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-4">
        <Card className="p-5">
          <h2 className="font-heading font-bold text-slate-900">Ekspor Data</h2>
          <p className="text-sm text-slate-500 mt-1 mb-4">Unduh seluruh konten dan penawaran sebagai file JSON.</p>
          <button onClick={exportDataJson} className={btnPrimary}>
            <Download className="w-4 h-4" />
            Unduh Backup
          </button>
        </Card>

        <Card className="p-5">
          <h2 className="font-heading font-bold text-slate-900">Impor Data</h2>
          <p className="text-sm text-slate-500 mt-1 mb-4">Pulihkan dari file backup JSON. Data saat ini akan ditimpa.</p>
          <input ref={fileInput} type="file" accept="application/json,.json" onChange={handleImport} className="hidden" />
          <button onClick={() => fileInput.current?.click()} className={btnSecondary}>
            <Upload className="w-4 h-4" />
            Pilih File
          </button>
        </Card>

        <Card className="p-5">
          <h2 className="font-heading font-bold text-slate-900">Reset ke Awal</h2>
          <p className="text-sm text-slate-500 mt-1 mb-4">Kembalikan semua konten ke data bawaan. Perubahan kustom akan hilang.</p>
          <button onClick={resetToDefault} className={btnDanger}>
            <RotateCcw className="w-4 h-4" />
            Reset Data
          </button>
        </Card>
      </div>
    </div>
  );
};
