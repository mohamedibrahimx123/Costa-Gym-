// src/components/sections/MembershipPlans.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../common/SectionTitle';
import { MdCheck } from 'react-icons/md';
import { useLanguage } from '../../context/LanguageContext';
import MembershipRegistrationModal from './MembershipRegistrationModal';

export default function MembershipPlans({ compact = false }) {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState('short'); // 'short', 'mid', 'long'
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    {
      id: '1month',
      name: language === 'ar' ? 'شهر واحد' : '1 Month',
      price: '400',
      period: language === 'ar' ? 'شهر' : 'month',
      description: language === 'ar' ? 'مثالي لتجربة الجيم والبدء' : 'Perfect for trying out the gym',
      features: ['feat_gym_access', 'feat_locker_shower', 'feat_basic_assessment', 'feat_app_access'],
      cta: 'plans_get_started',
      highlight: false,
      tier: 'short',
    },
    {
      id: '2months',
      name: language === 'ar' ? 'شهرين' : '2 Months',
      price: '700',
      period: language === 'ar' ? 'شهرين' : '2 months',
      description: language === 'ar' ? 'مثالي للالتزام قصير المدى' : 'Perfect for short-term dedication',
      features: ['feat_gym_access', 'feat_locker_shower', 'feat_basic_assessment', 'feat_app_access'],
      cta: 'plans_get_started',
      highlight: false,
      tier: 'short',
    },
    {
      id: '3months',
      name: language === 'ar' ? '٣ أشهر' : '3 Months',
      price: '900',
      period: language === 'ar' ? '٣ أشهر' : '3 months',
      badge: 'plans_popular',
      description: language === 'ar' ? 'الباقة الأكثر شعبية للمبتدئين' : 'Our most popular entry package',
      features: ['feat_gym_access', 'feat_locker_shower', 'feat_full_assessment', 'feat_classes_unlimited', 'feat_pt_1', 'feat_nutrition_consult'],
      cta: 'plans_most_popular',
      highlight: true,
      tier: 'short',
    },
    {
      id: '4months',
      name: language === 'ar' ? '٤ أشهر' : '4 Months',
      price: '1150',
      period: language === 'ar' ? '٤ أشهر' : '4 months',
      description: language === 'ar' ? 'ممتاز لبناء عادات رياضية مستمرة' : 'Great for establishing solid routines',
      features: ['feat_gym_access', 'feat_locker_shower', 'feat_full_assessment', 'feat_classes_unlimited', 'feat_pt_1', 'feat_nutrition_consult'],
      cta: 'plans_commit',
      highlight: false,
      tier: 'mid',
    },
    {
      id: '5months',
      name: language === 'ar' ? '٥ أشهر' : '5 Months',
      price: '1400',
      period: language === 'ar' ? '٥ أشهر' : '5 months',
      description: language === 'ar' ? 'حافظ على زخمك الرياضي المستمر' : 'Keep up the momentum',
      features: ['feat_gym_access', 'feat_locker_shower', 'feat_full_assessment', 'feat_classes_unlimited', 'feat_pt_1', 'feat_nutrition_consult'],
      cta: 'plans_commit',
      highlight: false,
      tier: 'mid',
    },
    {
      id: '6months',
      name: language === 'ar' ? '٦ أشهر' : '6 Months',
      price: '1650',
      period: language === 'ar' ? '٦ أشهر' : '6 months',
      badge: 'plans_best_value',
      description: language === 'ar' ? 'التزام جاد بالتحول الجسدي الكامل' : 'Commit to serious transformation',
      features: ['feat_gym_access', 'feat_locker_shower', 'feat_full_assessment', 'feat_classes_unlimited', 'feat_pt_2', 'feat_nutrition_plan', 'feat_guest_2'],
      cta: 'plans_most_popular',
      highlight: true,
      tier: 'mid',
    },
    {
      id: '7months',
      name: language === 'ar' ? '٧ أشهر' : '7 Months',
      price: '1850',
      period: language === 'ar' ? '٧ أشهر' : '7 months',
      description: language === 'ar' ? 'تدريب متناسق للحصول على نتائج حقيقية' : 'Consistent training for real results',
      features: ['feat_gym_access', 'feat_locker_shower', 'feat_full_assessment', 'feat_classes_unlimited', 'feat_pt_2', 'feat_nutrition_plan', 'feat_guest_2'],
      cta: 'plans_commit',
      highlight: false,
      tier: 'mid',
    },
    {
      id: '8months',
      name: language === 'ar' ? '٨ أشهر' : '8 Months',
      price: '2000',
      period: language === 'ar' ? '٨ أشهر' : '8 months',
      description: language === 'ar' ? 'انتقل بلياقتك البدنية إلى المستوى التالي' : 'Take your fitness to the next level',
      features: ['feat_gym_access', 'feat_locker_shower', 'feat_full_assessment', 'feat_classes_unlimited', 'feat_pt_2', 'feat_nutrition_plan', 'feat_guest_2'],
      cta: 'plans_commit',
      highlight: false,
      tier: 'mid',
    },
    {
      id: '9months',
      name: language === 'ar' ? '٩ أشهر' : '9 Months',
      price: '2150',
      period: language === 'ar' ? '٩ أشهر' : '9 months',
      description: language === 'ar' ? 'تسعة أشهر من التفاني والقوة البدنية' : 'Nine months of dedication and strength',
      features: ['feat_gym_access', 'feat_locker_shower', 'feat_full_assessment', 'feat_classes_unlimited', 'feat_pt_2', 'feat_nutrition_plan', 'feat_guest_2'],
      cta: 'plans_commit',
      highlight: false,
      tier: 'long',
    },
    {
      id: '10months',
      name: language === 'ar' ? '١٠ أشهر' : '10 Months',
      price: '2300',
      period: language === 'ar' ? '١٠ أشهر' : '10 months',
      description: language === 'ar' ? 'عشرة أشهر للوصول للقوة المطلقة والرشاقة' : 'Ten months to absolute power',
      features: ['feat_gym_access', 'feat_locker_shower', 'feat_full_assessment', 'feat_classes_unlimited', 'feat_pt_2', 'feat_nutrition_plan', 'feat_guest_2'],
      cta: 'plans_commit',
      highlight: false,
      tier: 'long',
    },
    {
      id: '11months',
      name: language === 'ar' ? '١١ شهراً' : '11 Months',
      price: '2400',
      period: language === 'ar' ? '١١ شهراً' : '11 months',
      description: language === 'ar' ? 'اقتربت من خط النهاية، حافظ على انضباطك' : 'Nearly there, stay disciplined',
      features: ['feat_gym_access', 'feat_locker_shower', 'feat_full_assessment', 'feat_classes_unlimited', 'feat_pt_2', 'feat_nutrition_plan', 'feat_guest_2'],
      cta: 'plans_commit',
      highlight: false,
      tier: 'long',
    },
    {
      id: '12months',
      name: language === 'ar' ? 'عام كامل' : '1 Year',
      price: '2500',
      period: language === 'ar' ? 'سنة' : 'year',
      badge: 'plans_best_value',
      description: language === 'ar' ? 'أقصى توفير وأكبر نتائج تحول جسدي ممكنة' : 'Maximum savings, maximum results',
      features: ['feat_gym_access', 'feat_locker_shower', 'feat_quarterly_assessment', 'feat_classes_unlimited', 'feat_pt_4', 'feat_nutrition_custom', 'feat_guest_unlimited', 'feat_assigned_locker', 'feat_merchandise'],
      cta: 'plans_annual',
      highlight: true,
      tier: 'long',
    },
  ];

  // If compact, only show 1 Month, 3 Months, 6 Months, and 12 Months
  const displayedPlans = compact
    ? plans.filter((p) => ['1month', '3months', '6months', '12months'].includes(p.id))
    : plans.filter((p) => p.tier === activeTab);

  return (
    <section className={compact ? 'py-12' : 'section-padding bg-dark'}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-0">
        {!compact && (
          <SectionTitle
            accent={t('mem_accent')}
            title={t('mem_title')}
            subtitle={t('mem_subtitle')}
          />
        )}

        {/* Tab switcher on non-compact layout */}
        {!compact && (
          <div className="flex justify-center gap-2 md:gap-4 mb-12">
            {[
              { id: 'short', label: language === 'ar' ? '١ - ٣ أشهر' : '1 - 3 Months' },
              { id: 'mid', label: language === 'ar' ? '٤ - ٨ أشهر' : '4 - 8 Months' },
              { id: 'long', label: language === 'ar' ? '٩ - ١٢ شهراً' : '9 - 12 Months' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 text-xs font-accent uppercase tracking-widest border transition-all duration-300 cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-gold text-black border-gold shadow-[0_0_15px_rgba(212,175,55,0.25)]'
                    : 'bg-dark-200 text-gray-400 border-dark-400 hover:border-gold/50 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">
          {displayedPlans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative flex flex-col ${
                plan.highlight
                  ? 'border-2 border-gold shadow-[0_0_40px_rgba(212,175,55,0.2)]'
                  : 'border border-dark-400'
              } bg-dark-200 transition-all duration-300 hover:border-gold/50 group`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                  <span className="bg-gold text-black font-heading text-xs px-4 py-1 tracking-widest whitespace-nowrap">
                    {t(plan.badge)}
                  </span>
                </div>
              )}

              {/* Header */}
              <div className={`p-6 border-b ${plan.highlight ? 'border-gold/30' : 'border-dark-400'}`}>
                <p className="font-accent text-gold text-xs tracking-widest uppercase mb-2">
                  {plan.name}
                </p>
                <div className="flex items-end gap-1 mb-2">
                  <span className="font-heading text-5xl text-white leading-none">
                    {plan.price}
                  </span>
                  <span className="text-gray-500 text-xs mb-1 font-body">
                    {t('plans_currency')}
                  </span>
                  <span className="text-gray-500 text-xs mb-1">
                    {language === 'ar' ? ' / ' : '/ '}
                    {plan.period}
                  </span>
                </div>
                <p className="text-gray-500 text-xs h-8 leading-normal">{plan.description}</p>
              </div>

              {/* Features */}
              <div className="p-6 flex-1">
                <ul className="space-y-3">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm">
                      <MdCheck
                        size={16}
                        className={`mt-0.5 shrink-0 ${plan.highlight ? 'text-gold' : 'text-gray-500'}`}
                      />
                      <span className="text-gray-300">{t(feature)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => setSelectedPlan(plan)}
                  className={`w-full block text-center font-heading tracking-widest text-sm py-3 uppercase transition-all duration-300 cursor-pointer ${
                    plan.highlight
                      ? 'bg-gold text-black hover:bg-gold-light'
                      : 'border border-dark-400 text-gray-300 hover:border-gold hover:text-gold'
                  }`}
                >
                  {t(plan.cta)}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {selectedPlan && (
        <MembershipRegistrationModal
          plan={selectedPlan}
          onClose={() => setSelectedPlan(null)}
        />
      )}
    </section>
  );
}

