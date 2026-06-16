import React, { useEffect } from "react";
import "../assets/css/TestimonialSection.css";
import "../index.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import AOS from "aos";
import "aos/dist/aos.css";

const testimonialData = [
  {
    id: 1,
    name: "Navajith Senthilkumar",
    role: "Intern",
    profile: "/images/testimonial-1.webp",
    review:
      "Currently I'm working here as an intern and having a great experience over here. Truly a great atmosphere to work and learn ✨",
  },

  {
    id: 2,
    name: "SWATI A S EC student",
    role: "Intern",
    profile: "/images/testimonial-2.webp",
    review:
      "Such a hardworking team, not just working, but constantly building innovations. Keep rocking and continue your amazing service 💫💫",
  },

  {
    id: 3,
    name: "Aruna Sree N",
    role: "Client",
    profile: "/images/testimonial-3.webp",
    review:
      "I had a very positive experience with ProJenius. The project was delivered on time with great attention to detail. The team was highly professional, responsive, and ensured everything was handled efficiently. Their commitment to deadlines is truly commendable.",
  },
];

export default function TestimonialSection() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 80,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <section className="testimonial-section">
      <div className="container">
        <div className="testimonial-wrapper">

          {/* LEFT CONTENT */}

          <div
            className="testimonial-left"
            data-aos="fade-right"
            data-aos-delay="150"
          >
            <div style={{ padding: '20px', background: '#fff', borderRadius: '15px' }}>
              {/* Google Reviews Elfsight Widget */}
              {/* NOTE TO USER: Replace "YOUR_WIDGET_ID" below with the actual ID from your Elfsight dashboard */}
              <div className="elfsight-app-YOUR_WIDGET_ID" data-elfsight-app-lazy></div>
              <p style={{ textAlign: 'center', marginTop: '15px', color: '#666', fontSize: '14px' }}>
                <em>(Google Reviews will appear here once you replace 'YOUR_WIDGET_ID' in TestimonialSection.jsx)</em>
              </p>
            </div>
          </div>

          {/* RIGHT IMAGE */}

          <div
            className="testimonial-right"
            data-aos="fade-left"
            data-aos-delay="300"
          >

            <div className="quote-icon">
              <i className="bi bi-quote"></i>
            </div>

            <img
              src="https://pngimg.com/uploads/businessman/businessman_PNG6564.png"
              alt="Businessman"
            />

          </div>

        </div>
      </div>
    </section>
  );
}