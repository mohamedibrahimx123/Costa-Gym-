// src/components/common/SectionTitle.jsx
import { motion } from 'framer-motion';

export default function SectionTitle({ accent, title, subtitle, center = true }) {
  return (
    <motion.div
      className={`mb-16 ${center ? 'text-center' : ''}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {accent && (
        <p className="text-gold-accent mb-3 font-accent tracking-widest">{accent}</p>
      )}
      <h2 className="section-title">{title}</h2>
      <div className={`flex items-center gap-3 my-4 ${center ? 'justify-center' : ''}`}>
        <div className="h-px w-12 bg-gold" />
        <div className="w-1.5 h-1.5 bg-gold rotate-45" />
        <div className="h-px w-12 bg-gold" />
      </div>
      {subtitle && (
        <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed mt-4">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
