import React from "react";
import { motion } from "framer-motion";
import "../index.css";
import "../assets/css/Service-page.css";

const featuredEvents = [
  {
    label: "Featured Event",
    title: "SRM Chennai Workshop",
    image: "/images/iot-workshop.png",
    imageAlt: "SRM Workshop",
    badges: ["Flagship", "200+ Students"],
    heading: "Building the Future, One Project at a Time",
    description:
      "A large-scale hands-on workshop where 200+ students explored innovation, teamwork, and real-world problem solving.",
    details: ["SRM University, Chennai", "1-Day Workshop"],
  },
  {
    label: "Career Guidance",
    title: "Career Guidance",
    image: "/images/gallery-3.webp",
    imageAlt: "Career Guidance Session",
    badges: ["Career Planning", "Industry Insights"],
    heading: "Shaping Careers with Clarity & Confidence",
    description:
      "Students received expert advice on career paths, emerging technologies, and industry expectations.",
    details: ["University Campuses", "Interactive Sessions"],
  },
  {
    label: "Mentoring Program",
    title: "Mentoring Program",
    image: "/images/gallery-4.webp",
    imageAlt: "Student Mentoring Program",
    badges: ["1-on-1", "Skill Growth"],
    heading: "Personalized Guidance for Long-Term Growth",
    description:
      "One-on-one mentoring helped students develop leadership, technical skills, and professional confidence.",
    details: ["Hybrid Mode", "Ongoing Support"],
  },
  {
    label: "Award Distribution",
    title: "Award Distribution",
    image: "/images/gallery-1.webp",
    imageAlt: "Award Distribution",
    badges: ["Excellence", "Recognition"],
    heading: "Celebrating Talent & Achievement",
    description:
      "Outstanding performers and teams were recognized for innovation, dedication, and excellence.",
    details: ["Workshop Venues", "Closing Ceremony"],
  },
];

const achievements = [
  {
    title: "Honouring Excellence",
    subtitle: "Celebrating excellence, innovation, and success through achievements.",
    image: "/images/gallery-1.webp",
    alt: "Award ceremony",
  },
  {
    title: "Achievement Recognition",
    subtitle: "Honoring talented students for achievements, excellence, and dedication.",
    image: "/images/gallery-2.webp",
    alt: "Student award recognition",
  },
  {
    title: "Career Guidance Session",
    subtitle: "Industry experts sharing insights, innovation, and real-world knowledge.",
    image: "/images/gallery-3.webp",
    alt: "Career guidance session",
  },
  {
    title: "Student Mentoring Program",
    subtitle: "Guiding students with mentorship, support, and career-focused learning.",
    image: "/images/gallery-4.webp",
    alt: "Student mentoring program",
  },
  {
    title: "SRM Hands-on Workshop",
    subtitle: "Providing practical technical training to build industry-ready skills.",
    image: "/images/gallery-5.webp",
    alt: "SRM hands-on workshop",
  },
  {
    title: "Interactive Learning Session",
    subtitle: "Hands-on lab sessions designed to improve practical learning experience.",
    image: "/images/gallery-6.webp",
    alt: "Interactive learning session",
  },
];

export default function Workshop() {
  const whatsappNumber = "918925450473";
  const workshopMessage =
    "Hello ProJenius, I would like to conduct a skill development workshop for our school or college students. Please share the details.";
  const workshopWhatsAppLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    workshopMessage
  )}`;
  const getEventVariants = (index) => ({
    hidden: {
      opacity: 0,
      x: index % 2 === 0 ? 110 : -110,
      scale: 0.96,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.75,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  });

  return (
    <>
      <section
        className="header-wrap workshop-hero"
        style={{
          backgroundImage:
            "linear-gradient(#121929a6), url(/images/projenius-banner.webp)",
        }}
      >
        <div className="container title-section workshop-title-section">
          <span className="workshop-eyebrow">Explore Our Workshops</span>
          <h1 className="page-title">
            Where Learning
            <br />
            Comes Alive
          </h1>
          <p>
            We transform classrooms into innovation hubs through hands-on
            workshops that ignite curiosity, build skills, and create lasting
            memories.
          </p>
        </div>
      </section>

      <section className="workshop-skill-section">
        <div className="container">
          <div className="workshop-skill-split">
            <div className="workshop-skill-intro">
              <span className="workshop-card-label">For Schools & Colleges</span>
              <h2>Enhance Your Students' Skills With Practical Workshops</h2>
              <p>
                If you want to strengthen your school or college students'
                technical skills, creativity, and career readiness, ProJenius
                delivers structured workshops that combine hands-on learning,
                expert guidance, and real-world project exposure.
              </p>
              <a
                href={workshopWhatsAppLink}
                className="workshop-whatsapp-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                Plan a Workshop
              </a>
            </div>

            <div className="workshop-skill-image">
              <img
                src="/images/gallery-5.webp"
                alt="Students participating in a practical workshop"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="workshop-showcase-section">
        <div className="container">
          <div className="section-heading text-center">
            <span id="sub-heading">Explore Our Workshops</span>
            <h2 id="title">Featured Event</h2>
          </div>

          <div className="workshop-event-grid">
            {featuredEvents.map((event, index) => (
              <motion.article
                className="workshop-event-card"
                key={event.title}
                variants={getEventVariants(index)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
              >
                <div className="workshop-event-image">
                  <img src={event.image} alt={event.imageAlt} />
                  <span>{event.imageAlt}</span>
                </div>
                <div className="workshop-event-content">
                  <span className="workshop-card-label">{event.label}</span>
                  <h3>{event.title}</h3>
                  <div className="workshop-badges">
                    {event.badges.map((badge) => (
                      <span key={badge}>{badge}</span>
                    ))}
                  </div>
                  <h4>{event.heading}</h4>
                  <p>{event.description}</p>
                  <div className="workshop-details">
                    {event.details.map((detail) => (
                      <span key={detail}>{detail}</span>
                    ))}
                  </div>
                  <a href="#workshop-gallery" className="workshop-gallery-link">
                    View Gallery
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="workshop-gallery-section"
        id="workshop-gallery"
        data-aos="zoom-in-up"
        data-aos-duration="700"
      >
        <div className="container">
          <div className="section-heading text-center">
            <span id="sub-heading">Achievements</span>
            <h2 id="title">Awards & Recognition</h2>
            <p className="section-desc workshop-achievements-desc">
              Celebrating workshop milestones, student participation, and the
              moments that reflect practical learning in action.
            </p>
          </div>

          <div className="workshop-awards-masonry">
            {achievements.map((item, index) => (
              <article
                className="workshop-award-item"
                key={item.title}
                data-aos={
                  ["fade-right", "fade-down", "fade-left", "zoom-in", "flip-left", "fade-up-left"][
                    index % 6
                  ]
                }
                data-aos-delay={50 + index * 50}
              >
                <img src={item.image} alt={item.alt} loading="lazy" decoding="async" />
                <div className="workshop-award-content">
                  <h3>{item.title}</h3>
                  <p>{item.subtitle}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
