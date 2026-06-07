// src/pages/HomePage.jsx
import { useState, useEffect } from 'react';
import LogoIntro from '../components/common/LogoIntro';
import HeroSection from '../components/sections/HeroSection';
import MembershipPlans from '../components/sections/MembershipPlans';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SectionTitle from '../components/common/SectionTitle';
import { FaDumbbell, FaRunning, FaUsers, FaMedal, FaArrowRight } from 'react-icons/fa';
import { MdStar } from 'react-icons/md';
import { useLanguage } from '../context/LanguageContext';

// ─── Why Choose Us ────────────────────────────────────────────────────────────
const features = [
  {
    icon: FaDumbbell,
    titleKey: 'feature_equip_title',
    descKey: 'feature_equip_desc',
  },
  {
    icon: FaUsers,
    titleKey: 'feature_trainers_title',
    descKey: 'feature_trainers_desc',
  },
  {
    icon: FaRunning,
    titleKey: 'feature_programs_title',
    descKey: 'feature_programs_desc',
  },
  {
    icon: FaMedal,
    titleKey: 'feature_results_title',
    descKey: 'feature_results_desc',
  },
];

// ─── Testimonials ─────────────────────────────────────────────────────────────
const testimonials = [
  {
    nameKey: 'test_name_ahmed',
    roleKey: 'test_role_ahmed',
    textKey: 'test_text_ahmed',
    rating: 5,
  },
  {
    nameKey: 'test_name_sara',
    roleKey: 'test_role_sara',
    textKey: 'test_text_sara',
    rating: 5,
  },
  {
    nameKey: 'test_name_khaled',
    roleKey: 'test_role_khaled',
    textKey: 'test_text_khaled',
    rating: 5,
  },
];

export default function HomePage() {
  const { t } = useLanguage();
  const [introComplete, setIntroComplete] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    // Only show intro once per session
    const seen = sessionStorage.getItem('introSeen');
    if (seen) {
      setShowIntro(false);
      setIntroComplete(true);
    }
  }, []);

  const handleIntroComplete = () => {
    sessionStorage.setItem('introSeen', 'true');
    setIntroComplete(true);
  };

  return (
    <>
      {/* Logo Intro */}
      {showIntro && !introComplete && (
        <LogoIntro onComplete={handleIntroComplete} />
      )}

      {/* Page Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: introComplete || !showIntro ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Hero */}
        <HeroSection />

        {/* Why Choose Us */}
        <section className="section-padding bg-dark-100 noise-overlay">
          <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-0">
            <SectionTitle
              accent={t('why_accent')}
              title={t('why_title')}
              subtitle={t('why_subtitle')}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  className="group p-8 border border-dark-400 hover:border-gold/50
                             bg-dark-200 transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.08)]"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="w-14 h-14 border border-gold/30 bg-gold/5 flex items-center justify-center mb-6
                                 group-hover:bg-gold group-hover:border-gold transition-all duration-300">
                    <f.icon size={22} className="text-gold group-hover:text-black transition-colors duration-300" />
                  </div>
                  <h3 className="font-heading text-xl text-white tracking-wider mb-3 group-hover:text-gold transition-colors">
                    {t(f.titleKey)}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{t(f.descKey)}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Membership Preview */}
        <section className="section-padding bg-dark">
          <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-0">
            <SectionTitle
              accent={t('plans_accent')}
              title={t('plans_title')}
              subtitle={t('plans_subtitle')}
            />
            <MembershipPlans compact />
            <div className="text-center mt-10">
              <Link to="/membership" className="btn-outline inline-flex items-center gap-2">
                {t('plans_view_all')} <FaArrowRight size={14} className="rtl:rotate-180" />
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="section-padding bg-dark">
          <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-0">
            <SectionTitle
              accent={t('test_accent')}
              title={t('test_title')}
              subtitle={t('test_subtitle')}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((tItem, i) => (
                <motion.div
                  key={i}
                  className="card-dark p-8 relative overflow-hidden group
                             hover:border-gold/30 transition-all duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                >
                  {/* Quote mark */}
                  <div className="absolute top-4 right-6 font-heading text-[6rem] text-gold/5 leading-none select-none">
                    "
                  </div>
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(tItem.rating)].map((_, j) => (
                      <MdStar key={j} className="text-gold" size={16} />
                    ))}
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed mb-6 italic">
                    "{t(tItem.textKey)}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gold/20 border border-gold/40 flex items-center justify-center">
                      <span className="font-heading text-gold">{t(tItem.nameKey)[0]}</span>
                    </div>
                    <div>
                      <p className="font-medium text-white text-sm">{t(tItem.nameKey)}</p>
                      <p className="text-gold text-xs">{t(tItem.roleKey)}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link to="/success-stories" className="btn-outline inline-flex items-center gap-2">
                {t('test_more')} <FaArrowRight size={14} className="rtl:rotate-180" />
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section
          className="py-24 px-4 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #0D0D0D 0%, #1A1600 50%, #0D0D0D 100%)',
          }}
        >
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'repeating-linear-gradient(45deg, #D4AF37 0px, #D4AF37 1px, transparent 1px, transparent 30px)',
            }}
          />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-gold-accent mb-4">{t('cta_ready')}</p>
              <h2 className="section-title mb-6">
                {t('cta_start')}
              </h2>
              <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
                {t('cta_subtitle')}
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/membership" className="btn-gold">
                  {t('cta_join')}
                </Link>
                <Link to="/contact" className="btn-outline">
                  {t('cta_contact')}
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </motion.div>
    </>
  );
}

