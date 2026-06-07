// src/components/common/WhatsAppButton.jsx
import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { useLanguage } from '../../context/LanguageContext';

export default function WhatsAppButton() {
  const { language } = useLanguage();
  const number = import.meta.env.VITE_WHATSAPP_NUMBER || '201234567890';
  const textMsg = language === 'ar'
    ? 'مرحباً! أنا مهتم بالاشتراك في جيم كوستا.'
    : "Hello! I'm interested in joining Costa Gym.";
  const message = encodeURIComponent(textMsg);

  return (
    <motion.a
      href={`https://wa.me/${number}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full
                 flex items-center justify-center shadow-lg shadow-green-900/40
                 hover:shadow-green-500/30"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: 'spring', stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.9 }}
    >
      <FaWhatsapp size={28} color="#fff" />
      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
    </motion.a>
  );
}

