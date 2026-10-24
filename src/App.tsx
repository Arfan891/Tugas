import React from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { CMSProvider, useCMS } from './context/CMSContext';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { AdminLayout } from './pages/admin/AdminLayout';
import { DashboardPage } from './pages/admin/DashboardPage';
import { QuotationsPage } from './pages/admin/QuotationsPage';
import { ServicesPage } from './pages/admin/ServicesPage';
import { PortfolioPage } from './pages/admin/PortfolioPage';
import { TestimonialsPage } from './pages/admin/TestimonialsPage';
import { CompanyPage } from './pages/admin/CompanyPage';
import { BackupPage } from './pages/admin/BackupPage';

// Halaman /admin/* hanya bisa diakses setelah login.
const RequireAdmin: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAdmin } = useCMS();
  const location = useLocation();
  if (!isAdmin) return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  return <>{children}</>;
};

export default function App() {
  return (
    <CMSProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin/login" element={<LoginPage />} />
          <Route
            path="/admin"
            element={
              <RequireAdmin>
                <AdminLayout />
              </RequireAdmin>
            }
          >
            <Route index element={<DashboardPage />} />
            <Route path="penawaran" element={<QuotationsPage />} />
            <Route path="layanan" element={<ServicesPage />} />
            <Route path="portofolio" element={<PortfolioPage />} />
            <Route path="testimoni" element={<TestimonialsPage />} />
            <Route path="perusahaan" element={<CompanyPage />} />
            <Route path="backup" element={<BackupPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </CMSProvider>
  );
}
