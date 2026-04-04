import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import SEO from '../components/SEO';
import { useState } from 'react';

export default function Booking() {

  const menuItems = [
    { name: "The Signature Blend", desc: "Corte de Autor + Visagismo + Perfilado de Cejas", price: "7.00€" },
    { name: "The Executive Cut", desc: "Corte Full + Diseño Arquitectónico de Barba", price: "8.50€" },
    { name: "The Classic Beard", desc: "Esculpido y Ritual de Toalla Caliente (Solo Barba)", price: "5.00€" }
  ];

  return (
    <PageTransition>
      <SEO
        title="Reserva tu Cita | Blendz Leo Barbería Madrid Hortaleza"
        description="Agenda tu cita en Blendz Leo, barbería premium en Hortaleza, Madrid. 20% de descuento en tu primer corte. Reserva por Google Calendar o WhatsApp."
        canonical="https://blendz-leo.com/contacto"
      />
      <section className="container" style={{ padding: '8rem 0' }}>
        <div style={{
          maxWidth: '1000px',
          margin: '0 auto',
        }}>
          
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <p className="brand-font text-accent" style={{ letterSpacing: '4px', marginBottom: '1rem' }}>RESERVA TU ESPACIO</p>
            <h1 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', marginBottom: '2rem', lineHeight: 1 }}>PASAPORTE A LA ÉLITE</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto', lineHeight: 1.8 }}>
              No te conformes con lo de siempre. Transforma tu presencia hoy mismo. Revisa nuestro menú de autor y selecciona la experiencia que mejor encaje contigo.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '4rem',
            marginBottom: '4rem'
          }}>
            {/* Michelin-Style Menu */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.05)',
                padding: '3rem 2rem',
                borderRadius: '8px',
                position: 'relative'
              }}
            >
              <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translate(-50%, -50%)', background: 'var(--black-deep)', padding: '0 1rem', color: 'var(--fuchsia-neon)', fontFamily: 'Oswald', letterSpacing: '2px' }}>
                MENÚ DE AUTOR
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {menuItems.map((item, idx) => (
                  <div key={idx} style={{ position: 'relative' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '0.5rem' }}>
                      <h4 style={{ fontSize: '1.2rem', fontFamily: 'Oswald', textTransform: 'uppercase', letterSpacing: '1px', margin: 0, background: 'var(--black-surface)', paddingRight: '10px', zIndex: 2 }}>{item.name}</h4>
                      <div style={{ flexGrow: 1, borderBottom: '1px dotted rgba(255,255,255,0.2)', position: 'relative', top: '-6px', zIndex: 1 }}></div>
                      <span style={{ fontSize: '1.2rem', fontFamily: 'Oswald', color: 'var(--pink-light)', background: 'var(--black-surface)', paddingLeft: '10px', zIndex: 2 }}>{item.price}</span>
                    </div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>{item.desc}</p>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontStyle: 'italic', marginBottom: '1rem' }}>
                  * Servicio a Domicilio disponible: +3.00€ suplemento por cada 5km.
                </p>
                <div style={{
                  background: '#ffb6c1',
                  color: '#050505',
                  padding: '0.5rem 1.2rem',
                  display: 'inline-block',
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  marginTop: '1rem',
                }}>
                  20% DESCUENTO — PRIMER CORTE
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '2rem', justifyContent: 'center' }}
            >
              <a 
                href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3SFyoiJyuV_iBozPx1_rSB1PM02plqaWWhOlsLhEcEM5A2O6Mdt-gfO593TKUQGtWR3Qw_lY37?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQPNTY3MDY3MzQzMzUyNDI3AAGnWhe-14AAi0aFsWMuSZ3Dz3eh1wAakBjng8K1x1EYNVDplynHafFIZb5EdbE_aem_-Ugsl42hp04JC892xSOKVg"
                target="_blank"
                rel="noreferrer"
                className="btn-solid"
                style={{ width: '100%', padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', background: 'var(--fuchsia-neon)', color: '#fff', textDecoration: 'none' }}
              >
                <i className="fa-regular fa-calendar-check" style={{ fontSize: '2.5rem' }}></i>
                <span style={{ fontSize: '1.2rem', letterSpacing: '2px' }}>ACCEDER AL CALENDARIO</span>
              </a>

              <div style={{ textAlign: 'center', position: 'relative' }}>
                <span style={{ background: 'var(--black-deep)', padding: '0 15px', color: 'var(--text-secondary)', fontSize: '0.9rem', position: 'relative', zIndex: 2 }}>O PREFIERES UN TRATO PERSONAL</span>
                <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: 'rgba(255,255,255,0.1)', zIndex: 1 }}></div>
              </div>

              <a 
                href="https://wa.me/34623433448?text=Hola%20Leo,%20me%20gustar%C3%ADa%20consultar%20disponibilidad%20para%20un%20corte" 
                target="_blank" 
                rel="noreferrer"
                className="btn-outline"
                style={{ width: '100%', padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}
              >
                <i className="fa-brands fa-whatsapp" style={{ fontSize: '2.5rem' }}></i>
                <span style={{ fontSize: '1.2rem', letterSpacing: '2px' }}>CONSERJERÍA WHATSAPP</span>
              </a>
            </motion.div>
          </div>

          {/* Embedded Calendar removed in favor of direct redirect link for higher conversion rates */}

        </div>
      </section>
    </PageTransition>
  );
}
