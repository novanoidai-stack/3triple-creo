import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function IntroScreen() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem('3tc_intro');
    if (!seen) setShow(true);
  }, []);

  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="intro"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, delay: 2.4 }}
        onAnimationComplete={() => {
          sessionStorage.setItem('3tc_intro', '1');
          setShow(false);
        }}
        style={{
          position: 'fixed',
          inset: 0,
          background: '#050505',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
        }}
      >
        {/* Glow de fondo */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 50%, rgba(255,107,157,0.07) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: 'relative', zIndex: 1 }}
        >
          <img
            src="/assets/images/WhatsApp Image 2026-04-01 at 20.30.03.jpeg"
            alt="3pleL"
            style={{
              height: 'clamp(260px, 50vw, 420px)',
              objectFit: 'contain',
              filter: 'brightness(1.05)',
            }}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
