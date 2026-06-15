import React, { useEffect, useRef, useState } from "react";
import "../index.css";
import "../assets/css/Service-page.css";

const programDetails = [
  "Duration: 1 Month, 3 Months, 6 Months",
  "Mode: Online, Offline, Hybrid",
  "Type: Guided Internship Program",
  "Eligibility: Students, freshers, and career switchers",
];

const domains = [
  {
    icon: "bi bi-window-stack",
    title: "Full Stack Development",
    category: "Development",
    outcome: "Build complete web apps with frontend, backend, APIs, and database workflows.",
  },
  {
    icon: "bi bi-layout-text-window-reverse",
    title: "Frontend Development",
    category: "Development",
    outcome: "Create responsive interfaces with React, reusable components, and polished UI flows.",
  },
  {
    icon: "bi bi-hdd-network",
    title: "Backend Development",
    category: "Development",
    outcome: "Design server logic, APIs, authentication, and database-backed application features.",
  },
  {
    icon: "bi bi-braces",
    title: "React JS",
    category: "Development",
    outcome: "Develop dynamic React pages with routing, state management, and API integration.",
  },
  {
    icon: "bi bi-filetype-py",
    title: "Python Development",
    category: "Development",
    outcome: "Work with Python fundamentals, automation, APIs, and practical project modules.",
  },
  {
    icon: "bi bi-cup-hot",
    title: "Java Development",
    category: "Development",
    outcome: "Practice object-oriented programming and build structured Java application features.",
  },
  {
    icon: "bi bi-cpu",
    title: "AI & Machine Learning",
    category: "AI & Data",
    outcome: "Explore model building, data preparation, prediction workflows, and AI use cases.",
  },
  {
    icon: "bi bi-bar-chart",
    title: "Data Science",
    category: "AI & Data",
    outcome: "Analyze datasets, visualize insights, and create portfolio-ready data projects.",
  },
  {
    icon: "bi bi-router",
    title: "IoT Development",
    category: "Hardware",
    outcome: "Connect sensors, microcontrollers, and dashboards for smart device prototypes.",
  },
  {
    icon: "bi bi-link-45deg",
    title: "Blockchain Development",
    category: "Emerging Tech",
    outcome: "Understand decentralized app concepts, smart-contract basics, and traceability systems.",
  },
  {
    icon: "bi bi-palette",
    title: "UI/UX Design",
    category: "Design",
    outcome: "Design user journeys, wireframes, prototypes, and clean app screens.",
  },
  {
    icon: "bi bi-phone",
    title: "Mobile App Development",
    category: "Development",
    outcome: "Build mobile-first app screens and practical features for real-world use cases.",
  },
];

const domainFilters = ["All", "Development", "AI & Data", "Hardware", "Design", "Emerging Tech"];

const learningPoints = [
  "Industry-Level Projects",
  "Git & GitHub",
  "API Integration",
  "Database Management",
  "Team Collaboration",
  "Agile Methodology",
];

const benefits = [
  "Internship Certificate",
  "Project Completion Certificate",
  "Letter of Recommendation",
  "Placement Assistance",
  "Mentorship from Experts",
  "Resume Building Support",
  "LinkedIn Profile Optimization",
];

const liveProjects = [
  "E-Commerce Website",
  "Hospital Management System",
  "Student Portal",
  "Blockchain Traceability System",
  "AI Chatbot",
];

const technologies = [
  { name: "HTML", icon: "bi bi-filetype-html" },
  { name: "CSS", icon: "bi bi-filetype-css" },
  { name: "JavaScript", icon: "bi bi-filetype-js" },
  { name: "React JS", icon: "bi bi-react" },
  { name: "Node.js", icon: "bi bi-node-plus-fill" },
  { name: "Express.js", icon: "bi bi-code-slash" },
  { name: "MongoDB", icon: "bi bi-database-fill" },
  { name: "Python", icon: "bi bi-filetype-py" },
  { name: "GitHub", icon: "bi bi-github" },
  { name: "Postman", icon: "bi bi-send-fill" },
];

const successStories = [
  "Intern Testimonials",
  "Student Reviews",
  "Placement Achievements",
];

const stats = [
  { end: 500, suffix: "+", label: "Interns Trained" },
  { end: 100, suffix: "+", label: "Projects Completed" },
  { end: 50, suffix: "+", label: "Hiring Partners" },
  { end: 90, suffix: "%", label: "Student Satisfaction" },
];

const getWhatsAppApplyLink = (domain) =>
  `https://wa.me/919025476322?text=${encodeURIComponent(
    `Hello ProJenius, I have applied for the ${domain} internship domain. Please share the next steps.`
  )}`;

