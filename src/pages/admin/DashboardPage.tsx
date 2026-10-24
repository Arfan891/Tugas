import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Briefcase, Clock, FileText, Images, MessageSquareQuote } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { Card, PageHeader } from '../../components/admin/ui';
import { QUOTATION_STATUS_LABELS, QUOTATION_STATUS_STYLES, formatRupiah } from '../../utils/formatters';

export const DashboardPage: React.FC = () => {
  const { data } = useCMS();
  const pending = data.quotations.filter(q => q.status === 'pending').length;
  const pipelineValue = data.quotations
    .filter(q => q.status !== 'cancelled')
    .reduce((sum, q) => sum + (q.estimatedPrice || 0), 0);

  const stats = [
    { label: 'Penawaran Menunggu', value: pending, icon: Clock, to: '/admin/penawaran' },
    { label: 'Total Penawaran', value: data.quotations.length, icon: FileText, to: '/admin/penawaran' },
    { label: 'Layanan Aktif', value: data.services.length, icon: Briefcase, to: '/admin/layanan' },
    { label: 'Portofolio', value: data.portfolio.length, icon: Images, to: '/admin/portofolio' },
    { label: 'Testimoni', value: data.testimonials.length, icon: MessageSquareQuote, to: '/admin/testimoni' },
  ];

  return (
    <div>
      <PageHeader title="Dashboard" description={`Ringkasan konten website ${data.companyInfo.name}.`} />

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
        {stats.map(({ label, value, icon: Icon, to }) => (
          <Link key={label} to={to}>
            <Card className="p-4 hover:border-amber-400 transition-colors">
              <Icon className="w-5 h-5 text-amber-600 mb-3" />
              <p className="font-heading font-extrabold text-2xl text-slate-900">{value}</p>
              <p className="text-xs text-slate-500">{label}</p>
            </Card>
          </Link>
        ))}
      </div>

      <Card>
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div>
            <h2 className="font-heading font-bold text-slate-900">Penawaran Terbaru</h2>
            <p className="text-xs text-slate-500">Estimasi nilai berjalan: {formatRupiah(pipelineValue)}</p>
          </div>
          <Link to="/admin/penawaran" className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 hover:text-amber-900">
            Lihat semua <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="divide-y divide-slate-100">
          {data.quotations.length === 0 && <p className="p-6 text-sm text-slate-500 text-center">Belum ada penawaran masuk.</p>}
          {data.quotations.slice(0, 5).map(q => (
            <div key={q.id} className="flex items-center gap-4 px-5 py-3 text-sm">
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-900 truncate">
                  {q.customerName}
                  {q.companyName && <span className="text-slate-500 font-normal"> · {q.companyName}</span>}
                </p>
                <p className="text-xs text-slate-500 truncate">
                  {q.ticketNumber} · {q.serviceName}
                </p>
              </div>
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${QUOTATION_STATUS_STYLES[q.status]}`}>
                {QUOTATION_STATUS_LABELS[q.status]}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
