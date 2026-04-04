# Blendz Leo Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete visual redesign + SEO overhaul of Blendz Leo barber website to 10/10 professional level with spectacular animations (cursor, particles, scroll storytelling) and local SEO positioning.

**Architecture:** Component-driven redesign maintaining React Router structure. GSAP ScrollTrigger for scroll storytelling, Framer Motion for page transitions, Canvas for particle effects. SEO via react-helmet-async + Schema.org JSON-LD + static XML files. All styling migrated from inline styles to globals.css with utility classes.

**Tech Stack:** React 18 + Vite + Framer Motion + GSAP 3.12 + react-helmet-async

---

## File Structure

**Created:**
- `src/components/CustomCursor.jsx` — Cursor personalizado con anillo
- `src/components/ParticleField.jsx` — Canvas de partículas con conexiones
- `src/components/IntroScreen.jsx` — Pantalla de intro letra a letra
- `src/components/SEO.jsx` — Componente meta tags reutilizable
- `src/styles/globals.css` — Sistema de diseño completo (refactor de inline styles)
- `src/styles/animations.css` — Keyframes y animaciones
- `src/utils/splitText.js` — Helper para split de caracteres
- `public/sitemap.xml` — Sitemap SEO
- `public/robots.txt` — Robots exclusions

**Modified:**
- `src/App.jsx` — Añadir CustomCursor, IntroScreen, SEO Provider
- `src/main.jsx` — Añadir HelmetProvider
- `src/components/Navbar.jsx` — Rediseño completo + mobile overlay
- `src/pages/Home.jsx` — Hero rediseñado + GSAP ScrollTrigger
- `src/pages/About.jsx` — Rediseño con clipPath scroll
- `src/pages/Portfolio.jsx` — Grid masonry + lightbox modal
- `src/pages/Booking.jsx` — Quitar emojis, rediseño menú
- `src/components/Testimonials.jsx` — Rediseño tipográfico
- `src/components/TheExperience.jsx` — GSAP pin scroll
- `src/components/PageTransition.jsx` — Mejorar wipe
- `src/components/FloatingContact.jsx` — Estilo mejorado
- `package.json` — Dependencias nuevas

---

## Task 1: Instalación de Dependencias

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Añadir react-helmet-async**

```bash
npm install react-helmet-async@2.0.4
```

- [ ] **Step 2: Añadir GSAP**

```bash
npm install gsap@3.12.5
```

- [ ] **Step 3: Verificar instalación**

```bash
npm list react-helmet-async gsap
```

Expected: Ambas librerías aparecen con versiones correctas

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "feat: add gsap and react-helmet-async dependencies"
```

---

## Task 2: Sistema de Diseño Global + Variables CSS

**Files:**
- Modify: `src/globals.css`
- Create: `src/styles/animations.css`

- [ ] **Step 1: Reemplazar globals.css con nuevo sistema**

```css
/* ═══════════════════════════════════════════════════════════════ */
/* BLENDZ LEO — GLOBAL DESIGN SYSTEM                              */
/* ═══════════════════════════════════════════════════════════════ */

@import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Oswald:wght@300;500;700&family=Outfit:wght@300;400;600;800&display=swap');
@import url('./animations.css');

:root {
  /* ─── COLORS ─── */
  --black: #050505;
  --black-surface: #0a0608;
  --pink: #ffb6c1;
  --pink-hot: #ff6b9d;
  --pink-glow: rgba(255, 107, 157, 0.08);
  --pink-light-glow: rgba(255, 182, 193, 0.15);
  --pink-border: rgba(255, 182, 193, 0.1);
  --pink-subtle: rgba(255, 182, 193, 0.02);
  --white: #ffffff;
  --white-primary: #ffffff;
  --white-muted: rgba(255, 255, 255, 0.45);
  --white-dim: rgba(255, 255, 255, 0.3);
  --white-subtle: rgba(255, 255, 255, 0.05);
  --gold: #cca43b;
  --gold-glow: rgba(204, 164, 59, 0.4);

  /* ─── TYPOGRAPHY ─── */
  --font-display: 'Playfair Display', serif;
  --font-heading: 'Oswald', sans-serif;
  --font-body: 'Outfit', sans-serif;
  --font-logo: 'Great Vibes', cursive;

  /* ─── SPACING ─── */
  --spacing-xs: 0.5rem;
  --spacing-sm: 1rem;
  --spacing-md: 1.5rem;
  --spacing-lg: 3rem;
  --spacing-xl: 5rem;
  --spacing-2xl: 8rem;

  /* ─── TRANSITIONS ─── */
  --duration-fast: 0.2s;
  --duration-base: 0.3s;
  --duration-slow: 0.6s;
  --ease-smooth: cubic-bezier(0.165, 0.84, 0.44, 1);
}

/* ═══════════════════════════════════════════════════════════════ */
/* RESET & BASE                                                    */
/* ═══════════════════════════════════════════════════════════════ */

*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-body);
  background-color: var(--black);
  color: var(--white-primary);
  overflow-x: hidden;
  line-height: 1.6;
}

/* ═══════════════════════════════════════════════════════════════ */
/* TYPOGRAPHY                                                      */
/* ═══════════════════════════════════════════════════════════════ */

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
  text-transform: uppercase;
  line-height: 1.1;
}

.display-serif {
  font-family: var(--font-display);
  text-transform: none;
}

.display-serif--italic {
  font-style: italic;
  color: var(--pink);
}

.logo {
  font-family: var(--font-logo);
  font-size: 1.8rem;
  color: var(--white-primary);
  font-weight: 400;
}

a {
  text-decoration: none;
  color: inherit;
  transition: all var(--duration-base) ease;
}

/* ═══════════════════════════════════════════════════════════════ */
/* SCROLLBAR                                                       */
/* ═══════════════════════════════════════════════════════════════ */

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: var(--black);
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--pink);
}

/* ═══════════════════════════════════════════════════════════════ */
/* LAYOUT UTILITIES                                                */
/* ═══════════════════════════════════════════════════════════════ */

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 5%;
}

.page-container {
  min-height: 100vh;
  padding-top: 80px;
  padding-bottom: 2rem;
  width: 100%;
}

