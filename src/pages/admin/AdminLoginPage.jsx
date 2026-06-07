// src/pages/admin/AdminLoginPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import toast from 'react-hot-toast';
import { MdLock, MdEmail } from 'react-icons/md';
import logoImg from '../../assets/WhatsApp Image 2026-06-06 at 8.00.22 PM.jpeg';

export default function AdminLoginPage() {
  const { t, language, dir } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error(language === 'ar' ? 'يرجى إدخال البريد الإلكتروني وكلمة المرور' : 'Please enter email and password');
      return;
    }
    setLoading(true);
    try {
      await login(email, password);
      toast.success(language === 'ar' ? 'أهلاً بك مجدداً، أيها المشرف!' : 'Welcome back, Admin!');
      navigate('/admin');
    } catch (err) {
      toast.error(language === 'ar' ? 'البيانات غير صحيحة. يرجى المحاولة مرة أخرى.' : 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center px-4"
      dir={dir}
      style={{
        background: `
          radial-gradient(ellipse at 50% 30%, rgba(212,175,55,0.08) 0%, transparent 60%),
          linear-gradient(180deg, #050505 0%, #0A0A0A 100%)
        `
      }}
    >
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Logo */}
        <div className="text-center mb-10">
          <img
            src={logoImg}
            alt="Costa Gym Logo"
            className="w-16 h-16 rounded-full border-2 border-gold mx-auto mb-4 object-cover shadow-[0_0_15px_rgba(212,175,55,0.3)]"
          />
          <h1 className="font-heading text-3xl text-white tracking-widest uppercase">COSTA GYM</h1>
          <p className="font-accent text-gold text-xs tracking-[0.5em] mt-1 uppercase">
            {t('admin_panel_subtitle')}
          </p>
        </div>

        {/* Form */}
        <div className="card-dark p-8">
          <h2 className="font-heading text-2xl text-white tracking-wider mb-6">
            {t('admin_login_title')}
          </h2>
          <div className="h-px bg-dark-400 mb-6" />

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">
                {t('admin_login_email')}
              </label>
              <div className="relative">
                <MdEmail className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@costagym.com"
                  className="input-dark pl-10 rtl:pl-4 rtl:pr-10"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">
                {t('admin_login_password')}
              </label>
              <div className="relative">
                <MdLock className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-dark pl-10 rtl:pl-4 rtl:pr-10"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-gold w-full py-3 mt-2 cursor-pointer"
            >
              {loading ? t('admin_login_signing_in') : t('admin_login_button')}
            </button>
          </form>
        </div>

        <p className="text-center text-gray-700 text-xs mt-6">
          {t('admin_login_unauthorized')}
        </p>
      </motion.div>
    </div>
  );
}