export default function Internship() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedDomain, setSelectedDomain] = useState(domains[0]);
  const [statCounts, setStatCounts] = useState(stats.map(() => 0));
  const statsRef = useRef(null);

  const visibleDomains =
    activeFilter === "All"
      ? domains
      : domains.filter((domain) => domain.category === activeFilter);

  const handleFilterChange = (filter) => {
    const nextDomains =
      filter === "All"
        ? domains
        : domains.filter((domain) => domain.category === filter);

    setActiveFilter(filter);
    setSelectedDomain(nextDomains[0]);
  };

  useEffect(() => {
    const statsSection = statsRef.current;

    if (!statsSection) return undefined;

    const runCounters = () => {
      const duration = 1600;
      const startedAt = performance.now();

      const tick = (now) => {
        const progress = Math.min((now - startedAt) / duration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);

        setStatCounts(
          stats.map((stat) => Math.round(stat.end * easedProgress))
        );

        if (progress < 1) {
          requestAnimationFrame(tick);
        }
      };

      requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          runCounters();
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(statsSection);

    return () => observer.disconnect();
  }, []);


  return (
    <>
      <section
        className="header-wrap internship-hero"
        style={{
          backgroundImage:
            "linear-gradient(#121929b8), url(/images/projenius-banner.webp)",
        }}
      >
        <div className="container title-section internship-title-section">
          <span className="internship-eyebrow">Internship Program 2026</span>
          <h1 className="page-title">Launch Your Career with Real-World Projects</h1>
        </div>
      </section>

      <section className="internship-program-section">
        <div className="container">
          <div className="internship-about-grid">
            <div>
              <span id="sub-heading">About the Internship</span>
              <h2 id="title">Practical Training Built Around Real Work</h2>
              <p className="section-desc">
                Gain hands-on experience through structured training, mentor
                support, live projects, and career preparation designed for
                students and freshers entering the tech industry.
              </p>
            </div>

            <div className="internship-detail-grid">
              {programDetails.map((detail) => (
                <div className="internship-detail-card" key={detail}>
                  <i className="bi bi-check2-circle"></i>
                  <span>{detail}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="internship-domains-section">
        <div className="container">
          <div className="section-heading text-center">
            <span id="sub-heading">Internship Domains</span>
            <h2 id="title">Choose Your Technology Track</h2>
          </div>

          <div className="internship-filter-row" aria-label="Internship domain filters">
            {domainFilters.map((filter) => (
              <button
                className={`internship-filter-btn ${activeFilter === filter ? "active" : ""}`}
                key={filter}
                type="button"
                onClick={() => handleFilterChange(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="internship-domain-layout">
            <div className="internship-domain-grid">
              {visibleDomains.map((domain) => (
                <button
                  className={`internship-domain-card ${
                    selectedDomain.title === domain.title ? "active" : ""
                  }`}
                  key={domain.title}
                  type="button"
                  onClick={() => setSelectedDomain(domain)}
                >
                  <i className={domain.icon}></i>
                  <h3>{domain.title}</h3>
                  <span className="internship-domain-apply">View Track</span>
                </button>
              ))}
            </div>

            <aside className="internship-track-preview">
              <span id="sub-heading">Selected Track</span>
              <i className={selectedDomain.icon}></i>
              <h3>{selectedDomain.title}</h3>
              <p>{selectedDomain.outcome}</p>
              <a
                href={getWhatsAppApplyLink(selectedDomain.title)}
                target="_blank"
                rel="noreferrer"
                className="internship-track-apply"
              >
                Apply for this track
              </a>
            </aside>
          </div>
        </div>
      </section>

      <section className="internship-split-section">
        <div className="container">
          <div className="internship-split-grid">
            <div className="internship-panel">
              <span id="sub-heading">What Interns Will Learn</span>
              <h2 id="title">Work Like a Modern Tech Team</h2>
              <div className="internship-check-grid">
                {learningPoints.map((point) => (
                  <span key={point}>
                    <i className="bi bi-check-lg"></i>
                    {point}
                  </span>
                ))}
              </div>
            </div>

            <div className="internship-panel">
              <span id="sub-heading">Benefits</span>
              <h2 id="title">Career Support Beyond Training</h2>
              <div className="internship-check-grid">
                {benefits.map((benefit) => (
                  <span key={benefit}>
                    <i className="bi bi-award"></i>
                    {benefit}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="internship-projects-section">
        <div className="container">
          <div className="section-heading text-center">
            <span id="sub-heading">Live Projects</span>
            <h2 id="title">Build Portfolio-Ready Work</h2>
          </div>

          <div className="internship-project-grid">
            {liveProjects.map((project) => (
              <article className="internship-project-card" key={project}>
                <i className="bi bi-kanban"></i>
                <h3>{project}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="internship-tech-section">
        <div className="container">
          <div className="section-heading text-center">
            <span id="sub-heading">Technologies Covered</span>
            <h2 id="title">Tools Used in Real Development</h2>
          </div>

          <div className="internship-tech-list">
            {technologies.map((tech) => (
              <span
                key={tech.name}
                className={`internship-tech-chip tech-${tech.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
              >
                <i className={tech.icon}></i>
                {tech.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="internship-success-section">
        <div className="container">
          <div className="internship-success-grid">
            <div>
              <span id="sub-heading">Success Stories</span>
              <h2 id="title">Growth You Can Measure</h2>
              <div className="internship-story-list">
                {successStories.map((story) => (
                  <span key={story}>
                    <i className="bi bi-star-fill"></i>
                    {story}
                  </span>
                ))}
              </div>
            </div>

            <div className="internship-stats-grid" ref={statsRef}>
              {stats.map((stat, index) => (
                <article className="internship-stat-card" key={stat.label}>
                  <strong>{statCounts[index]}{stat.suffix}</strong>
                  <span>{stat.label}</span>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="internship-cta-section">
        <div className="container">
          <div className="internship-cta-box">
            <h2>Ready to Start Your Tech Journey?</h2>
            <div>
              <a href="/contact" className="btn">
                <span className="btn-content">
                  Apply Now <i className="bi bi-arrow-up-right ms-3"></i>
                </span>
              </a>
              <a href="/contact" className="internship-outline-btn">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}