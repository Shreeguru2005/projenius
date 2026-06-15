import React from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

const pageVariants = {
  initial: {
    opacity: 0,
    y: 24,
    scale: 0.98,
  },
  enter: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.02,
    },
  },
  exit: {
    opacity: 0,
    y: -18,
    scale: 1.02,
    transition: {
      duration: 0.35,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

export default function PageTransition({ children }) {
  const location = useLocation();

  return (
    <motion.div
      key={location.pathname}
      initial="initial"
      animate="enter"
      exit="exit"
      variants={pageVariants}
      style={{
        width: "100%",
        minHeight: "100vh",
        willChange: "transform, opacity",
        transformOrigin: "top center",
      }}
    >
      {children}
    </motion.div>
  );
}
