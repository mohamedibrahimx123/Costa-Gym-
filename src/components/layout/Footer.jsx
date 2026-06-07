// src/components/layout/Footer.jsx
import { Link } from 'react-router-dom';
import { FaWhatsapp, FaInstagram, FaFacebook, FaYoutube, FaMapMarkerAlt, FaPhone, FaClock } from 'react-icons/fa';
import { useLanguage } from '../../context/LanguageContext';
import logoImg from '../../assets/WhatsApp Image 2026-06-06 at 8.00.22 PM.jpeg';

const quickLinks = [
  { key: 'nav_home', path: '/' },
  { key: 'nav_membership', path: '/membership' },
  { key: 'nav_about', path: '/about' },
  { key: 'nav_offers', path: '/offers' },
  { key: 'nav_gallery', path: '/gallery' },
  { key: 'nav_contact', path: '/contact' },
];

export default function Footer() {
  const { t } = useLanguage();
  const phone = import.meta.env.VITE_PHONE_NUMBER || '+20 123 456 7890';
  const address = import.meta.env.VITE_GYM_ADDRESS || '123 Fitness Street, Cairo, Egypt';
  const waNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '201234567890';

  return (
    <footer className="bg-dark-100 border-t border-dark-400">
      {/* Top Bar */}
      <div className="border-b border-dark-400 py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src={logoImg}
              alt="Costa Gym Logo"
              className="w-10 h-10 rounded-full border border-gold object-cover shadow-[0_0_10px_rgba(212,175,55,0.2)]"
            />
            <div>
              <span className="font-heading text-2xl text-white tracking-widest block uppercase">{t('brand_name')}</span>
              <span className="font-accent text-gold text-xs tracking-[0.3em] uppercase">{t('brand_subtitle')}</span>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            {[
              { icon: FaWhatsapp, href: `https://wa.me/${waNumber}`, color: 'hover:text-green-400' },
              { icon: FaInstagram, href: '#', color: 'hover:text-pink-400' },
              { icon: FaFacebook, href: '#', color: 'hover:text-blue-400' },
              { icon: FaYoutube, href: '#', color: 'hover:text-red-400' },
            ].map(({ icon: Icon, href, color }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-10 h-10 border border-dark-400 flex items-center justify-center
                            text-gray-500 ${color} transition-all duration-300
                            hover:border-current hover:bg-dark-300`}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* About */}
        <div>
          <h4 className="font-heading text-2xl text-gold tracking-wider mb-6">{t('nav_about')} {t('brand_name')}</h4>
          <p className="text-gray-400 text-sm leading-relaxed">
            {t('footer_desc')}
          </p>
          <div className="flex items-center gap-3 mt-6">
            <div className="h-px w-8 bg-gold" />
            <div className="w-1 h-1 bg-gold rotate-45" />
            <div className="h-px w-8 bg-gold" />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-heading text-2xl text-gold tracking-wider mb-6">{t('footer_quick_links')}</h4>
          <ul className="space-y-3">
            {quickLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className="text-gray-400 text-sm uppercase tracking-wider hover:text-gold
                             transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="w-4 h-px bg-dark-400 group-hover:bg-gold transition-colors duration-200" />
                  {t(link.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-heading text-2xl text-gold tracking-wider mb-6">{t('footer_contact')}</h4>
          <ul className="space-y-4">
            <li className="flex items-start gap-3 text-gray-400 text-sm">
              <FaMapMarkerAlt className="text-gold mt-0.5 shrink-0" />
              <span>{address}</span>
            </li>
            <li className="flex items-center gap-3 text-gray-400 text-sm">
              <FaPhone className="text-gold shrink-0" />
              <a href={`tel:${phone}`} className="hover:text-gold transition-colors">{phone}</a>
            </li>
            <li className="flex items-center gap-3 text-gray-400 text-sm">
              <FaWhatsapp className="text-gold shrink-0" />
              <a href={`https://wa.me/${waNumber}`} target="_blank" rel="noopener noreferrer"
                 className="hover:text-gold transition-colors">
                {t('hero_whatsapp')}
              </a>
            </li>
          </ul>
        </div>

        {/* Working Hours */}
        <div>
          <h4 className="font-heading text-2xl text-gold tracking-wider mb-6">{t('footer_hours')}</h4>
          <ul className="space-y-3">
            {[
              { day: 'Mon – Fri', hours: '6:00 AM – 11:00 PM' },
              { day: 'Saturday', hours: '7:00 AM – 10:00 PM' },
              { day: 'Sunday', hours: '8:00 AM – 8:00 PM' },
            ].map((item) => (
              <li key={item.day} className="flex items-center gap-3 text-sm">
                <FaClock className="text-gold shrink-0 text-xs" />
                <span className="text-gray-500">{item.day}:</span>
                <span className="text-gray-300">{item.hours}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 p-3 border border-gold/30 bg-gold/5">
            <p className="text-gold text-xs font-accent tracking-wider text-center">
              {t('footer_open_365')}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-dark-400 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-gray-600 text-xs tracking-wider uppercase">
            © {new Date().getFullYear()} {t('footer_copyright')}
          </p>
          <Link to="/admin/login" className="text-gray-700 text-xs hover:text-gray-500 transition-colors">
            {t('footer_admin')}
          </Link>
        </div>
      </div>
    </footer>
  );
}