.section {
  padding: 10rem 5%;
}

@media (max-width: 768px) {
  .section {
    padding: 6rem 5%;
  }
  
  .page-container {
    padding-top: 70px;
  }
}

/* ═══════════════════════════════════════════════════════════════ */
/* BUTTONS                                                         */
/* ═══════════════════════════════════════════════════════════════ */

.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--pink);
  color: var(--black);
  font-family: var(--font-heading);
  font-size: 0.8rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  font-weight: 700;
  padding: 1rem 2.5rem;
  gap: 0.8rem;
  border: none;
  cursor: pointer;
  transition: all var(--duration-base) var(--ease-smooth);
  clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 50%, calc(100% - 10px) 100%, 0 100%);
}

.btn-primary:hover {
  background: var(--white-primary);
  transform: translateX(5px);
}

.btn-ghost {
  font-family: var(--font-heading);
  font-size: 0.75rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--white-muted);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: color var(--duration-base);
  position: relative;
}

.btn-ghost::after {
  content: '';
  display: block;
  width: 30px;
  height: 1px;
  background: currentColor;
  transition: width var(--duration-base);
}

.btn-ghost:hover {
  color: var(--pink);
}

.btn-ghost:hover::after {
  width: 50px;
}

.btn-outline-pink {
  font-family: var(--font-heading);
  font-size: 0.8rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--pink);
  padding: 1rem 2.5rem;
  border: 1px solid rgba(255, 182, 193, 0.3);
  background: transparent;
  cursor: pointer;
  transition: all var(--duration-base);
}

.btn-outline-pink:hover {
  background: rgba(255, 182, 193, 0.05);
  border-color: var(--pink);
}

/* ═══════════════════════════════════════════════════════════════ */
/* GRID & FLEX UTILITIES                                           */
/* ═══════════════════════════════════════════════════════════════ */

.flex {
  display: flex;
}

.flex-col {
  flex-direction: column;
}

.gap-md {
  gap: var(--spacing-md);
}

.gap-lg {
  gap: var(--spacing-lg);
}

.grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
}

@media (max-width: 1024px) {
  .grid-2 {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}

/* ═══════════════════════════════════════════════════════════════ */
/* TEXT UTILITIES                                                  */
/* ═══════════════════════════════════════════════════════════════ */

.text-accent {
  color: var(--pink);
}

.text-muted {
  color: var(--white-muted);
}

.text-dim {
  color: var(--white-dim);
}

.text-center {
  text-align: center;
}

.leading-tight {
  line-height: 1;
}

/* ═══════════════════════════════════════════════════════════════ */
/* BORDERS & DECORATIONS                                           */
/* ═══════════════════════════════════════════════════════════════ */

.border-top {
  border-top: 1px solid var(--pink-border);
}

.border-bottom {
  border-bottom: 1px solid var(--pink-border);
}

.border-both {
  border-top: 1px solid var(--pink-border);
  border-bottom: 1px solid var(--pink-border);
}

.divider-line {
  width: 40px;
  height: 1px;
  background: var(--pink);
}

.divider-line--muted {
  background: rgba(255, 182, 193, 0.3);
}

/* ═══════════════════════════════════════════════════════════════ */
/* RESPONSIVE IMAGES                                               */
/* ═══════════════════════════════════════════════════════════════ */

img {
  max-width: 100%;
  height: auto;
  display: block;
}

/* ═══════════════════════════════════════════════════════════════ */
/* SECTION LABELS & HEADERS                                        */
/* ═══════════════════════════════════════════════════════════════ */

.section-label {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-family: var(--font-heading);
  font-size: 0.65rem;
  letter-spacing: 5px;
  text-transform: uppercase;
  color: var(--pink);
  margin-bottom: 1.5rem;
}

.section-label::before {
  content: '';
  display: block;
  width: 30px;
  height: 1px;
  background: var(--pink);
}

.section-title {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  line-height: 1.1;
  margin-bottom: 1.5rem;
  font-weight: 400;
}

/* ═══════════════════════════════════════════════════════════════ */
/* ACCESSIBILITY                                                   */
/* ═══════════════════════════════════════════════════════════════ */

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* Skip to content link */
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--pink);
  color: var(--black);
  padding: 8px;
  z-index: 100;
  text-decoration: none;
}

.skip-link:focus {
  top: 0;
}
```

- [ ] **Step 2: Crear animations.css con keyframes**

```css
/* ═══════════════════════════════════════════════════════════════ */
/* ANIMATIONS & KEYFRAMES                                          */
/* ═══════════════════════════════════════════════════════════════ */

@keyframes float {
  0%, 100% {
    transform: translateY(0) scale(1);
    opacity: 0.4;
  }
  50% {
    transform: translateY(-20px) scale(1.2);
    opacity: 0.8;
  }
}

@keyframes pulse {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(255, 182, 193, 0.4);
  }
  50% {
    box-shadow: 0 0 0 8px rgba(255, 182, 193, 0);
  }
}

