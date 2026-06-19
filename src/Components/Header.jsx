import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import "../assets/css/Header.css";
import logo from "/images/projenius-logo.webp";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  {
    label: "Services",
    to: "/services",
    dropdown: [
      { to: "/services", label: "Development" },
      { to: "/courses", label: "Courses" },
      { to: "/internship", label: "Internship" },
      { to: "/career-guidance", label: "Career Guidance" },
    ],
  },
  { to: "/workshop", label: "Workshop" },
  { to: "/startup", label: "Startup Supporter" },
   { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
 
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [showHeader, setShowHeader] = useState(false); // start hidden, animate in on mount
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const hideTimerRef = useRef(null);
  const showHeaderRef = useRef(false);

  const location = useLocation();

  // Animate in on mount after a short delay
  useEffect(() => {
    const t = setTimeout(() => {
      showHeaderRef.current = true;
      setShowHeader(true);
    }, 50);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const hide = () => {
      if (showHeaderRef.current) {
        showHeaderRef.current = false;
        setShowHeader(false);
      }
    };

    const show = () => {
      if (!showHeaderRef.current) {
        showHeaderRef.current = true;
        setShowHeader(true);
      }
    };

    const clearTimer = () => {
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
        hideTimerRef.current = null;
      }
    };

    const scheduleHide = () => {
      clearTimer();
      hideTimerRef.current = setTimeout(() => {
        if (window.scrollY >= 50) hide();
      }, 1200);
    };

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      setScrolled(currentScrollY > 50);

      if (currentScrollY < 50) {
        // At top — always show, cancel any pending hide
        clearTimer();
        show();
      } else if (delta > 5) {
        // Scrolling down (threshold 5px to avoid jitter) — hide immediately
        clearTimer();
        hide();
      } else if (delta < -5) {
        // Scrolling up — show, then schedule hide after stop
        show();
        scheduleHide();
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimer();
    };
  }, []);

  const isActive = (link) => {
    if (link.dropdown) {
      return (
        link.to === location.pathname ||
        link.dropdown.some((item) => item.to === location.pathname)
      );
    }

    return link.to === location.pathname;
  };

  return (
    <header
      className={`glass-header ${scrolled ? "scrolled" : ""} ${showHeader ? "header-visible" : "header-hidden"}`}
      onMouseEnter={() => {
        // Cancel the idle hide timer while hovering
        if (hideTimerRef.current) {
          clearTimeout(hideTimerRef.current);
          hideTimerRef.current = null;
        }
      }}
      onMouseLeave={() => {
        // Restart the idle hide timer when mouse leaves
        if (window.scrollY >= 50) {
          hideTimerRef.current = setTimeout(() => {
            showHeaderRef.current = false;
            setShowHeader(false);
          }, 1200);
        }
      }}
    >
      <div className="glass-navbar-inner">
        <Link
  to="/"
  className="glass-logo"
  aria-label="ProJenius Home"
  onClick={() => window.location.reload()}
>
  <img src={logo} alt="ProJenius" className="shiny-logo-img" />
</Link>

        <nav className="glass-nav-links" aria-label="Main navigation">
          {navLinks.map((link) =>
            link.dropdown ? (
              <div
                key={link.label}
                className={`glass-nav-item has-dropdown ${isActive(link) ? "active" : ""
                  }`}
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
                onFocus={() => setServicesOpen(true)}
              >
                <button
                  type="button"
                  className="glass-nav-link glass-nav-button"
                  onClick={() => setServicesOpen((open) => !open)}
                  aria-expanded={servicesOpen}
                >
                  {link.label}
                </button>

                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      className="glass-dropdown"
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.to}
                          to={item.to}
                          className={`glass-dropdown-item ${location.pathname === item.to ? "active" : ""
                            }`}
                          onClick={() => setServicesOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div
                key={link.to}
                className={`glass-nav-item ${isActive(link) ? "active" : ""
                  }`}
              >
                <Link to={link.to} className="glass-nav-link">
                  {link.label}
                </Link>
              </div>
            )
          )}
        </nav>



        <button
          className="glass-hamburger"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="glass-mobile-drawer"
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <nav aria-label="Mobile navigation">
              {navLinks.map((link) =>
                link.dropdown ? (
                  <div key={link.label} className="glass-mobile-group">
                    <button
                      className={`glass-mobile-link glass-mobile-toggle ${servicesOpen ? "open" : ""
                        }`}
                      onClick={() => setServicesOpen((open) => !open)}
                      aria-expanded={servicesOpen}
                    >
                      {link.label}
                      <ChevronDown size={16} aria-hidden="true" />
                    </button>

                    <AnimatePresence initial={false}>
                      {servicesOpen && (
                        <motion.div
                          className="glass-mobile-sub"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                        >
                          {link.dropdown.map((item) => (
                            <Link
                              key={item.to}
                              to={item.to}
                              className={`glass-mobile-link sub ${location.pathname === item.to ? "active" : ""
                                }`}
                              onClick={() => {
                                setMenuOpen(false);
                                setServicesOpen(false);
                              }}
                            >
                              {item.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`glass-mobile-link ${isActive(link) ? "active" : ""
                      }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                )
              )}

            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}