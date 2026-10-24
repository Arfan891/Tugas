import React, { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AlertCircle, ArrowLeft, KeyRound, Mail, Printer, ShieldCheck } from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { btnPrimary, inputClass } from '../components/admin/ui';

export const LoginPage: React.FC = () => {
  const { data, isAdmin, loginAdmin } = useCMS();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Kembali ke halaman admin yang tadi diminta, atau dashboard.
  const redirectTo = (location.state as { from?: string } | null)?.from || '/admin';

  if (isAdmin) return <Navigate to={redirectTo} replace />;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginAdmin(email, password)) {
      navigate(redirectTo, { replace: true });
    } else {
      setError('Email atau password salah.');
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-slate-50">
      {/* Panel branding */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-slate-950 text-white">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 via-amber-600 to-slate-900 flex items-center justify-center">
            <Printer className="w-6 h-6" />
          </div>
          <span className="font-heading font-extrabold text-lg">{data.companyInfo.name}</span>
        </div>
        <div>
          <h2 className="font-heading font-extrabold text-4xl leading-tight">
            Kelola konten website
            <br />
            <span className="text-amber-400">dari satu tempat.</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-md">
            Perbarui layanan, harga, portofolio, testimoni, dan tindak lanjuti permintaan penawaran pelanggan.
          </p>
        </div>
        <p className="text-xs text-slate-500">© {new Date().getFullYear()} {data.companyInfo.name}</p>
      </div>

      {/* Form login */}
      <div className="flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 mb-8">
            <ArrowLeft className="w-3.5 h-3.5" />
            Kembali ke website
          </Link>

          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mb-4">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="font-heading font-extrabold text-2xl text-slate-900">Masuk ke CMS Admin</h1>
          <p className="text-sm text-slate-500 mt-1 mb-6">Khusus pengelola website.</p>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              <span className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Email</span>
              <div className="relative">
                <input
                  type="email"
                  required
                  autoFocus
                  autoComplete="username"
                  placeholder="nama@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className={`${inputClass} pl-9`}
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </label>

            <label className="block">
              <span className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Password</span>
              <div className="relative">
                <input
                  type="password"
                  required
                  autoComplete="current-password"
                  placeholder="Masukkan password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className={`${inputClass} pl-9`}
                />
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </label>

            <button type="submit" id="btn-submit-admin-login" className={`${btnPrimary} w-full`}>
              Masuk
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
