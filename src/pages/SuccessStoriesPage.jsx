// src/pages/SuccessStoriesPage.jsx
import { motion } from 'framer-motion';
import { MdStar } from 'react-icons/md';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';

const getStories = (language) => [
  {
    name: language === 'ar' ? 'أحمد حسن' : 'Ahmed Hassan',
    age: 32,
    duration: language === 'ar' ? '٦ أشهر' : '6 months',
    before: language === 'ar' ? '-٣٠ كجم' : '-30 kg',
    after: language === 'ar' ? 'رشيق وقوي' : 'Lean & Strong',
    goal: language === 'ar' ? 'خسارة الوزن' : 'Weight Loss',
    quote: language === 'ar'
      ? 'لقد جربت كل شيء. فقط جيم كوستا منحني النظام والتدريب والمجتمع الذي احتجته للنجاح في النهاية. حياتي تغيرت بالكامل.'
      : 'I tried everything. Only Costa Gym gave me the structure, coaching, and community I needed to finally succeed. My whole life has changed.',
    rating: 5,
  },
  {
    name: language === 'ar' ? 'سارة محمد' : 'Sara Mohamed',
    age: 26,
    duration: language === 'ar' ? 'سنة واحدة' : '1 year',
    before: language === 'ar' ? 'مبتدئة' : 'Beginner',
    after: language === 'ar' ? 'منافسة وطنية' : 'National Competitor',
    goal: language === 'ar' ? 'الأداء الرياضي' : 'Athletic Performance',
    quote: language === 'ar'
      ? 'دخلت الجيم وأنا لا أعرف شيئاً عن رفع الأثقال. في غضون عام كنت أشارك في بطولات وطنية. كوتش مصطفى عبقري.'
      : 'I walked in knowing nothing about lifting. Within a year I was competing nationally. Coach Mustafa is a genius.',
    rating: 5,
  },
  {
    name: language === 'ar' ? 'خالد إبراهيم' : 'Khaled Ibrahim',
    age: 28,
    duration: language === 'ar' ? '٨ أشهر' : '8 months',
    before: language === 'ar' ? '٦٥ كجم' : '65 kg',
    after: language === 'ar' ? '٨٢ كجم كتلة عضلية صافية' : '82 kg Lean Mass',
    goal: language === 'ar' ? 'بناء العضلات' : 'Muscle Building',
    quote: language === 'ar'
      ? 'البرامج والتدريب هنا على أعلى مستوى. التغذية والاستشفاء والتمارين — كل شيء تم تصميمه لتحقيق أهدافي.'
      : 'The programming here is top level. Nutrition, recovery, training — everything was optimized for my goals.',
    rating: 5,
  },
  {
    name: language === 'ar' ? 'منى علي' : 'Mona Ali',
    age: 35,
    duration: language === 'ar' ? '٤ أشهر' : '4 months',
    before: language === 'ar' ? 'بعد الحمل والولادة' : 'Post-pregnancy',
    after: language === 'ar' ? 'أكثر لياقة من أي وقت مضى' : 'Fitter than ever',
    goal: language === 'ar' ? 'إعادة تشكيل الجسم' : 'Body Recomposition',
    quote: language === 'ar'
      ? 'بعد ولادة طفلي الثاني، كنت أشعر بالضياع. تفهم المدربون هنا حالتي وساعدوني على العودة أقوى من ذي قبل.'
      : 'After having my second child, I was lost. The trainers here understood my situation and helped me come back stronger.',
    rating: 5,
  },
  {
    name: language === 'ar' ? 'عمر فريد' : 'Omar Farid',
    age: 45,
    duration: language === 'ar' ? 'سنة واحدة' : '1 year',
    before: language === 'ar' ? 'وزن زائد وتعب مستمر' : 'Overweight & tired',
    after: language === 'ar' ? 'أنهيت ماراثون كامل' : 'Marathon finisher',
    goal: language === 'ar' ? 'تحمل بدني' : 'Endurance',
    quote: language === 'ar'
      ? 'بدأت بممارسة الرياضة لأن طبيبي نصحني بذلك. وبقيت لأنني أحببت اللياقة البدنية في سن الـ 45. لم يفت الأوان بعد!'
      : 'I started because my doctor told me to. I stayed because I fell in love with fitness at 45. Never too late!',
    rating: 5,
  },
  {
    name: language === 'ar' ? 'ليلى مصطفى' : 'Laila Mostafa',
    age: 22,
    duration: language === 'ar' ? '٣ أشهر' : '3 months',
    before: language === 'ar' ? 'تحت الوزن الطبيعي' : 'Underweight',
    after: language === 'ar' ? '+١٠ كجم وزن صحي' : '+10 kg healthy weight',
    goal: language === 'ar' ? 'بناء العضلات' : 'Muscle Building',
    quote: language === 'ar'
      ? 'لطالما أخبرني الناس أنني نحيفة بطبيعتي. أثبت جيم كوستا خطأهم من خلال تدريب مدعوم بالعلوم الرياضية.'
      : 'People always told me I was just thin by nature. Costa Gym proved them wrong with science-backed training.',
    rating: 5,
  },
];

