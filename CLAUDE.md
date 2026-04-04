# CLAUDE.md — 3Triple Creo

**Studio Name:** 3Triple Creo  
**Artist/Barber:** Blendz Leo (nombre artístico)  
**Location:** Motilla del Palancar 33, Hortaleza, Madrid

This file provides guidance to Claude Code when working with this barbershop's web application.

---

## Quick Commands

```bash
npm run dev          # Start Vite dev server (localhost:5173)
npm run build        # Build production bundle (dist/)
npm run preview      # Preview production build
```

---

## Key Changes from Template

### Studio Branding
- **Intro Screen:** Shows "3Triple Creo" (studio name), not "Blendz Leo"
- **Navbar:** References 3Triple Creo as the brand
- **Content:** Blendz Leo is mentioned as the artist/barber (not the studio name)
- **SEO:** Keywords include both names: "3Triple Creo", "Blendz Leo" (artist)

### New Features
- **Products Shop Section:** Barber products (oils, balms, combs) sold with Stripe payment
  - Products delivered in-person by Leo
  - Section on Home page or dedicated `/productos` route
  - Stripe integration for checkout

---

## Architecture Overview

**Stack:** React 18 + Vite + React Router v6 + Framer Motion + GSAP 3.12 + react-helmet-async + Stripe

**Pattern:** Single-Page App with client-side routing. Booking via Google Calendar/WhatsApp. Products via Stripe (payment only, delivery in-person).

### Key Architectural Decisions

1. **Styling:** Global design tokens in `src/globals.css`, inline styles for components
2. **Animations:** Framer Motion + GSAP ScrollTrigger for scroll storytelling
3. **SEO Local:** Helmet-based meta tags, Schema.org HairSalon + Product schema
4. **Payments:** Stripe for products (no server backend, client-side Stripe.js)
5. **Mobile:** Hamburger fullscreen overlay, touch-optimized

---

## File Structure

```
src/
├── pages/
│   ├── Home.jsx          # Hero, stats, experience, testimonials, CTA
│   ├── About.jsx         # Firma Personal / Artist bio
│   ├── Portfolio.jsx     # Gallery of haircuts
│   ├── Booking.jsx       # Reservations (Google Calendar / WhatsApp)
│   └── Products.jsx      # NEW: Shop with Stripe checkout
├── components/
│   ├── Navbar.jsx        # Header with mobile hamburger
│   ├── CustomCursor.jsx  # Pink cursor
│   ├── ParticleField.jsx # Canvas particles
│   ├── IntroScreen.jsx   # Splash screen: "3Triple Creo"
│   ├── SEO.jsx          # Meta tags
│   ├── ProductCard.jsx   # NEW: Product item for shop
│   ├── StripeCheckout.jsx # NEW: Stripe payment modal
│   └── ...
├── utils/
│   └── splitText.js
├── App.jsx              # Router + global components
├── main.jsx             # HelmetProvider
└── globals.css          # Design system

public/
├── sitemap.xml
├── robots.txt
└── assets/images/
```

---

## Stripe Integration (Products)

### Setup

1. **Install Stripe libraries:**
   ```bash
   npm install @stripe/react-stripe-js @stripe/js
   ```

2. **Add Stripe key to env:**
   Create `.env.local`:
   ```
   VITE_STRIPE_PUBLIC_KEY=pk_test_... (or pk_live_...)
   ```

3. **Wrap App in Stripe provider** in `main.jsx`:
   ```jsx
   import { Elements } from '@stripe/react-stripe-js';
   import { loadStripe } from '@stripe/js';

   const stripe = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

   <Elements stripe={stripe}>
     <App />
   </Elements>
   ```

### Products Section

Products are defined as a static array (no database):

```js
const products = [
  {
    id: 'prod_001',
    name: 'Premium Beard Oil',
    description: 'Imported from Italy...',
    price: 2500, // cents
    image: '/assets/images/oil.jpg',
    stripePriceId: 'price_...'
  },
  // ...
];
```

When user clicks "Comprar" (Buy):
1. Create Stripe Checkout Session on backend (or client-side via Stripe API)
2. Redirect to Stripe's hosted checkout
3. On success: show "Pedido confirmado" message
4. Delivery: Leo hands products in-person at next appointment

---

## Color Palette & Typography

**Colors:**
- `--black: #050505` (background)
- `--pink: #ffb6c1` (primary accent, buttons)
- `--gold: #cca43b` (badges)

**Fonts:**
- Display: `Playfair Display` (serif)
- Headlines: `Oswald` (uppercase)
- Body: `Outfit` (sans-serif)
- Logo: `Great Vibes` (cursive)

---

## Naming Convention

- **3Triple Creo** = Studio/Local name (use in header, intro screen, SEO)
- **Blendz Leo** = Artist/barber name (use as subtitle, social links, artist bio)
- **Leo** = Informal reference to the barber

---

## SEO Keywords

Local + artist blend:
- "3Triple Creo barbería Madrid"
- "Blendz Leo skin fade"
- "Barbería premium Hortaleza"
- "Diseño barba Madrid"

---

## Future Enhancements

- [ ] Google My Business (critical for local ranking)
- [ ] Product inventory management (if offering variety)
- [ ] Stripe webhook for order confirmation emails
- [ ] Gallery lightbox for portfolio
- [ ] Analytics (GA4)

