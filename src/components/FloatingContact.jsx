import { motion } from 'framer-motion';

export default function FloatingContact() {
  return (
    <motion.a
      href="https://wa.me/34623433448?text=Hola%20Leo,%20vengo%20de%20tu%20web"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar con Leo por WhatsApp"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 10 }}
      style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        background: 'var(--fuchsia-neon)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontSize: '30px',
        boxShadow: '0 4px 15px rgba(224, 0, 105, 0.4)',
        zIndex: 9999,
      }}
    >
      <i className="fa-brands fa-whatsapp"></i>
    </motion.a>
  );
}
