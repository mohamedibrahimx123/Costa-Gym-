// src/pages/MembershipPage.jsx
import { motion } from 'framer-motion';
import MembershipPlans from '../components/sections/MembershipPlans';
import SectionTitle from '../components/common/SectionTitle';
import { useLanguage } from '../context/LanguageContext';

export default function MembershipPage() {
  const { t } = useLanguage();

  const includeItems = [
    'mem_inc_1',
    'mem_inc_2',
    'mem_inc_3',
    'mem_inc_4',
    'mem_inc_5',
    'mem_inc_6',
    'mem_inc_7',
    'mem_inc_8',
  ];

  return (
    <div className="pt-20">
      {/* Page Header */}
      <section className="py-20 px-4 relative overflow-hidden bg-dark-100"
        style={{
          background: 'linear-gradient(135deg, #0A0A0A 0%, #111111 50%, #0A0A0A 100%)',
        }}
      >
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'radial-gradient(circle, #D4AF37 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-gold-accent mb-4">{t('mem_accent')}</p>
            <h1 className="section-title mb-6">{t('mem_title')}</h1>
            <div className="flex items-center justify-center gap-3 my-4">
              <div className="h-px w-16 bg-gold" />
              <div className="w-2 h-2 bg-gold rotate-45" />
              <div className="h-px w-16 bg-gold" />
            </div>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              {t('mem_subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Plans */}
      <section className="section-padding bg-dark">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-0">
          <MembershipPlans />
        </div>
      </section>

      {/* Comparison Note */}
      <section className="py-12 px-4 bg-dark-100">
        <div className="max-w-4xl mx-auto">
          <div className="card-dark p-8 border-l-4 border-l-gold rtl:border-l-0 rtl:border-r-4 rtl:border-r-gold">
            <h3 className="font-heading text-2xl text-gold mb-4">{t('mem_include_title')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-400">
              {includeItems.map((itemKey, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-gold rotate-45 shrink-0" />
                  {t(itemKey)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

