// src/components/common/LogoIntro.jsx
// Cinematic logo reveal animation shown on first site load

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import logoImg from '../../assets/WhatsApp Image 2026-06-06 at 8.00.22 PM.jpeg';

export default function LogoIntro({ onComplete }) {
  const { t } = useLanguage();
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Hide intro after animation completes
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(onComplete, 600);
    }, 3200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{ background: '#0A0A0A' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {/* Panoramic background sweep */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="absolute inset-0 panorama-sweep"
              style={{
                background: `
                  radial-gradient(ellipse at 20% 50%, rgba(212,175,55,0.08) 0%, transparent 60%),
                  radial-gradient(ellipse at 80% 50%, rgba(212,175,55,0.05) 0%, transparent 60%),
                  linear-gradient(180deg, #0A0A0A 0%, #111111 50%, #0A0A0A 100%)
                `,
              }}
            />
            {/* Gold light streaks */}
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0, x: '-100%' }}
              animate={{ opacity: [0, 0.6, 0], x: ['-100%', '200%'] }}
              transition={{ duration: 2, delay: 0.5, ease: 'easeOut' }}
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.15), transparent)',
                transform: 'skewX(-20deg)',
              }}
            />
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0, x: '-100%' }}
              animate={{ opacity: [0, 0.3, 0], x: ['-100%', '200%'] }}
              transition={{ duration: 2, delay: 0.8, ease: 'easeOut' }}
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.1), transparent)',
                transform: 'skewX(-20deg)',
              }}
            />
          </motion.div>

          {/* Floating particles */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-gold"
              style={{
                left: `${10 + i * 8}%`,
                top: `${20 + (i % 4) * 20}%`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 0.8, 0],
                scale: [0, 1, 0],
                y: [0, -40],
              }}
              transition={{
                duration: 2,
                delay: 0.3 + i * 0.1,
                ease: 'easeOut',
              }}
            />
          ))}

          {/* Main Logo */}
          <div className="relative z-10 text-center">
            {/* Top line */}
            <motion.div
              className="w-px h-16 bg-gold mx-auto mb-6"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ transformOrigin: 'top' }}
            />

            {/* Logo Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6, filter: 'blur(20px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
              className="relative w-44 h-44 md:w-52 md:h-52 mx-auto mb-6 rounded-full overflow-hidden border-2 border-gold shadow-[0_0_40px_rgba(212,175,55,0.4)]"
            >
              <img
                src={logoImg}
                alt="Costa Gym Logo"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Brand Name Text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <span className="block font-heading text-4xl md:text-5xl text-white tracking-widest uppercase mb-1">
                {t('brand_name')}
              </span>
            </motion.div>

            {/* Slogan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 0.8, y: 0 }}
              transition={{ duration: 0.8, delay: 1.3 }}
            >
              <span className="block font-accent text-sm md:text-base text-gold tracking-widest uppercase">
                {t('brand_subtitle')}
              </span>
            </motion.div>

            {/* Bottom line */}
            <motion.div
              className="w-px h-16 bg-gold mx-auto mt-6"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.6, delay: 1.6 }}
              style={{ transformOrigin: 'bottom' }}
            />
          </div>

          {/* Loading bar */}
          <motion.div
            className="absolute bottom-0 left-0 h-0.5 bg-gold"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 3, ease: 'easeInOut' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

