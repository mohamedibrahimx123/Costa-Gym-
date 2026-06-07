// src/pages/admin/AdminCompetitions.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCollection, addDocument, updateDocument, deleteDocument, getAllDocs } from '../../hooks/useFirestore';
import { useLanguage } from '../../context/LanguageContext';
import { where } from 'firebase/firestore';
import CrudModal from '../../components/admin/CrudModal';
import toast from 'react-hot-toast';
import { MdAdd, MdEdit, MdDelete, MdToggleOn, MdToggleOff } from 'react-icons/md';
import { FaTrophy, FaDice } from 'react-icons/fa';
import { format } from 'date-fns';

const EMPTY_FORM = { title: '', description: '', prize: '', endDate: '', active: true };

// ─── Winner Generator Modal ────────────────────────────────────────────────────
function WinnerModal({ competition, onClose }) {
  const { t, language } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [winner, setWinner] = useState(null);
  const [rolling, setRolling] = useState(false);

  const pickWinner = async () => {
    setLoading(true);
    setRolling(true);
    try {
      const entries = await getAllDocs('competition_entries', [
        where('competitionId', '==', competition.id),
      ]);
      if (entries.length === 0) {
        toast.error(t('admin_comps_winner_no_entries'));
        setLoading(false);
        setRolling(false);
        return;
      }
      // Simulate rolling effect
      await new Promise((r) => setTimeout(r, 1800));
      const randomIndex = Math.floor(Math.random() * entries.length);
      const selectedWinner = entries[randomIndex];

      // Save winner to Firebase
      await addDocument('winners', {
        competitionId: competition.id,
        competitionTitle: competition.title,
        winnerName: selectedWinner.fullName,
        winnerPhone: selectedWinner.phone,
        selectedAt: new Date(),
        totalParticipants: entries.length,
      });

      setWinner(selectedWinner);
      toast.success(language === 'ar' ? 'تم اختيار الفائز وحفظه!' : 'Winner selected and saved!');
    } catch (err) {
      toast.error(language === 'ar' ? 'فشل اختيار الفائز.' : 'Failed to pick winner.');
      console.error(err);
    } finally {
      setLoading(false);
      setRolling(false);
    }
  };

  return (
    <div className="text-center space-y-6">
      <div className="text-5xl">🏆</div>
      <div>
        <h4 className="font-heading text-xl text-gold mb-1">{competition.title}</h4>
        <p className="text-gray-400 text-sm">{t('admin_comps_prize')}: {competition.prize}</p>
      </div>

      {!winner ? (
        <>
          {rolling ? (
            <motion.div
              className="py-8"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 0.5, repeat: Infinity, ease: 'linear' }}
            >
              <FaDice size={48} className="text-gold mx-auto" />
            </motion.div>
          ) : (
            <p className="text-gray-400 text-sm">
              {t('admin_comps_winner_text')}
            </p>
          )}

          <button
            onClick={pickWinner}
            disabled={loading}
            className="btn-gold w-full flex items-center justify-center gap-2 cursor-pointer"
          >
            <FaDice size={18} />
            {loading ? t('admin_comps_winner_selecting') : t('admin_comps_winner_pick')}
          </button>
        </>
      ) : (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="card-dark p-6 border-gold"
        >
          <p className="text-gold-accent mb-3">🎉 {t('admin_comps_winner_success')}</p>
          <p className="font-heading text-3xl text-white mb-1">{winner.fullName}</p>
          <p className="text-gold text-lg">{winner.phone}</p>
          <p className="text-gray-500 text-xs mt-3">{t('admin_comps_winner_saved')}</p>
        </motion.div>
      )}

      <button onClick={onClose} className="btn-outline w-full py-2 cursor-pointer">{t('admin_comps_winner_close')}</button>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function AdminCompetitions() {
  const { data: competitions, loading } = useCollection('competitions');
  const { t, language } = useLanguage();
  const [modalOpen, setModalOpen] = useState(false);
  const [winnerModalOpen, setWinnerModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [selectedComp, setSelectedComp] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const openCreate = () => {
    setEditItem(null);
    setForm(EMPTY_FORM);
    setModalOpen(true);
  };

  const openEdit = (comp) => {
    setEditItem(comp);
    setForm({
      title: comp.title || '',
      description: comp.description || '',
      prize: comp.prize || '',
      endDate: comp.endDate
        ? (comp.endDate.toDate ? format(comp.endDate.toDate(), 'yyyy-MM-dd') : comp.endDate)
        : '',
      active: comp.active !== false,
    });
    setModalOpen(true);
  };

  const openWinnerPicker = (comp) => {
    setSelectedComp(comp);
    setWinnerModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.prize) {
      toast.error(language === 'ar' ? 'العنوان والوصف والجائزة مطلوبة.' : 'Title, description, and prize are required.');
      return;
    }
    setSaving(true);
    try {
      const data = {
        title: form.title.trim(),
        description: form.description.trim(),
        prize: form.prize.trim(),
        endDate: form.endDate ? new Date(form.endDate) : null,
        active: form.active,
      };
      if (editItem) {
        await updateDocument('competitions', editItem.id, data);
        toast.success(language === 'ar' ? 'تم تحديث المسابقة!' : 'Competition updated!');
      } else {
        await addDocument('competitions', data);
        toast.success(language === 'ar' ? 'تم إنشاء المسابقة!' : 'Competition created!');
      }
      setModalOpen(false);
    } catch {
      toast.error(language === 'ar' ? 'فشلت عملية الحفظ.' : 'Save failed.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm(t('admin_comps_confirm_delete'))) return;
    try {
      await deleteDocument('competitions', id);
      toast.success(language === 'ar' ? 'تم حذف المسابقة.' : 'Competition deleted.');
    } catch {
      toast.error(language === 'ar' ? 'فشلت عملية الحذف.' : 'Delete failed.');
    }
  };

  const handleToggle = async (comp) => {
    try {
      await updateDocument('competitions', comp.id, { active: !comp.active });
      toast.success(
        language === 'ar'
          ? `تم ${comp.active ? 'إيقاف' : 'تفعيل'} المسابقة.`
          : `Competition ${comp.active ? 'deactivated' : 'activated'}.`
      );
    } catch {
      toast.error(language === 'ar' ? 'فشل التحديث.' : 'Update failed.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-3xl text-white tracking-wider">
            {t('admin_comps_manage')}
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            {competitions.length} {t('admin_comps_total')}
          </p>
        </div>
        <button onClick={openCreate} className="btn-gold py-2 px-5 text-sm flex items-center gap-2 cursor-pointer">
          <MdAdd size={18} /> {t('admin_comps_new')}
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {loading ? (
          <p className="col-span-full text-center text-gray-500 py-12">{t('admin_table_loading')}</p>
        ) : competitions.length === 0 ? (
          <p className="col-span-full text-center text-gray-600 py-12">{t('admin_comps_no')}</p>
        ) : (
          competitions.map((comp, i) => (
            <motion.div
              key={comp.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className={`card-dark overflow-hidden ${comp.active !== false ? 'border-gold/30' : ''}`}
            >
              <div className="h-1 bg-gold-gradient" />
              <div className="p-5 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-heading text-lg text-white tracking-wider leading-tight">{comp.title}</h3>
                  <button onClick={() => handleToggle(comp)} className="shrink-0 cursor-pointer">
                    {comp.active !== false
                      ? <MdToggleOn size={28} className="text-gold" />
                      : <MdToggleOff size={28} className="text-gray-600" />
                    }
                  </button>
                </div>
                <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">{comp.description}</p>
                <div className="flex items-center gap-2 text-xs">
                  <FaTrophy size={12} className="text-gold" />
                  <span className="text-gold">{comp.prize}</span>
                </div>
                {comp.endDate && (
                  <p className="text-gray-600 text-xs">
                    {t('admin_comps_ends')}: {comp.endDate.toDate
                      ? format(comp.endDate.toDate(), 'MMM d, yyyy')
                      : comp.endDate}
                  </p>
                )}
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => openWinnerPicker(comp)}
                    className="flex-1 flex items-center justify-center gap-1 py-2 text-xs cursor-pointer
                               border border-gold/50 text-gold hover:bg-gold hover:text-black transition-all uppercase tracking-wider"
                  >
                    <FaDice size={12} /> {t('admin_comps_pick_winner')}
                  </button>
                  <button
                    onClick={() => openEdit(comp)}
                    className="p-2 text-gray-400 hover:text-gold border border-dark-400 hover:border-gold/50 transition-colors cursor-pointer"
                  >
                    <MdEdit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(comp.id)}
                    className="p-2 text-gray-400 hover:text-red-400 border border-dark-400 hover:border-red-400/50 transition-colors cursor-pointer"
                  >
                    <MdDelete size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Create/Edit Modal */}
      <CrudModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editItem ? t('admin_comps_edit') : t('admin_comps_create')}
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">
              {t('admin_comps_form_title')}
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
              placeholder="Competition name"
              className="input-dark"
              required
            />
          </div>
          <div>
            <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">
              {t('admin_comps_form_desc')}
            </label>
            <textarea
              value={form.description}
              onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
              placeholder="Describe the competition..."
              rows={3}
              className="input-dark resize-none"
              required
            />
          </div>
          <div>
            <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">
              {t('admin_comps_form_prize')}
            </label>
            <input
              type="text"
              value={form.prize}
              onChange={(e) => setForm((p) => ({ ...p, prize: e.target.value }))}
              placeholder="e.g. Free Annual Membership + EGP 5000"
              className="input-dark"
              required
            />
          </div>
          <div>
            <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">
              {t('admin_comps_form_end')}
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
              id="comp-active"
              checked={form.active}
              onChange={(e) => setForm((p) => ({ ...p, active: e.target.checked }))}
              className="accent-gold w-4 h-4"
            />
            <label htmlFor="comp-active" className="text-gray-300 text-sm cursor-pointer">
              {t('admin_comps_form_active')}
            </label>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving} className="btn-gold flex-1 py-3 cursor-pointer">
              {saving ? t('admin_offers_saving') : editItem ? t('admin_comps_update') : t('admin_comps_save')}
            </button>
            <button type="button" onClick={() => setModalOpen(false)} className="btn-outline flex-1 py-3 cursor-pointer">
              {t('admin_offers_cancel')}
            </button>
          </div>
        </form>
      </CrudModal>

      {/* Winner Modal */}
      <CrudModal
        isOpen={winnerModalOpen}
        onClose={() => setWinnerModalOpen(false)}
        title={t('admin_comps_winner_title')}
      >
        {selectedComp && (
          <WinnerModal
            competition={selectedComp}
            onClose={() => setWinnerModalOpen(false)}
          />
        )}
      </CrudModal>
    </div>
  );
}
