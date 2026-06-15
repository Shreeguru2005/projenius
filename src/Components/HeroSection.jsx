import React, { useEffect, useState, useRef } from "react";
import '../assets/css/HeroSection.css';

const slides = [
    { bg: "/images/projenius-banner.webp",   thumb: "/images/projenius-banner.webp",   buttonText: "Explore Courses"    },
    { bg: "/images/projenius-banner-1.webp", thumb: "/images/projenius-banner-1.webp", buttonText: "Explore IoT"        },
    { bg: "/images/projenius-banner-2.webp", thumb: "/images/projenius-banner-2.webp", buttonText: "Explore Web Design" },
    { bg: "/images/projenius-banner-3.webp", thumb: "/images/projenius-banner-3.webp", buttonText: "Explore Workshops"  },
    { bg: "/images/projenius-banner-4.webp", thumb: "/images/projenius-banner-4.webp", buttonText: "Explore Software"   },
];

/* Decorative floating particles config */
const PARTICLES = [
    { size: 10, top: "18%", left: "12%",  duration: "5.2s", delay: "0s"   },
    { size: 6,  top: "65%", left: "8%",   duration: "6.8s", delay: "1s"   },
    { size: 14, top: "35%", left: "88%",  duration: "7.1s", delay: "0.4s" },
    { size: 8,  top: "75%", left: "82%",  duration: "5.6s", delay: "2s"   },
    { size: 5,  top: "50%", left: "55%",  duration: "4.9s", delay: "0.8s" },
    { size: 12, top: "22%", left: "70%",  duration: "6.3s", delay: "1.5s" },
];

/* ── Scroll-reveal hook ── */
function useScrollReveal(selector = ".reveal, .reveal-left, .reveal-right") {
    useEffect(() => {
        const els = document.querySelectorAll(selector);
        if (!els.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target); // fire once
                    }
                });
            },
            { threshold: 0.15 }
        );

        els.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [selector]);
}

/* ── Mobile dot indicators ── */
function DotIndicators({ total, active, onDotClick }) {
    return (
        <div
            style={{
                display: "flex",
                gap: "8px",
                justifyContent: "center",
                marginTop: "24px",
            }}
        >
            {Array.from({ length: total }).map((_, i) => (
                <button
                    key={i}
                    aria-label={`Go to slide ${i + 1}`}
                    onClick={() => onDotClick(i)}
                    style={{
                        width:        i === active ? "24px" : "8px",
                        height:       "8px",
                        borderRadius: "4px",
                        border:       "none",
                        background:   i === active ? "#66C7DD" : "rgba(255,255,255,0.4)",
                        cursor:       "pointer",
                        padding:      0,
                        transition:   "width 0.35s ease, background 0.35s ease",
                    }}
                />
            ))}
        </div>
    );
}

export default function HeroSection() {
    const [activeSlide, setActiveSlide] = useState(0);
    const [isMobile, setIsMobile]       = useState(false);

    /* Scroll reveal */
    useScrollReveal();

    /* Track viewport width for mobile-specific UI */
    useEffect(() => {
        const mq = window.matchMedia("(max-width: 991px)");
        setIsMobile(mq.matches);
        const handler = (e) => setIsMobile(e.matches);
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, []);

    /* Auto-play */
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    const handleThumbClick = (index) => setActiveSlide(index);

    /* Visible thumbnails — always show 3, wrapping around */
    const visibleThumbs = [0, 1, 2].map((offset) => {
        const realIndex = (activeSlide + offset) % slides.length;
        return { slide: slides[realIndex], realIndex };
    });

    return (
        <div
            className="hero-wrapper"
            style={{
                backgroundImage: `
                    linear-gradient(
                        135deg,
                        rgba(18,25,41,0.92),
                        rgba(18,25,41,0.9)
                    ),
                    url(${slides[activeSlide].bg})
                `,
            }}
        >
            {/* Floating particles */}
            {PARTICLES.map((p, i) => (
                <span
                    key={i}
                    className="hero-particle"
                    style={{
                        width:             p.size,
                        height:            p.size,
                        top:               p.top,
                        left:              p.left,
                        animationDuration: p.duration,
                        animationDelay:    p.delay,
                    }}
                />
            ))}
            <section className="hero container">
                <div className="row align-items-center">

                    {/* LEFT — text content */}
                    <div className="col-lg-7 col-12">
                        <h3 className="subheading">
                            We Design, Develop &amp; Deliver Impactful Technology
                        </h3>

                        <h1 className="heading">
                            Building <span>Smart Solutions</span>
                            <br />
                            with AI, IoT &amp; Innovation
                        </h1>

                        <p className="description mt-3">
                            Projenius is a technology-driven startup focused on
                            building innovative solutions in AI, IoT, Software
                            Development, and Product Engineering.
                        </p>

                        {/* BUTTONS */}
                        <div className="hero-buttons">
                            <a href="#" className="btn">
                                <span className="btn-content" key={activeSlide}>
                                    {slides[activeSlide].buttonText}
                                </span>
                            </a>
                        </div>

                        {/* Mobile dot indicators (hidden on lg+) */}
                        {isMobile && (
                            <DotIndicators
                                total={slides.length}
                                active={activeSlide}
                                onDotClick={handleThumbClick}
                            />
                        )}
                    </div>

                    {/* RIGHT — thumbnails (desktop only) */}
                    <div className="col-lg-5 d-none d-lg-flex justify-content-center">
                        <div className="thumb-wrapper">
                            {visibleThumbs.map(({ slide, realIndex }, index) => (
                                <img
                                    key={realIndex}
                                    src={slide.thumb}
                                    alt={`slide thumbnail ${realIndex + 1}`}
                                    className={`thumb-img ${activeSlide === realIndex ? "active" : ""}`}
                                    onClick={() => handleThumbClick(realIndex)}
                                />
                            ))}
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
}