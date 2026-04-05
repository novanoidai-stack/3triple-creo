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
          flexDirection: 'column',
          gap: '0.75rem',
        }}
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src="/assets/images/WhatsApp Image 2026-04-01 at 20.30.03.jpeg"
            alt="3pleL"
            style={{
              height: 'clamp(120px, 22vw, 200px)',
              objectFit: 'contain',
              filter: 'brightness(1.05)',
            }}
          />
        </motion.div>

        {/* Línea divisora */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '60px' }}
          transition={{ duration: 0.7, delay: 0.7 }}
          style={{ height: '1px', background: '#ffb6c1' }}
        />

        {/* Subtítulo */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 0.5, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          style={{
            fontFamily: "'Oswald', sans-serif",
            fontSize: '0.6rem',
            letterSpacing: '5px',
            textTransform: 'uppercase',
            color: '#ffb6c1',
          }}
        >
          Barbería de Autor · Madrid
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
}
