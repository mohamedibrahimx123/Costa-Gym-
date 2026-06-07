// src/pages/ContactPage.jsx
import { motion } from 'framer-motion';
import { FaWhatsapp, FaPhone, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';

export default function ContactPage() {
  const { t, language } = useLanguage();
  const phone = import.meta.env.VITE_PHONE_NUMBER || '+20 123 456 7890';
  const address = import.meta.env.VITE_GYM_ADDRESS || '123 Fitness Street, Cairo, Egypt';
  const waNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '201234567890';
  const mapsEmbed = import.meta.env.VITE_GOOGLE_MAPS_EMBED ||
    'https://maps.google.com/maps?q=cairo+egypt&output=embed';

  const textMsg = language === 'ar'
    ? 'مرحباً! أنا مهتم بالاشتراك في جيم كوستا.'
    : "Hello! I'm interested in joining Costa Gym.";
  const message = encodeURIComponent(textMsg);

  const contactItems = [
    {
      icon: FaPhone,
      label: language === 'ar' ? 'الهاتف' : 'Phone',
      value: phone,
      href: `tel:${phone.replace(/\s+/g, '')}`,
    },
    {
      icon: FaWhatsapp,
      label: language === 'ar' ? 'واتساب' : 'WhatsApp',
      value: language === 'ar' ? 'دردش معنا على واتساب' : 'Chat with us on WhatsApp',
      href: `https://wa.me/${waNumber}?text=${message}`,
      external: true,
    },
    {
      icon: FaMapMarkerAlt,
      label: language === 'ar' ? 'العنوان' : 'Address',
      value: address,
    },
  ];

  const hours = [
    { day: language === 'ar' ? 'الاثنين – الجمعة' : 'Monday – Friday', hours: '6:00 AM – 11:00 PM' },
    { day: language === 'ar' ? 'السبت' : 'Saturday', hours: '7:00 AM – 10:00 PM' },
    { day: language === 'ar' ? 'الأحد' : 'Sunday', hours: '8:00 AM – 8:00 PM' },
    { day: language === 'ar' ? 'العطلات الرسمية' : 'Public Holidays', hours: '9:00 AM – 6:00 PM' },
  ];

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
            <p className="text-gold-accent mb-4">{t('con_accent')}</p>
            <h1 className="section-title mb-4">{t('con_title')}</h1>
            <div className="flex items-center justify-center gap-3 my-4">
              <div className="h-px w-16 bg-gold" />
              <div className="w-2 h-2 bg-gold rotate-45" />
              <div className="h-px w-16 bg-gold" />
            </div>
            <p className="text-gray-400 text-lg">
              {language === 'ar' ? 'نحن هنا لمساعدتك. تواصل معنا في أي وقت.' : "We're here for you. Reach out any time."}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section-padding bg-dark">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left: Info */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-3xl text-white mb-8 tracking-wider">
                {language === 'ar' ? 'اتصل بنا مباشرة' : 'REACH OUT TO US'}
              </h2>

              {/* Contact Items */}
              <div className="space-y-6 mb-12">
                {contactItems.map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex items-start gap-4 group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="w-12 h-12 border border-gold/40 bg-gold/5 flex items-center justify-center shrink-0
                                   group-hover:bg-gold group-hover:border-gold transition-all duration-300">
                      <item.icon size={18} className="text-gold group-hover:text-black transition-colors" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">{item.label}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.external ? '_blank' : undefined}
                          rel={item.external ? 'noopener noreferrer' : undefined}
                          className="text-white hover:text-gold transition-colors text-sm"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-white text-sm">{item.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Working Hours */}
              <div className="card-dark p-6">
                <div className="flex items-center gap-2 mb-4">
                  <FaClock className="text-gold" />
                  <h3 className="font-heading text-lg text-white tracking-wider uppercase">{t('footer_hours')}</h3>
                </div>
                <ul className="space-y-3">
                  {hours.map((h, i) => (
                    <li key={i} className="flex items-center justify-between text-sm border-b border-dark-400 pb-3 last:border-0 last:pb-0">
                      <span className="text-gray-400">{h.day}</span>
                      <span className="text-gold font-medium">{h.hours}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* WhatsApp CTA */}
              <a
                href={`https://wa.me/${waNumber}?text=${message}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 flex items-center justify-center gap-3 w-full py-4
                           bg-[#25D366] text-white font-heading tracking-widest uppercase text-lg
                           hover:bg-[#1da355] transition-colors duration-300"
              >
                <FaWhatsapp size={22} />
                {language === 'ar' ? 'تحدث معنا عبر واتساب' : 'Chat on WhatsApp'}
              </a>
            </motion.div>

            {/* Right: Map */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="border border-dark-400 overflow-hidden">
                <div className="p-4 bg-dark-200 border-b border-dark-400 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-gold" />
                  <span className="font-heading tracking-wider text-white text-sm uppercase">{language === 'ar' ? 'موقعنا على الخريطة' : 'FIND US ON THE MAP'}</span>
                </div>
                {/* Google Maps Embed */}
                <div className="relative h-[400px] bg-dark-300">
                  <iframe
                    src={mapsEmbed}
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Costa Gym Location"
                  />
                  {/* Overlay for the dark filter effect */}
                  <div className="absolute inset-0 pointer-events-none border-2 border-dark-400" />
                </div>
              </div>

              {/* Location Card */}
              <div className="card-dark p-6">
                <h3 className="font-heading text-xl text-white mb-3 tracking-wider uppercase">{language === 'ar' ? 'كيفية الوصول إلينا' : 'GETTING HERE'}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {language === 'ar'
                    ? 'يقع مقرنا في قلب القاهرة، ويسهل الوصول إليه بالسيارة أو وسائل النقل العام. تتوفر مواقف سيارات مجانية لجميع الأعضاء.'
                    : 'We are conveniently located in the heart of Cairo, easily accessible by car or public transportation. Free parking is available for all members.'}
                </p>
                <div className="mt-4 p-3 bg-gold/5 border border-gold/20">
                  <p className="text-gold text-sm font-medium">
                    📍 {address}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

