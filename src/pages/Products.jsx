import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import SEO from '../components/SEO';
import PageTransition from '../components/PageTransition';

// ─── EmailJS config ───────────────────────────────────────────────────────────
// 1. Entra en https://www.emailjs.com/ y crea una cuenta gratuita
// 2. Crea un servicio de email (conecta Gmail: leollorente347@gmail.com)
// 3. Crea una plantilla con las variables: {{from_name}}, {{from_contact}}, {{order_items}}, {{order_total}}
// 4. Sustituye los valores de abajo con los tuyos
const EMAILJS_SERVICE_ID  = 'service_3plel';       // reemplaza con tu Service ID
const EMAILJS_TEMPLATE_ID = 'template_pedido';     // reemplaza con tu Template ID
const EMAILJS_PUBLIC_KEY  = 'TU_PUBLIC_KEY_AQUI';  // reemplaza con tu Public Key
// ─────────────────────────────────────────────────────────────────────────────
// Para testear: cambia TO_EMAIL a 'novanoidai@gmail.com'
// Para producción: cambia TO_EMAIL a 'leollorente347@gmail.com'
const TO_EMAIL = 'novanoidai@gmail.com';

const PRICE = 13.2;

const products = [
  {
    id: 'sea-salt',
    name: 'Sea Salt',
    category: 'Estilismo',
    image: 'https://cdn.shopify.com/s/files/1/0962/6609/2882/files/WhatsAppImage2026-03-21at17.31.07.jpg?v=1774170853',
  },
  {
    id: 'polvos-volumen',
    name: 'Polvos de Volumen',
    category: 'Estilismo',
    image: 'https://cdn.shopify.com/s/files/1/0962/6609/2882/files/POLVOS_7be056e9-1bd3-4594-b4ae-c4059d5fc6e5.png?v=1772130677',
  },
  {
    id: 'mutant-powder',
    name: 'Cera en Polvo — Mutant Powder',
    category: 'Estilismo',
    image: 'https://cdn.shopify.com/s/files/1/0962/6609/2882/files/POLVOS_1_f6f3393c-fe32-4443-a354-b53df703a9d4.png?v=1772130677',
  },
  {
    id: 'cream',
    name: 'Cera Acabado Mate/Brillo — Cream',
    category: 'Estilismo',
    image: 'https://cdn.shopify.com/s/files/1/0962/6609/2882/files/4_119e53ba-1bfa-4786-99b0-a8612125fa63.png?v=1772130677',
  },
  {
    id: 'matte-wax',
    name: 'Cera Acabado Matte — Matte Wax',
    category: 'Estilismo',
    image: 'https://cdn.shopify.com/s/files/1/0962/6609/2882/files/6_6d7d7769-d669-4150-935d-319083d2d4f0.png?v=1772130677',
  },
  {
    id: 'pomade',
    name: 'Cera Acabado Brillo — Pomade',
    category: 'Estilismo',
    image: 'https://cdn.shopify.com/s/files/1/0962/6609/2882/files/5_3d81a4a7-dd83-4b47-8e48-0acabb6364fd.png?v=1772130677',
  },
  {
    id: 'phantom',
    name: 'Laca Phantom — Matte sin gas',
    category: 'Estilismo',
    image: 'https://cdn.shopify.com/s/files/1/0962/6609/2882/files/1_d159dfc6-fa92-4994-b342-7153ccecf975.png?v=1772130677',
  },
  {
    id: 'spray-volumen',
    name: 'Spray de Volumen — Agua de peinado',
    category: 'Estilismo',
    image: 'https://cdn.shopify.com/s/files/1/0962/6609/2882/files/CHAMPUS_f0c2c8e5-dd5b-4ff2-bdca-7370090680bb.png?v=1772130677',
  },
  {
    id: 'champu-antigrasa',
    name: 'Champú Antigrasa/Caspa',
    category: 'Cuidado',
    image: 'https://cdn.shopify.com/s/files/1/0962/6609/2882/files/13.png?v=1772130677',
  },
  {
    id: 'champu-anticaida',
    name: 'Champú Anti-Caída',
    category: 'Cuidado',
    image: 'https://cdn.shopify.com/s/files/1/0962/6609/2882/files/15_4c011913-f189-4b6c-8105-b722d6b21294.png?v=1772130677',
  },
  {
    id: 'champu-revitalizante',
    name: 'Champú Revitalizante',
    category: 'Cuidado',
    image: 'https://cdn.shopify.com/s/files/1/0962/6609/2882/files/14_2ef64c9d-d2af-48e0-a175-1fc6b8e99b2a.png?v=1772130677',
  },
  {
    id: 'gel-afeitado',
    name: 'Gel de Afeitado Transparente',
    category: 'Afeitado',
    image: 'https://cdn.shopify.com/s/files/1/0962/6609/2882/files/16_b8756add-f862-46e1-aac0-9bd35b650596.png?v=1772130677',
  },
  {
    id: 'aftershave',
    name: 'Aftershave',
    category: 'Afeitado',
    image: 'https://cdn.shopify.com/s/files/1/0962/6609/2882/files/hf_20260128_173333_ef822f19-0086-4fc7-b24e-ac659cc70d8a.png?v=1769621924',
  },
];