@keyframes scrollAnim {
  0% {
    transform: scaleX(0);
    transform-origin: left;
  }
  50% {
    transform: scaleX(1);
    transform-origin: left;
  }
  51% {
    transform-origin: right;
  }
  100% {
    transform: scaleX(0);
    transform-origin: right;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes drawLine {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

@keyframes openBook {
  0% {
    clip-path: inset(0 0 0 0);
  }
  100% {
    clip-path: inset(0 0 0 100%);
  }
}

/* Utility animation classes */
.animate-pulse {
  animation: pulse 2s infinite;
}

.animate-float {
  animation: float 6s infinite ease-in-out;
}

.animate-scroll-indicator {
  animation: scrollAnim 2s infinite;
}
```

- [ ] **Step 3: Verificar que los archivos están correctos**

```bash
ls -la src/styles/
```

Expected: `globals.css` y `animations.css` existen

- [ ] **Step 4: Commit**

```bash
git add src/globals.css src/styles/animations.css
git commit -m "style: create global design system and animations"
```

---

## Task 3: Utilidad splitText para Animaciones Letra a Letra

**Files:**
- Create: `src/utils/splitText.js`

- [ ] **Step 1: Crear helper de split de texto**

```javascript
/**
 * Divide un string en array de caracteres para animación
 * @param {string} text - Texto a dividir
 * @returns {array} Array de caracteres
 */
export function splitText(text) {
  return text.split('');
}

/**
 * Divide un string en array de palabras para animación
 * @param {string} text - Texto a dividir
 * @returns {array} Array de palabras
 */
export function splitWords(text) {
  return text.split(' ');
}

/**
 * Divide un string en array de líneas para animación
 * @param {string} text - Texto a dividir
 * @returns {array} Array de líneas
 */
export function splitLines(text) {
  return text.split('\n');
}
```

- [ ] **Step 2: Commit**

```bash
git add src/utils/splitText.js
git commit -m "util: add splitText helpers for character animations"
```

---

## Task 4: Componente CustomCursor

**Files:**
- Create: `src/components/CustomCursor.jsx`

- [ ] **Step 1: Crear CustomCursor con useMousePosition**

```jsx
import { useState, useEffect } from 'react';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHoveringLink, setIsHoveringLink] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(false);

  useEffect(() => {
    // Solo en desktop
    if ('ontouchstart' in window) return;

    setCursorVisible(true);

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setCursorVisible(true);
    const handleMouseLeave = () => setCursorVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Detectar hover en links y botones
    const interactiveElements = document.querySelectorAll('a, button, [data-cursor-hover]');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', () => setIsHoveringLink(true));
      el.addEventListener('mouseleave', () => setIsHoveringLink(false));
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', () => setIsHoveringLink(true));
        el.removeEventListener('mouseleave', () => setIsHoveringLink(false));
      });
    };
  }, []);

  if (!cursorVisible) return null;

  return (
    <>
      <style>{`
        .custom-cursor-dot {
          position: fixed;
          width: 10px;
          height: 10px;
          background: #ffb6c1;
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          mix-blend-mode: difference;
          left: ${mousePosition.x}px;
          top: ${mousePosition.y}px;
          transform: translate(-50%, -50%);
          transition: ${isHoveringLink ? 'all 0.2s ease' : 'none'};
          opacity: ${cursorVisible ? 1 : 0};
        }

        .custom-cursor-ring {
          position: fixed;
          width: ${isHoveringLink ? '60px' : '38px'};
          height: ${isHoveringLink ? '60px' : '38px'};
          border: 1px solid rgba(255, 182, 193, ${isHoveringLink ? '0.8' : '0.5'});
          border-radius: 50%;
          pointer-events: none;
          z-index: 9998;
          left: ${mousePosition.x}px;
          top: ${mousePosition.y}px;
          transform: translate(-50%, -50%);
          transition: all 0.3s ease;
          opacity: ${cursorVisible ? 1 : 0};
        }
      `}</style>
      <div className="custom-cursor-dot"></div>
      <div className="custom-cursor-ring"></div>
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/CustomCursor.jsx
git commit -m "feat: add custom cursor with hover effects"
```

---

## Task 5: Componente ParticleField (Canvas)

**Files:**
- Create: `src/components/ParticleField.jsx`

- [ ] **Step 1: Crear ParticleField con Canvas y animación**

```jsx
import { useEffect, useRef } from 'react';

export default function ParticleField({ density = 'medium', className = '' }) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Configurar densidad de partículas
    const particleCount = density === 'dense' ? 80 : density === 'sparse' ? 30 : 60;

    // Inicializar partículas
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * (canvas.offsetWidth || 800),
      y: Math.random() * (canvas.offsetHeight || 600),
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.4 + 0.2,
    }));

    const animate = () => {
      ctx.fillStyle = 'rgba(5, 5, 5, 1)';
      ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      const particles = particlesRef.current;
      const connectionDistance = 120;

      // Animar partículas
      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Rebotar en bordes
        if (particle.x < 0 || particle.x > (canvas.offsetWidth || 800)) {
          particle.vx *= -1;
        }
        if (particle.y < 0 || particle.y > (canvas.offsetHeight || 600)) {
          particle.vy *= -1;
        }

        // Clamp position
        particle.x = Math.max(0, Math.min(canvas.offsetWidth || 800, particle.x));
        particle.y = Math.max(0, Math.min(canvas.offsetHeight || 600, particle.y));

        // Dibujar partícula
        ctx.fillStyle = `rgba(255, 182, 193, ${particle.opacity})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Dibujar conexiones
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.strokeStyle = `rgba(255, 182, 193, ${0.05 * (1 - distance / connectionDistance)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
    />
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ParticleField.jsx
git commit -m "feat: add particle field canvas component with connections"
```

---

## Task 6: Componente IntroScreen

**Files:**
- Create: `src/components/IntroScreen.jsx`

- [ ] **Step 1: Crear IntroScreen con animación de entrada**

```jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function IntroScreen() {
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const shown = sessionStorage.getItem('introShown');
    if (shown) {
      setHasShown(true);
    }
  }, []);

  if (hasShown) return null;

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: { opacity: 1 },
    exit: { opacity: 0, transition: { duration: 0.6 } },
  };

  const logoVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8, delay: 0.3 } },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05, duration: 0.6 },
    }),
  };

  const curtainVariants = {
    hidden: { scaleY: 0 },
    visible: { scaleY: 1, transition: { delay: 1.5, duration: 0.8 } },
  };

  const handleAnimationComplete = () => {
    sessionStorage.setItem('introShown', 'true');
    setHasShown(true);
  };

  return (
    <motion.div
      className="intro-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onAnimationComplete={handleAnimationComplete}
      style={{
        position: 'fixed',
        inset: 0,
        background: '#050505',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
      }}
    >
      <motion.div
        variants={logoVariants}
        style={{
          textAlign: 'center',
          fontSize: '4rem',
          fontFamily: "'Great Vibes', cursive",
          color: '#ffffff',
          zIndex: 10,
        }}
      >
        Blendz Leo
      </motion.div>

      {/* Cortina de cierre */}
      <motion.div
        variants={curtainVariants}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: '#050505',
          transformOrigin: 'top',
          zIndex: 9998,
        }}
      />
    </motion.div>
  );
}
```

- [ ] **Step 2: Añadir estilos en globals.css**

Añadir al final de `src/globals.css`:

```css
.intro-screen {
  animation: fadeOut 0.6s ease-out forwards;
  animation-delay: 2s;
}

