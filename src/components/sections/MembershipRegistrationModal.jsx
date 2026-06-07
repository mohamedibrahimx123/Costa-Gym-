// src/components/sections/MembershipRegistrationModal.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { addDocument } from '../../hooks/useFirestore';
import { useLanguage } from '../../context/LanguageContext';
import toast from 'react-hot-toast';
import { MdCheck as CheckIcon, MdSend as SendIcon, MdClose as CloseIcon } from 'react-icons/md';

export default function MembershipRegistrationModal({ plan, onClose }) {
  const { t, language } = useLanguage();
  const [form, setForm] = useState({ fullName: '', phone: '', age: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.fullName || !form.phone || !form.age) {
      toast.error(language === 'ar' ? 'يرجى ملء جميع الحقول المطلوبة' : 'Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
      await addDocument('membership_registrations', {
        fullName: form.fullName.trim(),
        phone: form.phone.trim(),
        age: Number(form.age),
        planId: plan.id,
        planName: plan.name,
        price: plan.price,
      });
      setSubmitted(true);
      toast.success(t('mem_reg_success'));
    } catch (err) {
      toast.error(language === 'ar' ? 'فشل التسجيل. يرجى المحاولة مرة أخرى.' : 'Failed to register. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!plan) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
        {/* Backdrop overlay click to close */}
        <div className="absolute inset-0 cursor-default" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative bg-dark-200 border border-dark-400 w-full max-w-4xl p-6 md:p-8 rounded-sm shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col md:flex-row gap-8 z-10"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-white hover:scale-110 transition-all p-1.5 border border-dark-400 hover:border-gold/50 cursor-pointer"
            aria-label="Close"
          >
            <CloseIcon size={20} />
          </button>

          {/* Left Side: Plan Details */}
          <div className="flex-1 bg-dark-300/50 border border-dark-400/50 p-6 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gold/5 rounded-full blur-2xl group-hover:bg-gold/10 transition-all duration-500" />
            
            <div>
              <span className="text-gold font-accent text-xs tracking-widest uppercase mb-2 block">
                {t('mem_reg_plan')}
              </span>
              <h3 className="font-heading text-3xl text-white tracking-wider mb-2">
                {plan.name}
              </h3>
              <div className="flex items-end gap-1 mb-4">
                <span className="font-heading text-4xl text-white leading-none">
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
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                {plan.description}
              </p>

              <div className="h-px bg-dark-400 mb-6" />

              <ul className="space-y-2.5">
                {plan.features.slice(0, 5).map((feat, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-gray-300">
                    <CheckIcon size={14} className="text-gold mt-0.5 shrink-0" />
                    <span>{t(feat)}</span>
                  </li>
                ))}
                {plan.features.length > 5 && (
                  <li className="text-[11px] text-gray-500 italic pl-6 rtl:pl-0 rtl:pr-6">
                    + {plan.features.length - 5} {language === 'ar' ? 'مزايا إضافية أخرى' : 'more premium features'}
                  </li>
                )}
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-dark-400/50 text-[10px] text-gray-500">
              * {language === 'ar' ? 'الدفع يتم في مكتب الاستقبال عند تفعيل العضوية' : 'Payment is done at the reception upon membership activation.'}
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="flex-1 flex flex-col justify-center">
            {submitted ? (
              <div className="text-center py-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className="w-16 h-16 border border-gold rotate-45 mx-auto mb-6 flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.2)]"
                >
                  <span className="text-gold text-2xl -rotate-45">✓</span>
                </motion.div>
                <h3 className="font-heading text-2xl text-gold mb-3">
                  {t('mem_reg_success')}
                </h3>
                <p className="text-gray-400 text-sm max-w-sm mx-auto leading-relaxed">
                  {t('mem_reg_success_desc')}
                </p>
                <div className="flex gap-3 mt-8 justify-center">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-outline py-2 px-5 text-xs font-accent border-gold/50 text-gold hover:bg-gold hover:text-black cursor-pointer"
                  >
                    {t('mem_reg_another')}
                  </button>
                  <button
                    onClick={onClose}
                    className="btn-gold py-2 px-5 text-xs font-accent cursor-pointer"
                  >
                    {language === 'ar' ? 'إغلاق' : 'Close'}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h3 className="font-heading text-2xl text-white tracking-wider mb-1">
                    {t('mem_reg_title')}
                  </h3>
                  <p className="text-gray-500 text-xs uppercase tracking-wider">
                    {t('mem_reg_subtitle')}
                  </p>
                </div>
                
                <div className="h-px bg-dark-400 my-2" />

                <div>
                  <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">
                    {t('con_name_label')}
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
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
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder={t('con_phone_place')}
                    className="input-dark"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">
                    {language === 'ar' ? 'العمر *' : 'Age *'}
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={form.age}
                    onChange={handleChange}
                    placeholder={language === 'ar' ? 'عمرك بالسنوات' : 'Your age'}
                    min="14"
                    max="80"
                    className="input-dark"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-gold w-full flex items-center justify-center gap-3 mt-4 py-3 text-sm font-heading tracking-widest cursor-pointer"
                >
                  {loading ? (
                    <span className="animate-pulse">{t('mem_reg_submitting')}</span>
                  ) : (
                    <>
                      <SendIcon size={16} />
                      {t('mem_reg_submit')}
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
