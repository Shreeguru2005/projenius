// Team.jsx

import React, { useEffect, useRef, useState } from "react";
import "../index.css";
import "../assets/css/TeamSection.css";
import AOS from "aos";
import "aos/dist/aos.css";

const teamMembers = [
  {
    image: "images/team-member-1.webp",
    name: "Karthick Ganesh",
    position: "Founder & CEO",
    bio: "A passionate leader focused on empowering the next generation of innovators with a strong vision for academic and practical excellence.",
    accent: "lead",
    socials: ["facebook", "twitter-x", "linkedin", "instagram"],
  },
  {
    image: "images/team-member-2.webp",
    name: "Harshini",
    position: "CTO & Co-Founder",
    bio: "A visionary mentor promoting entrepreneurship and innovation, supporting students from exploration to impactful execution.",
    accent: "core",
    socials: ["facebook", "twitter-x", "linkedin", "instagram"],
  },
  {
    image: "images/team-member-3.webp",
    name: "Brian",
    position: "COO & Co-Founder",
    bio: "A visionary mentor promoting entrepreneurship and innovation, supporting students from exploration to impactful execution.",
    accent: "placeholder",
    socials: ["facebook", "twitter-x", "linkedin", "instagram"],
  },
];

export default function TeamSection() {
  const sectionRef = useRef(null);
  const [animateName, setAnimateName] = useState(false);
  const [animateImage, setAnimateImage] = useState(false);
  const [animateBio, setAnimateBio] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
      offset: 80,
      easing: "ease-out-cubic",
    });
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || typeof window === "undefined") return undefined;

    const timers = [];

    const setAnimationState = (isActive) => {
      timers.forEach((timer) => window.clearTimeout(timer));
      timers.length = 0;

      if (!isActive) {
        setAnimateName(false);
        setAnimateImage(false);
        setAnimateBio(false);
        return;
      }

      timers.push(window.setTimeout(() => setAnimateName(true), 100));
      timers.push(window.setTimeout(() => setAnimateImage(true), 300));
      timers.push(window.setTimeout(() => setAnimateBio(true), 500));
    };

    const observer = new IntersectionObserver(
      ([entry]) => setAnimationState(entry.isIntersecting),
      { threshold: 0.3 }
    );

    observer.observe(section);

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      observer.disconnect();
    };
  }, []);

  return (
    <section className="team-section" ref={sectionRef}>
      <div className="container">

        {/* ── Section heading ── */}
        <div className="team-section-header" data-aos="fade-up" data-aos-delay="100">
          <span className="team-sub-heading">Our Team Members</span>
          <h2 className="team-section-title">
            Meet the <span className="team-title-highlight">Creative Minds</span>
          </h2>
          <p className="team-section-desc">
            The leadership team behind Projenius combines product thinking, engineering depth,
            and practical execution. We are keeping this section focused on the core faces of
            the company for now.
          </p>
        </div>

        {/* ── First two cards side by side ── */}
        <div className="team-grid-top">
          {teamMembers.slice(0, 2).map((member, index) => (
            <article
              className="team-card"
              key={member.name}
              data-aos="fade-up"
              data-aos-delay={200 + index * 150}
            >
              {/* Text — left */}
              <div className="team-card-body">
                <h3 className={`team-member-name ${animateName ? "team-name-in" : ""}`}>{member.name}</h3>
                <p className={`team-member-role ${animateName ? "team-role-in" : ""}`}>{member.position}</p>
                {member.bio && <p className={`team-member-bio ${animateBio ? "team-bio-in" : ""}`}>{member.bio}</p>}
              </div>

              {/* Photo — right, image overflows above card */}
              <div className="team-card-photo">
                <img className={animateImage ? "team-image-in" : ""} src={member.image} alt={member.name} />
                <div className="team-card-socials">
                  {member.socials.map((platform) => (
                    <a href="#" key={platform} aria-label={`${member.name} ${platform}`}>
                      <i className={`bi bi-${platform}`}></i>
                    </a>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* ── Third card centered below ── */}
        <div className="team-grid-bottom">
          <article
            className="team-card"
            data-aos="fade-up"
            data-aos-delay="500"
          >
            <div className="team-card-body">
              <h3 className={`team-member-name ${animateName ? "team-name-in" : ""}`}>{teamMembers[2].name}</h3>
              <p className={`team-member-role ${animateName ? "team-role-in" : ""}`}>{teamMembers[2].position}</p>
              {teamMembers[2].bio && (
                <p className={`team-member-bio ${animateBio ? "team-bio-in" : ""}`}>
                    {teamMembers[2].bio}
                </p>
  )}
            </div>

            <div className="team-card-photo">
              <img className={animateImage ? "team-image-in" : ""} src={teamMembers[2].image} alt={teamMembers[2].name} />
              <div className="team-card-socials">
                {teamMembers[2].socials.map((platform) => (
                  <a href="#" key={platform} aria-label={`Brian ${platform}`}>
                    <i className={`bi bi-${platform}`}></i>
                  </a>
                ))}
              </div>
            </div>
          </article>
        </div>

      </div>
    </section>
  );
}
