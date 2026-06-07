// src/pages/admin/AdminOffers.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCollection, addDocument, updateDocument, deleteDocument } from '../../hooks/useFirestore';
import { useLanguage } from '../../context/LanguageContext';
import CrudModal from '../../components/admin/CrudModal';
import toast from 'react-hot-toast';
import { MdAdd, MdEdit, MdDelete, MdToggleOn, MdToggleOff } from 'react-icons/md';
import { format } from 'date-fns';

const EMPTY_FORM = { title: '', description: '', endDate: '', active: true };

export default function AdminOffers() {
  const { data: offers, loading } = useCollection('offers');
  const { t, language } = useLanguage();
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const openCreate = () => {
    setEditItem(null);
    setForm(EMPTY_FORM);
    setModalOpen(true);
  };

  const openEdit = (offer) => {
    setEditItem(offer);
    setForm({
      title: offer.title || '',
      description: offer.description || '',
      endDate: offer.endDate
        ? (offer.endDate.toDate ? format(offer.endDate.toDate(), 'yyyy-MM-dd') : offer.endDate)
        : '',
      active: offer.active !== false,
    });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description) {
      toast.error(language === 'ar' ? 'العنوان والوصف مطلوبان.' : 'Title and description are required.');
      return;
    }
    setSaving(true);
    try {
      const data = {
        title: form.title.trim(),
        description: form.description.trim(),
        endDate: form.endDate ? new Date(form.endDate) : null,
        active: form.active,
      };
      if (editItem) {
        await updateDocument('offers', editItem.id, data);
        toast.success(language === 'ar' ? 'تم تحديث العرض!' : 'Offer updated!');
      } else {
        await addDocument('offers', data);
        toast.success(language === 'ar' ? 'تم إنشاء العرض!' : 'Offer created!');
      }
      setModalOpen(false);
    } catch (err) {
      toast.error(language === 'ar' ? 'فشل الحفظ. حاول مرة أخرى.' : 'Save failed. Try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm(t('admin_offers_confirm_delete'))) return;
    try {
      await deleteDocument('offers', id);
      toast.success(language === 'ar' ? 'تم حذف العرض.' : 'Offer deleted.');
    } catch {
      toast.error(language === 'ar' ? 'فشلت عملية الحذف.' : 'Delete failed.');
    }
  };

  const handleToggle = async (offer) => {
    try {
      await updateDocument('offers', offer.id, { active: !offer.active });
      toast.success(
        language === 'ar'
          ? `تم ${offer.active ? 'إيقاف' : 'تفعيل'} العرض.`
          : `Offer ${offer.active ? 'deactivated' : 'activated'}.`
      );
    } catch {
      toast.error(language === 'ar' ? 'فشل التحديث.' : 'Update failed.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-3xl text-white tracking-wider">
            {t('admin_offers_manage')}
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            {offers.length} {t('admin_offers_total')}
          </p>
        </div>
        <button onClick={openCreate} className="btn-gold py-2 px-5 text-sm flex items-center gap-2 cursor-pointer">
          <MdAdd size={18} /> {t('admin_offers_new')}
        </button>
      </div>

      {/* Table */}
      <div className="card-dark overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-500">{t('admin_table_loading')}</div>
        ) : offers.length === 0 ? (
          <div className="p-12 text-center text-gray-600">{t('admin_offers_no')}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-dark-400 text-left rtl:text-right">
                  <th className="px-5 py-4 text-gray-500 uppercase tracking-wider font-normal text-xs">
                    {t('admin_offers_col_title')}
                  </th>
                  <th className="px-5 py-4 text-gray-500 uppercase tracking-wider font-normal text-xs hidden md:table-cell">
                    {t('admin_offers_col_desc')}
                  </th>
                  <th className="px-5 py-4 text-gray-500 uppercase tracking-wider font-normal text-xs hidden lg:table-cell">
                    {t('admin_offers_col_end')}
                  </th>
                  <th className="px-5 py-4 text-gray-500 uppercase tracking-wider font-normal text-xs">
                    {t('admin_offers_col_status')}
                  </th>
                  <th className="px-5 py-4 text-gray-500 uppercase tracking-wider font-normal text-xs">
                    {t('admin_table_action')}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-400">
                {offers.map((offer, i) => (
                  <motion.tr
                    key={offer.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="hover:bg-dark-300 transition-colors"
                  >
                    <td className="px-5 py-4 text-white font-medium">{offer.title}</td>
                    <td className="px-5 py-4 text-gray-400 hidden md:table-cell max-w-xs truncate">{offer.description}</td>
                    <td className="px-5 py-4 text-gray-400 hidden lg:table-cell">
                      {offer.endDate
                        ? (offer.endDate.toDate
                            ? format(offer.endDate.toDate(), 'MMM d, yyyy')
                            : offer.endDate)
                        : '—'}
                    </td>
                    <td className="px-5 py-4">
                      <button onClick={() => handleToggle(offer)} className="flex items-center gap-1 transition-colors cursor-pointer">
                        {offer.active !== false ? (
                          <><MdToggleOn size={24} className="text-gold" /><span className="text-gold text-xs">{t('admin_offers_active')}</span></>
                        ) : (
                          <><MdToggleOff size={24} className="text-gray-600" /><span className="text-gray-600 text-xs">{t('admin_offers_off')}</span></>
                        )}
                      </button>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEdit(offer)}
                          className="p-1.5 text-gray-400 hover:text-gold transition-colors border border-dark-400 hover:border-gold/50 cursor-pointer"
                        >
                          <MdEdit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(offer.id)}
                          className="p-1.5 text-gray-400 hover:text-red-400 transition-colors border border-dark-400 hover:border-red-400/50 cursor-pointer"
                        >
                          <MdDelete size={16} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      <CrudModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editItem ? t('admin_offers_edit') : t('admin_offers_create')}
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">
              {t('admin_offers_form_title')}
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
              placeholder="e.g. 20% Off summer discount"
              className="input-dark"
              required
            />
          </div>
          <div>
            <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">
              {t('admin_offers_form_desc')}
            </label>
            <textarea
              value={form.description}
              onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
              placeholder="Describe the offer..."
              rows={4}
              className="input-dark resize-none"
              required
            />
          </div>
          <div>
            <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">
              {t('admin_offers_form_end')}
            </label>
            <input
              type="date"
              value={form.endDate}
              onChange={(e) => setForm((p) => ({ ...p, endDate: e.target.value }))}
              className="input-dark"
            />
          </div>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="active"
              checked={form.active}
              onChange={(e) => setForm((p) => ({ ...p, active: e.target.checked }))}
              className="accent-gold w-4 h-4"
            />
            <label htmlFor="active" className="text-gray-300 text-sm cursor-pointer">
              {t('admin_offers_form_active')}
            </label>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving} className="btn-gold flex-1 py-3 cursor-pointer">
              {saving ? t('admin_offers_saving') : editItem ? t('admin_offers_update') : t('admin_offers_save')}
            </button>
            <button type="button" onClick={() => setModalOpen(false)} className="btn-outline flex-1 py-3 cursor-pointer">
              {t('admin_offers_cancel')}
            </button>
          </div>
        </form>
      </CrudModal>
    </div>
  );
}
