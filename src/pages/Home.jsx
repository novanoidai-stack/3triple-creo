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

        {/* Content — 2 columnas */}
        <div style={{
          width: '100%',
          maxWidth: '1200px',
          position: 'relative',
          zIndex: 10,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'center',
          paddingBottom: '4rem',
        }}
          className="hero-grid"
        >
          {/* ── Columna izquierda ── */}
          <div>
            {/* Tag */}
            <motion.div
              variants={fadeUp}
              custom={0.1}
              initial="hidden"
              animate="visible"
              style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '2rem' }}
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
            </motion.div>

            {/* Logo principal */}
            <motion.div variants={fadeUp} custom={0.15} initial="hidden" animate="visible"
              style={{ marginBottom: '1.5rem' }}>
              <img
                src="/assets/images/WhatsApp Image 2026-04-01 at 20.30.03.jpeg"
                alt="3pleL — Barbería de Autor Madrid"
                style={{ height: 'clamp(120px, 18vw, 180px)', objectFit: 'contain', filter: 'brightness(1.1)' }}
              />
            </motion.div>

            {/* Eslogan secundario */}
            <motion.div variants={fadeUp} custom={0.28} initial="hidden" animate="visible">
              <p style={{
                fontFamily: "'Oswald', sans-serif",
                fontSize: 'clamp(0.85rem, 2vw, 1.1rem)',
                letterSpacing: '6px',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.45)',
                marginBottom: '2rem',
              }}>
                Estilo y precisión
              </p>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              variants={fadeUp}
              custom={0.42}
              initial="hidden"
              animate="visible"
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '1rem',
                color: 'rgba(255,255,255,0.45)',
                maxWidth: '420px',
                lineHeight: 1.8,
                marginBottom: '2.5rem',
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
              custom={0.55}
              initial="hidden"
              animate="visible"
              style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '12px' }}
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
              custom={0.65}
              initial="hidden"
              animate="visible"
              style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}
            >
              <button
                className="btn-primary"
                onClick={() => navigate('/contacto')}
              >
                Reservar Cita →
              </button>
              <button
                className="btn-ghost"
                onClick={() => navigate('/portafolio')}
              >
                Ver Trabajos
              </button>
            </motion.div>
          </div>

          {/* ── Columna derecha: foto ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: 'relative' }}
          >
            {/* Marco con foto */}
            <div style={{
              position: 'relative',
              aspectRatio: '3/4',
              borderRadius: '4px',
              overflow: 'hidden',
              border: '1px solid rgba(255,182,193,0.12)',
            }}>
              <img
                src="/assets/images/barber_profile.png"
                alt="3pleL — Leo, barbero de autor en Madrid"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'top center',
                  filter: 'contrast(1.08) saturate(0.9)',
                }}
                onError={(e) => {
                  e.currentTarget.src = '/assets/images/WhatsApp Image 2026-04-05 at 16.16.04 (1).jpeg';
                }}
              />
              {/* Gradiente inferior */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '40%',
                background: 'linear-gradient(to top, rgba(5,5,5,0.75), transparent)',
              }} />
              {/* Texto inferior */}
              <div style={{
                position: 'absolute',
                bottom: '1.5rem',
                left: '1.5rem',
              }}>
                <p style={{
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: '0.6rem',
                  letterSpacing: '4px',
                  textTransform: 'uppercase',
                  color: 'rgba(255,182,193,0.7)',
                  marginBottom: '0.2rem',
                }}>
                  Formación Blesson
                </p>
                <p style={{
                  fontFamily: "'Playfair Display', serif",
                  fontStyle: 'italic',
                  fontSize: '1.1rem',
                  color: '#fff',
                }}>
                  Leo · Hortaleza, Madrid
                </p>
              </div>
            </div>

            {/* Badge flotante */}
            <div style={{
              position: 'absolute',
              top: '-14px',
              right: '-14px',
              background: 'linear-gradient(135deg, #cca43b, #f3d47d)',
              color: '#000',
              padding: '0.5rem 1.1rem',
              fontFamily: "'Oswald', sans-serif",
              fontWeight: 700,
              fontSize: '0.65rem',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              boxShadow: '0 4px 20px rgba(204,164,59,0.3)',
            }}>
              FORMACIÓN
            </div>

            {/* Glow rosa */}
            <div style={{
              position: 'absolute',
              bottom: '-40px',
              left: '-40px',
              width: '220px',
              height: '220px',
              background: 'radial-gradient(circle, rgba(255,107,157,0.1), transparent 70%)',
              pointerEvents: 'none',
            }} />
          </motion.div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .hero-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
            .hero-grid > div:last-child { display: none; }
          }
        `}</style>

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
