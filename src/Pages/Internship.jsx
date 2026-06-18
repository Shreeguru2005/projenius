import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
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
    icon: "/images/fullstack-icon.png",
    title: "Full Stack Development",
    category: "Development",
    outcome: "Build complete web apps with frontend, backend, APIs, and database workflows.",
  },
  {
    icon: "/images/frontend-icon.png",
    title: "Frontend Development",
    category: "Development",
    outcome: "Create responsive interfaces with React, reusable components, and polished UI flows.",
  },
  {
    icon: "/images/backend-icon.png",
    title: "Backend Development",
    category: "Development",
    outcome: "Design server logic, APIs, authentication, and database-backed application features.",
  },
  {
    icon: "/images/react-icon.png",
    title: "React JS",
    category: "Development",
    outcome: "Develop dynamic React pages with routing, state management, and API integration.",
  },
  {
    icon: "/images/python-icon.png",
    title: "Python Development",
    category: "Development",
    outcome: "Work with Python fundamentals, automation, APIs, and practical project modules.",
  },
  {
    icon: "/images/java-icon.png",
    title: "Java Development",
    category: "Development",
    outcome: "Practice object-oriented programming and build structured Java application features.",
  },
  {
    icon: "/images/ai-icon.png",
    title: "AI & Machine Learning",
    category: "AI & Data",
    outcome: "Explore model building, data preparation, prediction workflows, and AI use cases.",
  },
  {
    icon: "/images/data-science-icon.png",
    title: "Data Science",
    category: "AI & Data",
    outcome: "Analyze datasets, visualize insights, and create portfolio-ready data projects.",
  },
  {
    icon: "/images/iot-icon.png",
    title: "IoT Development",
    category: "Hardware",
    outcome: "Connect sensors, microcontrollers, and dashboards for smart device prototypes.",
  },
  {
    icon: "/images/blockchain-icon.png",
    title: "Blockchain Development",
    category: "Emerging Tech",
    outcome: "Understand decentralized app concepts, smart-contract basics, and traceability systems.",
  },
  {
    icon: "/images/uiux-icon.png",
    title: "UI/UX Design",
    category: "Design",
    outcome: "Design user journeys, wireframes, prototypes, and clean app screens.",
  },
  {
    icon: "/images/mobile-icon.png",
    title: "Mobile App Development",
    category: "Development",
    outcome: "Build mobile-first app screens and practical features for real-world use cases.",
  },
];

const domainFilters = ["All", "Development", "AI & Data", "Hardware", "Design", "Emerging Tech"];

const learningPoints = [
  { text: "Industry-Level Projects", icon: "bi-building", color: "blue" },
  { text: "Git & GitHub", icon: "bi-github", color: "purple" },
  { text: "API Integration", icon: "bi-cloud-arrow-down", color: "green" },
  { text: "Database Management", icon: "bi-database", color: "yellow" },
  { text: "Team Collaboration", icon: "bi-people", color: "pink" },
  { text: "Agile Methodology", icon: "bi-kanban", color: "orange" },
];

const benefits = [
  { text: "Internship Certificate", icon: "bi-patch-check", color: "green" },
  { text: "Project Completion Certificate", icon: "bi-file-earmark-check", color: "blue" },
  { text: "Letter of Recommendation", icon: "bi-envelope-paper", color: "yellow" },
  { text: "Placement Assistance", icon: "bi-briefcase", color: "purple" },
  { text: "Mentorship from Experts", icon: "bi-person-hearts", color: "pink" },
  { text: "Resume Building Support", icon: "bi-file-person", color: "orange" },
  { text: "LinkedIn Optimization", icon: "bi-linkedin", color: "blue" },
];

const liveProjects = [
  "E-Commerce Website",
  "Hospital Management System",
  "Student Portal",
  "Blockchain Traceability System",
  "AI Chatbot",
];

