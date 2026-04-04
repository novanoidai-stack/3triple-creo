# Stripe Integration Setup for 3Triple Creo

## Status
✅ Frontend UI created (ProductCard, Products page, routes)  
⏳ Backend payment processing (TODO)  
⏳ Stripe libraries installation (pending npm availability)

---

## Step 1: Install Stripe Libraries

```bash
npm install @stripe/react-stripe-js @stripe/js
```

If npm is having issues, retry in a few moments.

---

## Step 2: Get Stripe Keys

1. Go to https://dashboard.stripe.com/
2. Sign up or log in
3. Go to **Developers** → **API Keys**
4. Copy the **Publishable Key** (starts with `pk_`)
5. Also note the **Secret Key** (starts with `sk_`) — for backend only

---

## Step 3: Set Environment Variables

Create `.env.local` in the project root:

```
VITE_STRIPE_PUBLIC_KEY=pk_test_YOUR_KEY_HERE
```

Replace `pk_test_YOUR_KEY_HERE` with your actual publishable key.

---

## Step 4: Wrap App with Stripe Provider

Update `src/main.jsx`:

```jsx
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/js';

const stripe = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <Elements stripe={stripe}>
          <App />
        </Elements>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
)
```

---

## Step 5: Create StripeCheckout Component

File: `src/components/StripeCheckout.jsx`

```jsx
import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { motion } from 'framer-motion';

export default function StripeCheckout({ product, onClose, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    try {
      // TODO: Create Payment Intent on backend
      // const response = await fetch('/api/create-payment-intent', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ productId: product.id, amount: product.price })
      // });
      // const { clientSecret } = await response.json();

      // const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      //   payment_method: {
      //     card: elements.getElement(CardElement),
      //     billing_details: { name: 'Leo Customer' }
      //   }
      // });

      // if (paymentIntent?.status === 'succeeded') {
      //   onSuccess(paymentIntent);
      // }
      
      // For now, show success message
      alert(`Pago procesado: ${product.name}`);
      onSuccess({ id: 'mock_payment' });
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      style={{
        background: '#0a0608',
        padding: '2rem',
        borderRadius: '8px',
        maxWidth: '400px',
        border: '1px solid rgba(255,182,193,0.1)',
      }}
    >
      <h3 style={{
        fontFamily: "'Oswald', sans-serif",
        fontSize: '1.2rem',
        letterSpacing: '2px',
        textTransform: 'uppercase',
        marginBottom: '1rem',
        color: '#ffffff',
      }}>
        {product.name}
      </h3>

      <p style={{ color: 'rgba(255,255,255,0.45)', marginBottom: '1.5rem' }}>
        Precio: €{(product.price / 100).toFixed(2)}
      </p>

      <form onSubmit={handleSubmit}>
        <div style={{
          background: 'rgba(255,255,255,0.05)',
          padding: '1rem',
          borderRadius: '4px',
          marginBottom: '1.5rem',
          border: '1px solid rgba(255,182,193,0.1)',
        }}>
          {/* CardElement will be injected here after Stripe setup */}
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem' }}>
            🔒 Pago seguro via Stripe
          </p>
        </div>

        {error && (
          <p style={{ color: '#ff6b9d', marginBottom: '1rem', fontSize: '0.85rem' }}>
            Error: {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading || !stripe}
          className="btn-primary"
          style={{ width: '100%' }}
        >
          {loading ? 'Procesando...' : 'Pagar ahora'}
        </button>
      </form>

      <button
        onClick={onClose}
        className="btn-ghost"
        style={{
          width: '100%',
          marginTop: '0.8rem',
          justifyContent: 'center',
        }}
      >
        Cancelar
      </button>
    </motion.div>
  );
}
```

---

## Step 6: Update Products Page

After creating StripeCheckout, update `src/pages/Products.jsx`:

Replace the `handleBuy` function to use StripeCheckout modal instead of `alert()`.

---

## Step 7: Create Backend Endpoint (Optional but Recommended)

For security, create a backend endpoint (Node/Express) to handle Payment Intent creation:

```javascript
// backend/routes/payments.js
app.post('/api/create-payment-intent', async (req, res) => {
  const { productId, amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'eur',
      metadata: { productId }
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
```

---

## Step 8: Setup Webhook (For Order Tracking)

When payment succeeds, Stripe sends a webhook to your server:

1. Create webhook endpoint on backend
2. In Stripe Dashboard → Webhooks, add your endpoint
3. Listen for `payment_intent.succeeded` event
4. Send confirmation email to customer
5. Store order in database

---

## Products Already Configured

The following products are ready to use (update image URLs as needed):

- Premium Beard Oil (€25.00)
- Styling Balm (€18.00)
- Wooden Comb (€15.00)
- Matte Clay (€22.00)

---

## Notes

- **Delivery:** Products delivered in-person at Leo's next appointment with the customer
- **No shipping:** This is a local delivery system
- **Test mode:** Use Stripe test card `4242 4242 4242 4242` during development
- **Live mode:** Switch to live keys in production after testing thoroughly

---

## Testing

Use Stripe test cards:
- **Success:** `4242 4242 4242 4242`
- **Decline:** `4000 0000 0000 0002`
- **Requires auth:** `4000 0000 0000 3220`

Expiry: Any future date  
CVC: Any 3 digits
