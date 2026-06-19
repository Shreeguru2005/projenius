import React, { Suspense, lazy, useEffect, useRef, useState } from "react";
import '../index.css';
import '../assets/css/About-page.css';
import TeamSection from "../Components/TeamSection";
import TestimonialSection from "../Components/TestimonialSection";
import FooterTopSection from "../Components/FooterTopSection";
import CountUp from "../Components/CountUp";
import AOS from "aos";
import "aos/dist/aos.css";

const MagazineSection = lazy(() => import("../Components/Magazine"));

const counterImages = [
  "/images/projenius-banner-1.webp",
  "/images/projenius-banner-2.webp",
  "/images/projenius-banner-3.webp",
  "/images/projenius-banner-4.webp",
  "/images/about-main-image.png",
];

const whyImages = [
  "/images/projenius-banner-2.webp",
  "/images/gallery-1.webp",
  "/images/gallery-3.webp",
  "/images/iot-workshop.png",
  "/images/software-developement-training.png",
];

const counterStats = [
  {
    end: 25000,
    suffix: "+",
    title: "Projects Completed",
    description: "Delivering practical technology projects for students, startups, and businesses.",
  },
  {
    end: 1200,
    suffix: "+",
    title: "Students Guided",
    description: "Supporting learners through training, mentoring, and career-focused sessions.",
  },
  {
    end: 150,
    suffix: "+",
    title: "Workshops Hosted",
    description: "Creating hands-on learning experiences in development, IoT, AI, and innovation.",
  },
];

