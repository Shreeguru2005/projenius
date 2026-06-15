import React, { useEffect } from "react";
import "../assets/css/TrainingSection.css";
import "../index.css";

import AOS from "aos";
import "aos/dist/aos.css";

export default function TrainingSection() {

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 80,
      easing: "ease-in-out",
    });
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

              <div className="training-card big-card">
                <img
                  src="/images/iot-workshop.png"
                  alt="Career Guidance"
                />

                <div className="training-content">
                  <span>Future Ready</span>
                  <h4>Career Guidance</h4>
                </div>
              </div>

              <div
                className="training-card small-card mt-4"
                data-aos="zoom-in"
                data-aos-delay="350"
              >
                <img
                  src="/images/software-developement-training.png"
                  alt="Mentoring Program"
                />

                <div className="training-content">
                  <span>Skill Growth</span>
                  <h4>Mentoring Program</h4>
                </div>
              </div>

            </div>

            {/* Right Column */}
            <div
              className="col-lg-6 right-column"
              data-aos="fade-left"
              data-aos-delay="250"
            >

              <div
                className="training-card small-card"
                data-aos="zoom-in"
                data-aos-delay="300"
              >
                <img
                  src="/images/software-developement-training.png"
                  alt="IoT Workshop"
                />

                <div className="training-content">
                  <span>Smart Innovation</span>
                  <h4>IoT Workshop</h4>
                </div>
              </div>

              <div
                className="training-card big-card mt-4"
                data-aos="flip-left"
                data-aos-delay="450"
              >
                <img
                  src="/images/iot-workshop.png"
                  alt="Programming Workshop"
                />

                <div className="training-content">
                  <span>Coding Skills</span>
                  <h4>Programming Workshop</h4>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}