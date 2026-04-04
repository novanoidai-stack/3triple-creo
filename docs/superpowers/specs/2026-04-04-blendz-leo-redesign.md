# Blendz Leo — Rediseño Completo + SEO Local
**Fecha:** 2026-04-04  
**Stack:** React 18 + Vite + Framer Motion + GSAP + ScrollTrigger  
**Objetivo:** Rediseño 10/10 nivel mundial + posicionamiento SEO local Madrid Hortaleza

---

## 1. Resumen Ejecutivo

Rediseño completo de la web de barbería premium Blendz Leo (Madrid, Hortaleza). Se mantienen todas las rutas y funcionalidades actuales (booking via Google Calendar y WhatsApp, portfolio, about). Se reemplaza la capa visual y de animaciones por un sistema de clase mundial comparable a webs de Awwwards. Se añade SEO local completo para posicionar en búsquedas de "barbería Madrid", "skin fade Hortaleza" y variantes.

---

## 2. Dirección de Diseño

**Estilo:** Dark Tech Premium + Cinematic Noir (más Tech)  
**Paleta:**
- Background: `#050505`
- Surface: `#0a0608` (negro con tinte morado muy sutil)
- Pink primary: `#ffb6c1` (rosa claro — acento principal)
- Pink hot: `#ff6b9d` (rosa vibrante — CTAs y glows)
- Pink glow: `rgba(255,107,157,0.08)` (para radiales de fondo)
- Text: `#ffffff`
- Text muted: `rgba(255,255,255,0.45)`
- Border: `rgba(255,182,193,0.1)`
- Gold: `#cca43b` (badge Cum Laude, solo ese uso)

**Tipografía:**
- Display/Hero: `Playfair Display` (serif, italic para énfasis)
- Headlines: `Oswald` (bold uppercase — mantener)
- Body: `Outfit` (mantener)
- Logo: `Great Vibes` (mantener)

**Grid Lines decorativas:** `repeating-linear-gradient` con `rgba(255,182,193,0.02)` — sutiles  
**Glow radial:** presente en hero, CTA y secciones clave

---

## 3. Sistema de Animaciones (Espectacular)

### 3.1 Cursor Personalizado
- Componente `<CustomCursor />` global
- Punto rosa de 10px + anillo de 38px con `mix-blend-mode: difference`
- El punto sigue al cursor con `requestAnimationFrame` (lerp suave)
- El anillo tiene delay de interpolación para efecto "cola"
- En hover sobre links/botones: el punto se expande a 0px y el anillo a 60px (cursor "absorbido")
- En hover sobre imágenes: texto "VER" aparece dentro del cursor

### 3.2 Página de Carga (Intro Screen)
- Pantalla negra con el logo `Great Vibes` en blanco que aparece letra a letra
- Después, cortina negra se divide en 2 mitades y se desliza hacia arriba/abajo revelando la web (como abrir un libro)
- Duración total: ~2.5 segundos. Solo en primera visita de la sesión (`sessionStorage`).

### 3.3 Hero — Animaciones de Entrada
- Texto hero se revela letra a letra con stagger de 0.03s (implementado con split de caracteres + Framer Motion)
- Tag "Barbería de Autor · Madrid, Hortaleza" aparece con fade + slide desde izquierda
- Subtítulo: fade-in con delay
- Botones: slide-up con spring
- Fondo: partículas animadas (ver 3.4)

### 3.4 Sistema de Partículas (Canvas)
- Componente `<ParticleField />` basado en Canvas 2D
- ~60 partículas de tamaño aleatorio (1-4px) en color `#ffb6c1` con opacidad variable (0.2-0.6)
- Movimiento: dirección aleatoria lenta, rebotan en bordes
- Conexión: líneas de `rgba(255,182,193,0.05)` entre partículas < 120px de distancia
- En zona derecha del hero (75% del ancho) para no tapar el texto
- También presente (versión reducida ~30 partículas) en la sección CTA

### 3.5 GSAP ScrollTrigger — Scroll Storytelling
- **Stats strip:** números cuentan desde 0 hasta su valor final al entrar en viewport (CountUp con GSAP)
- **Sección El Proceso:** los 3 steps se revelan con pin — el texto del step activo se ilumina (opacity 0.4 → 1) mientras se scrollea
- **Portfolio horizontal strip:** el carrusel se mueve automáticamente al hacer scroll (horizontal scroll ligado al scroll vertical con ScrollTrigger)
- **Sección About:** imagen entra con `clipPath` de izquierda a derecha al hacer scroll
- **Líneas decorativas:** líneas horizontales de separación se "dibujan" de izquierda a derecha al entrar en viewport

