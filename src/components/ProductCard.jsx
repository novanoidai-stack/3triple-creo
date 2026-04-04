import { motion } from 'framer-motion';

export default function ProductCard({ product, onBuy }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 20 }}
      viewport={{ once: true }}
      style={{
        background: '#0a0608',
        border: '1px solid rgba(255,182,193,0.1)',
        borderRadius: '8px',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
      }}
    >
      {/* Product Image */}
      <div style={{
        aspectRatio: '4/3',
        background: 'linear-gradient(135deg, #150d10, #0a0608)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative',
      }}>
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'contrast(1.1)',
            }}
          />
        ) : (
          <div style={{
            fontSize: '1rem',
            color: 'rgba(255,182,193,0.3)',
            fontFamily: "'Oswald', sans-serif",
            letterSpacing: '2px',
            textTransform: 'uppercase',
          }}>
            {product.name}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div style={{ padding: '1.5rem' }}>
        <h3 style={{
          fontFamily: "'Oswald', sans-serif",
          fontSize: '1.1rem',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          marginBottom: '0.5rem',
          color: '#ffffff',
        }}>
          {product.name}
        </h3>
        <p style={{
          color: 'rgba(255,255,255,0.45)',
          fontSize: '0.85rem',
          lineHeight: 1.6,
          marginBottom: '1.2rem',
          minHeight: '2.4rem',
        }}>
          {product.description}
        </p>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '1.6rem',
            color: '#ffb6c1',
            fontStyle: 'italic',
          }}>
            €{(product.price / 100).toFixed(2)}
          </div>
          <button
            onClick={() => onBuy(product)}
            className="btn-primary"
            style={{ fontSize: '0.7rem', padding: '0.7rem 1.5rem' }}
          >
            Comprar
          </button>
        </div>
      </div>
    </motion.div>
  );
}
