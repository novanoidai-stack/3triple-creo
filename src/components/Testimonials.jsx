import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    text: 'El único barbero en millas a la redonda capaz de clavar un skin fade real. El nivel de detalle es obsesivo.',
    author: 'Carlos O.',
    role: 'Cliente Verificado · Madrid',
  },
  {
    id: 2,
    text: 'No es cortarte el pelo, es una experiencia de principio a fin. Leo se toma su tiempo para analizar qué te queda bien.',
    author: 'David M.',
    role: 'Cliente Frecuente · Hortaleza',
  },
  {
    id: 3,
    text: 'Un estudio donde desconectas por completo. Productos de altísima calidad y un trato que te hace sentir en un club privado.',
    author: 'Javier S.',
    role: 'Cliente Verificado · Madrid',
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section style={{
      padding: '10rem 5%',
      background: '#0a0608',
      borderTop: '1px solid rgba(255,182,193,0.1)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Giant decorative quote */}
      <div aria-hidden="true" style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -55%)',
        fontFamily: "'Playfair Display', serif",
        fontSize: 'clamp(14rem, 30vw, 22rem)',
        color: 'rgba(255,182,193,0.025)',
        lineHeight: 1,
        pointerEvents: 'none',
        userSelect: 'none',
        zIndex: 0,
      }}>
        "
      </div>

      <div style={{
        position: 'relative',
        zIndex: 1,
        textAlign: 'center',
        maxWidth: '780px',
        margin: '0 auto',
      }}>
        <p className="section-label" style={{ justifyContent: 'center' }}>
          La Voz de la Experiencia
        </p>

        <div style={{ minHeight: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{ width: '100%' }}
            >
              <blockquote style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(1.3rem, 2.8vw, 2rem)',
                fontWeight: 400,
                fontStyle: 'italic',
                lineHeight: 1.55,
                marginBottom: '2.5rem',
                color: '#ffffff',
              }}>
                "{testimonials[current].text}"
              </blockquote>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.2rem' }}>
                <div style={{ width: '40px', height: '1px', background: '#ffb6c1', flexShrink: 0 }} />
                <div>
                  <p style={{
                    fontFamily: "'Oswald', sans-serif",
                    fontSize: '1rem',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    margin: 0,
                    color: '#ffffff',
                  }}>
                    {testimonials[current].author}
                  </p>
                  <p style={{
                    color: '#ffb6c1',
                    fontSize: '0.72rem',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    margin: '0.3rem 0 0',
                  }}>
                    {testimonials[current].role}
                  </p>
                </div>
                <div style={{ width: '40px', height: '1px', background: '#ffb6c1', flexShrink: 0 }} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '3rem' }}>
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              aria-label={`Testimonio ${idx + 1}`}
              style={{
                width: current === idx ? '28px' : '8px',
                height: '8px',
                borderRadius: '4px',
                background: current === idx ? '#ffb6c1' : 'rgba(255,182,193,0.2)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.35s ease',
                padding: 0,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
