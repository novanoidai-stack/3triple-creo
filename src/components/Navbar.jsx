import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { to: '/', label: 'LA EXPERIENCIA' },
  { to: '/perfil', label: 'FIRMA PERSONAL' },
  { to: '/portafolio', label: 'PORTAFOLIO' },
  { to: '/productos', label: 'PRODUCTOS' },
  { to: '/contacto', label: 'AGENDA TU CITA', accent: true },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Cerrar menu mobile al cambiar ruta
  useEffect(() => {
    setMobileOpen(false);
  }, []);

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  const linkVariants = {
    hidden: { x: 30, opacity: 0 },
    visible: (i) => ({
      x: 0,
      opacity: 1,
      transition: { delay: i * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] },
    }),
    exit: (i) => ({
      x: 30,
      opacity: 0,
      transition: { delay: i * 0.04, duration: 0.2 },
    }),
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{
          padding: '1.2rem 5%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'fixed',
          width: '100%',
          top: 0,
          zIndex: 200,
          background: scrolled
            ? 'rgba(5, 5, 5, 0.96)'
            : 'rgba(5, 5, 5, 0.7)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          borderBottom: scrolled
            ? '1px solid rgba(255, 182, 193, 0.1)'
            : '1px solid rgba(255,255,255,0.03)',
          transition: 'background 0.4s ease, border-color 0.4s ease',
        }}
      >
        {/* Logo */}
        <NavLink to="/" style={{ height: '38px', display: 'block' }}>
          <img
            src="/assets/images/WhatsApp Image 2026-04-01 at 20.30.03.jpeg"
            alt="Blendz Leo"
            style={{ height: '100%', objectFit: 'contain' }}
          />
        </NavLink>

        {/* Desktop Links */}
        <div
          style={{
            display: 'flex',
            gap: '2.5rem',
            alignItems: 'center',
          }}
          className="nav-desktop"
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              style={({ isActive }) => ({
                fontFamily: "'Oswald', sans-serif",
                letterSpacing: '1.5px',
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                color: link.accent
                  ? '#ffb6c1'
                  : isActive
                  ? '#ffffff'
                  : 'rgba(255,255,255,0.7)',
                position: 'relative',
                transition: 'color 0.3s',
                paddingBottom: '2px',
              })}
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Abrir menú"
          className="nav-hamburger"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'none',
            flexDirection: 'column',
            gap: '5px',
            width: '28px',
            padding: 0,
          }}
        >
          <motion.span
            animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
            style={{ display: 'block', width: '100%', height: '2px', background: '#ffb6c1' }}
          />
          <motion.span
            animate={mobileOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            style={{ display: 'block', width: '70%', height: '2px', background: '#ffffff' }}
          />
          <motion.span
            animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
            style={{ display: 'block', width: '100%', height: '2px', background: '#ffffff' }}
          />
        </button>
      </motion.nav>

      {/* Mobile Fullscreen Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(5, 5, 5, 0.97)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              zIndex: 199,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'center',
              paddingLeft: '10%',
              paddingTop: '80px',
              gap: '0.5rem',
            }}
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.to}
                custom={i}
                variants={linkVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  onClick={() => setMobileOpen(false)}
                  style={({ isActive }) => ({
                    display: 'block',
                    fontFamily: "'Oswald', sans-serif",
                    fontSize: 'clamp(1.8rem, 5vw, 2.5rem)',
                    letterSpacing: '3px',
                    textTransform: 'uppercase',
                    color: isActive || link.accent ? '#ffb6c1' : '#ffffff',
                    borderLeft: isActive
                      ? '3px solid #ffb6c1'
                      : '3px solid transparent',
                    paddingLeft: '1.5rem',
                    paddingTop: '0.8rem',
                    paddingBottom: '0.8rem',
                    transition: 'all 0.3s',
                    lineHeight: 1.2,
                  })}
                >
                  {link.label}
                </NavLink>
              </motion.div>
            ))}

            {/* Bottom info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{
                position: 'absolute',
                bottom: '3rem',
                left: '10%',
              }}
            >
              <p style={{
                fontFamily: "'Oswald', sans-serif",
                fontSize: '0.65rem',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                color: 'rgba(255,182,193,0.4)',
              }}>
                Madrid, Hortaleza · @blendz.leo
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
