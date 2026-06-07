// src/pages/GalleryPage.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdClose } from 'react-icons/md';
import { useLanguage } from '../context/LanguageContext';

// Placeholder gallery items
const getGalleryItems = (language) => [
  { id: 1, category: 'Equipment', label: language === 'ar' ? 'منطقة الأوزان الحرة' : 'Free Weights Zone', color: '#1A1400' },
  { id: 2, category: 'Training', label: language === 'ar' ? 'حصة HIIT جماعية' : 'Group HIIT Class', color: '#0D1A00' },
  { id: 3, category: 'Facilities', label: language === 'ar' ? 'صالة التمارين الرئيسية' : 'Main Gym Floor', color: '#1A0D00' },
  { id: 4, category: 'Equipment', label: language === 'ar' ? 'قسم الكارديو' : 'Cardio Section', color: '#00101A' },
  { id: 5, category: 'Training', label: language === 'ar' ? 'تدريب شخصي' : 'Personal Training', color: '#1A1A00' },
  { id: 6, category: 'Events', label: language === 'ar' ? 'بطولة 2024' : 'Championship 2024', color: '#1A0D1A' },
  { id: 7, category: 'Facilities', label: language === 'ar' ? 'غرف تغيير الملابس' : 'Locker Rooms', color: '#001A10' },
  { id: 8, category: 'Equipment', label: language === 'ar' ? 'أجهزة الكابلات' : 'Cable Machines', color: '#0D0D1A' },
  { id: 9, category: 'Training', label: language === 'ar' ? 'تحدي الديدليفت' : 'Deadlift Challenge', color: '#1A0A0A' },
  { id: 10, category: 'Events', label: language === 'ar' ? 'حفل توزيع جوائز الأعضاء' : 'Member Awards Night', color: '#0A1A0A' },
  { id: 11, category: 'Facilities', label: language === 'ar' ? 'منطقة الاستقبال' : 'Reception Area', color: '#1A1200' },
  { id: 12, category: 'Training', label: language === 'ar' ? 'حصة ركوب الدراجات' : 'Spinning Class', color: '#0A0A1A' },
];

export default function GalleryPage() {
  const { t, language } = useLanguage();
  const [active, setActive] = useState('All');
  const [lightbox, setLightbox] = useState(null);

  const categories = [
    { key: 'All', label: language === 'ar' ? 'الكل' : 'All' },
    { key: 'Equipment', label: language === 'ar' ? 'الأجهزة' : 'Equipment' },
    { key: 'Training', label: language === 'ar' ? 'التدريب' : 'Training' },
    { key: 'Facilities', label: language === 'ar' ? 'المرافق' : 'Facilities' },
    { key: 'Events', label: language === 'ar' ? 'الفعاليات' : 'Events' },
  ];

  const galleryItems = getGalleryItems(language);

  const filtered = active === 'All'
    ? galleryItems
    : galleryItems.filter((g) => g.category === active);

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
            <p className="text-gold-accent mb-4">{t('gal_accent')}</p>
            <h1 className="section-title mb-4">{t('gal_title')}</h1>
            <div className="flex items-center justify-center gap-3 my-4">
              <div className="h-px w-16 bg-gold" />
              <div className="w-2 h-2 bg-gold rotate-45" />
              <div className="h-px w-16 bg-gold" />
            </div>
            <p className="text-gray-400 text-lg">
              {language === 'ar' ? 'لمحة عن البيئة الرياضية الفاخرة التي بنيناها لأجلك.' : "A glimpse into the world-class environment we've built for you."}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 px-4 bg-dark border-b border-dark-400">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActive(cat.key)}
              className={`px-6 py-2 text-sm uppercase tracking-widest font-body transition-all duration-300 cursor-pointer ${
                active === cat.key
                  ? 'bg-gold text-black'
                  : 'border border-dark-400 text-gray-400 hover:border-gold/50 hover:text-gold'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="section-padding bg-dark">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-0">
          <motion.div
            layout
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
          >
            <AnimatePresence>
              {filtered.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.05 }}
                  className="relative aspect-square overflow-hidden group cursor-pointer"
                  onClick={() => setLightbox(item)}
                >
                  <div
                    className="w-full h-full flex items-end p-4 transition-transform duration-500 group-hover:scale-105"
                    style={{
                      background: `
                        linear-gradient(180deg, ${item.color} 0%, rgba(0,0,0,0.9) 100%),
                        repeating-linear-gradient(45deg, rgba(212,175,55,0.03) 0px, rgba(212,175,55,0.03) 1px, transparent 1px, transparent 20px)
                      `,
                    }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center opacity-20">
                      <span className="font-heading text-6xl text-gold/30">{item.label[0]}</span>
                    </div>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-center">
                      <p className="font-heading text-white tracking-wider text-lg">{item.label}</p>
                      <p className="text-gold text-xs mt-1">
                        {categories.find((c) => c.key === item.category)?.label}
                      </p>
                    </div>
                  </div>

                  {/* Gold border on hover */}
                  <div className="absolute inset-0 border-2 border-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-6 right-6 text-white hover:text-gold transition-colors"
              onClick={() => setLightbox(null)}
            >
              <MdClose size={32} />
            </button>
            <motion.div
              className="max-w-3xl w-full aspect-video relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="w-full h-full flex items-center justify-center border border-gold/30"
                style={{ background: lightbox.color }}
              >
                <div className="text-center">
                  <p className="font-heading text-3xl text-gold mb-2">{lightbox.label}</p>
                  <p className="text-gray-400 text-sm">
                    {categories.find((c) => c.key === lightbox.category)?.label}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

