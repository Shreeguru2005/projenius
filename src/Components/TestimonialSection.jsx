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
            <Swiper
              modules={[Navigation, Autoplay]}
              slidesPerView={1}
              loop={true}
              speed={1200}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              navigation={{
                nextEl: ".testimonial-next",
                prevEl: ".testimonial-prev",
              }}
              className="testimonial-swiper"
            >
              {testimonialData.map((item) => (
                <SwiperSlide key={item.id}>
                  <div className="testimonial-content">

                    <div className="google-review">
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
                        alt="Google Logo"
                      />

                      <div className="stars">
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                      </div>
                    </div>

                    <p className="testimonial-text">
                      “{item.review}”
                    </p>

                    <div className="testimonial-line"></div>

                    <div className="client-info">

                      <div className="client-image">
                        <img
                          src={item.profile}
                          alt={item.name}
                        />
                      </div>

                      <div className="client-details">
                        <h4>{item.name}</h4>
                        <span>{item.role}</span>
                      </div>

                    </div>

                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* NAVIGATION */}

            <div className="testimonial-navigation">

              <button className="testimonial-prev">
                <i className="bi bi-chevron-left"></i>
              </button>

              <button className="testimonial-next">
                <i className="bi bi-chevron-right"></i>
              </button>

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