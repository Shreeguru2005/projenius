import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Reveal from "../Components/Reveal";
import "../index.css";
import "../assets/css/Service-page.css";
import FooterTopSection from "../Components/FooterTopSection";
import PriceTableSection from "../Components/PriceTableSection";

export default function Services() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.12 });
  const whatsappNumber = "918925450473";

  const developmentServices = [
    {
      title: "Website Development",
      icon: "bi bi-window-stack icon",
      desc:
        "Responsive business websites with fast loading pages, clear navigation, SEO-friendly structure, and polished visual design.",
    },
    {
      title: "Web App Development",
      icon: "bi bi-code-square icon",
      desc:
        "Custom web applications with dashboards, user flows, forms, APIs, admin panels, and scalable frontend architecture.",
    },
    {
      title: "Mobile App Development",
      icon: "bi bi-phone icon",
      desc:
        "Mobile-first app experiences for Android and cross-platform use cases with clean screens and practical feature flows.",
    },
    {
      title: "E-Commerce Solutions",
      icon: "bi bi-cart-check icon",
      desc:
        "Online stores with product catalogs, enquiry flows, payment-ready structure, order management, and conversion-focused pages.",
    },
    {
      title: "UI / UX for Products",
      icon: "bi bi-palette icon",
      desc:
        "Wireframes, prototypes, design systems, and interface improvements that make products easier to understand and use.",
    },
    {
      title: "Product Maintenance",
      icon: "bi bi-tools icon",
      desc:
        "Ongoing updates, bug fixes, performance improvements, feature additions, and technical support after launch.",
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const getCardVariants = (index) => ({
    hidden: {
      opacity: 0,
      x: index % 2 === 0 ? -80 : 80,
      rotateY: index % 2 === 0 ? -15 : 15,
      scale: 0.85,
    },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  });

  const headingVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const subheadingVariants = {
    hidden: { opacity: 0, letterSpacing: "0px" },
    visible: {
      opacity: 1,
      letterSpacing: "3px",
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const getWhatsAppLink = (serviceTitle) => {
    const message = `Hello ProJenius, I would like to know more about your ${serviceTitle} service.`;
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  };

  return (
    <>

      <section className="header-wrap" style={{backgroundImage:'linear-gradient(#1219297d), url(/images/projenius-banner.webp)'}}>
        <div className="container title-section">
          <h1 className="page-title">Development Services</h1>
        </div>
      </section>

      <section className="development-hero">
  <div className="container">
    <div className="row align-items-center">

      <div className="col-lg-6">
        <div className="hero-content">

          <span className="hero-tag">
            DEVELOPMENT SERVICES
          </span>

          <h1>
            Transform Ideas Into
            <span> Powerful Digital Products</span>
          </h1>

          <p>
            We design and develop websites, web applications,
            mobile apps, and custom software solutions that help
            businesses grow, automate processes, and deliver
            exceptional customer experiences.
          </p>

          <div className="hero-buttons">
            <a href="/contact" className="hero-btn-primary">
              Start Your Project
            </a>
          </div>

        </div>
      </div>

      <div className="col-lg-6">
        <div className="hero-image">
          <img
            src="/images/services-popup.png"
            alt="Development Services"
          />
        </div>
      </div>

    </div>
  </div>
</section>
<section className="service-1" ref={sectionRef}>
  <div className="container">

```
<div className="section-heading text-center">

  <motion.h2
    id="title"
    variants={headingVariants}
    initial="hidden"
    animate={isInView ? "visible" : "hidden"}
  >
    {"< What do you want to build? />"}
  </motion.h2>

  <p className="service-description">
    We create websites, web applications, mobile apps,
    e-commerce platforms and custom software solutions
    that help businesses automate workflows, improve
    customer experiences and scale faster.
  </p>

</div>

<motion.div
  className="row justify-content-center"
  variants={containerVariants}
  initial="hidden"
  animate={isInView ? "visible" : "hidden"}
>
  {developmentServices.map((service, index) => (
    <div className="col-lg-4 col-md-6 col-12 mb-4" key={index}>

      <motion.div
        className="box"
        variants={getCardVariants(index)}
        whileHover={{
          y: -8,
          transition: {
            duration: 0.3,
          },
        }}
      >

        <div className="service-icon">
          <i className={service.icon}></i>
        </div>

        <h4 className="box-title">
          {service.title}
        </h4>

        <p className="box-desc">
          {service.desc}
        </p>

        <a
          href={getWhatsAppLink(service.title)}
          className="service-btn"
          target="_blank"
          rel="noopener noreferrer"
        >
          To get More Info
        </a>

      </motion.div>

    </div>
  ))}
</motion.div>
```

  </div>
</section>


      
    
      <div>
      <Reveal width="100%" delay={0.23}><PriceTableSection /></Reveal>
      <Reveal width="100%" delay={0.29}><FooterTopSection /></Reveal>
      </div>
    </>
  );
}
