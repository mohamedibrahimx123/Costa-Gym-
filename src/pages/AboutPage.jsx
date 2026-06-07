// src/pages/AboutPage.jsx
import { motion } from 'framer-motion';
import SectionTitle from '../components/common/SectionTitle';
import { FaDumbbell, FaShower, FaParking, FaWifi, FaHeartbeat } from 'react-icons/fa';
import { MdSportsGymnastics, MdPool, MdFitnessCenter } from 'react-icons/md';
import { useLanguage } from '../context/LanguageContext';

const trainers = [
  { nameKey: 'ab_trainer_mustafa', specialtyKey: 'ab_trainer_mustafa_spec', exp: '10+', initials: 'MK' },
  { nameKey: 'ab_trainer_rana', specialtyKey: 'ab_trainer_rana_spec', exp: '8', initials: 'RA' },
  { nameKey: 'ab_trainer_tarek', specialtyKey: 'ab_trainer_tarek_spec', exp: '12', initials: 'TM' },
  { nameKey: 'ab_trainer_nadia', specialtyKey: 'ab_trainer_nadia_spec', exp: '6', initials: 'NS' },
];

const facilities = [
  { icon: FaDumbbell, nameKey: 'ab_facility_weights', descKey: 'ab_facility_weights_desc' },
  { icon: MdFitnessCenter, nameKey: 'ab_facility_cardio', descKey: 'ab_facility_cardio_desc' },
  { icon: MdSportsGymnastics, nameKey: 'ab_facility_classes', descKey: 'ab_facility_classes_desc' },
  { icon: FaHeartbeat, nameKey: 'ab_facility_func', descKey: 'ab_facility_func_desc' },
  { icon: FaShower, nameKey: 'ab_facility_lockers', descKey: 'ab_facility_lockers_desc' },
  { icon: FaParking, nameKey: 'ab_facility_parking', descKey: 'ab_facility_parking_desc' },
  { icon: FaWifi, nameKey: 'ab_facility_wifi', descKey: 'ab_facility_wifi_desc' },
  { icon: MdPool, nameKey: 'ab_facility_recovery', descKey: 'ab_facility_recovery_desc' },
];

export default function AboutPage() {
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
            <p className="text-gold-accent mb-4">{t('ab_accent')}</p>
            <h1 className="section-title mb-6">{t('ab_title')}</h1>
            <div className="flex items-center justify-center gap-3 my-4">
              <div className="h-px w-16 bg-gold" />
              <div className="w-2 h-2 bg-gold rotate-45" />
              <div className="h-px w-16 bg-gold" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-dark">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-gold-accent mb-3">{t('ab_est')}</p>
              <h2 className="section-title mb-6">{t('ab_story_title')}</h2>
              <div className="space-y-4 text-gray-400 leading-relaxed">
                <p>{t('ab_story_p1')}</p>
                <p>{t('ab_story_p2')}</p>
                <p>{t('ab_story_p3')}</p>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              {[
                { num: '10+', label: t('ab_years_operating') },
                { num: '5000+', label: t('ab_active_members') },
                { num: '50+', label: t('ab_certified_trainers') },
                { num: '200+', label: t('ab_equipment_pieces') },
                { num: '3000', label: t('ab_sqm_facility') },
                { num: '30+', label: t('ab_weekly_classes') },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  className="card-dark p-6 text-center group hover:border-gold/50 transition-all"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <p className="font-heading text-4xl text-gold group-hover:text-gold-light transition-colors">
                    {s.num}
                  </p>
                  <p className="text-gray-500 text-xs uppercase tracking-wider mt-1">{s.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="section-padding bg-dark-100 noise-overlay">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-0">
          <SectionTitle accent={t('ab_facilities_accent')} title={t('ab_facilities_title')} subtitle={t('ab_facilities_subtitle')} />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {facilities.map((f, i) => (
              <motion.div
                key={i}
                className="card-dark p-6 group hover:border-gold/50 hover:shadow-[0_0_20px_rgba(212,175,55,0.08)] transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
              >
                <div className="w-12 h-12 border border-gold/30 bg-gold/5 flex items-center justify-center mb-4 group-hover:bg-gold group-hover:border-gold transition-all duration-300">
                  <f.icon size={20} className="text-gold group-hover:text-black transition-colors duration-300" />
                </div>
                <h4 className="font-heading text-lg text-white tracking-wider mb-2 group-hover:text-gold transition-colors">
                  {t(f.nameKey)}
                </h4>
                <p className="text-gray-500 text-xs leading-relaxed">{t(f.descKey)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trainers */}
      <section className="section-padding bg-dark">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-0">
          <SectionTitle accent={t('ab_team_accent')} title={t('ab_trainers_title')} subtitle={t('ab_trainers_subtitle')} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trainers.map((tItem, i) => (
              <motion.div
                key={i}
                className="group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                {/* Avatar */}
                <div className="relative mb-4 overflow-hidden">
                  <div className="w-full aspect-square bg-dark-200 border border-dark-400 group-hover:border-gold/50 transition-all duration-300 flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, #1A1A1A 0%, #111111 100%)',
                    }}
                  >
                    <span className="font-heading text-6xl text-gold/30 group-hover:text-gold/60 transition-colors duration-300">
                      {tItem.initials}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gold-gradient scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </div>
                <h4 className="font-heading text-xl text-white tracking-wider">{t(tItem.nameKey)}</h4>
                <p className="text-gold text-xs mb-1">{t(tItem.specialtyKey)}</p>
                <p className="text-gray-600 text-xs">{tItem.exp} {t('ab_experience')}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