### 3.6 Transiciones de Página (Framer Motion)
- Mantener `AnimatePresence mode="wait"` existente
- Mejorar `PageTransition`: cortina rosa de 3px de alto que se expande a toda la pantalla y luego colapsa en la nueva página (wipe horizontal)

### 3.7 Micro-interacciones
- Botones: `whileHover` con leve translateX + glow box-shadow rosa
- Navbar links: underline animado que se dibuja al hover (CSS `::after` con `scaleX`)
- Cards del portfolio: `whileHover` con scale 1.03 + glow lateral rosa
- Testimonial dots: transición de width (activo = 24px, inactivo = 6px)
- Botón WhatsApp flotante: pulso de glow cada 3s

### 3.8 Navbar Scroll Behavior
- Al hacer scroll >50px: `background` intensifica el blur y aparece `border-bottom` rosa sutil
- Transición suave con CSS + `useScroll` de Framer Motion

---

## 4. Estructura de Archivos Nueva

```
src/
  components/
    Navbar.jsx           — Rediseño completo + mobile fullscreen overlay
    CustomCursor.jsx     — Cursor personalizado (nuevo)
    ParticleField.jsx    — Canvas de partículas (nuevo)
    IntroScreen.jsx      — Pantalla de carga inicial (nuevo)
    PageTransition.jsx   — Mejorar wipe existente
    FloatingContact.jsx  — Mejorar estilo + pulso
    Testimonials.jsx     — Rediseño con nueva tipografía
    TheExperience.jsx    — Rediseño con GSAP pin scroll
  pages/
    Home.jsx             — Hero + Stats + Experience + Portfolio strip + Testimonials + CTA
    About.jsx            — Rediseño con clipPath scroll + firma
    Portfolio.jsx        — Grid masonry + lightbox modal
    Booking.jsx          — Quitar emojis, rediseño menú autor
  styles/
    globals.css          — Reset + variables CSS + utilidades (refactor de inline styles)
  utils/
    splitText.js         — Helper para split de caracteres (animación letra a letra)
  App.jsx                — Añadir CustomCursor + IntroScreen
  main.jsx               — Añadir react-helmet-async Provider
```

---

## 5. SEO Local Completo

### 5.1 Dependencias
```
npm install react-helmet-async
```

### 5.2 Componente `<SEO />` reutilizable
Props: `title`, `description`, `canonical`, `image`  
Incluye: `<title>`, `<meta description>`, Open Graph, Twitter Card, `<link rel="canonical">`

### 5.3 Meta Tags por Página

**Home:**
```
title: "Blendz Leo | Barbería Premium Madrid Hortaleza · Skin Fade & Diseño de Barba"
description: "Barbería de autor en Hortaleza, Madrid. Especialistas en Skin Fade, diseño de barba y visagismo. Formación Blend School Cum Laude. Reserva tu cita con 20% dto."
keywords: barbería madrid, barbería hortaleza, skin fade madrid, barbero premium madrid, diseño barba madrid, blendz leo
```

**About:**
```
title: "Firma Personal | Blendz Leo — Barbero de Autor Madrid"
description: "Conoce a Leo, barbero certificado Blend School Cum Laude en Hortaleza, Madrid. Experto en Skin Fade, visagismo y corte de autor. Motilla del Palancar 33."
```

**Portfolio:**
```
title: "Portafolio | Trabajos Reales · Blendz Leo Barbería Madrid"
description: "Galería de cortes reales: Skin Fade, diseño de barba, texturas avanzadas. Barbería de autor en Hortaleza, Madrid."
```

**Booking:**
```
title: "Reserva tu Cita | Blendz Leo · Barbería Madrid Hortaleza"
description: "Agenda tu cita en Blendz Leo, barbería premium en Hortaleza, Madrid. 20% de descuento en tu primer corte. Reserva por Google Calendar o WhatsApp."
```

### 5.4 Schema.org JSON-LD (en Home y About)
```json
{
  "@context": "https://schema.org",
  "@type": "HairSalon",
  "name": "Blendz Leo",
  "description": "Barbería de autor especializada en Skin Fade y visagismo en Madrid",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Motilla del Palancar 33",
    "addressLocality": "Hortaleza",
    "addressRegion": "Madrid",
    "addressCountry": "ES"
  },
  "telephone": "+34623433448",
  "url": "https://blendz-leo.com",
  "sameAs": ["https://instagram.com/blendz.leo"],
  "priceRange": "€€",
  "openingHours": "Mo-Su 10:00-20:00",
  "hasMap": "https://maps.google.com/?q=Motilla+del+Palancar+33+Hortaleza+Madrid"
}
```

