// src/components/layout/AdminLayout.jsx
import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import {
  MdDashboard, MdLocalOffer, MdEmojiEvents, MdPeople,
  MdLogout, MdMenu, MdClose, MdHowToReg, MdCardMembership
} from 'react-icons/md';
import logoImg from '../../assets/WhatsApp Image 2026-06-06 at 8.00.22 PM.jpeg';
import toast from 'react-hot-toast';

const adminLinks = [
  { labelKey: 'admin_nav_dashboard', path: '/admin', icon: MdDashboard, exact: true },
  { labelKey: 'admin_nav_offers', path: '/admin/offers', icon: MdLocalOffer },
  { labelKey: 'admin_nav_competitions', path: '/admin/competitions', icon: MdEmojiEvents },
  { labelKey: 'admin_nav_memberships', path: '/admin/membership-registrations', icon: MdCardMembership },
  { labelKey: 'admin_nav_trials', path: '/admin/trial-registrations', icon: MdHowToReg },
  { labelKey: 'admin_nav_entries', path: '/admin/competition-entries', icon: MdPeople },
];

export default function AdminLayout() {
  const { logout } = useAuth();
  const { t, language, setLanguage, dir } = useLanguage();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    toast.success(language === 'ar' ? 'تم تسجيل الخروج بنجاح' : 'Logged out successfully');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-dark flex" dir={dir}>
      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 z-40 w-64 bg-dark-100 border-r border-dark-400 rtl:border-r-0 rtl:border-l
        flex flex-col transform transition-transform duration-300
        ${language === 'ar'
          ? (sidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0')
          : (sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0')
        }
        ${language === 'ar' ? 'right-0' : 'left-0'}
      `}>
        {/* Logo */}
        <div className="p-6 border-b border-dark-400">
          <div className="flex items-center gap-3">
            <img
              src={logoImg}
              alt="Costa Gym Logo"
              className="w-8 h-8 rounded-full border border-gold object-cover"
            />
            <div>
              <p className="font-heading text-white tracking-widest text-lg leading-none block uppercase">COSTA GYM</p>
              <p className="font-accent text-gold text-[10px] tracking-wider mt-1 uppercase">
                {t('admin_panel_subtitle')}
              </p>
            </div>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
          {adminLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.exact}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-sm text-sm font-medium
                 transition-all duration-200 uppercase tracking-wider
                 ${isActive
                   ? 'bg-gold text-black shadow-[0_0_10px_rgba(212,175,55,0.2)]'
                   : 'text-gray-400 hover:text-white hover:bg-dark-300'
                 }`
              }
              onClick={() => setSidebarOpen(false)}
            >
              <link.icon size={18} />
              {t(link.labelKey)}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-dark-400">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-400
                       hover:text-red-300 hover:bg-dark-300 rounded-sm transition-all uppercase tracking-wider cursor-pointer"
          >
            <MdLogout size={18} />
            {t('admin_logout')}
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 bg-dark-100 border-b border-dark-400 flex items-center justify-between px-6 gap-4">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden text-gray-400 hover:text-white cursor-pointer"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
            </button>
            <h1 className="font-heading text-white tracking-widest text-xl">
              {t('admin_title')}
            </h1>
          </div>

          {/* Language Switcher */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
            className="text-gold border border-gold/30 hover:border-gold px-3 py-1.5 text-xs font-accent tracking-wider hover:bg-gold hover:text-black transition-all duration-300 uppercase flex items-center gap-1 rounded-sm cursor-pointer"
          >
            {language === 'en' ? 'العربية' : 'English'}
          </button>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