const technologies = [
  { name: "HTML", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "React JS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Express.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
  { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "GitHub", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
  { name: "Postman", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" },
];

const successStories = [
  { text: "Intern Testimonials", icon: "bi-chat-quote-fill", color: "blue" },
  { text: "Student Reviews", icon: "bi-star-fill", color: "yellow" },
  { text: "Placement Achievements", icon: "bi-trophy-fill", color: "purple" },
];

const stats = [
  { end: 500, suffix: "+", label: "Interns Trained", icon: "bi-people-fill", color: "blue" },
  { end: 100, suffix: "+", label: "Projects Completed", icon: "bi-code-slash", color: "purple" },
  { end: 50, suffix: "+", label: "Hiring Partners", icon: "bi-building", color: "orange" },
  { end: 90, suffix: "%", label: "Student Satisfaction", icon: "bi-emoji-smile-fill", color: "pink" },
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

      <section className="internship-program-section modern-about-section">
        {/* Animated Background blobs */}
        <div className="about-bg-blobs">
          <div className="blob blob-1"></div>
          <div className="blob blob-2"></div>
        </div>

        <div className="container relative z-10">
          <div className="internship-about-grid modern-grid">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="about-content-wrapper"
            >
              <div className="about-accent-line"></div>
              <span id="sub-heading" className="modern-sub-heading">About the Internship</span>
              <h2 id="title" className="modern-title">
                Practical Training <br/>
                <span className="text-gradient">Built Around Real Work</span>
              </h2>
              <p className="section-desc modern-desc">
                Gain hands-on experience through structured training, mentor
                support, live projects, and career preparation designed for
                students and freshers entering the tech industry.
              </p>

              <div className="modern-cta-group">
                <a href="#apply" className="modern-btn-primary">
                  <span>Start Your Journey</span>
                  <i className="bi bi-arrow-right-short"></i>
                </a>
                <a href="#brochure" className="modern-btn-secondary">
                  <span>Download Syllabus</span>
                  <i className="bi bi-cloud-arrow-down"></i>
                </a>
              </div>
            </motion.div>

            <motion.div 
              className="internship-detail-grid modern-detail-grid"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.15 }
                }
              }}
            >
              {programDetails.map((detail, index) => {
                const [title, desc] = detail.split(": ");
                return (
                  <motion.div 
                    className="internship-detail-card modern-detail-card" 
                    key={detail}
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
                    }}
                    whileHover={{ y: -8, scale: 1.02 }}
                  >
                    <div className="card-bg-gradient"></div>
                    <div className="card-content-relative">
                      <div className={`card-icon-wrapper ${
                        index === 0 ? "color-blue" : 
                        index === 1 ? "color-purple" : 
                        index === 2 ? "color-pink" : 
                        "color-orange"
                      }`}>
                        <img 
                          src={`/images/icon-${index + 1}.png`} 
                          alt={title} 
                          className="detail-icon-img" 
                          style={{ width: "32px", height: "32px", objectFit: "contain" }} 
                        />
                      </div>
                      <div className="card-text">
                        <h4>{title}</h4>
                        <span>{desc}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* New N8N Style Showcase Section */}
      <section className="internship-showcase-section">
        <div className="container showcase-container">
          <div className="showcase-header">
            <h2>How ProJenius transforms your <br/> career with real-world projects</h2>
            <p>Discover how ProJenius uses hands-on training to prepare students for the tech industry.</p>
          </div>
          
          <div className="showcase-video-container">
            <div className="showcase-video-glow"></div>
            <div className="showcase-video-inner">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/1adzVmNh078?si=dCnd1I_Mky0IN98m"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
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
                  {domain.icon.endsWith(".png") ? (
                    <img src={domain.icon} alt={domain.title} className="domain-icon-img" />
                  ) : (
                    <i className={domain.icon}></i>
                  )}
                  <h3>{domain.title}</h3>
                  <span className="internship-domain-apply">View Track</span>
                </button>
              ))}
            </div>

            <aside className="internship-track-preview">
              <span id="sub-heading">Selected Track</span>
              {selectedDomain.icon.endsWith(".png") ? (
                <img src={selectedDomain.icon} alt={selectedDomain.title} className="domain-icon-img" />
              ) : (
                <i className={selectedDomain.icon}></i>
              )}
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

      <section className="internship-tech-section">
        <div className="container">
          <div className="section-heading text-center">
            <span id="sub-heading">Technologies Covered</span>
            <h2 id="title">Tools Used in Real Development</h2>
          </div>
        </div>

        <div className="tech-carousel-wrapper">
          <div className="tech-carousel-track">
            {/* Original list */}
            <ul className="tech-carousel-list">
              {technologies.map((tech) => (
                <li key={tech.name} className="tech-carousel-item">
                  <img src={tech.logo} alt={tech.name} className="tech-carousel-logo" />
                  <span>{tech.name}</span>
                </li>
              ))}
            </ul>
            {/* Duplicate for seamless loop */}
            <ul className="tech-carousel-list" aria-hidden="true">
              {technologies.map((tech) => (
                <li key={`dup-${tech.name}`} className="tech-carousel-item">
                  <img src={tech.logo} alt={tech.name} className="tech-carousel-logo" />
                  <span>{tech.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="internship-split-section modern-split">
        <div className="container">
          <motion.div 
            className="internship-split-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
            }}
          >
            <motion.div 
              className="internship-panel glass-panel"
              variants={{
                hidden: { opacity: 0, x: -30 },
                visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 70 } }
              }}
            >
              <div className="panel-header">
                <span className="badge-purple">What Interns Will Learn</span>
                <h2 className="gradient-title">Work Like a Modern Tech Team</h2>
              </div>
              <div className="internship-check-grid">
                {learningPoints.map((point, index) => (
                  <motion.div 
                    key={point.text}
                    className="modern-check-item"
                    whileHover={{ scale: 1.03, y: -2 }}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className={`icon-box color-${point.color}`}>
                      <i className={`bi ${point.icon}`}></i>
                    </div>
                    <span>{point.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              className="internship-panel glass-panel"
              variants={{
                hidden: { opacity: 0, x: 30 },
                visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 70 } }
              }}
            >
              <div className="panel-header">
                <span className="badge-blue">Benefits</span>
                <h2 className="gradient-title">Career Support Beyond Training</h2>
              </div>
              <div className="internship-check-grid">
                {benefits.map((benefit, index) => (
                  <motion.div 
                    key={benefit.text}
                    className="modern-check-item"
                    whileHover={{ scale: 1.03, y: -2 }}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className={`icon-box color-${benefit.color}`}>
                      <i className={`bi ${benefit.icon}`}></i>
                    </div>
                    <span>{benefit.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="internship-success-section">
        <div className="container">
          <div className="internship-success-grid">
            <div>
              <span id="sub-heading">Success Stories</span>
              <h2 id="title">Growth You Can Measure</h2>
              <div className="internship-check-grid" style={{ marginTop: '24px' }}>
                {successStories.map((story) => (
                  <div key={story.text} className="modern-check-item">
                    <div className={`icon-box color-${story.color}`}>
                      <i className={`bi ${story.icon}`}></i>
                    </div>
                    <span>{story.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="internship-stats-grid" ref={statsRef}>
              {stats.map((stat, index) => (
                <article className="internship-stat-card relative overflow-hidden" key={stat.label}>
                  <div className={`absolute -right-4 -top-4 w-20 h-20 rounded-full opacity-10 bg-${stat.color}-500`}></div>
                  <div className={`icon-box mb-3 color-${stat.color}`}>
                    <i className={`bi ${stat.icon}`}></i>
                  </div>
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