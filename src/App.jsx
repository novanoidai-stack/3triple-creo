import { Routes, Route, useLocation } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { AnimatePresence } from 'framer-motion';

import Navbar from './components/Navbar';
import FloatingContact from './components/FloatingContact';
import CustomCursor from './components/CustomCursor';
import IntroScreen from './components/IntroScreen';

import Home from './pages/Home';
const About    = lazy(() => import('./pages/About'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Booking  = lazy(() => import('./pages/Booking'));
const Products = lazy(() => import('./pages/Products'));

function App() {
  const location = useLocation();

  return (
    <>
      <CustomCursor />
      <IntroScreen />
      <Navbar />
      <main>
        <Suspense fallback={null}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/perfil" element={<About />} />
              <Route path="/portafolio" element={<Portfolio />} />
              <Route path="/productos" element={<Products />} />
              <Route path="/contacto" element={<Booking />} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </main>
      <FloatingContact />
    </>
  );
}

export default App;
