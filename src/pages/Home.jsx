import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import SEO from '../components/SEO';
import PageTransition from '../components/PageTransition';
import ParticleField from '../components/ParticleField';
import TheExperience from '../components/TheExperience';
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const navigate = useNavigate();
  const statsRef = useRef(null);

  useEffect(() => {
    // GSAP CountUp para números de stats
    const counters = statsRef.current?.querySelectorAll('[data-count]') || [];
    counters.forEach((el) => {
      const target = parseInt(el.getAttribute('data-count'), 10);
      gsap.fromTo(
        el,
        { textContent: 0 },
        {
          textContent: target,
          duration: 2,
          ease: 'power2.out',
          snap: { textContent: 1 },
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            toggleActions: 'play none none reset',
          },
          onUpdate() {
            el.textContent = Math.round(parseFloat(el.textContent));
          },
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'HairSalon',
    name: 'Blendz Leo',
    description: 'Barbería de autor especializada en Skin Fade y visagismo en Madrid',
    telephone: '+34623433448',
    url: 'https://blendz-leo.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Motilla del Palancar 33',
      addressLocality: 'Hortaleza',
      addressRegion: 'Madrid',
      postalCode: '28043',
      addressCountry: 'ES',
    },
    sameAs: ['https://instagram.com/blendz.leo'],
    priceRange: '€€',
    openingHours: ['Mo-Su 10:00-20:00'],
    areaServed: { '@type': 'City', name: 'Madrid' },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '50',
    },
  };

  return (
    <PageTransition>
      <SEO
        title="Barbería Premium Madrid Hortaleza · Skin Fade & Visagismo"
        description="3pleL: barbería de autor en Hortaleza, Madrid. Especialistas en Skin Fade, diseño de barba y visagismo. Formación Blesson. 20% dto primer corte."
        canonical="https://blendz-leo.com"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      </Helmet>

      {/* ══════════════════════════════════════ HERO */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '0 5%',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '80px',
      }}>
        {/* Radial glow background */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 75% 50%, rgba(255,107,157,0.08) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(255,182,193,0.05) 0%, transparent 50%)',
          zIndex: 0,
        }} />

        {/* Grid lines */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background:
            'repeating-linear-gradient(90deg,transparent,transparent 80px,rgba(255,182,193,0.018) 80px,rgba(255,182,193,0.018) 81px), repeating-linear-gradient(0deg,transparent,transparent 80px,rgba(255,182,193,0.018) 80px,rgba(255,182,193,0.018) 81px)',
          zIndex: 0,
        }} />

        {/* Particles full hero */}
        <ParticleField density="medium" />

        {/* Fotos de cortes reales — decoración lateral */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', overflow: 'hidden' }}>
          {/* Foto derecha arriba */}
          <motion.div
            initial={{ opacity: 0, x: 60, rotate: 6 }}
            animate={{ opacity: 1, x: 0, rotate: 4 }}
            transition={{ duration: 1.4, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute',
              top: '12%',
              right: '-2%',
              width: 'clamp(140px, 16vw, 220px)',
              aspectRatio: '4/5',
              borderRadius: '4px',
              overflow: 'hidden',
              border: '1px solid rgba(255,182,193,0.15)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            }}
          >
            <img src="/assets/images/WhatsApp Image 2026-04-05 at 16.16.04 (1).jpeg"
              alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', filter: 'grayscale(30%) contrast(1.05)', opacity: 0.7 }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(5,5,5,0.6))' }} />
          </motion.div>

          {/* Foto derecha abajo */}
          <motion.div
            initial={{ opacity: 0, x: 40, rotate: -3 }}
            animate={{ opacity: 1, x: 0, rotate: -5 }}
            transition={{ duration: 1.4, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute',
              bottom: '14%',
              right: '5%',
              width: 'clamp(110px, 12vw, 170px)',
              aspectRatio: '4/5',
              borderRadius: '4px',
              overflow: 'hidden',
              border: '1px solid rgba(255,182,193,0.1)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            }}
          >
            <img src="/assets/images/WhatsApp Image 2026-04-05 at 16.16.04 (2).jpeg"
              alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', filter: 'grayscale(30%) contrast(1.05)', opacity: 0.6 }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(5,5,5,0.6))' }} />
          </motion.div>

          {/* Foto izquierda */}
          <motion.div
            initial={{ opacity: 0, x: -40, rotate: 3 }}
            animate={{ opacity: 1, x: 0, rotate: 5 }}
            transition={{ duration: 1.4, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute',
              bottom: '18%',
              left: '-1%',
              width: 'clamp(100px, 11vw, 155px)',
              aspectRatio: '4/5',
              borderRadius: '4px',
              overflow: 'hidden',
              border: '1px solid rgba(255,182,193,0.1)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            }}
          >
            <img src="/assets/images/WhatsApp Image 2026-04-01 at 20.33.26.jpeg"
              alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', filter: 'grayscale(30%) contrast(1.05)', opacity: 0.55 }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(5,5,5,0.6))' }} />
          </motion.div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .hero-deco { display: none !important; }
          }
        `}</style>

        {/* Content — centrado */}
        <div style={{
          width: '100%',
          maxWidth: '820px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          paddingBottom: '5rem',
        }}>
          {/* Tag */}
          <motion.div
            variants={fadeUp}
            custom={0.1}
            initial="hidden"
            animate="visible"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', marginBottom: '2.5rem' }}
          >
            <div className="animate-pulse" style={{
              width: '7px', height: '7px', borderRadius: '50%', background: '#ffb6c1', flexShrink: 0,
            }} />
            <span style={{
              fontFamily: "'Oswald', sans-serif",
              fontSize: '0.7rem',
              letterSpacing: '4px',
              textTransform: 'uppercase',
              color: '#ffb6c1',
            }}>
              Barbería de Autor · Madrid, Hortaleza
            </span>
            <div className="animate-pulse" style={{
              width: '7px', height: '7px', borderRadius: '50%', background: '#ffb6c1', flexShrink: 0,
            }} />
          </motion.div>

          {/* Logo principal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{ marginBottom: '1rem' }}
          >
            <img
              src="/assets/images/WhatsApp Image 2026-04-01 at 20.30.03.jpeg"
              alt="3pleL — Barbería de Autor Madrid"
              style={{ height: 'clamp(130px, 20vw, 210px)', objectFit: 'contain', filter: 'brightness(1.1)' }}
            />
          </motion.div>

          {/* Autor */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            style={{ marginBottom: '1.2rem' }}
          >
            <p style={{
              fontFamily: "'Great Vibes', cursive",
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              color: 'rgba(255,182,193,0.65)',
              lineHeight: 1,
            }}>
              by Blendz Leo
            </p>
          </motion.div>

          {/* Línea decorativa animada */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '80px' }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{ height: '1px', background: 'linear-gradient(90deg, transparent, #ffb6c1, transparent)', margin: '0 auto 2rem' }}
          />

          {/* Eslogan */}
          <motion.p
            variants={fadeUp}
            custom={0.5}
            initial="hidden"
            animate="visible"
            style={{
              fontFamily: "'Oswald', sans-serif",
              fontSize: 'clamp(0.75rem, 1.5vw, 0.95rem)',
              letterSpacing: '6px',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.35)',
              marginBottom: '2rem',
            }}
          >
            Estilo y precisión
          </motion.p>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            custom={0.6}
            initial="hidden"
            animate="visible"
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '1.05rem',
              color: 'rgba(255,255,255,0.45)',
              maxWidth: '520px',
              margin: '0 auto 2.5rem',
              lineHeight: 1.85,
            }}
          >
            Maestría en{' '}
            <strong style={{ color: '#ffffff', fontWeight: 600 }}>Fade, diseño de barba y afro</strong>.
            {' '}El estudio donde tu imagen se convierte en{' '}
            <strong style={{ color: '#ffffff', fontWeight: 600 }}>una obra de autor</strong>.
          </motion.p>

          {/* Promo badge */}
          <motion.div
            variants={fadeUp}
            custom={0.7}
            initial="hidden"
            animate="visible"
            style={{ marginBottom: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}
          >
            <span style={{
              background: 'var(--pink)',
              color: '#000',
              padding: '0.3rem 0.8rem',
              fontSize: '0.7rem',
              fontFamily: "'Oswald', sans-serif",
              fontWeight: 700,
              letterSpacing: '2px',
              textTransform: 'uppercase',
            }}>
              PRIMER CORTE
            </span>
            <span style={{
              color: '#ffffff',
              fontSize: '0.9rem',
              fontFamily: "'Oswald', sans-serif",
              letterSpacing: '2px',
            }}>
              20% DE DESCUENTO
            </span>
          </motion.div>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            custom={0.8}
            initial="hidden"
            animate="visible"
            style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}
          >
            <motion.button
              className="btn-primary"
              onClick={() => navigate('/contacto')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              style={{
                fontSize: '0.9rem',
                padding: '1.2rem 3rem',
                letterSpacing: '3px',
                boxShadow: '0 0 30px rgba(255,107,157,0.35), 0 0 60px rgba(255,107,157,0.15)',
                animation: 'heroBtnPulse 3s ease-in-out infinite',
              }}
            >
              Reservar Cita →
            </motion.button>
            <button
              className="btn-ghost"
              onClick={() => navigate('/portafolio')}
            >
              Ver Trabajos
            </button>
            <style>{`
              @keyframes heroBtnPulse {
                0%, 100% { box-shadow: 0 0 30px rgba(255,107,157,0.35), 0 0 60px rgba(255,107,157,0.15); }
                50% { box-shadow: 0 0 45px rgba(255,107,157,0.6), 0 0 90px rgba(255,107,157,0.25); }
              }
            `}</style>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute',
          bottom: '2.5rem',
          left: '5%',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          zIndex: 20,
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
        }}>
          <div className="animate-scroll-indicator" style={{
            width: '60px',
            height: '1px',
            background: 'linear-gradient(90deg, #ffb6c1, transparent)',
          }} />
          <span style={{
            fontFamily: "'Oswald', sans-serif",
            fontSize: '0.6rem',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.35)',
          }}>
            Scroll para descubrir
          </span>
        </div>
      </section>

      {/* ══════════════════════════════════════ STATS */}
      <div ref={statsRef} style={{
        background: '#0a0608',
        borderTop: '1px solid rgba(255,182,193,0.1)',
        borderBottom: '1px solid rgba(255,182,193,0.1)',
        padding: '3rem 5%',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
        gap: '2rem',
      }}>
        {[
          { value: 500, suffix: '+', label: 'Clientes Satisfechos', isCount: true },
          { value: '5.0', prefix: '★ ', label: 'Valoración Media', isCount: false },
          { value: 'Formación', label: 'Blesson Cert.', isCount: false },
          { value: 'Madrid', label: 'Hortaleza · Motilla 33', isCount: false },
        ].map((stat, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.6rem, 3vw, 2.5rem)',
              color: '#ffb6c1',
              lineHeight: 1,
              fontStyle: 'italic',
            }}>
              {stat.isCount ? (
                <>
                  <span data-count={stat.value}>0</span>{stat.suffix}
                </>
              ) : (
                <>{stat.prefix}{stat.value}</>
              )}
            </div>
            <div style={{
              fontFamily: "'Oswald', sans-serif",
              fontSize: '0.6rem',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.4)',
              marginTop: '0.5rem',
            }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* ══════════════════════════════════════ EXPERIENCE */}
      <TheExperience />

      {/* ══════════════════════════════════════ CTA */}
      <section style={{
        padding: '10rem 5%',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: '#050505',
      }}>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          width: '700px',
          height: '500px',
          background: 'radial-gradient(ellipse, rgba(255,107,157,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '700px', margin: '0 auto' }}>
          <p className="section-label" style={{ justifyContent: 'center' }}>
            Reserva Exclusiva
          </p>
          <h2 className="section-title" style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', marginBottom: '1rem' }}>
            Tu próxima cita<br />
            <span style={{ fontStyle: 'italic', color: '#ffb6c1' }}>te espera</span>
          </h2>
          <p style={{
            color: 'rgba(255,255,255,0.45)',
            fontSize: '1.05rem',
            maxWidth: '440px',
            margin: '0 auto 3rem',
            lineHeight: 1.8,
          }}>
            20% de descuento en tu primer corte. Plazas limitadas por semana.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3SFyoiJyuV_iBozPx1_rSB1PM02plqaWWhOlsLhEcEM5A2O6Mdt-gfO593TKUQGtWR3Qw_lY37"
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
            >
              Acceder al Calendario →
            </a>
            <a
              href="https://wa.me/34623433448?text=Hola%20Leo%2C%20me%20gustar%C3%ADa%20consultar%20disponibilidad"
              target="_blank"
              rel="noreferrer"
              className="btn-outline-pink"
            >
              WhatsApp Conserjería
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════ FOOTER */}
      <footer style={{
        padding: '4rem 5% 2rem',
        borderTop: '1px solid rgba(255,182,193,0.1)',
        background: '#050505',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '3rem',
          marginBottom: '3rem',
        }}>
          <div>
            <h3 style={{
              fontFamily: "'Great Vibes', cursive",
              fontSize: '2.2rem',
              color: '#ffffff',
              textTransform: 'none',
              marginBottom: '0.8rem',
            }}>
              Blendz Leo
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', lineHeight: 1.7, maxWidth: '260px' }}>
              Barbería de autor en Madrid, Hortaleza. Especialistas en Skin Fade, diseño de barba y visagismo de alta precisión.
            </p>
          </div>
          <div>
            <h4 style={{
              fontFamily: "'Oswald', sans-serif",
              fontSize: '0.65rem',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: '#ffb6c1',
              marginBottom: '1.2rem',
            }}>
              Estudio
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              {['La Experiencia', 'Firma Personal', 'Portafolio', 'Agenda tu Cita'].map((item) => (
                <li key={item} style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)' }}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 style={{
              fontFamily: "'Oswald', sans-serif",
              fontSize: '0.65rem',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: '#ffb6c1',
              marginBottom: '1.2rem',
            }}>
              Contacto
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              {['Motilla del Palancar 33', 'Hortaleza, Madrid', '@blendz.leo', '+34 623 433 448'].map((item) => (
                <li key={item} style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)' }}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 style={{
              fontFamily: "'Oswald', sans-serif",
              fontSize: '0.65rem',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: '#ffb6c1',
              marginBottom: '1.2rem',
            }}>
              Búsquedas
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              {['Barbería Madrid', 'Skin Fade Hortaleza', 'Barbero Premium Madrid', 'Diseño de Barba Madrid'].map((item) => (
                <li key={item} style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.25)' }}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div style={{
          paddingTop: '2rem',
          borderTop: '1px solid rgba(255,182,193,0.06)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.25)' }}>
            © 2026 Blendz Leo Studio · Madrid, España
          </p>
          <span style={{
            fontFamily: "'Oswald', sans-serif",
            fontSize: '0.6rem',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: 'rgba(255,182,193,0.25)',
            border: '1px solid rgba(255,182,193,0.1)',
            padding: '0.3rem 0.8rem',
          }}>
            Schema.org LocalBusiness
          </span>
        </div>
      </footer>
    </PageTransition>
  );
}
