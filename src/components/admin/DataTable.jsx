// src/components/admin/DataTable.jsx
// Reusable table with search, filter, and CSV export

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { MdSearch, MdFileDownload, MdDelete } from 'react-icons/md';
import { useLanguage } from '../../context/LanguageContext';
import { format } from 'date-fns';

function exportCSV(data, filename, columns) {
  const headers = columns.map((c) => c.label).join(',');
  const rows = data.map((row) =>
    columns
      .map((c) => {
        const val = c.accessor(row);
        return typeof val === 'string' && val.includes(',') ? `"${val}"` : val;
      })
      .join(',')
  );
  const csv = [headers, ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}_${format(new Date(), 'yyyy-MM-dd')}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function DataTable({
  data = [],
  columns = [],
  searchKeys = [],
  filters = [],  // [{ key, label, options: [{ value, label }] }]
  exportFilename = 'export',
  onDelete,
  loading,
  emptyMessage,
}) {
  const { t, language } = useLanguage();
  const [search, setSearch] = useState('');
  const [activeFilters, setActiveFilters] = useState({});

  const defaultEmptyMsg = emptyMessage || (language === 'ar' ? 'لم يتم العثور على سجلات.' : 'No records found.');

  const filtered = useMemo(() => {
    let result = [...data];

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((row) =>
        searchKeys.some((key) => String(row[key] || '').toLowerCase().includes(q))
      );
    }

    // Filters
    Object.entries(activeFilters).forEach(([key, value]) => {
      if (value && value !== 'all') {
        result = result.filter((row) => String(row[key]) === value);
      }
    });

    return result;
  }, [data, search, activeFilters, searchKeys]);

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <MdSearch className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('admin_table_search')}
            className="input-dark pl-10 pr-4 rtl:pl-4 rtl:pr-10 py-2 text-sm"
          />
        </div>

        {/* Filter dropdowns */}
        {filters.map((f) => (
          <select
            key={f.key}
            value={activeFilters[f.key] || 'all'}
            onChange={(e) => setActiveFilters((p) => ({ ...p, [f.key]: e.target.value }))}
            className="input-dark py-2 text-sm w-auto min-w-[140px] cursor-pointer"
          >
            <option value="all">
              {f.label}: {language === 'ar' ? 'الكل' : 'All'}
            </option>
            {f.options.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        ))}

        {/* Export */}
        <button
          onClick={() => exportCSV(filtered, exportFilename, columns)}
          className="flex items-center gap-2 border border-gold/50 text-gold px-4 py-2 text-sm
                     hover:bg-gold hover:text-black transition-all uppercase tracking-wider cursor-pointer"
        >
          <MdFileDownload size={16} />
          {t('admin_table_export')} ({filtered.length})
        </button>
      </div>

      {/* Table */}
      <div className="card-dark overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-500">{t('admin_table_loading')}</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-gray-600">{defaultEmptyMsg}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-dark-400 text-left rtl:text-right">
                  {columns.map((col) => (
                    <th
                      key={col.label}
                      className="px-5 py-4 text-gray-500 uppercase tracking-wider font-normal text-xs whitespace-nowrap"
                    >
                      {col.label}
                    </th>
                  ))}
                  {onDelete && (
                    <th className="px-5 py-4 text-gray-500 uppercase tracking-wider font-normal text-xs">
                      {t('admin_table_action')}
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-400">
                {filtered.map((row, i) => (
                  <motion.tr
                    key={row.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className="hover:bg-dark-300 transition-colors"
                  >
                    {columns.map((col) => (
                      <td key={col.label} className="px-5 py-3.5 text-gray-300 whitespace-nowrap">
                        {col.render ? col.render(row, i) : col.accessor(row)}
                      </td>
                    ))}
                    {onDelete && (
                      <td className="px-5 py-3.5">
                        <button
                          onClick={() => onDelete(row.id)}
                          className="p-1.5 text-gray-500 hover:text-red-400 border border-dark-400
                                     hover:border-red-400/50 transition-colors cursor-pointer"
                        >
                          <MdDelete size={15} />
                        </button>
                      </td>
                    )}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <p className="text-gray-600 text-xs">
        {t('admin_table_showing')} {filtered.length} {t('admin_table_of')} {data.length} {t('admin_table_records')}
      </p>
    </div>
  );
}
