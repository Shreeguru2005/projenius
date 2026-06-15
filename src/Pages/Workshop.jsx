import React from "react";
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

const galleryItems = [
  ["Honouring Excellence", "Awards Ceremony", "/images/gallery-1.webp"],
  ["Achievement Recognition", "Student Awards", "/images/gallery-2.webp"],
  ["Career Guidance Session", "Expert Talk", "/images/gallery-3.webp"],
];

export default function Workshop() {
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

      <section className="workshop-showcase-section">
        <div className="container">
          <div className="section-heading text-center">
            <span id="sub-heading">Explore Our Workshops</span>
            <h2 id="title">Featured Event</h2>
          </div>

          <div className="workshop-event-grid">
            {featuredEvents.map((event) => (
              <article className="workshop-event-card" key={event.title}>
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
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="workshop-gallery-section" id="workshop-gallery">
        <div className="container">
          <div className="section-heading text-center">
            <span id="sub-heading">Our Gallery</span>
            <h2 id="title">SRM Workshop Poster</h2>
          </div>

          <div className="workshop-gallery-grid">
            {galleryItems.map(([title, category, image]) => (
              <article className="workshop-gallery-card" key={`${title}-${category}`}>
                <img src={image} alt={title} />
                <div>
                  <h3>{title}</h3>
                  <span>{category}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}