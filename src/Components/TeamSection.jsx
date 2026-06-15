// Team.jsx

import React from "react";
import "../index.css";
import "../assets/css/TeamSection.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const teamMembers = [
  {
    image:
      "images/team-member-1.webp",
    name: "Karthick Ganesh M",
    position: "Founder & CEO",
  },

  {
    image:
      "images/team-member-2.webp",
    name: "Harshini M",
    position: "Co-Founder & Embedded Engineer",
  },

  {
    image:
      "images/team-member-3.webp",
    name: "Hariharan S",
    position: "Full Stack Developer",
  },

  {
    image:
      "images/team-member-4.webp",
    name: "Balaji J",
    position: "Video Editor",
  },

  {
    image:
      "images/team-member-5.webp",
    name: "Kanimozhi B",
    position: "IoT Engineer",
  },
];

export default function TeamSection() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 80,
      easing: "ease-in-out",
    });
  }, []);
  return (
    <section className="team-section">

      <div className="container">

        <div className="row align-items-center mb-5">

          <div className="col-lg-4 first" data-aos="fade-right" data-aos-delay="150">
            <span id="sub-heading">Our Team Members</span>

            <h2 id="title" className="text-white">
              Meet the Creative Minds
            </h2>
          </div>

          <div className="col-lg-8 second" data-aos="fade-up" data-aos-delay="300">
            <p className="section-desc">
              Our dedicated team consists of passionate developers, designers, innovators, and mentors working together to build smart technology solutions. With expertise in AI, IoT, software development, design, and training, we focus on creativity, collaboration, innovation, and delivering impactful results for clients and students.
            </p>
          </div>

        </div>

        {/* Team Carousel */}

        <Swiper
          modules={[Pagination, Autoplay]}
          slidesPerView={4}
          spaceBetween={30}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },

            576: {
              slidesPerView: 2,
            },

            992: {
              slidesPerView: 3,
            },

            1200: {
              slidesPerView: 4,
            },
          }}
          className="teamSwiper"
        >
          {teamMembers.map((member, index) => (
            <SwiperSlide key={index}>

              <div className="team-card" data-aos="fade-up" data-aos-delay={150 + index * 150}>

                <div className="team-image">

                  <img
                    src={member.image}
                    alt={member.name}
                    className="img-fluid"
                  />

                  <div className="social-icons">

                    <a href="#">
                      <i className="bi bi-facebook"></i>
                    </a>

                    <a href="#">
                      <i className="bi bi-twitter-x"></i>
                    </a>

                    <a href="#">
                      <i className="bi bi-linkedin"></i>
                    </a>

                    <a href="#">
                      <i className="bi bi-instagram"></i>
                    </a>

                  </div>

                </div>

                <div className="team-content">
                  <h3>{member.name}</h3>
                  <p>{member.position}</p>
                </div>

              </div>

            </SwiperSlide>
          ))}
        </Swiper>

      </div>

    </section>
  );
}