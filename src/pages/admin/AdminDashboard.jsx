// src/pages/admin/AdminDashboard.jsx
import { motion } from 'framer-motion';
import { useCollection } from '../../hooks/useFirestore';
import { useLanguage } from '../../context/LanguageContext';
import { where } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { MdPeople, MdLocalOffer, MdEmojiEvents, MdHowToReg, MdArrowForward, MdCardMembership } from 'react-icons/md';

function StatCard({ icon: Icon, label, value, color, link, delay, dir }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="card-dark p-6 flex flex-col gap-4 hover:border-gold/40 transition-all duration-300 group"
    >
      <div className="flex items-start justify-between">
        <div className={`w-12 h-12 flex items-center justify-center border ${color}`}>
          <Icon size={22} className="text-gold" />
        </div>
        {link && (
          <Link to={link} className="text-gray-600 hover:text-gold transition-colors">
            <MdArrowForward size={18} className="rtl:rotate-180" />
          </Link>
        )}
      </div>
      <div>
        <p className="font-heading text-4xl text-white tracking-wider">{value}</p>
        <p className="text-gray-500 text-xs uppercase tracking-widest mt-1">{label}</p>
      </div>
    </motion.div>
  );
}

export default function AdminDashboard() {
  const { t, language } = useLanguage();
  const { data: trials } = useCollection('trial_registrations');
  const { data: entries } = useCollection('competition_entries');
  const { data: memberships } = useCollection('membership_registrations');
  const { data: offers } = useCollection('offers', [where('active', '==', true)]);
  const { data: competitions } = useCollection('competitions', [where('active', '==', true)]);

  const stats = [
    {
      icon: MdCardMembership,
      label: t('admin_nav_memberships'),
      value: memberships.length,
      color: 'border-gold/30 bg-gold/5',
      link: '/admin/membership-registrations',
    },
    {
      icon: MdHowToReg,
      label: t('admin_nav_trials'),
      value: trials.length,
      color: 'border-gold/30 bg-gold/5',
      link: '/admin/trial-registrations',
    },
    {
      icon: MdPeople,
      label: t('admin_nav_entries'),
      value: entries.length,
      color: 'border-gold/30 bg-gold/5',
      link: '/admin/competition-entries',
    },
    {
      icon: MdLocalOffer,
      label: t('admin_nav_offers'),
      value: offers.length,
      color: 'border-gold/30 bg-gold/5',
      link: '/admin/offers',
    },
    {
      icon: MdEmojiEvents,
      label: t('admin_nav_competitions'),
      value: competitions.length,
      color: 'border-gold/30 bg-gold/5',
      link: '/admin/competitions',
    },
  ];

  // Sort and slice recent registrations (last 5)
  const recentMemberships = [...memberships]
    .sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0))
    .slice(0, 5);

  const recentTrials = [...trials]
    .sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0))
    .slice(0, 5);

  const recentEntries = [...entries]
    .sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0))
    .slice(0, 5);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-heading text-3xl text-white tracking-wider mb-1">
          {t('admin_nav_dashboard')}
        </h2>
        <p className="text-gray-500 text-sm">{t('admin_db_overview')}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {stats.map((s, i) => (
          <StatCard key={i} {...s} delay={i * 0.08} />
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Memberships */}
        <motion.div
          className="card-dark"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between p-5 border-b border-dark-400">
            <h3 className="font-heading text-lg text-white tracking-wider">
              {t('admin_db_recent_memberships')}
            </h3>
            <Link to="/admin/membership-registrations" className="text-gold text-xs hover:text-gold-light transition-colors uppercase tracking-wider">
              {t('admin_db_view_all')}
            </Link>
          </div>
          <div className="divide-y divide-dark-400">
            {recentMemberships.length === 0 ? (
              <p className="p-5 text-gray-600 text-sm text-center">{t('admin_db_no_memberships')}</p>
            ) : (
              recentMemberships.map((m) => (
                <div key={m.id} className="p-4 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 bg-gold/10 border border-gold/30 flex items-center justify-center shrink-0">
                      <span className="font-heading text-gold text-sm">{m.fullName?.[0]}</span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-white text-sm font-medium truncate">{m.fullName}</p>
                      <p className="text-gray-600 text-xs">{m.phone}</p>
                    </div>
                  </div>
                  <span className="text-gold text-xs border border-gold/30 px-2 py-0.5 bg-gold/5 shrink-0 uppercase truncate max-w-[100px]">
                    {m.planName}
                  </span>
                </div>
              ))
            )}
          </div>
        </motion.div>

        {/* Recent Trials */}
        <motion.div
          className="card-dark"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between p-5 border-b border-dark-400">
            <h3 className="font-heading text-lg text-white tracking-wider">
              {t('admin_db_recent_trials')}
            </h3>
            <Link to="/admin/trial-registrations" className="text-gold text-xs hover:text-gold-light transition-colors uppercase tracking-wider">
              {t('admin_db_view_all')}
            </Link>
          </div>
          <div className="divide-y divide-dark-400">
            {recentTrials.length === 0 ? (
              <p className="p-5 text-gray-600 text-sm text-center">{t('admin_db_no_reg')}</p>
            ) : (
              recentTrials.map((t_reg) => (
                <div key={t_reg.id} className="p-4 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 bg-gold/10 border border-gold/30 flex items-center justify-center shrink-0">
                      <span className="font-heading text-gold text-sm">{t_reg.fullName?.[0]}</span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-white text-sm font-medium truncate">{t_reg.fullName}</p>
                      <p className="text-gray-600 text-xs">{t_reg.phone}</p>
                    </div>
                  </div>
                  <span className="text-gold text-xs border border-gold/30 px-2 py-0.5 bg-gold/5 shrink-0 truncate max-w-[100px]">
                    {t_reg.goal}
                  </span>
                </div>
              ))
            )}
          </div>
        </motion.div>

        {/* Recent Competition Entries */}
        <motion.div
          className="card-dark"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-between p-5 border-b border-dark-400">
            <h3 className="font-heading text-lg text-white tracking-wider">
              {t('admin_db_recent_entries')}
            </h3>
            <Link to="/admin/competition-entries" className="text-gold text-xs hover:text-gold-light transition-colors uppercase tracking-wider">
              {t('admin_db_view_all')}
            </Link>
          </div>
          <div className="divide-y divide-dark-400">
            {recentEntries.length === 0 ? (
              <p className="p-5 text-gray-600 text-sm text-center">{t('admin_db_no_entries')}</p>
            ) : (
              recentEntries.map((e) => (
                <div key={e.id} className="p-4 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 bg-gold/10 border border-gold/30 flex items-center justify-center shrink-0">
                      <span className="font-heading text-gold text-sm">{e.fullName?.[0]}</span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-white text-sm font-medium truncate">{e.fullName}</p>
                      <p className="text-gray-600 text-xs">{e.phone}</p>
                    </div>
                  </div>
                  <span className="text-gray-500 text-xs shrink-0 truncate max-w-[100px]">
                    {e.competitionTitle}
                  </span>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
