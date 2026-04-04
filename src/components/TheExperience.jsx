import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    title: 'El Diagnóstico',
    desc: 'Análisis exhaustivo de tu fisionomía craneal, tipo de cabello y crecimiento capilar. No es un corte al azar, es un estudio de visagismo aplicado.',
  },
  {
    number: '02',
    title: 'La Ejecución',
    desc: 'Tratamiento milimétrico donde la máquina se vuelve extensión matemática. Transiciones invisibles en Skin Fade y perfilado arquitectónico de barba.',
  },
  {
    number: '03',
    title: 'El Acabado',
    desc: 'Sellado del estilo con productos premium, lavado terapéutico y asesoría personalizada para mantener el look hasta la próxima visita.',
  },
];

export default function TheExperience() {
  const sectionRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const stepEls = sectionRef.current?.querySelectorAll('[data-step-idx]') || [];

    stepEls.forEach((el) => {
      const idx = parseInt(el.getAttribute('data-step-idx'), 10);
      ScrollTrigger.create({
        trigger: el,
        start: 'top 55%',
        onEnter: () => setActiveStep(idx),
        onEnterBack: () => setActiveStep(idx),
      });
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section ref={sectionRef} style={{
      padding: '8rem 5%',
      background: '#050505',
      borderTop: '1px solid rgba(255,182,193,0.08)',
      borderBottom: '1px solid rgba(255,182,193,0.08)',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
          <p className="section-label" style={{ justifyContent: 'center' }}>
            Santuario Masculino
          </p>
          <h2 className="section-title">
            Más que un corte,<br />
            <span style={{ fontStyle: 'italic', color: '#ffb6c1' }}>un ritual de autor</span>
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '5rem',
          alignItems: 'start',
        }}>
          {/* Steps column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            style={{ display: 'flex', flexDirection: 'column', gap: '0' }}
          >
            {steps.map((step, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                data-step-idx={i}
                style={{
                  display: 'flex',
                  gap: '2rem',
                  alignItems: 'flex-start',
                  padding: '2.5rem 0',
                  borderBottom: i < steps.length - 1 ? '1px solid rgba(255,182,193,0.06)' : 'none',
                  opacity: activeStep === i ? 1 : 0.35,
                  transition: 'opacity 0.4s ease',
                }}
              >
                <div style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '3.5rem',
                  color: activeStep === i ? '#ffb6c1' : 'rgba(255,182,193,0.4)',
                  lineHeight: 1,
                  fontStyle: 'italic',
                  minWidth: '65px',
                  transition: 'color 0.4s ease',
                }}>
                  {step.number}
                </div>
                <div>
                  <h3 style={{
                    fontFamily: "'Oswald', sans-serif",
                    fontSize: '1.15rem',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    marginBottom: '0.7rem',
                    color: activeStep === i ? '#ffffff' : 'rgba(255,255,255,0.6)',
                    transition: 'color 0.4s ease',
                  }}>
                    {step.title}
                  </h3>
                  <p style={{
                    color: 'rgba(255,255,255,0.4)',
                    fontSize: '0.92rem',
                    lineHeight: 1.75,
                  }}>
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Visual column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: 'relative', top: '2rem' }}
          >
            <div style={{
              position: 'relative',
              background: 'linear-gradient(135deg, #1a0f12, #0a0608)',
              aspectRatio: '3/4',
              border: '1px solid rgba(255,182,193,0.1)',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <img
                src="/assets/images/barber_profile.png"
                alt="Blendz Leo — Barbero de Autor Madrid Hortaleza"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'contrast(1.1) saturate(0.85)',
                }}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />

              {/* Glow overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(5,5,5,0.6) 0%, transparent 50%)',
              }} />
            </div>

            {/* Badge */}
            <div style={{
              position: 'absolute',
              top: '-12px',
              right: '-12px',
              background: 'linear-gradient(135deg, #cca43b, #f3d47d)',
              color: '#000',
              padding: '0.5rem 1.2rem',
              fontFamily: "'Oswald', sans-serif",
              fontWeight: 700,
              fontSize: '0.7rem',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              boxShadow: '0 5px 20px rgba(204,164,59,0.35)',
            }}>
              CUM LAUDE
            </div>

            {/* Pink glow bottom-left */}
            <div style={{
              position: 'absolute',
              bottom: '-30px',
              left: '-30px',
              width: '200px',
              height: '200px',
              background: 'radial-gradient(circle, rgba(255,107,157,0.12), transparent 70%)',
              pointerEvents: 'none',
            }} />
          </motion.div>
        </div>

        {/* Responsive grid fix */}
        <style>{`
          @media (max-width: 768px) {
            .experience-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </section>
  );
}
