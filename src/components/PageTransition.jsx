import { motion } from 'framer-motion';

const variants = {
  hidden: { opacity: 0, y: 30 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 },
};

export default function PageTransition({ children }) {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="enter"
      exit="exit"
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="page-container"
    >
      {children}
    </motion.div>
  );
}
