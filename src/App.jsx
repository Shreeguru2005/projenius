import { Routes, Route, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Lenis from "lenis";

import Home from "./Pages/Home";
import Services from "./Pages/Services";
import Contact from "./Pages/Contact";
import About from "./Pages/About";
import Startup from './Pages/Startup';
import Blog from './Pages/Blog';
import Courses from "./Pages/Courses";
import Workshop from "./Pages/Workshop";
import CourseDetails from "./Pages/CourseDetails";
import Internship from "./Pages/Internship";
import CareerGuidance from "./Pages/CareerGuidance";

import Footer from "./Components/Footer";
import ScrollToTop from "./Components/ScrollToTop";
import PagePopup from "./Components/PagePopup";

// Core AI SaaS overhaul components
import PageTransition from "./Components/PageTransition";
import Header from "./Components/Header";

// Central popup configuration for the target pages
const POPUP_CONFIGS = {
  "/": {
    imageSrc: "/images/home-popup.png",
    title: "Welcome to ProJenius",
    subtitle: "Innovation & Technology",
  },
  "/workshop": {
    imageSrc: "/images/iot-workshop.png",
    title: "Hands-On Learning Experience",
    subtitle: "Our Workshops",
  },
  "/startup": {
    imageSrc: "/images/about-main-image.png",
    title: "We Support Your Startup Journey",
    subtitle: "Startup Support",
  },
  "/about": {
    imageSrc: "/images/about-popup.png",
    title: "Shaping the Future Together",
    subtitle: "Who We Are",
  },
  "/services": {
    imageSrc: "/images/services-popup.png",
    title: "Our Premium Services",
    subtitle: "Expert Solutions",
  },
  "/internship": {
    imageSrc: "/images/courses-popup.png",
    title: "Start Your Internship Journey",
    subtitle: "Career Experience",
  },
  "/courses": {
    imageSrc: "/images/courses-popup.png",
    title: "Explore Our Specializations",
    subtitle: "Learn & Upskill",
  },
  "/career-guidance": {
    imageSrc: "/images/courses-popup.png",
    title: "Plan Your Career Path",
    subtitle: "Career Guidance",
  },
  "/contact": {
    imageSrc: "/images/contact-popup.png",
    title: "Let's Start a Conversation",
    subtitle: "Get In Touch",
  }
};

export default function App() {
  const location = useLocation();
  const [activePopup, setActivePopup] = useState(null);

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth Apple-like easing
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
    
    return () => {
      lenis.destroy();
    }
  }, []);

  useEffect(() => {
    const currentPath = location.pathname;
    const config = POPUP_CONFIGS[currentPath];

    if (config) {
      // Check if the popup has been shown in the current session
      const hasShown = sessionStorage.getItem(`popup_shown_${currentPath}`);
      if (!hasShown) {
        const timer = setTimeout(() => {
          setActivePopup({
            path: currentPath,
            ...config
          });
        }, 5000);
        return () => clearTimeout(timer);
      }
    } else {
      setActivePopup(null);
    }
  }, [location.pathname]);

  const closePopup = () => {
    if (activePopup) {
      sessionStorage.setItem(`popup_shown_${activePopup.path}`, "true");
      setActivePopup(null);
    }
  };

  return (
    <>
      <ScrollToTop />

      {/* Subtle Background Elements */}
      <div className="bg-gradient-orb orb-1"></div>
      <div className="bg-gradient-orb orb-2"></div>

      {activePopup && (
        <PagePopup
          imageSrc={activePopup.imageSrc}
          title={activePopup.title}
          subtitle={activePopup.subtitle}
          onClose={closePopup}
        />
      )}

      <Header />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/about" element={<PageTransition><About /></PageTransition>} />
          <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
          <Route path="/courses" element={<PageTransition><Courses /></PageTransition>} />
          <Route path="/coursedetails" element={<PageTransition><CourseDetails /></PageTransition>} />
          <Route path="/workshop" element={<PageTransition><Workshop /></PageTransition>} />
          <Route path="/internship" element={<PageTransition><Internship /></PageTransition>} />
          <Route path="/career-guidance" element={<PageTransition><CareerGuidance /></PageTransition>} />
          <Route path="/startup" element={<PageTransition><Startup /></PageTransition>} />
          <Route path="/blog" element={<PageTransition><Blog /></PageTransition>} />
          <Route path="/blog/:slug" element={<PageTransition><Blog /></PageTransition>} />
          <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        </Routes>
      </AnimatePresence>

      <Footer />
    </>
  );
}
