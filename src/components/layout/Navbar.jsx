// src/components/layout/Navbar.jsx
import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import { useLanguage } from '../../context/LanguageContext';
import logoImg from '../../assets/WhatsApp Image 2026-06-06 at 8.00.22 PM.jpeg';

const navLinks = [
  { key: 'nav_home', path: '/' },
  { key: 'nav_membership', path: '/membership' },
  { key: 'nav_about', path: '/about' },
  { key: 'nav_offers', path: '/offers' },
  { key: 'nav_gallery', path: '/gallery' },
  { key: 'nav_success', path: '/success-stories' },
  { key: 'nav_contact', path: '/contact' },
];

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-dark/95 backdrop-blur-md shadow-lg shadow-black/50 border-b border-dark-400'
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src={logoImg}
            alt="Costa Gym Logo"
            className="w-11 h-11 rounded-full border border-gold object-cover shadow-[0_0_10px_rgba(212,175,55,0.2)]"
          />
          <div>
            <span className="font-heading text-xl md:text-2xl text-white tracking-widest leading-none block uppercase">
              {t('brand_name')}
            </span>
            <span className="font-accent text-gold text-[10px] tracking-[0.2em] uppercase block mt-0.5">
              {t('brand_subtitle')}
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `font-body font-medium text-sm uppercase tracking-widest transition-colors duration-200
                   relative group ${isActive ? 'text-gold' : 'text-gray-300 hover:text-white'}`
                }
              >
                {({ isActive }) => (
                  <>
                    {t(link.key)}
                    <span
                      className={`absolute -bottom-1 left-0 h-px bg-gold transition-all duration-300
                                 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}
                    />
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* CTA + Language Toggle + Mobile Toggle */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Language Switcher */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
            className="text-gold border border-gold/30 hover:border-gold px-3 py-1.5 text-xs font-accent tracking-wider hover:bg-gold hover:text-black transition-all duration-300 uppercase flex items-center gap-1 rounded-sm cursor-pointer"
          >
            {language === 'en' ? 'العربية' : 'English'}
          </button>

          <Link
            to="/membership"
            className="hidden md:block btn-gold py-2 px-6 text-sm"
          >
            {t('nav_join_now')}
          </Link>

          <button
            className="lg:hidden text-white p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="lg:hidden bg-dark-100/98 backdrop-blur-md border-t border-dark-400"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="flex flex-col py-6 px-8 gap-5">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `font-body uppercase tracking-widest text-sm ${
                        isActive ? 'text-gold' : 'text-gray-300'
                      }`
                    }
                    onClick={() => setMenuOpen(false)}
                  >
                    {t(link.key)}
                  </NavLink>
                </motion.li>
              ))}
              <li>
                <Link
                  to="/membership"
                  className="btn-gold py-2 px-6 text-sm inline-block mt-2"
                  onClick={() => setMenuOpen(false)}
                >
                  {t('nav_join_now')}
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

