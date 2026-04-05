import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import SEO from '../components/SEO';

const haircuts = [
  "WhatsApp Image 2026-04-01 at 20.33.26.jpeg",
  "WhatsApp Image 2026-04-01 at 20.33.26 (1).jpeg",
  "WhatsApp Image 2026-04-01 at 20.33.26 (2).jpeg",
  "WhatsApp Image 2026-04-01 at 20.33.26 (3).jpeg",
  "WhatsApp Image 2026-04-01 at 20.33.26 (4).jpeg",
  "WhatsApp Image 2026-04-01 at 20.36.59.jpeg",
  "WhatsApp Image 2026-04-01 at 20.36.59 (1).jpeg",
  "WhatsApp Image 2026-04-01 at 20.36.59 (2).jpeg",
];

const formacion = [
  "WhatsApp Image 2026-04-01 at 20.39.44.jpeg",
  "WhatsApp Image 2026-04-01 at 20.40.03.jpeg",
  "barber_profile.png",
  "WhatsApp Image 2026-04-01 at 20.30.03 (1).jpeg",
];

const galleryVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 30 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

function GalleryGrid({ images, ratio = '4/5' }) {
  return (
    <motion.div
      variants={galleryVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-50px' }}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '1.5rem',
      }}
    >
      {images.map((img, i) => (
        <motion.div
          key={i}
          variants={itemVariants}
          whileHover={{ scale: 1.03, zIndex: 10, boxShadow: '0 20px 40px rgba(255,107,157,0.2)' }}
          style={{
            aspectRatio: ratio,
            background: '#0a0a0a',
            overflow: 'hidden',
            borderRadius: '6px',
            position: 'relative',
          }}
        >
          <img
            src={`/assets/images/${img}`}
            alt="3pleL Barbería Madrid — Fade y corte de autor"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'top center',
              filter: 'grayscale(40%) contrast(1.08)',
              transition: 'filter 0.5s ease, transform 0.5s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.filter = 'grayscale(0%) contrast(1.05)';
              e.currentTarget.style.transform = 'scale(1.04)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.filter = 'grayscale(40%) contrast(1.08)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}

export default function Portfolio() {
  return (
    <PageTransition>
      <SEO
        title="Portafolio | Trabajos Reales · 3pleL Barbería Madrid"
        description="Galería de cortes reales: Fade, afro, diseño de barba. Formación Blend School. Barbería de autor en Hortaleza, Madrid."
        canonical="https://blendz-leo.com/portafolio"
      />

      <section className="container" style={{ paddingTop: '5rem', paddingBottom: '6rem' }}>

        {/* ── Nuestros Cortes ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '5rem' }}
        >
          <p style={{
            fontFamily: "'Oswald', sans-serif",
            fontSize: '0.7rem',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            color: '#ffb6c1',
            marginBottom: '0.8rem',
          }}>
            Cortes 100% reales
          </p>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: 400,
            marginBottom: '0.5rem',
            lineHeight: 1.1,
          }}>
            Nuestro Trabajo
          </h2>
          <p style={{
            color: 'rgba(255,255,255,0.4)',
            fontSize: '0.95rem',
            maxWidth: '520px',
            lineHeight: 1.75,
            marginBottom: '3rem',
          }}>
            Fades, afros y diseño de barba. Cada corte empieza con un diagnóstico y termina con productos de la gama Octyl.
          </p>
          <GalleryGrid images={haircuts} ratio="4/5" />
        </motion.div>

        {/* Divider */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '2rem',
          marginBottom: '5rem',
        }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,182,193,0.1)' }} />
          <span style={{
            fontFamily: "'Oswald', sans-serif",
            fontSize: '0.6rem',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            color: 'rgba(255,182,193,0.35)',
            whiteSpace: 'nowrap',
          }}>
            ✦
          </span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,182,193,0.1)' }} />
        </div>

        {/* ── Formación ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p style={{
            fontFamily: "'Oswald', sans-serif",
            fontSize: '0.7rem',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            color: '#ffb6c1',
            marginBottom: '0.8rem',
          }}>
            Formación
          </p>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: 400,
            marginBottom: '0.5rem',
            lineHeight: 1.1,
          }}>
            Blend School
          </h2>
          <p style={{
            color: 'rgba(255,255,255,0.4)',
            fontSize: '0.95rem',
            maxWidth: '520px',
            lineHeight: 1.75,
            marginBottom: '3rem',
          }}>
            Formación especializada en técnicas avanzadas de fade, afro y visagismo. La base que garantiza que cada corte en el estudio está fundamentado en criterio y precisión.
          </p>
          <GalleryGrid images={formacion} ratio="3/4" />
        </motion.div>

      </section>
    </PageTransition>
  );
}
