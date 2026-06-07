// src/components/sections/FreeTrialForm.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { addDocument } from '../../hooks/useFirestore';
import SectionTitle from '../common/SectionTitle';
import toast from 'react-hot-toast';
import { MdSend } from 'react-icons/md';

const GOALS = ['Weight Loss', 'Muscle Building', 'Endurance', 'General Fitness', 'Athletic Performance'];

export default function FreeTrialForm() {
  const [form, setForm] = useState({ fullName: '', phone: '', age: '', goal: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.fullName || !form.phone || !form.age || !form.goal) {
      toast.error('Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
      await addDocument('trial_registrations', {
        fullName: form.fullName.trim(),
        phone: form.phone.trim(),
        age: Number(form.age),
        goal: form.goal,
      });
      setSubmitted(true);
      toast.success('Registration submitted! We\'ll contact you shortly.');
    } catch (err) {
      toast.error('Failed to submit. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="free-trial" className="section-padding bg-dark-100 noise-overlay">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-gold-accent mb-3">Limited Time</p>
            <h2 className="section-title mb-6">
              FREE<br />
              <span className="text-gold-shimmer">7-DAY</span><br />
              TRIAL
            </h2>
            <p className="text-gray-400 leading-relaxed mb-8 text-lg">
              Experience the Elite difference — no commitment, no credit card.
              Register now and one of our coaches will reach out to set up your first session.
            </p>
            <ul className="space-y-3">
              {[
                'Full gym access for 7 days',
                'Free initial fitness assessment',
                'Personalized workout plan',
                'Nutrition consultation session',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-300">
                  <div className="w-5 h-5 border border-gold rotate-45 flex items-center justify-center shrink-0">
                    <div className="w-2 h-2 bg-gold rotate-0" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {submitted ? (
              <div className="card-dark p-12 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className="w-20 h-20 border-2 border-gold rotate-45 mx-auto mb-6 flex items-center justify-center"
                >
                  <span className="text-gold text-3xl -rotate-45">✓</span>
                </motion.div>
                <h3 className="font-heading text-3xl text-gold mb-3">Success!</h3>
                <p className="text-gray-400">
                  Your free trial is registered. We'll contact you within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-outline mt-8 py-2 px-6 text-sm"
                >
                  Register Another
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="card-dark p-8 space-y-5"
              >
                <h3 className="font-heading text-2xl text-white tracking-wider mb-2">
                  Register For Free Trial
                </h3>
                <div className="h-px bg-dark-400" />

                <div>
                  <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className="input-dark"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+20 1XX XXX XXXX"
                    className="input-dark"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">
                    Age *
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={form.age}
                    onChange={handleChange}
                    placeholder="Your age"
                    min="14"
                    max="80"
                    className="input-dark"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">
                    Fitness Goal *
                  </label>
                  <select
                    name="goal"
                    value={form.goal}
                    onChange={handleChange}
                    className="input-dark appearance-none cursor-pointer"
                    required
                  >
                    <option value="" disabled>Select your goal</option>
                    {GOALS.map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-gold w-full flex items-center justify-center gap-3 mt-2"
                >
                  {loading ? (
                    <span className="animate-pulse">Submitting...</span>
                  ) : (
                    <>
                      <MdSend size={18} />
                      Claim Free Trial
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
