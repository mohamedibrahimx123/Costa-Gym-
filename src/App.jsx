// src/App.jsx
// Root component with routing and providers

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';

// Layout
import MainLayout from './components/layout/MainLayout';
import AdminLayout from './components/layout/AdminLayout';

// Public Pages
import HomePage from './pages/HomePage';
import MembershipPage from './pages/MembershipPage';
import AboutPage from './pages/AboutPage';
import SuccessStoriesPage from './pages/SuccessStoriesPage';
import GalleryPage from './pages/GalleryPage';
import OffersPage from './pages/OffersPage';
import ContactPage from './pages/ContactPage';

// Admin Pages
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminOffers from './pages/admin/AdminOffers';
import AdminCompetitions from './pages/admin/AdminCompetitions';
import AdminTrialRegistrations from './pages/admin/AdminTrialRegistrations';
import AdminCompetitionEntries from './pages/admin/AdminCompetitionEntries';
import AdminMembershipRegistrations from './pages/admin/AdminMembershipRegistrations';

// Auth Guard
import ProtectedRoute from './components/common/ProtectedRoute';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: '#1A1A1A',
              color: '#fff',
              border: '1px solid #D4AF37',
            },
            success: { iconTheme: { primary: '#D4AF37', secondary: '#000' } },
          }}
        />
        <Routes>
          {/* Public Routes */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/membership" element={<MembershipPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/success-stories" element={<SuccessStoriesPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/offers" element={<OffersPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Route>

          {/* Admin Auth */}
          <Route path="/admin/login" element={<AdminLoginPage />} />

          {/* Protected Admin Routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/offers" element={<AdminOffers />} />
              <Route path="/admin/competitions" element={<AdminCompetitions />} />
              <Route path="/admin/membership-registrations" element={<AdminMembershipRegistrations />} />
              <Route path="/admin/trial-registrations" element={<AdminTrialRegistrations />} />
              <Route path="/admin/competition-entries" element={<AdminCompetitionEntries />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
