// Team.jsx

import React from "react";
import "../index.css";
import "../assets/css/TeamSection.css";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const teamMembers = [
  {
    image: "images/team-member-1.webp",
    name: "Karthick Ganesh",
    position: "Founder & COO",
    accent: "lead",
    socials: ["facebook", "twitter-x", "linkedin", "instagram"],
  },
  {
    image: "images/team-member-2.webp",
    name: "Harshini",
    position: "CEO & Co-Founder",
    accent: "core",
    socials: ["facebook", "twitter-x", "linkedin", "instagram"],
  },
  {
    image: null,
    name: "Brian",
    position: "Details coming soon",
    accent: "placeholder",
    socials: ["facebook", "twitter-x", "linkedin", "instagram"],
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
              The leadership team behind Projenius combines product thinking, engineering depth, and practical execution. We are keeping this section focused on the core faces of the company for now.
            </p>
          </div>

        </div>

        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <article
              className={`team-card ${member.accent === "placeholder" ? "team-card-placeholder" : ""}`}
              data-aos="fade-up"
              data-aos-delay={150 + index * 150}
              key={member.name}
            >
              <div className={`team-image ${member.image ? "" : "team-image-placeholder"}`}>
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="img-fluid"
                  />
                ) : (
                  <div className="team-placeholder-avatar" aria-hidden="true">
                    <span>BR</span>
                  </div>
                )}
                <div className="social-icons" aria-label={`${member.name} social links`}>
                  {member.socials.map((platform) => (
                    <a href="#" key={`${member.name}-${platform}`} aria-label={`${member.name} ${platform}`}>
                      <i className={`bi bi-${platform}`}></i>
                    </a>
                  ))}
                </div>
              </div>

              <div className="team-content">
                <h3>{member.name}</h3>
                <p>{member.position}</p>
              </div>
            </article>
          ))}
        </div>

      </div>

    </section>
  );
}