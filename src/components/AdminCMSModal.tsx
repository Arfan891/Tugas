import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { ShieldCheck, Mail, Lock, X, AlertCircle, KeyRound, Sparkles } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose }) => {
  const { loginAdmin, openAdminModal } = useCMS();
  const [email, setEmail] = useState('raudhatulihsan50@gmail.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(email, password);
    if (success) {
      setError('');
      setPassword('');
      onClose();
      openAdminModal();
    } else {
      setError('Email atau password salah. Gunakan akun terdaftar: raudhatulihsan50@gmail.com / @Agus123');
    }
  };

  const handleAutofill = () => {
    setEmail('raudhatulihsan50@gmail.com');
    setPassword('@Agus123');
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 text-left relative animate-in fade-in zoom-in-95 duration-150">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-lg"
          aria-label="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mb-4">
          <ShieldCheck className="w-6 h-6" />
        </div>

        <h3 className="font-heading font-extrabold text-xl text-slate-900">
          CMS Admin Portal
        </h3>
        <p className="text-xs text-slate-500 mt-1 mb-5">
          Masuk untuk mengelola seluruh konten, navigasi utama, harga, layanan, portofolio, dan permintaan penawaran.
        </p>

        {error && (
          <div className="mb-4 p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Email Admin
            </label>
            <div className="relative">
              <input
                type="email"
                required
                autoFocus
                placeholder="nama@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Password Pengelola
            </label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="Masukkan password admin..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-amber-50/90 border border-amber-200 text-[11px] text-amber-900 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold flex items-center gap-1 text-amber-950">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                Kredensial Akses Resmi:
              </span>
              <button
                type="button"
                onClick={handleAutofill}
                className="text-[10px] font-bold text-amber-800 underline hover:text-amber-950 cursor-pointer"
              >
                Isi Otomatis
              </button>
            </div>
            <p className="font-mono text-[10px] text-slate-700">
              Email: <strong>raudhatulihsan50@gmail.com</strong>
            </p>
            <p className="font-mono text-[10px] text-slate-700">
              Password: <strong>@Agus123</strong>
            </p>
          </div>

          <button
            type="submit"
            id="btn-submit-admin-login"
            className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 active:scale-95 text-white font-bold text-sm shadow-xs transition-all cursor-pointer"
          >
            Masuk ke Panel Pengelola (CMS)
          </button>
        </form>

      </div>
    </div>
  );
};