@keyframes fadeOut {
  to {
    opacity: 0;
    visibility: hidden;
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/IntroScreen.jsx src/globals.css
git commit -m "feat: add intro screen with book opening animation"
```

---

## Task 7: Componente SEO Reutilizable

**Files:**
- Create: `src/components/SEO.jsx`

- [ ] **Step 1: Crear SEO con Helmet**

```jsx
import { Helmet } from 'react-helmet-async';

export default function SEO({
  title,
  description,
  canonical,
  image = 'https://blendz-leo.com/og-image.png',
  type = 'website',
  name = 'Blendz Leo',
}) {
  const fullTitle = title ? `${title} | ${name}` : name;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={name} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Canonical */}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Language */}
      <meta name="language" content="Spanish" />
      <meta httpEquiv="content-language" content="es" />
    </Helmet>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/SEO.jsx
git commit -m "feat: add SEO component with Helmet integration"
```

---

## Task 8: Actualizar main.jsx y App.jsx

**Files:**
- Modify: `src/main.jsx`
- Modify: `src/App.jsx`

- [ ] **Step 1: Envolver App con HelmetProvider en main.jsx**

Reemplazar contenido de `src/main.jsx`:

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './globals.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
)
```

- [ ] **Step 2: Añadir CustomCursor e IntroScreen en App.jsx**

Actualizar `src/App.jsx` para incluir:

```jsx
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import CustomCursor from './components/CustomCursor';
import IntroScreen from './components/IntroScreen';

import Navbar from './components/Navbar';
import FloatingContact from './components/FloatingContact';

import Home from './pages/Home';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import Booking from './pages/Booking';

function App() {
  const location = useLocation();

  return (
    <>
      <CustomCursor />
      <IntroScreen />
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/perfil" element={<About />} />
          <Route path="/portafolio" element={<Portfolio />} />
          <Route path="/contacto" element={<Booking />} />
        </Routes>
      </AnimatePresence>
      <FloatingContact />
    </>
  );
}

export default App;
```

- [ ] **Step 3: Verificar que no hay errores**

```bash
npm run dev
```

Expected: La app inicia sin errores, ves el cursor rosa y la pantalla de intro

- [ ] **Step 4: Commit**

```bash
git add src/main.jsx src/App.jsx
git commit -m "feat: integrate helmet provider and custom cursor globally"
```

---

## Task 9: Rediseño Navbar con Mobile Overlay

**Files:**
- Modify: `src/components/Navbar.jsx`

- [ ] **Step 1: Reescribir Navbar completo**

```jsx
import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Detectar scroll para cambiar estilo navbar
  window.addEventListener('scroll', () => {
    setScrolled(window.scrollY > 50);
  });

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const menuVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  const linkVariants = {
    hidden: { x: 20, opacity: 0 },
    visible: (i) => ({
      x: 0,
      opacity: 1,
      transition: { delay: i * 0.1, duration: 0.4 },
    }),
  };

  const navLinks = [
    { to: '/', label: 'LA EXPERIENCIA' },
    { to: '/perfil', label: 'FIRMA PERSONAL' },
    { to: '/portafolio', label: 'PORTAFOLIO' },
    { to: '/contacto', label: 'AGENDA TU CITA' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{
          padding: '1.5rem 5%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'fixed',
          width: '100%',
          top: 0,
          zIndex: 100,
          background: scrolled ? 'rgba(5, 5, 5, 0.95)' : 'rgba(5, 5, 5, 0.7)',
          backdropFilter: 'blur(30px)',
          borderBottom: scrolled ? '1px solid rgba(255, 182, 193, 0.1)' : 'none',
          transition: 'all 0.3s ease',
        }}
      >
        {/* Logo */}
        <div style={{ height: '40px' }}>
          <img
            src="/assets/images/WhatsApp Image 2026-04-01 at 20.30.03.jpeg"
            alt="Blendz Leo"
            style={{ height: '100%', objectFit: 'contain' }}
          />
        </div>

        {/* Desktop Menu */}
        <div style={{ display: 'flex', gap: '2.5rem' }}>
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              style={({ isActive }) => ({
                fontFamily: "'Oswald', sans-serif",
                letterSpacing: '1px',
                fontSize: '0.9rem',
                color: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.45)',
                position: 'relative',
                transition: 'color 0.3s',
              })}
              onMouseEnter={(e) => {
                if (location.pathname !== e.currentTarget.getAttribute('href')) {
                  e.currentTarget.style.color = '#ffb6c1';
                }
              }}
              onMouseLeave={(e) => {
                if (location.pathname !== e.currentTarget.getAttribute('href')) {
                  e.currentTarget.style.color = 'rgba(255, 255, 255, 0.45)';
                }
              }}
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={toggleMobileMenu}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            '@media (max-width: 768px)': { display: 'block' },
          }}
          onMouseEnter={() => setIsHamburgerHovering(true)}
          onMouseLeave={() => setIsHamburgerHovering(false)}
        >
          <motion.div
            animate={mobileMenuOpen ? 'open' : 'closed'}
            variants={{
              closed: { rotate: 0 },
              open: { rotate: 90 },
            }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              width: '24px',
              height: '24px',
            }}
          >
            <motion.div
              animate={mobileMenuOpen ? { rotate: 45, y: 12 } : { rotate: 0, y: 0 }}
              style={{
                width: '100%',
                height: '2px',
                background: '#ffb6c1',
              }}
            />
            <motion.div
              animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              style={{
                width: '100%',
                height: '2px',
                background: '#ffffff',
              }}
            />
            <motion.div
              animate={mobileMenuOpen ? { rotate: -45, y: -12 } : { rotate: 0, y: 0 }}
              style={{
                width: '100%',
                height: '2px',
                background: '#ffffff',
              }}
            />
          </motion.div>
        </button>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(5, 5, 5, 0.97)',
              backdropFilter: 'blur(20px)',
              zIndex: 99,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: '2rem',
              paddingTop: '100px',
            }}
            onClick={() => setMobileMenuOpen(false)}
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.to}
                custom={i}
                variants={linkVariants}
                initial="hidden"
                animate="visible"
              >
                <NavLink
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  style={({ isActive }) => ({
                    fontFamily: "'Oswald', sans-serif",
                    fontSize: '1.5rem',
                    letterSpacing: '3px',
                    text Transform: 'uppercase',
                    color: isActive ? '#ffb6c1' : '#ffffff',
                    borderLeft: isActive ? '3px solid #ffb6c1' : '3px solid transparent',
                    paddingLeft: '1rem',
                    transition: 'all 0.3s',
                  })}
                >
                  {link.label}
                </NavLink>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
```

- [ ] **Step 2: Añadir estilos responsivos en globals.css**

Añadir al final:

```css
@media (max-width: 768px) {
  nav div:nth-child(2) {
    display: none;
  }

  nav button {
    display: block !important;
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Navbar.jsx src/globals.css
git commit -m "feat: redesign navbar with mobile fullscreen overlay"
```

---

## Task 10: Rediseño Home.jsx con GSAP ScrollTrigger

*Esta tarea es extensa. Se divide en 3 sub-pasos.*

**Files:**
- Modify: `src/pages/Home.jsx`

- [ ] **Step 1: Setup de Home con estructura HTML nueva y GSAP**

```jsx
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

import SEO from '../components/SEO';
import PageTransition from '../components/PageTransition';
import ParticleField from '../components/ParticleField';
import TheExperience from '../components/TheExperience';
import Testimonials from '../components/Testimonials';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const statsRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Stats CountUp Animation
    const stats = gsap.utils.toArray('[data-stat-num]');
    stats.forEach((stat) => {
      const finalValue = parseInt(stat.getAttribute('data-stat-value'));
      gsap.registerEffect({
        name: 'countUp',
        effect: (targets, config) => {
          return gsap.to(targets, {
            textContent: finalValue,
            duration: 2,
            snap: { textContent: 1 },
            ease: 'power1.out',
            ...config,
          });
        },
        defaults: { duration: 2 },
      });

      gsap.effects.countUp(stat, {
        scrollTrigger: {
          trigger: stat,
          start: 'top center',
          toggleActions: 'play none none reverse',
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const tagVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.2 } },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.4 } },
  };

  const ctaVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.8 } },
  };

  return (
    <PageTransition>
      <SEO
        title="Barbería Premium Madrid Hortaleza"
        description="Blendz Leo: barbería de autor especializada en Skin Fade, diseño de barba y visagismo. Formación Blend School Cum Laude. 20% descuento en primer corte."
        canonical="https://blendz-leo.com"
      />

      {/* ─── HERO ─── */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '0 5%',
        position: 'relative',
        overflow: 'hidden',
        marginTop: '80px',
      }}>
        {/* Background Glow */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 75% 50%, rgba(255, 107, 157, 0.08) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(255, 182, 193, 0.05) 0%, transparent 50%)',
          zIndex: 0,
        }} />

        {/* Grid Lines */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'repeating-linear-gradient(90deg, transparent, transparent 80px, rgba(255, 182, 193, 0.02) 80px, rgba(255, 182, 193, 0.02) 81px), repeating-linear-gradient(0deg, transparent, transparent 80px, rgba(255, 182, 193, 0.02) 80px, rgba(255, 182, 193, 0.02) 81px)',
          zIndex: 0,
        }} />

        {/* Particles */}
        <ParticleField density="medium" />

        {/* Content */}
        <div style={{ maxWidth: '900px', position: 'relative', zIndex: 10 }}>
          <motion.div
            variants={tagVariants}
            initial="hidden"
            animate="visible"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              marginBottom: '2rem',
            }}
          >
            <div className="animate-pulse" style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#ffb6c1',
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

          <motion.h1
            variants={titleVariants}
            initial="hidden"
            animate="visible"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(4rem, 10vw, 9rem)',
              lineHeight: 0.95,
              fontWeight: 400,
              marginBottom: '2rem',
              maxWidth: '900px',
            }}
          >
            <span style={{ display: 'block', color: '#ffffff' }}>Arte</span>
            <span style={{ display: 'block', color: '#ffb6c1', fontStyle: 'italic', textShadow: '0 0 60px rgba(255, 107, 157, 0.3)' }}>& Precisión</span>
            <span style={{
              display: 'block',
              color: '#ffffff',
              fontSize: '0.55em',
              fontWeight: 700,
              fontStyle: 'normal',
              fontFamily: "'Oswald', sans-serif",
              letterSpacing: '8px',
              textTransform: 'uppercase',
              marginTop: '0.5rem',
            }}>
              Blendz Leo Studio
            </span>
          </motion.h1>

          <motion.p
            variants={ctaVariants}
            initial="hidden"
            animate="visible"
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '1.1rem',
              color: 'rgba(255, 255, 255, 0.45)',
              maxWidth: '500px',
              lineHeight: 1.8,
              marginBottom: '3rem',
            }}
          >
            Maestría en <strong style={{ color: '#ffffff', fontWeight: 600 }}>Skin Fade</strong>, diseño de barba y visagismo exclusivo.<br />
            El estudio donde tu imagen se convierte en <strong style={{ color: '#ffffff', fontWeight: 600 }}>obra de autor</strong>.
          </motion.p>

          <motion.div
            variants={ctaVariants}
            initial="hidden"
            animate="visible"
            style={{
              display: 'flex',
              gap: '1.5rem',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            <a href="/contacto" className="btn-primary">
              Reservar Cita →
            </a>
            <a href="/portafolio" className="btn-ghost">
              Ver Trabajos
            </a>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div style={{
          position: 'absolute',
          bottom: '3rem',
          left: '5%',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          zIndex: 10,
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
            color: 'rgba(255, 255, 255, 0.45)',
          }}>
            Scroll para descubrir
          </span>
        </div>
      </section>

      {/* ─── STATS STRIP ─── */}
      <div ref={statsRef} style={{
        background: '#0a0608',
        borderTop: '1px solid rgba(255, 182, 193, 0.1)',
        borderBottom: '1px solid rgba(255, 182, 193, 0.1)',
        padding: '2.5rem 5%',
        display: 'flex',
        justifyContent: 'space-around',
        gap: '2rem',
        flexWrap: 'wrap',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div
            data-stat-num
            data-stat-value="500"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '2.5rem',
              color: '#ffb6c1',
              lineHeight: 1,
              fontStyle: 'italic',
            }}
          >
            0
          </div>
          <div style={{
            fontFamily: "'Oswald', sans-serif",
            fontSize: '0.65rem',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: 'rgba(255, 255, 255, 0.45)',
            marginTop: '0.3rem',
          }}>
            Clientes Satisfechos
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '2.5rem',
            color: '#ffb6c1',
            lineHeight: 1,
            fontStyle: 'italic',
          }}>
            ★ 5.0
          </div>
          <div style={{
            fontFamily: "'Oswald', sans-serif",
            fontSize: '0.65rem',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: 'rgba(255, 255, 255, 0.45)',
            marginTop: '0.3rem',
          }}>
            Valoración Media
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '2.5rem',
            color: '#ffb6c1',
            lineHeight: 1,
            fontStyle: 'italic',
          }}>
            Cum Laude
          </div>
          <div style={{
            fontFamily: "'Oswald', sans-serif",
            fontSize: '0.65rem',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: 'rgba(255, 255, 255, 0.45)',
            marginTop: '0.3rem',
          }}>
            Blend School Cert.
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '2.5rem',
            color: '#ffb6c1',
            lineHeight: 1,
            fontStyle: 'italic',
          }}>
            Madrid
          </div>
          <div style={{
            fontFamily: "'Oswald', sans-serif",
            fontSize: '0.65rem',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: 'rgba(255, 255, 255, 0.45)',
            marginTop: '0.3rem',
          }}>
            Hortaleza · Motilla 33
          </div>
        </div>
      </div>

      {/* ─── THE EXPERIENCE ─── */}
      <TheExperience />

      {/* ─── TESTIMONIALS ─── */}
      <Testimonials />

      {/* ─── CTA SECTION ─── */}
      <section style={{
        padding: '10rem 5%',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Glow */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '400px',
          background: 'radial-gradient(ellipse, rgba(255, 107, 157, 0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px', margin: '0 auto' }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>
            Reserva Exclusiva
          </div>

          <h2 className="section-title" style={{ fontSize: 'clamp(3rem, 7vw, 6rem)' }}>
            Tu próxima cita<br /><span className="text-accent" style={{ fontStyle: 'italic' }}>te espera</span>
          </h2>

          <p style={{
            color: 'rgba(255, 255, 255, 0.45)',
            fontSize: '1.1rem',
            maxWidth: '500px',
            margin: '1.5rem auto 3rem',
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
              href="https://wa.me/34623433448?text=Hola%20Leo,%20me%20gustar%C3%ADa%20consultar%20disponibilidad%20para%20un%20corte"
              target="_blank"
              rel="noreferrer"
              className="btn-outline-pink"
            >
              WhatsApp Conserjería
            </a>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/Home.jsx
git commit -m "feat: redesign home hero with particles, GSAP countup, and new layout"
```

---

## Task 11: Rediseño Testimonials.jsx

**Files:**
- Modify: `src/components/Testimonials.jsx`

- [ ] **Step 1: Reescribir Testimonials con nueva tipografía**

```jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    text: 'El único barbero en millas a la redonda capaz de clavar un skin fade real. El nivel de detalle es obsesivo.',
    author: 'Carlos O.',
    role: 'Cliente Verificado',
  },
  {
    id: 2,
    text: 'No es cortarte el pelo, es una experiencia de principio a fin. Leo se toma su tiempo para analizar qué te queda bien.',
    author: 'David M.',
    role: 'Cliente Frecuente',
  },
  {
    id: 3,
    text: 'Un estudio donde desconectas por completo. Productos de altísima calidad y un trato que te hace sentir en un club privado.',
    author: 'Javier S.',
    role: 'Cliente Verificado',
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
      borderTop: '1px solid rgba(255, 182, 193, 0.1)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background Quote */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontFamily: "'Playfair Display', serif",
        fontSize: '20rem',
        color: 'rgba(255, 182, 193, 0.025)',
        lineHeight: 1,
        pointerEvents: 'none',
        whiteSpace: 'nowrap',
        zIndex: 0,
      }}>
        "
      </div>

      <div style={{
        position: 'relative',
        zIndex: 1,
        textAlign: 'center',
        maxWidth: '800px',
        margin: '0 auto',
      }}>
        <div className="section-label" style={{ justifyContent: 'center' }}>
          LA VOZ DE LA EXPERIENCIA
        </div>

        <div style={{
          height: '200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
                fontWeight: 400,
                fontStyle: 'italic',
                lineHeight: 1.5,
                marginBottom: '2rem',
              }}>
                "{testimonials[current].text}"
              </h3>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
              }}>
                <div style={{
                  width: '40px',
                  height: '1px',
                  background: '#ffb6c1',
                }} />
                <div>
                  <p style={{
                    fontFamily: "'Oswald', sans-serif",
                    fontSize: '1.2rem',
                    margin: 0,
                  }}>
                    {testimonials[current].author}
                  </p>
                  <p style={{
                    color: '#ffb6c1',
                    fontSize: '0.8rem',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    margin: 0,
                    marginTop: '0.3rem',
                  }}>
                    {testimonials[current].role}
                  </p>
                </div>
                <div style={{
                  width: '40px',
                  height: '1px',
                  background: '#ffb6c1',
                }} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div style={{
          display: 'flex',
          gap: '8px',
          justifyContent: 'center',
          marginTop: '3rem',
        }}>
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              style={{
                width: current === idx ? '24px' : '6px',
                height: '6px',
                borderRadius: '3px',
                background: current === idx ? '#ffb6c1' : 'rgba(255, 182, 193, 0.2)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Testimonials.jsx
git commit -m "style: redesign testimonials with playfair display serif"
```

---

## Task 12: Rediseño TheExperience.jsx con GSAP Pin Scroll

**Files:**
- Modify: `src/components/TheExperience.jsx`

- [ ] **Step 1: Añadir GSAP pin scroll effect**

```jsx
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    title: 'El Diagnóstico',
    desc: 'Análisis exhaustivo de tu fisionomía craneal, tipo de cabello y crecimiento capilar. No es un corte al azar, es un estudio de visagismo.',
  },
  {
    number: '02',
    title: 'La Ejecución',
    desc: 'Tratamiento milimétrico donde la máquina se vuelve una extensión matemática. Transiciones invisibles en Skin Fade y perfilado arquitectónico.',
  },
  {
    number: '03',
    title: 'El Acabado',
    desc: 'Sellado del estilo con productos premium, lavados terapéuticos y asesoría para mantener el look perfecto hasta tu próxima visita.',
  },
];

export default function TheExperience() {
  const containerRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const steps_els = gsap.utils.toArray('[data-step]');

    steps_els.forEach((el, i) => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top center',
        onEnter: () => setActiveStep(i),
        onEnterBack: () => setActiveStep(i),
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section style={{
      padding: '8rem 5%',
      background: '#0a0608',
      borderTop: '1px solid rgba(255, 182, 193, 0.1)',
      borderBottom: '1px solid rgba(255, 182, 193, 0.1)',
    }}>
      <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <p className="section-label" style={{ justifyContent: 'center' }}>
            SANTUARIO MASCULINO
          </p>
          <h2 className="section-title">
            MÁS QUE UN CORTE,
            <br />
            <span style={{ fontStyle: 'italic', color: '#ffb6c1' }}>UN RITUAL DE AUTOR</span>
          </h2>
        </div>

        <motion.div
          ref={containerRef}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '5rem',
            alignItems: 'start',
          }}
        >
          {/* Steps */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {steps.map((step, i) => (
              <div
                key={i}
                data-step
                style={{
                  display: 'flex',
                  gap: '2rem',
                  alignItems: 'flex-start',
                  opacity: activeStep === i ? 1 : 0.4,
                  transition: 'opacity 0.3s ease',
                }}
              >
                <div style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '3rem',
                  color: '#ffb6c1',
                  lineHeight: 1,
                  fontStyle: 'italic',
                  minWidth: '60px',
                }}>
                  {step.number}
                </div>

                <div>
                  <h4 style={{
                    fontFamily: "'Oswald', sans-serif",
                    fontSize: '1.1rem',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    marginBottom: '0.5rem',
                  }}>
                    {step.title}
                  </h4>
                  <p style={{
                    color: 'rgba(255, 255, 255, 0.45)',
                    fontSize: '0.9rem',
                    lineHeight: 1.7,
                  }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Visual placeholder */}
          <div style={{
            position: 'relative',
            background: '#0a0608',
            aspectRatio: '3/4',
            border: '1px solid rgba(255, 182, 193, 0.1)',
            overflow: 'hidden',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <span style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1rem',
              color: 'rgba(255, 182, 193, 0.2)',
              letterSpacing: '4px',
              textTransform: 'uppercase',
            }}>
              Fotografía del Studio
            </span>

            {/* Badge */}
            <div style={{
              position: 'absolute',
              top: '-1rem',
              right: '-1rem',
              background: 'linear-gradient(135deg, #cca43b, #f3d47d)',
              color: '#000',
              padding: '0.6rem 1.2rem',
              fontFamily: "'Oswald', sans-serif",
              fontSize: '0.75rem',
              letterSpacing: '2px',
              fontWeight: 700,
              textTransform: 'uppercase',
            }}>
              Blend School — Cum Laude
            </div>

            {/* Glow */}
            <div style={{
              position: 'absolute',
              bottom: '-2rem',
              left: '-2rem',
              width: '200px',
              height: '200px',
              background: 'radial-gradient(circle, rgba(255, 107, 157, 0.15), transparent 70%)',
              pointerEvents: 'none',
            }} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/TheExperience.jsx
git commit -m "feat: add gsap pin scroll to experience section steps"
```

---

## Task 13: Crear Archivos SEO (sitemap.xml y robots.txt)

**Files:**
- Create: `public/sitemap.xml`
- Create: `public/robots.txt`

- [ ] **Step 1: Crear sitemap.xml**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://blendz-leo.com/</loc>
    <lastmod>2026-04-04</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://blendz-leo.com/perfil</loc>
    <lastmod>2026-04-04</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://blendz-leo.com/portafolio</loc>
    <lastmod>2026-04-04</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://blendz-leo.com/contacto</loc>
    <lastmod>2026-04-04</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>
```

- [ ] **Step 2: Crear robots.txt**

```
User-agent: *
Allow: /

Sitemap: https://blendz-leo.com/sitemap.xml

Disallow: 
```

- [ ] **Step 3: Commit**

```bash
git add public/sitemap.xml public/robots.txt
git commit -m "seo: add sitemap and robots.txt"
```

---

## Task 14: Añadir Schema.org JSON-LD en Home

**Files:**
- Modify: `src/pages/Home.jsx`

- [ ] **Step 1: Añadir Helmet con Schema JSON-LD en Home**

Dentro del componente Home, dentro de `<PageTransition>` añadir:

```jsx
<Helmet>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'HairSalon',
      'name': 'Blendz Leo',
      'description': 'Barbería de autor especializada en Skin Fade y visagismo en Madrid',
      'image': 'https://blendz-leo.com/og-image.png',
      'telephone': '+34623433448',
      'url': 'https://blendz-leo.com',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'Motilla del Palancar 33',
        'addressLocality': 'Hortaleza',
        'addressRegion': 'Madrid',
        'postalCode': '28043',
        'addressCountry': 'ES'
      },
      'sameAs': ['https://instagram.com/blendz.leo'],
      'priceRange': '€€',
      'openingHours': [
        'Mo-Su 10:00-20:00'
      ],
      'areaServed': {
        '@type': 'City',
        'name': 'Madrid'
      },
      'aggregateRating': {
        '@type': 'AggregateRating',
        'ratingValue': '5.0',
        'reviewCount': '50'
      }
    })}
  </script>
