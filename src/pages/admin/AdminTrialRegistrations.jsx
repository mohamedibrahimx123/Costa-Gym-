// src/pages/admin/AdminTrialRegistrations.jsx
import { useCollection, deleteDocument } from '../../hooks/useFirestore';
import { useLanguage } from '../../context/LanguageContext';
import DataTable from '../../components/admin/DataTable';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

const GOALS = ['Weight Loss', 'Muscle Building', 'Endurance', 'General Fitness', 'Athletic Performance'];

export default function AdminTrialRegistrations() {
  const { data, loading } = useCollection('trial_registrations');
  const { t, language } = useLanguage();

  const goalTranslations = {
    'Weight Loss': language === 'ar' ? 'خسارة الوزن' : 'Weight Loss',
    'Muscle Building': language === 'ar' ? 'بناء العضلات' : 'Muscle Building',
    'Endurance': language === 'ar' ? 'التحمل البدني' : 'Endurance',
    'General Fitness': language === 'ar' ? 'اللياقة البدنية العامة' : 'General Fitness',
    'Athletic Performance': language === 'ar' ? 'الأداء الرياضي' : 'Athletic Performance',
  };

  const handleDelete = async (id) => {
    if (!window.confirm(t('admin_trials_confirm_delete'))) return;
    try {
      await deleteDocument('trial_registrations', id);
      toast.success(language === 'ar' ? 'تم حذف التسجيل التجريبي.' : 'Registration deleted.');
    } catch {
      toast.error(language === 'ar' ? 'فشلت عملية الحذف.' : 'Delete failed.');
    }
  };

  const columns = [
    {
      label: '#',
      accessor: (_, i) => i + 1,
      render: (row, i) => <span className="text-gray-600">{i + 1}</span>,
    },
    {
      label: t('admin_trials_col_name'),
      accessor: (row) => row.fullName,
      render: (row) => <span className="text-white font-medium">{row.fullName}</span>,
    },
    {
      label: t('admin_trials_col_phone'),
      accessor: (row) => row.phone,
      render: (row) => (
        <a href={`tel:${row.phone}`} className="text-gold hover:text-gold-light transition-colors">
          {row.phone}
        </a>
      ),
    },
    {
      label: t('admin_trials_col_age'),
      accessor: (row) => row.age,
      render: (row) => <span>{row.age}</span>,
    },
    {
      label: t('admin_trials_col_goal'),
      accessor: (row) => row.goal,
      render: (row) => (
        <span className="text-xs border border-gold/30 text-gold px-2 py-0.5 bg-gold/5">
          {goalTranslations[row.goal] || row.goal}
        </span>
      ),
    },
    {
      label: t('admin_trials_col_registered'),
      accessor: (row) =>
        row.createdAt?.toDate
          ? format(row.createdAt.toDate(), 'MMM d, yyyy HH:mm')
          : '—',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading text-3xl text-white tracking-wider">
          {t('admin_trials_manage')}
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          {data.length} {t('admin_trials_total')}
        </p>
      </div>

      <DataTable
        data={data}
        columns={columns}
        searchKeys={['fullName', 'phone', 'goal']}
        filters={[
          {
            key: 'goal',
            label: language === 'ar' ? 'تصفية حسب الهدف' : 'Filter by Goal',
            options: GOALS.map((g) => ({ value: g, label: goalTranslations[g] || g })),
          },
        ]}
        exportFilename="trial_registrations"
        onDelete={handleDelete}
        loading={loading}
        emptyMessage={t('admin_trials_empty')}
      />
    </div>
  );
}
