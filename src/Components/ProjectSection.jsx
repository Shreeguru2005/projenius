import React, { useEffect } from "react";
import "../assets/css/ProjectSection.css";
import "../index.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import AOS from "aos";
import "aos/dist/aos.css";

export default function ProjectSection() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 80,
      easing: "ease-in-out",
    });
  }, []);

  const projects = [
    {
      title: "Helminth Egg Detection Poster",
      subtitle: "Medical Conference Poster",
      description:
        "Scientific poster on helminth egg detection in dog samples highlighting diagnosis and zoonotic risks worldwide.",
      rating: 5,
      image: "/images/project-image-1.webp",
    },
    {
      title: "AI-Powered Water Health Monitoring",
      subtitle: "Software",
      description:
        "Powerful monitoring platform designed to improve water quality analysis and real-time environmental tracking.",
      rating: 4,
      image: "/images/project-image-2.webp",
    },
    {
      title: "Road Hazard Detection",
      subtitle: "Software",
      description:
        "AI-based accident detection system with instant emergency GPS alerts and real-time response tracking.",
      rating: 5,
      image: "/images/project-image-3.webp",
    },
    {
      title: "Smart Waste Management",
      subtitle: "Software",
      description:
        "Smart waste segregation system using sensors for automatic wet and dry waste classification.",
      rating: 4,
      image: "/images/project-image-4.webp",
    },
    {
      title: "Autonomous Follower Robot",
      subtitle: "Hardware",
      description:
        "Intelligent follower robot with obstacle avoidance for smart logistics and automated material transportation.",
      rating: 5,
      image: "/images/project-image-5.webp",
    },
  ];

  return (
    <section className="nv-work-showcase">
      <div className="nv-work-container">
        <div className="nv-work-header">
          <span
            className="nv-sub-heading"
            id="sub-heading"
            data-aos="fade-up"
          >
            Our Projects
          </span>

          <h2 className="nv-title" id="title" data-aos="fade-up">
            Work Showcase
          </h2>

          <p data-aos="fade-up">
            We create powerful digital experiences with modern design,
            innovative strategies and professional development solutions.
          </p>
        </div>

        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={25}
          slidesPerView={3}
          centeredSlides={true}
          loop={true}
          navigation={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 1,
            },
            992: {
              slidesPerView: 3,
            },
            1200: {
              slidesPerView: 3,
            },
          }}
        >
          {projects.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="nv-work-card">
                <div className="nv-flip-box">
                  {/* FRONT */}
                  <div className="nv-flip-front">
                    <img src={item.image} alt={item.title} />
                  </div>

                  {/* BACK */}
                  <div className="nv-flip-back">
                    <h3 className="nv-project-title">
                      {item.title}
                    </h3>

                    <span className="nv-subtitle">
                      {item.subtitle}
                    </span>

                    <p className="nv-desc">
                      {item.description}
                    </p>

                    <div className="nv-rating">
  <div className="nv-rating-stars">
    {[...Array(5)].map((_, i) => (
      <i
        key={i}
        className={
          i < item.rating
            ? "bi bi-star-fill"
            : "bi bi-star"
        }
      ></i>
    ))}
  </div>

  <span className="nv-rating-text">
    {item.rating}/5
  </span>
</div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}