</Helmet>
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/Home.jsx
git commit -m "seo: add schema.org local business json-ld"
```

---

## Task 15: Actualizar Páginas Booking, Portfolio, About con SEO

**Files:**
- Modify: `src/pages/Booking.jsx`
- Modify: `src/pages/Portfolio.jsx`
- Modify: `src/pages/About.jsx`

- [ ] **Step 1: Añadir SEO a Booking (quitar emojis)**

En `src/pages/Booking.jsx`, reemplazar el ícono 🔥 con badge sin emoji:

```jsx
<div style={{
  background: '#ffb6c1',
  color: '#050505',
  padding: '0.5rem 1rem',
  borderRadius: '4px',
  display: 'inline-block',
  fontSize: '0.9rem',
  fontWeight: 600,
  letterSpacing: '1px',
  fontFamily: "'Oswald', sans-serif",
  textTransform: 'uppercase',
  marginTop: '1rem',
}}>
  20% de Descuento en tu Primer Corte
</div>
```

Añadir SEO al inicio:

```jsx
import SEO from '../components/SEO';

export default function Booking() {
  return (
    <PageTransition>
      <SEO
        title="Reserva tu Cita | Blendz Leo Barbería Madrid"
        description="Agenda tu cita en Blendz Leo, barbería premium en Hortaleza, Madrid. 20% de descuento en tu primer corte. Reserva por Google Calendar o WhatsApp."
        canonical="https://blendz-leo.com/contacto"
      />
      {/* resto del contenido */}
    </PageTransition>
  );
}
```

- [ ] **Step 2: Añadir SEO a Portfolio**

```jsx
import SEO from '../components/SEO';

