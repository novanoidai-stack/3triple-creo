import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Navbar from './components/Navbar';
import FloatingContact from './components/FloatingContact';
import CustomCursor from './components/CustomCursor';
import IntroScreen from './components/IntroScreen';

import Home from './pages/Home';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import Booking from './pages/Booking';
import Products from './pages/Products';

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
          <Route path="/productos" element={<Products />} />
          <Route path="/contacto" element={<Booking />} />
        </Routes>
      </AnimatePresence>
      <FloatingContact />
    </>
  );
}

export default App;
