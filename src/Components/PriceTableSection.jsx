import React, { useEffect, useState } from "react";
import "../assets/css/PriceTableSection.css";

// Business-related high quality images (Unsplash CDN)
const slideshowImages = [
  {
    url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80",
    alt: "Technology Innovation",
  },
  {
    url: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    alt: "Business Growth",
  },
  {
    url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    alt: "Innovation Technology",
  },
  {
    url: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80",
    alt: "Team Collaboration",
  },
];

const PricingSection = () => {
  const [bgIndex, setBgIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);

  // Cycle images every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setBgIndex((prev) => {
        setPrevIndex(prev);
        return (prev + 1) % slideshowImages.length;
      });
    }, 4000);
    return () => clearInterval(timer);
  }, []);

   const openWhatsApp = (packageName) => {
    const phoneNumber = "918925450473";

    const message = `Hi, I am interested in the ${packageName} package. Please share more details.`;

    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <section className="pricing-main-section">
      <div className="container-fluid">
        <div className="row g-4">

          {/* LEFT IMAGE CARD — with Ken Burns slideshow */}
          <div className="col-lg-4">
            <div className="pricing-image-card">

              {/* Slideshow layers */}
              {slideshowImages.map((img, idx) => (
                <div
                  key={idx}
                  className={`pricing-slide-bg ${
                    idx === bgIndex
                      ? "active"
                      : idx === prevIndex
                      ? "prev"
                      : ""
                  }`}
                  aria-hidden={idx !== bgIndex}
                >
                  <img
                    src={img.url}
                    alt={img.alt}
                    draggable="false"
                  />
                </div>
              ))}

              {/* Dark overlay */}
              <div className="pricing-slide-overlay" aria-hidden="true" />

              {/* Dot indicators */}
              <div className="pricing-slide-dots" aria-hidden="true">
                {slideshowImages.map((_, idx) => (
                  <span
                    key={idx}
                    className={`pricing-slide-dot ${idx === bgIndex ? "active" : ""}`}
                  />
                ))}
              </div>

              {/* Text content */}
              <div className="pricing-overlay-content">
                <span id="sub-heading" className="text-white">Join With Us</span>

                <h1 id="title">
                  Amazing <br />
                  Pricing For <br />
                  Growth <br />
                  Business
                </h1>

                <div className="arrow-circle">
                  <i className="bi bi-arrow-up-right"></i>
                </div>
              </div>
            </div>
          </div>

          {/* MONTHLY PACKAGE */}
          <div className="col-lg-4" data-aos="fade-up" data-aos-delay="300">
            <div className="package-card active-card">

              <div className="package-top">
                <div className="thunder-icon">
                  <i className="bi bi-lightning-charge-fill"></i>
                </div>

                <h3 className="card-title">Monthly Package</h3>
              </div>

              <p className="package-text">
                We denounce with righteous indignation dislike beguiled and
                demoralize
              </p>

              <ul className="package-list">
                <li><i className="bi bi-check-circle"></i> Landing Page Design</li>
                <li><i className="bi bi-check-circle"></i> Web Development</li>
                <li><i className="bi bi-check-circle"></i> SEO Optimizations</li>
                <li><i className="bi bi-check-circle"></i> Mobile Applications Design</li>
                <li><i className="bi bi-check-circle"></i> Quality Assurance</li>
                <li><i className="bi bi-check-circle"></i> Customs Services</li>
              </ul>

              <div className="price-box">
                <div>
                  <span className="dollar">₹</span>
                  <span className="price">2500</span>
                </div>

                <div className="save-box">
                  <span>Save 15%</span>
                </div>
              </div>

              <button
               className="choose-btn"
               onClick={() => openWhatsApp("Monthly")}
              >
             Choose Package <i className="bi bi-arrow-right"></i>
              </button>
            </div>
          </div>

          {/* YEARLY PACKAGE */}
          <div className="col-lg-4" data-aos="fade-left" data-aos-delay="450">
            <div className="package-card">

              <div className="package-top">
                <div className="thunder-icon">
                  <i className="bi bi-lightning-charge-fill"></i>
                </div>

                <h3>Yearly Package</h3>
              </div>

              <p className="package-text">
                We denounce with righteous indignation dislike beguiled and
                demoralize
              </p>

              <ul className="package-list">
                <li><i className="bi bi-check-circle"></i> Landing Page Design</li>
                <li><i className="bi bi-check-circle"></i> Web Development</li>
                <li><i className="bi bi-check-circle"></i> SEO Optimizations</li>
                <li><i className="bi bi-check-circle"></i> Mobile Applications Design</li>
                <li><i className="bi bi-check-circle"></i> Quality Assurance</li>
                <li><i className="bi bi-check-circle"></i> Customs Services</li>
              </ul>

              <div className="price-box">
                <div>
                  <span className="dollar">₹</span>
                  <span className="price">30000</span>
                </div>

                <div className="save-box">
                  <span>Save 15%</span>
                </div>
              </div>

              <button
                className="choose-btn"
                onClick={() => openWhatsApp("Yearly")}
              >
                Choose Package <i className="bi bi-arrow-right"></i>
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PricingSection;