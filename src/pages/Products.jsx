import { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

import SEO from '../components/SEO';
import PageTransition from '../components/PageTransition';
import ProductCard from '../components/ProductCard';

// TODO: Install @stripe/react-stripe-js and @stripe/js when npm is available
// npm install @stripe/react-stripe-js @stripe/js

const products = [
  {
    id: 'prod_beard_oil',
    name: 'Premium Beard Oil',
    description: 'Aceite de barba importado de Italia. Hidrata y suaviza. Aroma woody.',
    price: 2500, // €25.00 in cents
    image: '/assets/images/beard-oil.jpg',
    stripePriceId: 'price_...' // Set when creating product in Stripe
  },
  {
    id: 'prod_balm',
    name: 'Styling Balm',
    description: 'Bálsamo de estilismo profesional. Hold fuerte sin restos blancos.',
    price: 1800, // €18.00
    image: '/assets/images/balm.jpg',
    stripePriceId: 'price_...'
  },
  {
    id: 'prod_comb',
    name: 'Wooden Comb',
    description: 'Peine de madera de roble. Ideal para barba. Antiestatico.',
    price: 1500, // €15.00
    image: '/assets/images/comb.jpg',
    stripePriceId: 'price_...'
  },
  {
    id: 'prod_clay',
    name: 'Matte Clay',
    description: 'Arcilla mate para cabello. Textura natural, hold duradero.',
    price: 2200, // €22.00
    image: '/assets/images/clay.jpg',
    stripePriceId: 'price_...'
  },
];

export default function Products() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const handleBuy = (product) => {
    setSelectedProduct(product);
    setCheckoutOpen(true);
    // TODO: Implement Stripe checkout
    // For now, show placeholder message
    alert(`Producto seleccionado: ${product.name}\n\nProximamente podras pagar con Stripe.\nLa entrega sera en persona con Leo en tu cita.`);
  };

  return (
    <PageTransition>
      <SEO
        title="Productos | 3Triple Creo · Barbería Premium Madrid"
        description="Tienda de productos de barbería: aceites, bálsamos, peines y arcillas. Entrega en persona en tu próxima cita con Leo."
        canonical="https://blendz-leo.com/productos"
      />

      {/* ══════════════════════════════════════ HERO */}
      <section style={{
        minHeight: '50vh',
        display: 'flex',
        alignItems: 'center',
        padding: '0 5%',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '100px',
        background: 'linear-gradient(135deg, rgba(5,5,5,1) 0%, rgba(10,6,8,1) 100%)',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 75% 50%, rgba(255,107,157,0.06) 0%, transparent 60%)',
          zIndex: 0,
        }} />

        <div style={{ maxWidth: '800px', position: 'relative', zIndex: 10 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="section-label">
              Tienda Exclusiva
            </p>
            <h1 className="section-title" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>
              Productos de<br />
              <span style={{ fontStyle: 'italic', color: '#ffb6c1' }}>Barbería Profesional</span>
            </h1>
            <p style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '1rem',
              color: 'rgba(255,255,255,0.45)',
              maxWidth: '500px',
              lineHeight: 1.8,
              marginTop: '1.5rem',
            }}>
              Selecciona los productos que deseas. Leo te los entregará en persona en tu próxima cita. Pago seguro via Stripe.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════ PRODUCTS GRID */}
      <section style={{
        padding: '6rem 5%',
        background: '#050505',
      }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem',
              marginBottom: '4rem',
            }}
          >
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onBuy={handleBuy}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════ PROCESS */}
      <section style={{
        padding: '6rem 5%',
        background: '#0a0608',
        borderTop: '1px solid rgba(255,182,193,0.1)',
      }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p className="section-label" style={{ justifyContent: 'center' }}>
              Cómo Funciona
            </p>
            <h2 className="section-title">
              Tres pasos <br/>
              <span style={{ fontStyle: 'italic', color: '#ffb6c1' }}>hasta tu puerta</span>
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
          }}>
            {[
              { num: '01', title: 'Selecciona', desc: 'Elige los productos que quieres. Paga de forma segura via Stripe.' },
              { num: '02', title: 'Confirma', desc: 'Recibirás confirmación por email de tu pedido.' },
              { num: '03', title: 'Recibe', desc: 'Leo te entrega los productos en persona en tu próxima cita.' },
            ].map((step, i) => (
              <motion.div
                key={i}
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                viewport={{ once: true }}
                style={{
                  textAlign: 'center',
                }}
              >
                <div style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '2.5rem',
                  color: '#ffb6c1',
                  fontStyle: 'italic',
                  marginBottom: '0.5rem',
                }}>
                  {step.num}
                </div>
                <h3 style={{
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: '1.1rem',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  marginBottom: '0.8rem',
                }}>
                  {step.title}
                </h3>
                <p style={{
                  color: 'rgba(255,255,255,0.45)',
                  fontSize: '0.9rem',
                  lineHeight: 1.6,
                }}>
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════ CTA */}
      <section style={{
        padding: '6rem 5%',
        textAlign: 'center',
        background: '#050505',
        borderTop: '1px solid rgba(255,182,193,0.1)',
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 className="section-title">
            ¿Preguntas?
          </h2>
          <p style={{
            color: 'rgba(255,255,255,0.45)',
            fontSize: '1rem',
            marginBottom: '2rem',
            lineHeight: 1.8,
          }}>
            Contacta con Leo via WhatsApp o en tu próxima cita en el estudio.
          </p>
          <a
            href="https://wa.me/34623433448?text=Hola%20Leo%2C%20tengo%20preguntas%20sobre%20los%20productos"
            target="_blank"
            rel="noreferrer"
            className="btn-primary"
          >
            Escribir por WhatsApp
          </a>
        </div>
      </section>
    </PageTransition>
  );
}
