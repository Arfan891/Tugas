import React from 'react';
import { X } from 'lucide-react';

export const inputClass =
  'w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500';

export const btnPrimary =
  'inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 active:scale-95 text-white font-bold text-sm transition-all cursor-pointer disabled:opacity-50';

export const btnSecondary =
  'inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-sm transition-colors cursor-pointer';

export const btnDanger =
  'inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-rose-50 border border-rose-200 hover:bg-rose-100 text-rose-700 font-semibold text-xs transition-colors cursor-pointer';

export const Field: React.FC<{ label: string; hint?: string; className?: string; children: React.ReactNode }> = ({
  label,
  hint,
  className = '',
  children,
}) => (
  <label className={`block ${className}`}>
    <span className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">{label}</span>
    {children}
    {hint && <span className="block text-[11px] text-slate-400 mt-1">{hint}</span>}
  </label>
);

export const PageHeader: React.FC<{ title: string; description?: string; actions?: React.ReactNode }> = ({
  title,
  description,
  actions,
}) => (
  <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
    <div>
      <h1 className="font-heading font-extrabold text-2xl text-slate-900">{title}</h1>
      {description && <p className="text-sm text-slate-500 mt-1">{description}</p>}
    </div>
    {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
  </div>
);

export const Card: React.FC<{ className?: string; children: React.ReactNode }> = ({ className = '', children }) => (
  <div className={`bg-white rounded-2xl border border-slate-200 shadow-xs ${className}`}>{children}</div>
);

export const Dialog: React.FC<{ title: string; onClose: () => void; children: React.ReactNode }> = ({
  title,
  onClose,
  children,
}) => (
  <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs overflow-y-auto">
    <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl border border-slate-200 my-8">
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
        <h2 className="font-heading font-bold text-lg text-slate-900">{title}</h2>
        <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1 rounded-lg" aria-label="Tutup">
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="p-6">{children}</div>
    </div>
  </div>
);
