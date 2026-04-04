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
        transition={{ duration: 0.5, delay: 2.2 }}
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
          gap: '1rem',
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "'Oswald', sans-serif",
            fontSize: 'clamp(2.5rem, 7vw, 4rem)',
            fontWeight: 700,
            letterSpacing: '4px',
            color: '#ffffff',
            textTransform: 'uppercase',
          }}
        >
          3Triple Creo
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            color: '#ffb6c1',
          }}
        >
          Blendz Leo
        </motion.div>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '80px' }}
          transition={{ duration: 0.8, delay: 0.8 }}
          style={{ height: '1px', background: '#ffb6c1' }}
        />
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.5, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          style={{
            fontFamily: "'Oswald', sans-serif",
            fontSize: '0.65rem',
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