export default function About() {
  const [showMagazine, setShowMagazine] = useState(false);
  const [isOpeningMagazine, setIsOpeningMagazine] = useState(false);
  const magazineCoverRef = useRef(null);

    useEffect(() => {
  AOS.init({
    duration: 600,
    once: true,
    mirror: false,
    offset: 50,
    easing: "ease-out",
  });
}, []);

  useEffect(() => {
    if (!isOpeningMagazine) return undefined;

    const timer = setTimeout(() => {
      setShowMagazine(true);
    }, 680);

    return () => clearTimeout(timer);
  }, [isOpeningMagazine]);

  useEffect(() => {
    const magazineCover = magazineCoverRef.current;
    if (!magazineCover || typeof window === "undefined") return undefined;

    let frameId = 0;

    const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

    const updateToyMotion = () => {
      const rect = magazineCover.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const start = viewportHeight * 0.95;
      const end = viewportHeight * 0.28;
      const progress = clamp((start - rect.top) / (start - end), 0, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      const x = (1 - eased) * -130;
      const y = (1 - eased) * 62 - eased * 10;
      const rotate = -10 + eased * 8;
      const scale = 0.84 + eased * 0.16;
      const pointX = eased * 8;
      const pointRotate = (1 - eased) * -2;
      const pointScale = 1 + eased * 0.025;
      const bubbleY = (1 - eased) * 16;
      const bubbleScale = 0.9 + eased * 0.1;

      magazineCover.style.setProperty("--toy-x", `${x.toFixed(2)}px`);
      magazineCover.style.setProperty("--toy-y", `${y.toFixed(2)}px`);
      magazineCover.style.setProperty("--toy-rotate", `${rotate.toFixed(2)}deg`);
      magazineCover.style.setProperty("--toy-scale", scale.toFixed(3));
      magazineCover.style.setProperty("--toy-focus", eased.toFixed(3));
      magazineCover.style.setProperty("--toy-point-x", `${pointX.toFixed(2)}px`);
      magazineCover.style.setProperty("--toy-point-rotate", `${pointRotate.toFixed(2)}deg`);
      magazineCover.style.setProperty("--toy-point-scale", pointScale.toFixed(3));
      magazineCover.style.setProperty("--toy-bubble-y", `${bubbleY.toFixed(2)}px`);
      magazineCover.style.setProperty("--toy-bubble-scale", bubbleScale.toFixed(3));
    };

    const requestToyMotion = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(updateToyMotion);
    };

    updateToyMotion();
    window.addEventListener("scroll", requestToyMotion, { passive: true });
    window.addEventListener("resize", requestToyMotion);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", requestToyMotion);
      window.removeEventListener("resize", requestToyMotion);
    };
  }, []);

  const openMagazine = () => {
    if (isOpeningMagazine) return;
    setIsOpeningMagazine(true);
  };

  const closeMagazine = () => {
    setShowMagazine(false);
    setIsOpeningMagazine(false);
  };

  return (
    <>
      <div className="header-wrap about-hero-wrap" style={{ backgroundImage: 'linear-gradient(120deg, rgba(18, 25, 41, 0.9), rgba(18, 25, 41, 0.58)), url(/images/projenius-banner.webp)' }}>
        <div className="container title-section about-hero-content">
          <h1 className="page-title">About Us</h1>
          <p className="about-hero-desc">
            We build practical digital products, IoT systems, AI solutions, and learning experiences for students, startups, and growing businesses.
          </p>
          <div className="about-hero-actions">
            <a
              href="https://wa.me/918925450473?text=Hello%20ProJenius%2C%20I%20would%20like%20to%20know%20more%20about%20your%20services."
              className="about-hero-whatsapp"
              target="_blank"
              rel="noreferrer"
            >
              <span className="about-hero-whatsapp-icon">
                <i className="bi bi-whatsapp"></i>
              </span>
              <span>
                <strong>Contact on WhatsApp</strong>
              </span>
            </a>
          </div>
          <div className="about-hero-proof" aria-label="Projenius focus areas">
            <span>AI & Software</span>
            <span>IoT Projects</span>
            <span>Training & Mentorship</span>
          </div>
        </div>
      </div>
      <section className="about-1 py-5">
  <div className="container">
    <div className="row align-items-center">

      {/* Left Circle Design */}
      <div className="col-lg-6 col-md-12" data-aos="fade-right" data-aos-delay="100">
        <div className="wrapper">
          <div className="about-principles" aria-label="Projenius vision mission and values">
            <div className="principle-orbit" aria-hidden="true"></div>

            <article className="principle-card principle-vision">
              <div className="principle-icon">
                <i className="bi bi-eye"></i>
              </div>
              <span>Vision</span>
              <p>Shape practical technology ideas into future-ready digital products.</p>
            </article>

            <article className="principle-card principle-mission">
              <div className="principle-icon">
                <i className="bi bi-rocket-takeoff"></i>
              </div>
              <span>Mission</span>
              <p>Build, mentor, and deliver solutions that create measurable real-world impact.</p>
            </article>

            <article className="principle-card principle-values">
              <div className="principle-icon">
                <i className="bi bi-gem"></i>
              </div>
              <span>Values</span>
              <p>Innovation, clarity, collaboration, and responsible engineering.</p>
            </article>
          </div>
        </div>
      </div>

      {/* Right Content */}
      <div className="col-lg-6 col-md-12" data-aos="fade-left" data-aos-delay="150">

        <span id="sub-heading">Who we are</span>

        <h2 className="section-title" id="title">
          Innovating Ideas Into Smart Solutions
        </h2>

        <p className="desc">
          Projenius is a technology-driven startup dedicated to building innovative
          solutions in software development, artificial intelligence, IoT, and
          product engineering. We work with businesses, startups, and students
          to create impactful digital products that solve real-world problems
          through creativity, technology, and innovation.
        </p>

        <div className="row">

          <div className="col-md-6 col-12">

            <ul className="icon-list">

              <li className="list">
                <i className="bi bi-check-circle-fill"></i>
                Innovative Software & AI Solutions
              </li>

              <li className="list">
                <i className="bi bi-check-circle-fill"></i>
                Training, Workshops & Mentorship
              </li>

            </ul>

          </div>

          <div className="col-md-6 col-12">

            <ul className="icon-list">

              <li className="list">
                <i className="bi bi-check-circle-fill"></i>
                Smart IoT & Product Development
              </li>

              <li className="list">
                <i className="bi bi-check-circle-fill"></i>
                Practical Technology for Real-World Impact
              </li>

            </ul>

          </div>

        </div>

        <a
          href="https://wa.me/918925450473?text=Hello%20ProJenius%2C%20I%20would%20like%20to%20know%20more%20about%20your%20services."
          className="btn about-contact-btn"
          target="_blank"
          rel="noreferrer"
        >
          <span className="btn-content">Contact Us</span>
        </a>

      </div>

    </div>
  </div>
</section>
      <section
        className="about-2 container"
        style={{
          backgroundImage: `linear-gradient(#12192940), url(${counterImages[0]})`,
        }}
      >
        <div className="box-content">
          <div className="row">
            {counterStats.map((stat, index) => (
              <div
                className="col-lg-4 col-md-4 col-sm-12"
                data-aos="zoom-in-up"
                data-aos-delay={index * 100}
                data-aos-duration="500"
                key={stat.title}
              >
                <h2 className="counter-number">
                  <CountUp to={stat.end} suffix={stat.suffix} />
                </h2>
                <h6 className="counter-title">{stat.title}</h6>
                <p className="counter-description">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <TeamSection />
      <section className="about-3 container py-5">
        <div className="row">
          <div className="col-lg-6 col-12">
            <span id="sub-heading">Why Choose us?</span>
            <h2 className="section-title" id="title">Why Projenius Stands Out in Innovation</h2>
            <p className="section-desc">We combine innovation, technology, and practical expertise to deliver reliable solutions, quality services, and impactful learning experiences for everyone.</p>
            <div
  className="why-img-slider"
  aria-label="Projenius company achievements"
  data-aos="zoom-in"
  data-aos-duration="1000"
>
              <img
                src="/images/iot-course.webp"
                alt="Projenius IoT course"
                className="why-img why-img-1"
                loading="lazy"
                decoding="async"
              />
              <img
                src="/images/software-developement-training.png"
                alt="Projenius software development training"
                className="why-img why-img-2"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
          <div className="col-lg-6 col-12 why-right">
            <div
  className="icon-box"
  data-aos="fade-left"
  data-aos-delay="100"
>
              <div className="row">
                <div className="col-3 col-sm-2">
                  <div className="icon">
                    <i className="bi bi-lightbulb"></i>
                  </div>
                </div>
                <div className="col-9 col-sm-10">
                  <h3 className="icon-box-heading">Innovative Technology Solutions</h3>
                  <p className="icon-box-desc">We build smart and scalable solutions using AI, IoT, web, and mobile technologies for real-world applications.</p>
                </div>
              </div>
            </div>
            <div
  className="icon-box mt-3"
  data-aos="fade-left"
  data-aos-delay="300"
>
              <div className="row">
                <div className="col-3 col-sm-2">
                  <div className="icon">
                    <i className="bi bi-people"></i>
                  </div>
                </div>
                <div className="col-9 col-sm-10">
                  <h3 className="icon-box-heading">Learning & Mentorship Support</h3>
                  <p className="icon-box-desc">We empower students through workshops, training programs, academic guidance, and hands-on technical learning experiences.</p>
                </div>
              </div>
            </div>
            <div className="icon-box mt-3">
              <div className="row">
                <div className="col-3 col-sm-2">
                  <div className="icon">
                    <i className="bi bi-diagram-3"></i>
                  </div>
                </div>
                <div className="col-9 col-sm-10">
                  <h3 className="icon-box-heading">Industry-Focused Development</h3>
                  <p className="icon-box-desc">Our team develops practical digital products and hardware systems tailored for businesses, startups, and industries.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="magazine-load-section">
        {showMagazine ? (
          <div className="magazine-open-shell">
            <button
              type="button"
              className="magazine-close-btn"
              onClick={closeMagazine}
              aria-label="Close magazine"
              title="Close magazine"
            >
              <span aria-hidden="true">×</span>
            </button>
            <Suspense
              fallback={
                <div className="container magazine-load-card">
                  <p className="section-desc">Loading magazine...</p>
                </div>
              }
            >
              <MagazineSection />
            </Suspense>
          </div>
        ) : (
          <div
            className="container magazine-load-card magazine-cover-card"
            ref={magazineCoverRef}
          >
            <div className="magazine-cover-copy">
              <span id="sub-heading">Magazine</span>
              <h2 className="section-title magazine-cover-title" id="title">Explore the Projenius Magazine</h2>
              <p className="section-desc">
                See our services, training work, project approach, and company story in one interactive digital magazine.
              </p>
              <div className="magazine-cover-points" aria-label="Magazine highlights">
                <span>Company story</span>
                <span>Services</span>
                <span>Workshops</span>
              </div>
            </div>
            <div className="magazine-cover-cta">
              <div className="magazine-toy-wrap" aria-hidden="true">
                <div className="magazine-toy-bubble">
                  Open the magazine
                </div>
                <img
                  src="/images/corporate-toy.png"
                  alt=""
                  className="magazine-toy-image"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <button
                type="button"
                className={`magazine-cover-button${isOpeningMagazine ? " is-opening" : ""}`}
                onClick={openMagazine}
                disabled={isOpeningMagazine}
                aria-label="Open Projenius magazine"
              >
                <span className="magazine-cover-flip">
                  <img
                    src="/images/magazine.png"
                    alt="Open Projenius magazine"
                    loading="lazy"
                    decoding="async"
                  />
                </span>
                <span className="magazine-cover-hint">
                  {isOpeningMagazine ? "Opening..." : "Click to open"}
                </span>
              </button>
            </div>
          </div>
        )}
      </section>
      <section className="awards-section py-5" data-aos="zoom-in-up" data-aos-duration="700">
        <div className="container">

          <div className="text-center mb-5">
            <span id="sub-heading" data-aos="fade-up" data-aos-delay="150">Achievements</span>
            <h2 className="section-title" id="title" data-aos="fade-up" data-aos-delay="200">Awards & Recognition</h2>

            <p className="section-desc awards-desc">
              Celebrating achievements, innovation, creativity, and milestones that showcase our passion for technology, design, and impactful digital solutions.
            </p>
          </div>

          <div className="awards-masonry">

            <div className="award-item" data-aos="fade-right" data-aos-delay="50">
              <img src="images/gallery-1.webp" alt="Award 1" loading="lazy" decoding="async" />

              <div className="award-content">
                <h4 className="award-title">Honouring Excellence</h4>
                <p className="award-subtitle">
                  Celebrating excellence, innovation, and success through achievements.
                </p>
              </div>
            </div>

            <div className="award-item" data-aos="fade-down" data-aos-delay="100">
              <img src="images/gallery-2.webp" alt="Award 2" loading="lazy" decoding="async" />

              <div className="award-content">
                <h4 className="award-title">Achievement Recognition</h4>
                <p className="award-subtitle">
                  Honoring talented students for achievements, excellence, and dedication.
                </p>
              </div>
            </div>

            <div className="award-item" data-aos="fade-left" data-aos-delay="150">
              <img src="images/gallery-3.webp" alt="Award 3" loading="lazy" decoding="async" />

              <div className="award-content">
                <h4 className="award-title">Career Guidance Session</h4>
                <p className="award-subtitle">
                  Industry experts sharing insights, innovation, and real-world knowledge.
                </p>
              </div>
            </div>

            <div className="award-item" data-aos="zoom-in" data-aos-delay="200">
              <img src="images/gallery-4.webp" alt="Award 4" loading="lazy" decoding="async" />

              <div className="award-content">
                <h4 className="award-title">Student Mentoring Program</h4>
                <p className="award-subtitle">
                  Guiding students with mentorship, support, and career-focused learning.
                </p>
              </div>
            </div>

            <div className="award-item" data-aos="flip-left" data-aos-delay="250">
              <img src="images/gallery-5.webp" alt="Award 5" loading="lazy" decoding="async" />

              <div className="award-content">
                <h4 className="award-title">SRM Hands-on Workshop</h4>
                <p className="award-subtitle">
                  Providing practical technical training to build industry-ready skills.
                </p>
              </div>
            </div>

            <div className="award-item" data-aos="fade-up-left" data-aos-delay="300">
              <img src="images/gallery-6.webp" alt="Award 6" loading="lazy" decoding="async" />

              <div className="award-content">
                <h4 className="award-title">Interactive Learning Session</h4>
                <p className="award-subtitle">
                  Hands-on lab sessions designed to improve practical learning experience.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
      <TestimonialSection />
      <FooterTopSection />
    </>

  );
}