export default function SuccessStoriesPage() {
  const { t, language } = useLanguage();
  const stories = getStories(language);

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
            <p className="text-gold-accent mb-4">{language === 'ar' ? 'أشخاص حقيقيون، نتائج حقيقية' : 'Real People, Real Results'}</p>
            <h1 className="section-title mb-4">{t('nav_success')}</h1>
            <div className="flex items-center justify-center gap-3 my-4">
              <div className="h-px w-16 bg-gold" />
              <div className="w-2 h-2 bg-gold rotate-45" />
              <div className="h-px w-16 bg-gold" />
            </div>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              {language === 'ar'
                ? 'الآلاف حققوا تحولاً جسدياً معنا. هذه لقطة من قصص نجاحهم.'
                : 'Thousands have transformed here. These are just a few of their stories.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="section-padding bg-dark">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {stories.map((s, i) => (
              <motion.div
                key={i}
                className="card-dark overflow-hidden group hover:border-gold/50 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 3) * 0.1 }}
              >
                {/* Before / After Banner */}
                <div className="flex border-b border-dark-400">
                  <div className="flex-1 p-5 bg-dark-300 text-center">
                    <p className="text-gray-600 text-xs uppercase tracking-wider mb-1">{t('succ_before')}</p>
                    <p className="font-heading text-lg text-gray-400">{s.before}</p>
                  </div>
                  <div className="w-px bg-dark-400" />
                  <div className="flex-1 p-5 bg-gold/5 text-center">
                    <p className="text-gold text-xs uppercase tracking-wider mb-1">{t('succ_after')}</p>
                    <p className="font-heading text-lg text-gold">{s.after}</p>
                  </div>
                </div>

                <div className="p-6">
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(s.rating)].map((_, j) => (
                      <MdStar key={j} className="text-gold" size={14} />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-gray-300 text-sm leading-relaxed italic mb-6">
                    "{s.quote}"
                  </p>

                  {/* Member info */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 border border-gold/40 bg-gold/10 flex items-center justify-center">
                        <span className="font-heading text-gold">{s.name[0]}</span>
                      </div>
                      <div>
                        <p className="font-medium text-white text-sm">{s.name}</p>
                        <p className="text-gray-600 text-xs">
                          {language === 'ar' ? `العمر ${s.age} · ${s.duration}` : `Age ${s.age} · ${s.duration}`}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-gold border border-gold/30 px-2 py-1 bg-gold/5">
                      {s.goal}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-dark-100">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="section-title mb-6">{language === 'ar' ? 'قصتك تبدأ الآن' : 'YOUR STORY STARTS NOW'}</h2>
          <p className="text-gray-400 mb-8">
            {language === 'ar'
              ? 'انضم إلى الآلاف الذين غيروا حياتهم معنا. قصة نجاحك في انتظار كتابتها.'
              : "Join the thousands who've already transformed. Your success story is waiting to be written."}
          </p>
          <Link to="/membership" className="btn-gold">
            {language === 'ar' ? 'اشترك الآن معنا' : 'Join Costa Gym Now'}
          </Link>
        </div>
      </section>
    </div>
  );
}

