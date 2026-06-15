import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Artificial delay to ensure a smooth reveal
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "#050816", // Match dark theme
            zIndex: 99999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{ textAlign: "center" }}
          >
            <h1 style={{ color: "#ffffff", fontSize: "2rem", letterSpacing: "2px", fontFamily: "Orbitron, sans-serif" }}>
              PROJENIUS
            </h1>
            <motion.div
              style={{
                width: "100%",
                height: "2px",
                backgroundColor: "rgba(255,255,255,0.2)",
                marginTop: "10px",
                position: "relative",
                overflow: "hidden"
              }}
            >
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                style={{
                  width: "50%",
                  height: "100%",
                  backgroundColor: "#2563EB",
                }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
