// src/pages/admin/AdminCompetitionEntries.jsx
import { useCollection, deleteDocument } from '../../hooks/useFirestore';
import { useLanguage } from '../../context/LanguageContext';
import DataTable from '../../components/admin/DataTable';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

export default function AdminCompetitionEntries() {
  const { data: entries, loading } = useCollection('competition_entries');
  const { data: competitions } = useCollection('competitions');
  const { t, language } = useLanguage();

  const handleDelete = async (id) => {
    if (!window.confirm(t('admin_entries_confirm_delete'))) return;
    try {
      await deleteDocument('competition_entries', id);
      toast.success(language === 'ar' ? 'تم حذف المشاركة.' : 'Entry deleted.');
    } catch {
      toast.error(language === 'ar' ? 'فشلت عملية الحذف.' : 'Delete failed.');
    }
  };

  // Build competition filter options dynamically
  const competitionOptions = competitions.map((c) => ({
    value: c.id,
    label: c.title,
  }));

  const columns = [
    {
      label: '#',
      accessor: (_, i) => i + 1,
      render: (row, i) => <span className="text-gray-600">{i + 1}</span>,
    },
    {
      label: t('admin_entries_col_name'),
      accessor: (row) => row.fullName,
      render: (row) => <span className="text-white font-medium">{row.fullName}</span>,
    },
    {
      label: t('admin_entries_col_phone'),
      accessor: (row) => row.phone,
      render: (row) => (
        <a href={`tel:${row.phone}`} className="text-gold hover:text-gold-light transition-colors">
          {row.phone}
        </a>
      ),
    },
    {
      label: t('admin_entries_col_comp'),
      accessor: (row) => row.competitionTitle || row.competitionId,
      render: (row) => (
        <span className="text-xs border border-gold/30 text-gold px-2 py-0.5 bg-gold/5 max-w-[150px] truncate block">
          {row.competitionTitle || 'Unknown'}
        </span>
      ),
    },
    {
      label: t('admin_entries_col_registered'),
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
          {t('admin_entries_manage')}
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          {entries.length} {t('admin_entries_total')}
        </p>
      </div>

      <DataTable
        data={entries}
        columns={columns}
        searchKeys={['fullName', 'phone', 'competitionTitle']}
        filters={
          competitionOptions.length > 0
            ? [{ key: 'competitionId', label: language === 'ar' ? 'المسابقة' : 'Competition', options: competitionOptions }]
            : []
        }
        exportFilename="competition_entries"
        onDelete={handleDelete}
        loading={loading}
        emptyMessage={t('admin_entries_empty')}
      />
    </div>
  );
}
