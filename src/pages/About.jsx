import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import SEO from '../components/SEO';

export default function About() {
  return (
    <PageTransition>
      <SEO
        title="Firma Personal | Blendz Leo — Barbero de Autor Madrid"
        description="Conoce a Leo, barbero certificado Blend School Cum Laude en Hortaleza, Madrid. Experto en Skin Fade, visagismo y corte de autor. Motilla del Palancar 33."
        canonical="https://blendz-leo.com/perfil"
      />
      <section className="container" style={{ padding: '6rem 0' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '6rem',
          alignItems: 'center'
        }}>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: 'relative' }}
          >
            <img 
              src="/assets/images/leo_studio_dark.png" 
              alt="Blendz Leo - Estudio Premium de Autor" 
              style={{
                width: '100%',
                maxHeight: '85vh',
                objectFit: 'cover',
                filter: 'contrast(1.1)',
                boxShadow: '0 20px 50px rgba(0,0,0,0.8)'
              }}
            />
            {/* Decal */}
            <div style={{
              position: 'absolute',
              bottom: '-20px',
              right: '-30px',
              border: '1px solid var(--fuchsia-neon)',
              padding: '2rem',
              background: 'var(--black-surface)',
              zIndex: -1,
              width: '100%',
              height: '100%'
            }} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p className="brand-font text-accent" style={{ letterSpacing: '4px', marginBottom: '1rem' }}>
              CEO Y FUNDADOR
            </p>
            {/* SEO Local Keyword H2 */}
            <h2 style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', lineHeight: 1, marginBottom: '2rem' }}>
              BLENDZ LEO
            </h2>
            
            <p style={{ color: 'var(--text-primary)', fontSize: '1.3rem', marginBottom: '2rem', lineHeight: 1.8, fontStyle: 'italic', fontWeight: 300 }}>
              "Manejar la máquina cualquiera lo hace. Leer al cliente y esculpir su identidad es lo que separa un simple peluquero de un artista."
            </p>

            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '1.5rem', lineHeight: 1.8 }}>
              Ubicado en <strong>Motilla del Palancar 33</strong>, mi estudio no es una barbería convencional. Lo diferencial aquí es el trato verdaderamente cercano y la forma de encajar el corte que quieres con total tranquilidad, ofreciendo confianza absoluta.
            </p>

            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '3rem', lineHeight: 1.8 }}>
              Si buscas resultados pulidos, transiciones de Skin Fade a navaja invisibles y un entorno de alta fidelidad, mi estudio es tu próximo destino fijo. 
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>
              <a href="https://instagram.com/blendz.leo" target="_blank" rel="noreferrer" className="btn-solid">
                <i className="fa-brands fa-instagram" style={{ marginRight: '10px' }}></i> SÍGUEME EN IG
              </a>
              <img 
                src="/assets/images/WhatsApp Image 2026-04-01 at 20.30.03 (1).jpeg" 
                alt="Firma de Blendz Leo" 
                style={{ height: '60px', filter: 'invert(1) opacity(0.4)' }} 
              />
            </div>
          </motion.div>
          
        </div>
      </section>
    </PageTransition>
  );
}
