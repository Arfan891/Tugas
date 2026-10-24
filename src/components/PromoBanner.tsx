import React from 'react';
import { useCMS } from '../context/CMSContext';
import { Megaphone, ArrowRight, X } from 'lucide-react';

export const PromoBanner: React.FC = () => {
  const { data, openRfqModal } = useCMS();
  const [isVisible, setIsVisible] = React.useState(true);
  const promo = data.companyInfo.promoBanner;

  if (!promo.enabled || !isVisible) return null;

  return (
    <div id="promo-banner" className="bg-slate-900 text-white text-xs sm:text-sm py-2.5 px-4 relative z-40 border-b border-slate-800 transition-all">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-500 text-slate-950 uppercase tracking-wide shrink-0">
            <Megaphone className="w-3 h-3" />
            {promo.badge || 'PROMO'}
          </span>
          <p className="truncate text-slate-200 font-medium">
            {promo.text}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 ml-auto">
          {promo.linkText && (
            <button
              id="btn-promo-action"
              onClick={() => openRfqModal()}
              className="inline-flex items-center gap-1 font-semibold text-amber-400 hover:text-amber-300 underline underline-offset-2 transition-colors cursor-pointer text-xs"
            >
              {promo.linkText}
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
          <button
            id="btn-close-promo"
            onClick={() => setIsVisible(false)}
            className="text-slate-400 hover:text-white p-1 rounded transition-colors"
            title="Tutup banner promo"
            aria-label="Tutup banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
