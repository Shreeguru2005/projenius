import React, { useState } from "react";
import "../index.css";
import "../assets/css/Service-page.css";
import "../assets/css/Contact-page.css";

export default function Courses() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [levelFilter, setLevelFilter] = useState("All");
  const [openFaq, setOpenFaq] = useState(null);
  const [showFaq, setShowFaq] = useState(false);

  const courses = [
    {
      title: "React Development",
      category: "Development",
      duration: "8 Weeks",
      level: "Intermediate",
      mode: "Online Live",
      isPopular: true,
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80&auto=format",
      desc: "Learn modern React development with components, hooks, routing, APIs, responsive layouts, and real-time project implementation techniques.",
    },
    {
      title: "UI/UX Designing",
      category: "Design",
      duration: "6 Weeks",
      level: "Beginner",
      mode: "Self-Paced",
      isPopular: false,
      image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800&q=80&auto=format",
      desc: "Create attractive user interfaces and improve digital experiences using wireframes, design systems, prototypes, and creative tools effectively.",
    },
    {
      title: "Python Programming",
      category: "Development",
      duration: "10 Weeks",
      level: "Beginner",
      mode: "Online Live",
      isPopular: true,
      image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&q=80&auto=format",
      desc: "Master Python programming fundamentals with practical coding exercises, automation projects, data handling, and beginner-friendly development concepts.",
    },
    {
      title: "IoT Development",
      category: "Engineering",
      duration: "12 Weeks",
      level: "Advanced",
      mode: "Hybrid",
      isPopular: false,
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80&auto=format",
      desc: "Build smart IoT solutions using sensors, embedded systems, cloud connectivity, automation concepts, and hardware programming techniques successfully.",
    },
    {
      title: "Digital Marketing",
      category: "Marketing",
      duration: "8 Weeks",
      level: "Beginner",
      mode: "Self-Paced",
      isPopular: false,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&auto=format",
      desc: "Learn SEO, social media marketing, content strategy, branding, analytics, and advertising methods to grow online business visibility.",
    },
    {
      title: "Data Analytics",
      category: "Data",
      duration: "10 Weeks",
      level: "Intermediate",
      mode: "Online Live",
      isPopular: false,
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80&auto=format",
      desc: "Understand data visualization, reporting techniques, dashboards, business insights, and analytics tools through practical real-world learning experiences.",
    },
  ];

  const courseFaqs = [
    { q: "What courses do you offer?", a: "We offer courses in Web Development, React JS, JavaScript, Python, UI/UX Design, Digital Marketing, Data Analytics, and other industry-relevant technologies designed to help students and professionals build practical skills." },
    { q: "Are the courses suitable for beginners?", a: "Yes. Most of our courses are designed for beginners and start with fundamental concepts before progressing to advanced topics. No prior experience is required for beginner-level programs." },
    { q: "Do I receive a certificate after completing a course?", a: "Yes. Students who successfully complete the course requirements and assessments will receive a course completion certificate." },
    { q: "Are the classes conducted online or offline?", a: "We offer both online and offline learning options, depending on the course. You can choose the mode that best fits your schedule and learning preferences." },
    { q: "What is the duration of the courses?", a: "Course durations vary based on the subject and depth of coverage. Most programs range from a few weeks to several months." },
    { q: "Will I get hands-on project experience?", a: "Yes. Our courses include practical assignments, real-world projects, and case studies to help you apply what you learn and build a strong portfolio." },
    { q: "Is there any placement or career support?", a: "Yes. We provide career guidance, resume-building assistance, interview preparation, and placement support for eligible programs." },
    { q: "Can I access course materials after the classes are completed?", a: "Yes. Depending on the course, students may receive access to recorded sessions, notes, presentations, and other learning resources for future reference." },
    { q: "How can I choose the right course for my career goals?", a: "Our academic advisors and mentors can help you evaluate your interests, current skill level, and career objectives to recommend the most suitable course for you." },
  ];

  const testimonials = [
    {
      quote: "The React course gave me exactly what I needed to transition from backend to full-stack. The capstone project was instrumental in my interview.",
      name: "[TODO: Student Name]",
      role: "Software Developer"
    },
    {
      quote: "Practical, no-nonsense Python training. We built actual automation scripts that I use at work today.",
      name: "[TODO: Student Name]",
      role: "Data Analyst"
    }
  ];

  const categories = ["All", ...Array.from(new Set(courses.map(c => c.category)))];
  const levels = ["All", "Beginner", "Intermediate", "Advanced"];

  const filteredCourses = courses.filter(course => {
    const matchSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || course.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory = categoryFilter === "All" || course.category === categoryFilter;
    const matchLevel = levelFilter === "All" || course.level === levelFilter;
    return matchSearch && matchCategory && matchLevel;
  });

  return (
    <>
      {/* Header */}
      <section className="header-wrap" style={{backgroundImage:'linear-gradient(#1219297d), url(/images/projenius-banner.webp)'}}>
        <div className="container title-section text-center">
          <h1 className="page-title">Our Courses</h1>
          <p className="hero-subheadline text-white mt-3" style={{opacity: 0.9}}>Master in-demand skills with expert-led curriculum.</p>
        </div>
      </section>

      {/* Course Catalog Section */}
      <section className="modern-course-section section-padding">
        <div className="container">
          
          {/* Filter Bar */}
          <div className="course-filter-bar mb-5 p-4 shadow-sm" style={{backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0'}}>
            <div className="row g-3">
              <div className="col-lg-4 col-md-12">
                <div className="search-box position-relative">
                  <i className="bi bi-search position-absolute" style={{left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8'}}></i>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Search courses..." 
                    style={{paddingLeft: '45px'}}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <select className="form-select" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                  {categories.map(cat => <option key={cat} value={cat}>{cat === "All" ? "All Categories" : cat}</option>)}
                </select>
              </div>
              <div className="col-lg-4 col-md-6">
                <select className="form-select" value={levelFilter} onChange={(e) => setLevelFilter(e.target.value)}>
                  {levels.map(lvl => <option key={lvl} value={lvl}>{lvl === "All" ? "All Levels" : lvl}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="row g-4">
            {filteredCourses.length > 0 ? filteredCourses.map((course, index) => (
              <div className="col-lg-4 col-md-6" key={index}>
                <div className="modern-course-card h-100 position-relative">
                  {course.isPopular && (
                    <div className="trending-badge position-absolute" style={{top: '15px', right: '15px', zIndex: 10, backgroundColor: '#f59e0b', color: '#fff', padding: '5px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', boxShadow: '0 4px 10px rgba(0,0,0,0.1)'}}>
                      <i className="bi bi-fire me-1"></i> Trending
                    </div>
                  )}
                  <div className="modern-course-image" style={{aspectRatio: '16/9', overflow: 'hidden', backgroundColor: '#f1f5f9'}}>
                    <img src={course.image} alt={course.title} loading="lazy" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                  </div>

                  <div className="modern-course-content d-flex flex-column h-100 p-4">
                    <span className="badge bg-light text-primary mb-2 align-self-start border border-primary-subtle">{course.category}</span>
                    <h3 className="mb-3">{course.title}</h3>
                    
                    <div className="course-metadata mb-3 d-flex flex-wrap gap-3" style={{fontSize: '13px', color: '#64748b'}}>
                      <span><i className="bi bi-clock me-1"></i> {course.duration}</span>
                      <span><i className="bi bi-bar-chart me-1"></i> {course.level}</span>
                      <span><i className="bi bi-laptop me-1"></i> {course.mode}</span>
                    </div>

                    <p className="flex-grow-1" style={{fontSize: '15px'}}>{course.desc}</p>

                    <a href="/coursedetails" className="btn btn-outline-primary mt-3 w-100 d-flex justify-content-between align-items-center">
                      <span className="btn-content">View Course Details</span>
                      <i className="bi bi-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </div>
            )) : (
              <div className="col-12 text-center py-5">
                <h4 className="text-muted">No courses found matching your criteria.</h4>
                <button className="btn btn-link mt-2" onClick={() => { setSearchQuery(""); setCategoryFilter("All"); setLevelFilter("All"); }}>Clear Filters</button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Cross-Link Banner */}
      <section className="cross-link-banner py-5" style={{backgroundColor: '#0f172a'}}>
        <div className="container text-center">
          <h3 className="text-white mb-3">Not sure which course fits your career goals?</h3>
          <p className="text-light opacity-75 mb-4 max-w-2xl mx-auto" style={{maxWidth: '600px'}}>Stop guessing. Book a 1-on-1 mentorship call with our industry experts to get a personalized career roadmap before you enroll.</p>
          <a href="/career-guidance" className="btn btn-primary-custom btn-lg">Book a Career Call <i className="bi bi-arrow-up-right ms-2"></i></a>
        </div>
      </section>

      {/* Course Specific Testimonials */}
      <section className="course-testimonials py-5 bg-light">
        <div className="container">
          <div className="section-heading text-center mb-5">
            <span id="sub-heading">Student Success</span>
            <h2>What Our Learners Built</h2>
          </div>
          <div className="row justify-content-center g-4">
            {testimonials.map((t, idx) => (
              <div className="col-lg-5 col-md-6" key={idx}>
                <div className="card border-0 shadow-sm h-100 p-4" style={{borderRadius: '16px'}}>
                  <div className="d-flex mb-3">
                    <i className="bi bi-star-fill text-warning me-1"></i>
                    <i className="bi bi-star-fill text-warning me-1"></i>
                    <i className="bi bi-star-fill text-warning me-1"></i>
                    <i className="bi bi-star-fill text-warning me-1"></i>
                    <i className="bi bi-star-fill text-warning"></i>
                  </div>
                  <p className="fst-italic mb-4" style={{color: '#475569'}}>"{t.quote}"</p>
                  <div className="d-flex align-items-center mt-auto">
                    <div className="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center fw-bold" style={{width: '40px', height: '40px'}}>{t.name.charAt(1)}</div>
                    <div className="ms-3">
                      <h6 className="mb-0 fw-bold">{t.name}</h6>
                      <small className="text-muted">{t.role}</small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course FAQ */}
      <section id="faq" className="faq-grid-section">
        <div className="container">
          <div className="text-center mb-4">
            <h2 className="faq-grid-title">FAQ</h2>
            <p className="faq-grid-subtitle mx-auto" style={{maxWidth: '700px'}}>
              Looking for Answers?
            </p>
            <button
              className="btn mt-4 toggle-faq-btn"
              onClick={() => setShowFaq(!showFaq)}
            >
              {showFaq ? "Hide FAQs" : "Visit Our FAQ"}
            </button>
          </div>

          {showFaq && (
            <div className="faq-grid-container mt-5 pt-3">
              <div className="row g-4">
                {courseFaqs.map((faq, index) => (
                  <div className="col-lg-6" key={index}>
                    <div
                      className={`faq-grid-card ${openFaq === index ? "active" : ""}`}
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    >
                      <h5 className="faq-q">Q: {faq.q}</h5>
                      {openFaq === index && (
                        <p className="faq-a mt-3 mb-0">A: {faq.a}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}