### 5.5 Otros elementos SEO
- `<html lang="es">` — ya correcto
- `<meta charset="UTF-8">` — ok
- Imágenes con `alt` descriptivos con keywords locales (ej: "Skin Fade perfecto barbería Hortaleza Madrid")
- `sitemap.xml` estático (4 URLs)
- `robots.txt` permitiendo todo
- Heading hierarchy correcta: H1 solo en hero, H2 por sección, H3 en items

---

## 6. Rediseño por Página

### 6.1 Home
1. `IntroScreen` (primera visita de sesión)
2. `Navbar` fijo con glass
3. Hero: tag + título Playfair + subtítulo + CTAs + `ParticleField`
4. Stats strip: 4 estadísticas con CountUp GSAP
5. `TheExperience`: 3 steps con GSAP pin scroll
6. Portfolio strip: 5 fotos con scroll horizontal ligado a scroll vertical
7. `Testimonials`: rediseño con quote gigante de fondo
8. CTA section con glow y `ParticleField` reducido
9. Footer con keywords SEO + Schema badge

### 6.2 About (Firma Personal)
- Grid 2 columnas: imagen izquierda (clipPath reveal al scroll) + texto derecho
- Quote estilizada con Playfair italic
- Stats pequeños bajo el texto (años experiencia, etc.)
- Link Instagram con animación

### 6.3 Portfolio
- Header con contador de obras
- Grid masonry: `columns: 3` CSS, imágenes con hover overlay "VER CORTE"
- Lightbox modal: click en imagen abre modal fullscreen con navegación prev/next + animación zoom
- Grayscale por defecto → color en hover (mantener)

### 6.4 Booking (Reserva)
- Quitar todos los emojis
- Menú Michelin: rediseño tipográfico completo
- Badge de descuento: elegante, sin emojis, bordes finos rosa
- Botones Calendar y WhatsApp: rediseño con iconos minimalistas
- Añadir sección de horarios/ubicación

---

## 7. Mobile

### 7.1 Navbar Mobile
- Hamburger animado (3 líneas → X con rotación)
- Menú fullscreen overlay: fondo `rgba(5,5,5,0.97)` + `backdrop-filter: blur`
- Links con stagger de entrada (Framer Motion), tipografía grande
- Links dispuestos con `border-left: 2px solid #ffb6c1` en el activo

### 7.2 Responsive Breakpoints
- Desktop: > 1024px — layouts de 2 columnas, portfolio 3 col
- Tablet: 768-1024px — ajustes de tamaño tipográfico, portfolio 2 col
- Mobile: < 768px — todo 1 columna, cursor desactivado, hero más compacto, portfolio 1 col

### 7.3 Custom Cursor en Mobile
- El cursor personalizado se desactiva completamente en dispositivos táctiles (`'ontouchstart' in window`)

---

## 8. Dependencias Nuevas

```json
"react-helmet-async": "^2.0.4",
"gsap": "^3.12.5"
```

No se añade nada más. GSAP + Framer Motion cubre todo.

---

## 9. Archivos que se Eliminan / Deprecan

- Inline styles masivos → migrados a `globals.css` con clases reutilizables
- `letterVariants` y `titleText` sin usar en `Home.jsx` → eliminados
- Emojis en `Booking.jsx` → eliminados
- `textY` parallax roto → reemplazado por GSAP ScrollTrigger correcto

---

## 10. Criterios de Éxito

- [ ] Lighthouse Performance ≥ 90
- [ ] Lighthouse SEO = 100
- [ ] Lighthouse Accessibility ≥ 85
- [ ] Cursor personalizado funciona en desktop
- [ ] Menú fullscreen funciona en móvil
- [ ] Schema.org válido en Google Rich Results Test
- [ ] Partículas no afectan rendimiento (canvas optimizado con `devicePixelRatio`)
- [ ] GSAP ScrollTrigger se limpia correctamente en desmontaje de componentes
- [ ] Todas las rutas existentes se mantienen (`/`, `/perfil`, `/portafolio`, `/contacto`)
- [ ] Links de Google Calendar y WhatsApp se mantienen intactos