const categories = ['Todos', ...Array.from(new Set(products.map((p) => p.category)))];

function CartDrawer({ cart, onClose, onRemove, onQtyChange }) {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | ok | error

  const total = cart.reduce((sum, item) => sum + item.qty * PRICE, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const handleSend = async () => {
    if (!name.trim() || !contact.trim()) return;
    setStatus('sending');

    const orderLines = cart
      .map((item) => `• ${item.name} × ${item.qty} = ${(item.qty * PRICE).toFixed(2)}€`)
      .join('\n');

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          to_email: TO_EMAIL,
          from_name: name,
          from_contact: contact,
          order_items: orderLines,
          order_total: `${total.toFixed(2)}€`,
        },
        EMAILJS_PUBLIC_KEY,
      );
      setStatus('ok');
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('error');
    }
  };

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        width: 'min(420px, 100vw)',
        background: '#0a0608',
        borderLeft: '1px solid rgba(255,182,193,0.12)',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
      }}
    >
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1.5rem 1.8rem',
        borderBottom: '1px solid rgba(255,182,193,0.08)',
        position: 'sticky',
        top: 0,
        background: '#0a0608',
        zIndex: 10,
      }}>
        <div>
          <p style={{
            fontFamily: "'Oswald', sans-serif",
            fontSize: '0.65rem',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            color: '#ffb6c1',
            marginBottom: '0.2rem',
          }}>Octyl · 3pleL</p>
          <h3 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '1.4rem',
            fontWeight: 400,
          }}>Tu pedido ({itemCount})</h3>
        </div>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: '1px solid rgba(255,182,193,0.2)',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            cursor: 'pointer',
            color: '#ffb6c1',
            fontSize: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          ×
        </button>
      </div>

      {/* Cart items */}
      <div style={{ flex: 1, padding: '1.5rem 1.8rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {cart.length === 0 ? (
          <p style={{ color: 'rgba(255,255,255,0.3)', fontFamily: "'Outfit', sans-serif", textAlign: 'center', marginTop: '3rem' }}>
            El carrito está vacío
          </p>
        ) : (
          cart.map((item) => (
            <div key={item.id} style={{
              display: 'flex',
              gap: '1rem',
              alignItems: 'center',
              padding: '1rem',
              background: 'rgba(255,182,193,0.04)',
              borderRadius: '6px',
              border: '1px solid rgba(255,182,193,0.07)',
            }}>
              <img
                src={item.image}
                alt={item.name}
                style={{ width: '56px', height: '56px', objectFit: 'contain', borderRadius: '4px', background: '#111' }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: '0.8rem',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  marginBottom: '0.25rem',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}>
                  {item.name}
                </p>
                <p style={{ color: '#ffb6c1', fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: '1rem' }}>
                  {(item.qty * PRICE).toFixed(2)}€
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button onClick={() => onQtyChange(item.id, item.qty - 1)} style={qtyBtnStyle}>−</button>
                <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: '0.9rem', minWidth: '18px', textAlign: 'center' }}>{item.qty}</span>
                <button onClick={() => onQtyChange(item.id, item.qty + 1)} style={qtyBtnStyle}>+</button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Order form + total */}
      {cart.length > 0 && (
        <div style={{
          padding: '1.5rem 1.8rem',
          borderTop: '1px solid rgba(255,182,193,0.08)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.9rem',
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '0.5rem',
          }}>
            <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: '0.7rem', letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>
              Total
            </span>
            <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: '1.6rem', color: '#ffb6c1' }}>
              {total.toFixed(2)}€
            </span>
          </div>

          {status !== 'ok' ? (
            <>
              <input
                type="text"
                placeholder="Tu nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={inputStyle}
              />
              <input
                type="text"
                placeholder="WhatsApp o email"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                style={inputStyle}
              />
              <button
                onClick={handleSend}
                disabled={!name.trim() || !contact.trim() || status === 'sending'}
                className="btn-primary"
                style={{ width: '100%', opacity: (!name.trim() || !contact.trim()) ? 0.5 : 1 }}
              >
                {status === 'sending' ? 'Enviando...' : 'Solicitar pedido'}
              </button>
              {status === 'error' && (
                <p style={{ color: '#ff6b6b', fontFamily: "'Outfit', sans-serif", fontSize: '0.8rem', textAlign: 'center' }}>
                  Error al enviar. Escríbenos por WhatsApp.
                </p>
              )}
              <p style={{ color: 'rgba(255,255,255,0.25)', fontFamily: "'Outfit', sans-serif", fontSize: '0.72rem', textAlign: 'center', lineHeight: 1.5 }}>
                Leo confirmará tu pedido y te lo entrega en tu próxima cita.
              </p>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '1rem 0' }}>
              <p style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>✓</p>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', color: '#ffb6c1', marginBottom: '0.5rem' }}>
                ¡Pedido recibido!
              </p>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontFamily: "'Outfit', sans-serif", fontSize: '0.85rem' }}>
                Leo se pondrá en contacto contigo pronto.
              </p>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}

