// src/components/sections/HeroSection.jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaPlay } from 'react-icons/fa';
import { useLanguage } from '../../context/LanguageContext';

export default function HeroSection() {
  const { t, language } = useLanguage();
  const waNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '201234567890';
  const textMsg = language === 'ar'
    ? 'مرحباً! أنا مهتم بالاشتراك في جيم كوستا.'
    : "Hello! I'm interested in joining Costa Gym.";
  const message = encodeURIComponent(textMsg);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background - dark gradient with gym atmosphere */}
      <div className="absolute inset-0 z-0">
        {/* Main background using CSS gradient to simulate gym dark atmosphere */}
        <div className="w-full h-full" style={{
          background: `
            radial-gradient(ellipse at 60% 40%, rgba(212,175,55,0.12) 0%, transparent 55%),
            radial-gradient(ellipse at 10% 80%, rgba(212,175,55,0.06) 0%, transparent 40%),
            linear-gradient(180deg, #050505 0%, #0D0D0D 40%, #111111 70%, #0A0A0A 100%)
          `
        }} />

        {/* Decorative grid lines */}
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(212,175,55,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(212,175,55,0.5) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />

        {/* Diagonal gold streak */}
        <div className="absolute inset-0 opacity-10"
          style={{
            background: 'linear-gradient(135deg, transparent 30%, rgba(212,175,55,0.3) 50%, transparent 70%)',
          }}
        />
      </div>

      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-0.5 h-8 bg-gold/30 particle"
          style={{
            left: `${10 + i * 12}%`,
            top: `${15 + (i % 3) * 25}%`,
            '--duration': `${3 + i * 0.5}s`,
            '--delay': `${i * 0.3}s`,
          }}
          animate={{ y: [0, -30, 0], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 3 + i * 0.5, delay: i * 0.3, repeat: Infinity }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 pt-32 pb-20">
        <div className="max-w-4xl">
          {/* Pre-heading */}
          <motion.div
            className="flex items-center gap-4 mb-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="w-12 h-px bg-gold" />
            <span className="font-accent text-gold text-sm tracking-[0.5em] uppercase">
              {t('hero_premier')}
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            className="font-heading uppercase leading-[0.9] mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {language === 'ar' ? (
              <span className="block text-white text-5xl md:text-7xl lg:text-[7.5rem] tracking-tight">
                ابنِ <span className="text-gold-shimmer">قوتك</span> وإرثك هنا
              </span>
            ) : (
              <>
                <span className="block text-white text-6xl md:text-8xl lg:text-[9rem] tracking-tight">
                  FORGE YOUR
                </span>
                <span
                  className="block text-6xl md:text-8xl lg:text-[9rem] tracking-tight text-gold-shimmer"
                >
                  LEGACY
                </span>
                <span className="block text-white text-6xl md:text-8xl lg:text-[9rem] tracking-tight">
                  HERE.
                </span>
              </>
            )}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-2xl mb-12 font-body"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {t('hero_subtitle')}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap gap-4 items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <Link to="/membership" className="btn-gold animate-pulse-gold">
              {t('hero_join_now')}
            </Link>
            <a
              href={`https://wa.me/${waNumber}?text=${message}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 btn-outline"
            >
              <FaWhatsapp size={20} />
              {t('hero_whatsapp')}
            </a>
            <Link
              to="/offers"
              className="flex items-center gap-2 text-gray-400 hover:text-gold transition-colors duration-300 group"
            >
              <div className="w-10 h-10 border border-gray-600 group-hover:border-gold rounded-full
                             flex items-center justify-center transition-colors duration-300">
                <FaPlay size={12} className="ml-0.5 rtl:rotate-180" />
              </div>
              <span className="font-body text-sm uppercase tracking-wider">{t('hero_view_offers')}</span>
            </Link>
          </motion.div>
        </div>

        {/* Stats Row */}
        <motion.div
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-dark-400 pt-12"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          {[
            { number: '5000+', labelKey: 'stat_active_members' },
            { number: '50+', labelKey: 'stat_expert_trainers' },
            { number: '200+', labelKey: 'stat_equipment_pieces' },
            { number: '10+', labelKey: 'stat_years_excellence' },
          ].map((stat, i) => (
            <div key={i} className="text-center group">
              <p className="font-heading text-4xl md:text-5xl text-gold tracking-wider group-hover:text-gold-light transition-colors">
                {stat.number}
              </p>
              <p className="text-gray-500 text-xs uppercase tracking-widest mt-1 font-body">
                {t(stat.labelKey)}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark to-transparent z-10" />

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <span className="text-gray-600 text-xs uppercase tracking-[0.3em]">{language === 'ar' ? 'اسحب للأسفل' : 'Scroll'}</span>
        <div className="w-px h-10 bg-gradient-to-b from-gold to-transparent" />
      </motion.div>
    </section>
  );
}

