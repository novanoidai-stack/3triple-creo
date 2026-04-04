import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import SEO from '../components/SEO';

export default function Portfolio() {
  const images = [
    "premium_haircut.png", // Ai generated ultra-luxury cut as hero hook
    "WhatsApp Image 2026-04-01 at 20.33.26.jpeg",
    "WhatsApp Image 2026-04-01 at 20.33.26 (1).jpeg",
    "WhatsApp Image 2026-04-01 at 20.33.26 (2).jpeg",
    "WhatsApp Image 2026-04-01 at 20.33.26 (3).jpeg",
    "WhatsApp Image 2026-04-01 at 20.33.26 (4).jpeg"
  ];

  const galleryVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <PageTransition>
      <SEO
        title="Portafolio | Trabajos Reales · Blendz Leo Barbería Madrid"
        description="Galería de cortes reales: Skin Fade, diseño de barba, texturas avanzadas. Barbería de autor en Hortaleza, Madrid."
        canonical="https://blendz-leo.com/portafolio"
      />
      <section className="container" style={{ paddingTop: '5rem', paddingBottom: '6rem' }}>
        
        {/* Authority Head */}
        <div style={{
          background: 'var(--black-surface)',
          padding: '4rem',
          borderRadius: '8px',
          border: '1px solid var(--glass-border)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '4rem',
          alignItems: 'center',
          marginBottom: '8rem',
          boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
        }}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 style={{ fontSize: '3rem', marginBottom: '1rem', lineHeight: 1.1 }}>
              TÉCNICA AVALADA POR LA <span className="text-accent">ÉLITE</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '2rem', lineHeight: 1.6 }}>
              No dejes tu imagen al azar. Mi capacitación en la prestigiosa <strong>Blend School</strong> asegura que aplicamos matemáticas, geometría craneal y un trato exclusivo de visagismo en cada tijeretazo.
            </p>
          </motion.div>
          <motion.div 
            initial={{ rotate: -5, opacity: 0, scale: 0.9 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            transition={{ type: 'spring', bounce: 0.5, delay: 0.4 }}
            style={{ position: 'relative' }}
          >
            <img 
              src="/assets/images/barber_profile.png" 
              alt="Blendz Leo - Profesional" 
              style={{ width: '100%', borderRadius: '4px', filter: 'contrast(1.1)', boxShadow: '0 10px 40px rgba(224, 0, 105, 0.4)' }}
            />
            <div style={{
              position: 'absolute',
              top: '-15px', right: '-15px',
              background: 'linear-gradient(45deg, #cca43b, #f3d47d)',
              color: '#000',
              padding: '0.5rem 1rem',
              fontFamily: 'Oswald',
              fontWeight: 700,
              fontSize: '1rem',
              letterSpacing: '1px',
              borderRadius: '2px',
              boxShadow: '0 5px 15px rgba(204, 164, 59, 0.4)'
            }}>
              CUM LAUDE 
            </div>
          </motion.div>
        </div>

        {/* SEO Grid Intro */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p className="brand-font text-accent" style={{ letterSpacing: '4px' }}>CORTES 100% REALES</p>
          <h2 style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)' }}>NUESTRO TRABAJO</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', marginTop: '1rem' }}>
            Explora algunos de los trabajos realizados en nuestro estudio. Desde el skin fade perfecto hasta texturas avanzadas.
          </p>
        </div>

        <motion.div 
          className="gallery-grid"
          variants={galleryVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '2rem'
          }}
        >
          {images.map((img, i) => (
            <motion.div 
              key={i}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05, 
                zIndex: 10,
                boxShadow: '0 25px 50px -12px rgba(224, 0, 105, 0.25)' 
              }}
              style={{
                aspectRatio: '4/5',
                background: '#0a0a0a',
                overflow: 'hidden',
                borderRadius: '8px',
                position: 'relative'
              }}
            >
              <img 
                src={`/assets/images/${img}`} 
                alt="Degradado perfecto Barbería Blendz By Leo" 
                style={{
                  width: '100%', height: '100%',
                  objectFit: 'cover',
                  filter: 'grayscale(50%) contrast(1.1)',
                  transition: 'filter 0.5s ease'
                }}
                onMouseOver={e => e.currentTarget.style.filter = 'grayscale(0%) contrast(1.1)'}
                onMouseOut={e => e.currentTarget.style.filter = 'grayscale(50%) contrast(1.1)'}
              />
            </motion.div>
          ))}
        </motion.div>
      </section>
    </PageTransition>
  );
}