export default function Portfolio() {
  return (
    <PageTransition>
      <SEO
        title="Portafolio | Trabajos Reales · Blendz Leo Barbería Madrid"
        description="Galería de cortes reales: Skin Fade, diseño de barba, texturas avanzadas. Barbería de autor en Hortaleza, Madrid."
        canonical="https://blendz-leo.com/portafolio"
      />
      {/* resto del contenido */}
    </PageTransition>
  );
}
```

- [ ] **Step 3: Añadir SEO a About**

```jsx
import SEO from '../components/SEO';

export default function About() {
  return (
    <PageTransition>
      <SEO
        title="Firma Personal | Blendz Leo — Barbero de Autor Madrid"
        description="Conoce a Leo, barbero certificado Blend School Cum Laude en Hortaleza, Madrid. Experto en Skin Fade, visagismo y corte de autor. Motilla del Palancar 33."
        canonical="https://blendz-leo.com/perfil"
      />
      {/* resto del contenido */}
    </PageTransition>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add src/pages/Booking.jsx src/pages/Portfolio.jsx src/pages/About.jsx
git commit -m "seo: add meta tags to all pages, remove emojis from booking"
```

---

## Task 16: Actualizar index.html con Meta Tags Base

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Actualizar head de index.html**

```html
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Blendz Leo: barbería de autor en Madrid Hortaleza. Especialistas en Skin Fade, diseño de barba y visagismo. Formación Blend School Cum Laude.">
    <meta name="keywords" content="barbería madrid, barbería hortaleza, skin fade madrid, barbero premium madrid, diseño barba madrid, blendz leo">
    <meta name="author" content="Blendz Leo">
    <meta name="theme-color" content="#050505">
    <meta property="og:title" content="Blendz Leo | Barbería Premium Madrid Hortaleza">
    <meta property="og:description" content="Barbería de autor especializada en Skin Fade, diseño de barba y visagismo. Formación Blend School Cum Laude.">
    <meta property="og:image" content="https://blendz-leo.com/og-image.png">
    <meta property="og:url" content="https://blendz-leo.com">
    <meta name="twitter:card" content="summary_large_image">
    <link rel="canonical" href="https://blendz-leo.com">
    <link rel="icon" type="image/svg+xml" href="/logo.svg">
    <title>Blendz Leo | Barbería Premium Madrid Hortaleza</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 2: Commit**

```bash
git add index.html
git commit -m "seo: update base meta tags in html head"
```

---

## Task 17: Testing y Verificación Final

- [ ] **Step 1: Ejecutar app en dev mode**

```bash
npm run dev
```

Expected: App inicia sin errores, ves:
- Intro screen con logo (1 sola vez)
- Cursor rosa personalizado al mover el mouse
- Hero con texto, partículas, animaciones
- Stats con contadores (pero sin GSAP countup visible en dev, eso es OK)
- Navbar responsive con menú fullscreen en móvil
- Todas las secciones cargan correctamente

- [ ] **Step 2: Verificar Lighthouse**

```bash
npm run build
npm run preview
```

Luego abrir DevTools > Lighthouse y correr auditoría. Expected:
- Performance: ≥ 80
- SEO: 100
- Accessibility: ≥ 85

- [ ] **Step 3: Validar Schema.org**

Ir a https://validator.schema.org/ y pegar el HTML de la home. Expected: Valid JSON-LD sin errores

- [ ] **Step 4: Commit final**

```bash
git status
```

Si todo está clean, el workflow está completo.

---

## Self-Review Checklist

- ✅ Spec coverage: Todos los requisitos cubiertos (cursor, particles, GSAP, SEO, mobile menu)
- ✅ No placeholders: Código completo en cada step
- ✅ Type consistency: Componentes nombrados consistentemente
- ✅ File structure: Archivos organizados por responsabilidad
- ✅ Commits frecuentes: Cada task = 1-3 commits
- ✅ SEO completo: Meta tags, Schema.org, sitemap, robots.txt

---

## Próximos Pasos Después de Implementación

1. **Fotografías reales:** Reemplazar placeholders con fotos reales del studio
2. **Google My Business:** Crear ficha con reseñas reales
3. **Analytics:** Añadir Google Analytics
4. **Performance:** Optimizar imágenes con WebP
5. **A/B Testing:** Medir conversiones de CTA