const qtyBtnStyle = {
  background: 'none',
  border: '1px solid rgba(255,182,193,0.2)',
  borderRadius: '4px',
  width: '26px',
  height: '26px',
  cursor: 'pointer',
  color: '#ffb6c1',
  fontSize: '0.9rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const inputStyle = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,182,193,0.15)',
  borderRadius: '4px',
  padding: '0.8rem 1rem',
  color: '#fff',
  fontFamily: "'Outfit', sans-serif",
  fontSize: '0.9rem',
  outline: 'none',
  width: '100%',
  boxSizing: 'border-box',
};

export default function Products() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [filter, setFilter] = useState('Todos');
  const [addedId, setAddedId] = useState(null);

  const filtered = filter === 'Todos' ? products : products.filter((p) => p.category === filter);
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === product.id);
      if (exists) return prev.map((i) => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  const removeItem = (id) => setCart((prev) => prev.filter((i) => i.id !== id));

  const changeQty = (id, qty) => {
    if (qty <= 0) return removeItem(id);
    setCart((prev) => prev.map((i) => i.id === id ? { ...i, qty } : i));
  };

  return (
    <PageTransition>
      <SEO
        title="Productos Octyl | Cosmética Premium · 3pleL Madrid"
        description="Gama Octyl a 13,20€ — ceras, champús, gel de afeitado y aftershave. Disponibles con tu corte en 3pleL, Hortaleza Madrid."
        canonical="https://blendz-leo.com/productos"
      />

      {/* ── Hero ── */}
      <section style={{
        minHeight: '52vh',
        display: 'flex',
        alignItems: 'center',
        padding: '0 5%',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '100px',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 70% 50%, rgba(255,107,157,0.07) 0%, transparent 60%)',
        }} />
        <div style={{ maxWidth: '750px', position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p style={{
              fontFamily: "'Oswald', sans-serif",
              fontSize: '0.65rem',
              letterSpacing: '5px',
              textTransform: 'uppercase',
              color: '#ffb6c1',
              marginBottom: '1rem',
            }}>
              Cosmética del estudio
            </p>
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              fontWeight: 400,
              lineHeight: 1.1,
              marginBottom: '1.2rem',
            }}>
              Gama <span style={{ fontStyle: 'italic', color: '#ffb6c1' }}>Octyl</span>
            </h1>
            <p style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '0.95rem',
              color: 'rgba(255,255,255,0.4)',
              maxWidth: '480px',
              lineHeight: 1.8,
            }}>
              Los mismos productos que usa Leo en el estudio, disponibles para ti. Añade lo que quieras y Leo te lo lleva a tu próxima cita.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Filter tabs ── */}
      <div style={{
        padding: '0 5% 2rem',
        display: 'flex',
        gap: '0.6rem',
        flexWrap: 'wrap',
      }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            style={{
              background: filter === cat ? '#ffb6c1' : 'transparent',
              border: '1px solid',
              borderColor: filter === cat ? '#ffb6c1' : 'rgba(255,182,193,0.2)',
              borderRadius: '100px',
              padding: '0.4rem 1.1rem',
              fontFamily: "'Oswald', sans-serif",
              fontSize: '0.65rem',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: filter === cat ? '#050505' : 'rgba(255,255,255,0.5)',
              cursor: 'pointer',
              transition: 'all 0.25s',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ── Products grid ── */}
      <section style={{ padding: '0 5% 8rem' }}>
        <motion.div
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {filtered.map((product, i) => {
            const inCart = cart.find((c) => c.id === product.id);
            const justAdded = addedId === product.id;
            return (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                whileHover={{ y: -6, boxShadow: '0 16px 40px rgba(255,107,157,0.12)' }}
                style={{
                  background: '#0a0608',
                  border: '1px solid rgba(255,182,193,0.08)',
                  borderRadius: '8px',
                  overflow: 'hidden',
                }}
              >
                {/* Image */}
                <div style={{
                  aspectRatio: '1/1',
                  background: '#111',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '1rem',
                }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      transition: 'transform 0.5s ease',
                    }}
                  />
                </div>

                {/* Info */}
                <div style={{ padding: '1.2rem' }}>
                  <p style={{
                    fontFamily: "'Oswald', sans-serif",
                    fontSize: '0.6rem',
                    letterSpacing: '3px',
                    textTransform: 'uppercase',
                    color: 'rgba(255,182,193,0.5)',
                    marginBottom: '0.4rem',
                  }}>
                    {product.category}
                  </p>
                  <h3 style={{
                    fontFamily: "'Oswald', sans-serif",
                    fontSize: '0.95rem',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    marginBottom: '0.8rem',
                    lineHeight: 1.3,
                    minHeight: '2.4rem',
                  }}>
                    {product.name}
                  </h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{
                      fontFamily: "'Playfair Display', serif",
                      fontStyle: 'italic',
                      fontSize: '1.4rem',
                      color: '#ffb6c1',
                    }}>
                      {PRICE.toFixed(2)}€
                    </span>
                    <motion.button
                      whileTap={{ scale: 0.93 }}
                      onClick={() => addToCart(product)}
                      style={{
                        background: justAdded ? '#ffb6c1' : 'transparent',
                        border: '1px solid #ffb6c1',
                        borderRadius: '4px',
                        padding: '0.5rem 1rem',
                        fontFamily: "'Oswald', sans-serif",
                        fontSize: '0.65rem',
                        letterSpacing: '2px',
                        textTransform: 'uppercase',
                        color: justAdded ? '#050505' : '#ffb6c1',
                        cursor: 'pointer',
                        transition: 'all 0.25s',
                        minWidth: '100px',
                      }}
                    >
                      {justAdded ? '✓ Añadido' : inCart ? `Añadir más (${inCart.qty})` : '+ Carrito'}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* ── Floating cart button ── */}
      <AnimatePresence>
        {cartCount > 0 && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCartOpen(true)}
            style={{
              position: 'fixed',
              bottom: '2rem',
              right: '2rem',
              background: 'linear-gradient(135deg, #ffb6c1, #ff6b9d)',
              border: 'none',
              borderRadius: '100px',
              padding: '1rem 1.8rem',
              fontFamily: "'Oswald', sans-serif",
              fontSize: '0.75rem',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: '#050505',
              fontWeight: 700,
              cursor: 'pointer',
              zIndex: 500,
              boxShadow: '0 8px 30px rgba(255,107,157,0.4)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
            }}
          >
            <span>Solicitar</span>
            <span style={{
              background: '#050505',
              color: '#ffb6c1',
              borderRadius: '50%',
              width: '22px',
              height: '22px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.75rem',
              fontWeight: 700,
            }}>
              {cartCount}
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Cart drawer ── */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(5,5,5,0.7)',
                backdropFilter: 'blur(4px)',
                zIndex: 999,
              }}
            />
            <CartDrawer
              cart={cart}
              onClose={() => setCartOpen(false)}
              onRemove={removeItem}
              onQtyChange={changeQty}
            />
          </>
        )}
      </AnimatePresence>
    </PageTransition>
  );
}
