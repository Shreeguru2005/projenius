import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import "../assets/css/TrainingSection.css";
import "../index.css";

import AOS from "aos";
import "aos/dist/aos.css";

export default function TrainingSection() {
  const [imgIndex1, setImgIndex1] = useState(0);
  const [imgIndex2, setImgIndex2] = useState(0);
  const [imgIndex3, setImgIndex3] = useState(0);
  const [imgIndex4, setImgIndex4] = useState(0);

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

    const timers = [];
    timers.push(setInterval(() => setImgIndex1((prev) => prev + 1), 6000));

    const timeout1 = setTimeout(() => {
      timers.push(setInterval(() => setImgIndex2((prev) => prev + 1), 6000));
    }, 1500);

    const timeout2 = setTimeout(() => {
      timers.push(setInterval(() => setImgIndex3((prev) => prev + 1), 6000));
    }, 3000);

    const timeout3 = setTimeout(() => {
      timers.push(setInterval(() => setImgIndex4((prev) => prev + 1), 6000));
    }, 4500);

    return () => {
      timers.forEach(clearInterval);
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
    };
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
                  <AnimatePresence>
                    <motion.img
                      key={imgIndex1}
                      src={imgPool1[imgIndex1 % imgPool1.length]}
                      alt="Career Guidance"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.5, ease: "easeInOut" }}
                    />
                  </AnimatePresence>

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
                  <AnimatePresence>
                    <motion.img
                      key={imgIndex2}
                      src={imgPool2[imgIndex2 % imgPool2.length]}
                      alt="Mentoring Program"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.5, ease: "easeInOut" }}
                    />
                  </AnimatePresence>

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
                  <AnimatePresence>
                    <motion.img
                      key={imgIndex3}
                      src={imgPool3[imgIndex3 % imgPool3.length]}
                      alt="IoT Workshop"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.5, ease: "easeInOut" }}
                    />
                  </AnimatePresence>

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
                  <AnimatePresence>
                    <motion.img
                      key={imgIndex4}
                      src={imgPool4[imgIndex4 % imgPool4.length]}
                      alt="Programming Workshop"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.5, ease: "easeInOut" }}
                    />
                  </AnimatePresence>

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