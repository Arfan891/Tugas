import React, { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  Briefcase,
  Building2,
  DatabaseBackup,
  ExternalLink,
  FileText,
  Images,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquareQuote,
  Printer,
  X,
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

const NAV_ITEMS = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/penawaran', label: 'Permintaan Penawaran', icon: FileText },
  { to: '/admin/layanan', label: 'Layanan & Produk', icon: Briefcase },
  { to: '/admin/portofolio', label: 'Portofolio', icon: Images },
  { to: '/admin/testimoni', label: 'Testimoni', icon: MessageSquareQuote },
  { to: '/admin/perusahaan', label: 'Profil Perusahaan', icon: Building2 },
  { to: '/admin/backup', label: 'Backup & Reset', icon: DatabaseBackup },
];

export const AdminLayout: React.FC = () => {
  const { data, logoutAdmin } = useCMS();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pendingCount = data.quotations.filter(q => q.status === 'pending').length;

  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin/login', { replace: true });
  };

  const sidebar = (
    <nav className="flex flex-col h-full">
      <Link to="/admin" className="flex items-center gap-3 px-5 h-16 border-b border-slate-800">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 via-amber-600 to-slate-900 flex items-center justify-center text-white">
          <Printer className="w-5 h-5" />
        </div>
        <div className="leading-tight">
          <span className="block font-heading font-extrabold text-sm text-white">CMS Admin</span>
          <span className="block text-[10px] text-slate-400 truncate max-w-[150px]">{data.companyInfo.name}</span>
        </div>
      </Link>

      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                isActive ? 'bg-amber-400 text-slate-950' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            <Icon className="w-4 h-4" />
            <span className="flex-1">{label}</span>
            {to === '/admin/penawaran' && pendingCount > 0 && (
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-rose-500 text-white">{pendingCount}</span>
            )}
          </NavLink>
        ))}
      </div>

      <div className="p-3 border-t border-slate-800 space-y-1">
        <Link
          to="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-300 hover:bg-slate-800 hover:text-white"
        >
          <ExternalLink className="w-4 h-4" />
          Lihat Website
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-rose-300 hover:bg-rose-950/60 cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          Keluar
        </button>
      </div>
    </nav>
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Sidebar desktop */}
      <aside className="hidden lg:block fixed inset-y-0 left-0 w-64 bg-slate-950">{sidebar}</aside>

      {/* Sidebar mobile */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-slate-950/60" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-64 bg-slate-950">{sidebar}</aside>
        </div>
      )}

      <div className="lg:pl-64">
        <header className="lg:hidden sticky top-0 z-30 flex items-center justify-between h-14 px-4 bg-white border-b border-slate-200">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 -ml-2 text-slate-600" aria-label="Menu">
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <span className="font-heading font-bold text-sm">CMS Admin</span>
          <span className="w-9" />
        </header>

        <main className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
