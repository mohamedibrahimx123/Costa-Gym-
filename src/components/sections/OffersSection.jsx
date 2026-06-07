// src/components/sections/OffersSection.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCollection, addDocument, checkDuplicatePhone } from '../../hooks/useFirestore';
import { where } from 'firebase/firestore';
import { formatDistanceToNow, isPast } from 'date-fns';
import { ar, enUS } from 'date-fns/locale';
import SectionTitle from '../common/SectionTitle';
import toast from 'react-hot-toast';
import { MdTimer, MdEmojiEvents, MdClose, MdLocalOffer } from 'react-icons/md';
import { FaTrophy } from 'react-icons/fa';
import { useLanguage } from '../../context/LanguageContext';

// ─── Competition Registration Modal ───────────────────────────────────────────
function CompetitionModal({ competition, onClose }) {
  const { t, language } = useLanguage();
  const [form, setForm] = useState({ fullName: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.fullName || !form.phone) {
      toast.error(language === 'ar' ? 'يرجى ملء جميع الحقول' : 'Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
      // Check for duplicate phone per competition
      const isDuplicate = await checkDuplicatePhone(form.phone, competition.id);
      if (isDuplicate) {
        toast.error(
          language === 'ar'
            ? 'هذا الرقم مسجل بالفعل في هذه المسابقة.'
            : 'This phone number is already registered for this competition.'
        );
        setLoading(false);
        return;
      }
      await addDocument('competition_entries', {
        fullName: form.fullName.trim(),
        phone: form.phone.trim(),
        competitionId: competition.id,
        competitionTitle: competition.title,
      });
      setDone(true);
      toast.success(language === 'ar' ? 'تم التسجيل بنجاح! بالتوفيق!' : 'Registered successfully! Good luck!');
    } catch (err) {
      toast.error(language === 'ar' ? 'فشل التسجيل. يرجى المحاولة مرة أخرى.' : 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-dark-200 border border-gold w-full max-w-md p-8 relative"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
        >
          <MdClose size={24} />
        </button>

        {done ? (
          <div className="text-center py-6">
            <div className="text-gold text-5xl mb-4">🏆</div>
            <h3 className="font-heading text-2xl text-gold mb-3">{language === 'ar' ? 'تم تسجيلك بنجاح!' : "You're In!"}</h3>
            <p className="text-gray-400 text-sm">
              {language === 'ar' ? (
                <>
                  بالتوفيق لك في مسابقة <strong className="text-white">{competition.title}</strong>! سنعلن الفائز قريباً.
                </>
              ) : (
                <>
                  Good luck in <strong className="text-white">{competition.title}</strong>! We'll announce the winner soon.
                </>
              )}
            </p>
            <button onClick={onClose} className="btn-gold mt-6 py-2 px-8 text-sm">
              {language === 'ar' ? 'إغلاق' : 'Close'}
            </button>
          </div>
        ) : (
          <>
            <p className="text-gold-accent mb-2">{language === 'ar' ? 'تسجيل للمنافسة' : 'Register to Compete'}</p>
            <h3 className="font-heading text-2xl text-white mb-1">{competition.title}</h3>
            <p className="text-gold text-sm mb-6 flex items-center gap-2">
              <FaTrophy size={14} /> {t('off_comp_prize')}: {competition.prize}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">
                  {t('con_name_label')}
                </label>
                <input
                  type="text"
                  value={form.fullName}
                  onChange={(e) => setForm((p) => ({ ...p, fullName: e.target.value }))}
                  placeholder={t('con_name_place')}
                  className="input-dark"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">
                  {t('con_phone_label')}
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                  placeholder={t('con_phone_place')}
                  className="input-dark"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="btn-gold w-full mt-2"
              >
                {loading
                  ? (language === 'ar' ? 'جاري التسجيل...' : 'Registering...')
                  : t('off_comp_join')}
              </button>
            </form>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

// ─── Countdown Timer ──────────────────────────────────────────────────────────
function Countdown({ endDate }) {
  const { language } = useLanguage();
  if (!endDate) return null;
  const end = endDate.toDate ? endDate.toDate() : new Date(endDate);
  if (isPast(end)) return <span className="text-red-400 text-xs">{language === 'ar' ? 'منتهي' : 'Expired'}</span>;
  return (
    <span className="text-gold text-xs flex items-center gap-1">
      <MdTimer size={14} />
      {language === 'ar' ? 'ينتهي ' : 'Ends '}
      {formatDistanceToNow(end, {
        addSuffix: true,
        locale: language === 'ar' ? ar : enUS
      })}
    </span>
  );
}

// ─── Main Offers Section ──────────────────────────────────────────────────────
export default function OffersSection({ showAll = false }) {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const { data: offers } = useCollection('offers', [where('active', '==', true)]);
  const { data: competitions } = useCollection('competitions', [where('active', '==', true)]);
  const [selectedComp, setSelectedComp] = useState(null);

  // Demo data if Firebase empty
  const demoOffers = offers.length > 0 ? offers : [
    {
      id: 'demo1',
      title: language === 'ar' ? 'عرض الصيف الحارق' : 'Summer Shred Special',
      description: language === 'ar'
        ? 'خصم 50٪ على العضوية لمدة 3 أشهر للمشتركين الجدد. احصل على أفضل لياقة بدنية هذا الصيف!'
        : '50% off 3-month membership for new joiners. Get in the best shape of your life this summer!',
      endDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    },
    {
      id: 'demo2',
      title: language === 'ar' ? 'أحضر صديقاً' : 'Bring a Friend',
      description: language === 'ar'
        ? 'أحضر صديقاً واشتركا، وسيحصل كلاكما على شهر مجاني. لا توجد حدود — كلما كان العدد أكبر كان ذلك أفضل!'
        : 'Refer a friend and both of you get one month free. No limits — the more the better!',
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
  ];

  const demoComps = competitions.length > 0 ? competitions : [
    {
      id: 'comp1',
      title: language === 'ar' ? 'تحدي الرجل الحديدي' : 'Iron Man Challenge',
      description: language === 'ar'
        ? 'مسابقة تحول بدني مدتها 6 أسابيع. تتبع تقدمك، وأرسل مراجعاتك الأسبوعية.'
        : '6-week transformation competition. Track your progress, submit weekly check-ins.',
      prize: language === 'ar' ? 'اشتراك سنوي مجاني + هدايا جيم كوستا' : 'Free Annual Membership + Costa Merchandise',
      endDate: new Date(Date.now() + 40 * 24 * 60 * 60 * 1000),
    },
    {
      id: 'comp2',
      title: language === 'ar' ? 'بطولة الديدليفت (الرفعة المميتة)' : 'Deadlift Championship',
      description: language === 'ar'
        ? 'من يستطيع رفع أثقل وزن؟ مفتوحة لجميع الأعضاء. فئات الأوزان متاحة.'
        : 'Who can lift the most? Open to all members. Weight categories available.',
      prize: language === 'ar' ? 'جائزة نقدية 5,000 جنيه + كأس البطولة' : 'EGP 5,000 Cash Prize + Trophy',
      endDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
    },
  ];

  return (
    <>
      {/* Active Offers */}
      <section className="section-padding bg-dark">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-0">
          <SectionTitle
            accent={t('off_accent')}
            title={t('off_title')}
            subtitle={t('off_subtitle')}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {demoOffers.map((offer, i) => (
              <motion.div
                key={offer.id}
                className="card-dark p-8 border-l-4 border-l-gold rtl:border-l-0 rtl:border-r-4 rtl:border-r-gold group hover:shadow-[0_0_30px_rgba(212,175,55,0.1)] transition-all duration-300"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gold/10 border border-gold/30 flex items-center justify-center">
                    <MdLocalOffer size={22} className="text-gold" />
                  </div>
                  {offer.endDate && (
                    <Countdown endDate={offer.endDate} />
                  )}
                </div>
                <h3 className="font-heading text-2xl text-white tracking-wider mb-3 group-hover:text-gold transition-colors">
                  {offer.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">{offer.description}</p>
                <div className="mt-6">
                  <button
                    onClick={() => navigate('/contact')}
                    className="text-gold text-sm uppercase tracking-widest flex items-center gap-2 hover:gap-4 transition-all duration-300 cursor-pointer"
                  >
                    {t('off_claim')}
                    <span className="text-xs rtl:rotate-180">→</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Active Competitions */}
      <section className="section-padding bg-dark-100 noise-overlay">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-0">
          <SectionTitle
            accent={language === 'ar' ? 'تنافس واربح' : 'Compete & Win'}
            title={t('off_comp_title')}
            subtitle={t('off_comp_subtitle')}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {demoComps.map((comp, i) => (
              <motion.div
                key={comp.id}
                className="card-dark overflow-hidden group hover:border-gold/50 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                {/* Gold accent top */}
                <div className="h-1 bg-gold-gradient" />

                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 border border-gold/50 bg-gold/5 flex items-center justify-center">
                      <FaTrophy size={24} className="text-gold" />
                    </div>
                    {comp.endDate && <Countdown endDate={comp.endDate} />}
                  </div>

                  <h3 className="font-heading text-3xl text-white tracking-wider mb-3 group-hover:text-gold transition-colors">
                    {comp.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    {comp.description}
                  </p>

                  {comp.prize && (
                    <div className="p-4 bg-gold/5 border border-gold/20 mb-6">
                      <p className="text-gold-accent mb-1">{t('off_comp_prize')}</p>
                      <p className="text-white text-sm font-medium">{comp.prize}</p>
                    </div>
                  )}

                  <button
                    onClick={() => setSelectedComp(comp)}
                    className="btn-gold w-full py-3 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MdEmojiEvents size={18} />
                    {t('off_comp_join')}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Competition Modal */}
      <AnimatePresence>
        {selectedComp && (
          <CompetitionModal
            competition={selectedComp}
            onClose={() => setSelectedComp(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

