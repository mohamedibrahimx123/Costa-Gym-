// src/pages/OffersPage.jsx
import { motion } from 'framer-motion';
import OffersSection from '../components/sections/OffersSection';
import { useLanguage } from '../context/LanguageContext';

export default function OffersPage() {
  const { t, language } = useLanguage();

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="py-20 px-4 bg-dark-100 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'radial-gradient(circle, #D4AF37 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-gold-accent mb-4">{language === 'ar' ? 'لا تفوت الفرصة' : "Don't Miss Out"}</p>
            <h1 className="section-title mb-4">{language === 'ar' ? 'العروض والمسابقات' : 'OFFERS & COMPETITIONS'}</h1>
            <div className="flex items-center justify-center gap-3 my-4">
              <div className="h-px w-16 bg-gold" />
              <div className="w-2 h-2 bg-gold rotate-45" />
              <div className="h-px w-16 bg-gold" />
            </div>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              {language === 'ar'
                ? 'عروض حصرية ومسابقات مثيرة لأعضائنا. يتم تحديثها بانتظام.'
                : 'Exclusive deals and exciting competitions for our members. Updated regularly.'}
            </p>
          </motion.div>
        </div>
      </section>

      <OffersSection showAll />
    </div>
  );
}

