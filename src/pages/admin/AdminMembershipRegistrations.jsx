// src/pages/admin/AdminMembershipRegistrations.jsx
import { useCollection, deleteDocument } from '../../hooks/useFirestore';
import { useLanguage } from '../../context/LanguageContext';
import DataTable from '../../components/admin/DataTable';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

export default function AdminMembershipRegistrations() {
  const { data, loading } = useCollection('membership_registrations');
  const { t, language } = useLanguage();

  const handleDelete = async (id) => {
    const confirmMsg = language === 'ar'
      ? 'هل تريد حذف هذا الاشتراك؟'
      : 'Delete this membership registration?';
    if (!window.confirm(confirmMsg)) return;

    try {
      await deleteDocument('membership_registrations', id);
      toast.success(language === 'ar' ? 'تم حذف الاشتراك.' : 'Registration deleted.');
    } catch {
      toast.error(language === 'ar' ? 'فشلت عملية الحذف.' : 'Delete failed.');
    }
  };

  // Build plan filters dynamically from database entries
  const uniquePlans = [...new Set(data.map((r) => r.planName).filter(Boolean))];
  const planFilters = uniquePlans.map((p) => ({ value: p, label: p }));

  const columns = [
    {
      label: '#',
      accessor: (_, i) => i + 1,
      render: (row, i) => <span className="text-gray-600">{i + 1}</span>,
    },
    {
      label: t('admin_memberships_col_name'),
      accessor: (row) => row.fullName,
      render: (row) => <span className="text-white font-medium">{row.fullName}</span>,
    },
    {
      label: t('admin_memberships_col_phone'),
      accessor: (row) => row.phone,
      render: (row) => (
        <a href={`tel:${row.phone}`} className="text-gold hover:text-gold-light transition-colors">
          {row.phone}
        </a>
      ),
    },
    {
      label: t('admin_memberships_col_age'),
      accessor: (row) => row.age,
      render: (row) => <span>{row.age}</span>,
    },
    {
      label: t('admin_memberships_col_plan'),
      accessor: (row) => row.planName,
      render: (row) => (
        <span className="text-xs border border-gold/30 text-gold px-2 py-0.5 bg-gold/5 uppercase">
          {row.planName}
        </span>
      ),
    },
    {
      label: t('admin_memberships_col_price'),
      accessor: (row) => `${row.price} EGP`,
      render: (row) => (
        <span className="font-heading text-white font-semibold">
          {row.price} <span className="text-xs text-gray-500 font-body">{t('plans_currency')}</span>
        </span>
      ),
    },
    {
      label: t('admin_memberships_col_registered'),
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
          {t('admin_memberships_manage')}
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          {data.length} {t('admin_memberships_total')}
        </p>
      </div>

      <DataTable
        data={data}
        columns={columns}
        searchKeys={['fullName', 'phone', 'planName', 'price']}
        filters={
          planFilters.length > 0
            ? [{ key: 'planName', label: t('admin_memberships_col_plan'), options: planFilters }]
            : []
        }
        exportFilename="membership_registrations"
        onDelete={handleDelete}
        loading={loading}
        emptyMessage={t('admin_memberships_empty')}
      />
    </div>
  );
}
