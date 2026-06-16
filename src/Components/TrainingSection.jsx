import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../assets/css/TrainingSection.css";
import "../index.css";

import AOS from "aos";
import "aos/dist/aos.css";

export default function TrainingSection() {
  const [imgIndex, setImgIndex] = useState(0);

  const imgPool1 = ["/images/iot-workshop.png", "/images/gallery-1.webp", "/images/gallery-2.webp"];
  const imgPool2 = ["/images/software-developement-training.png", "/images/gallery-3.webp", "/images/gallery-4.webp"];
  const imgPool3 = ["/images/software-developement-training.png", "/images/iot-course.webp", "/images/gallery-5.webp"];
  const imgPool4 = ["/images/iot-workshop.png", "/images/project-image-1.webp", "/images/gallery-6.webp"];

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 80,
      easing: "ease-in-out",
    });

    const interval = setInterval(() => {
      setImgIndex((prevIndex) => prevIndex + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="training-section py-5">
      <div className="container">

        {/* Heading */}
        <div className="heading text-center">
          <span
            id="sub-heading"
            data-aos="fade-up"
            data-aos-delay="150"
          >
            Our Training Program
          </span>

          <h2
            className="train-section-title"
            id="title"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            Industry-Focused Training & Workshops
          </h2>
        </div>

        {/* Main Content */}
        <div className="main mt-5">
          <div className="row g-4">

            {/* Left Column */}
            <div
              className="col-lg-6"
              data-aos="fade-right"
              data-aos-delay="200"
            >

              <Link to="/career-guidance" style={{textDecoration: 'none'}}>
                <div className="training-card big-card">
                  <img
                    src={imgPool1[imgIndex % imgPool1.length]}
                    alt="Career Guidance"
                    style={{ transition: "all 1s ease-in-out" }}
                  />

                  <div className="training-content">
                    <span>Future Ready</span>
                    <h4>Career Guidance</h4>
                  </div>
                </div>
              </Link>

              <Link to="/services" style={{textDecoration: 'none'}}>
                <div
                  className="training-card small-card mt-4"
                  data-aos="zoom-in"
                  data-aos-delay="350"
                >
                  <img
                    src={imgPool2[imgIndex % imgPool2.length]}
                    alt="Mentoring Program"
                    style={{ transition: "all 1s ease-in-out" }}
                  />

                  <div className="training-content">
                    <span>Skill Growth</span>
                    <h4>Mentoring Program</h4>
                  </div>
                </div>
              </Link>

            </div>

            {/* Right Column */}
            <div
              className="col-lg-6 right-column"
              data-aos="fade-left"
              data-aos-delay="250"
            >

              <Link to="/workshop" style={{textDecoration: 'none'}}>
                <div
                  className="training-card small-card"
                  data-aos="zoom-in"
                  data-aos-delay="300"
                >
                  <img
                    src={imgPool3[imgIndex % imgPool3.length]}
                    alt="IoT Workshop"
                    style={{ transition: "all 1s ease-in-out" }}
                  />

                  <div className="training-content">
                    <span>Smart Innovation</span>
                    <h4>IoT Workshop</h4>
                  </div>
                </div>
              </Link>

              <Link to="/workshop" style={{textDecoration: 'none'}}>
                <div
                  className="training-card big-card mt-4"
                  data-aos="flip-left"
                  data-aos-delay="450"
                >
                  <img
                    src={imgPool4[imgIndex % imgPool4.length]}
                    alt="Programming Workshop"
                    style={{ transition: "all 1s ease-in-out" }}
                  />

                  <div className="training-content">
                    <span>Coding Skills</span>
                    <h4>Programming Workshop</h4>
                  </div>
                </div>
              </Link>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}