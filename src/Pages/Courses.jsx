import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "../index.css";
import "../assets/css/Service-page.css";
import "../assets/css/Contact-page.css";

export default function Courses() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [levelFilter, setLevelFilter] = useState("All");
  const [sortOption, setSortOption] = useState("Popular");
  const [isLoading, setIsLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(6);
  const [showFaq, setShowFaq] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  useEffect(() => {
    // Simulate network request for courses
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const courses = [
    {
      id: 1,
      title: "React Development",
      category: "Development",
      duration: "8 Weeks",
      level: "Intermediate",
      mode: "Online Live",
      badge: "Bestseller",
      price: 4999,
      rating: 4.8,
      reviews: 212,
      enrolled: 1205,
      instructor: "Jane Doe",
      instructorAvatar: "https://i.pravatar.cc/150?img=47",
      dateAdded: "2023-01-10",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80&auto=format",
      desc: "Learn modern React development with components, hooks, routing, APIs, responsive layouts, and real-time project implementation techniques.",
    },
    {
      id: 2,
      title: "UI/UX Designing",
      category: "Design",
      duration: "6 Weeks",
      level: "Beginner",
      mode: "Self-Paced",
      badge: "Trending",
      price: 2999,
      rating: 4.7,
      reviews: 145,
      enrolled: 840,
      instructor: "Alex Smith",
      instructorAvatar: "https://i.pravatar.cc/150?img=11",
      dateAdded: "2023-03-15",
      image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800&q=80&auto=format",
      desc: "Create attractive user interfaces and improve digital experiences using wireframes, design systems, prototypes, and creative tools effectively.",
    },
    {
      id: 3,
      title: "Python Programming",
      category: "Development",
      duration: "10 Weeks",
      level: "Beginner",
      mode: "Online Live",
      badge: "Popular",
      price: 3499,
      rating: 4.9,
      reviews: 320,
      enrolled: 2100,
      instructor: "Michael Chen",
      instructorAvatar: "https://i.pravatar.cc/150?img=33",
      dateAdded: "2022-11-05",
      image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&q=80&auto=format",
      desc: "Master Python programming fundamentals with practical coding exercises, automation projects, data handling, and beginner-friendly development concepts.",
    },
    {
      id: 4,
      title: "IoT Development",
      category: "Engineering",
      duration: "12 Weeks",
      level: "Advanced",
      mode: "Hybrid",
      badge: "New",
      price: 5999,
      rating: 4.6,
      reviews: 89,
      enrolled: 420,
      instructor: "Sarah Jenkins",
      instructorAvatar: "https://i.pravatar.cc/150?img=5",
      dateAdded: "2024-01-20",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80&auto=format",
      desc: "Build smart IoT solutions using sensors, embedded systems, cloud connectivity, automation concepts, and hardware programming techniques successfully.",
    },
    {
      id: 5,
      title: "Digital Marketing",
      category: "Marketing",
      duration: "8 Weeks",
      level: "Beginner",
      mode: "Self-Paced",
      badge: "",
      price: 1999,
      rating: 4.5,
      reviews: 112,
      enrolled: 650,
      instructor: "Emma Wilson",
      instructorAvatar: "https://i.pravatar.cc/150?img=9",
      dateAdded: "2023-05-10",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&auto=format",
      desc: "Learn SEO, social media marketing, content strategy, branding, analytics, and advertising methods to grow online business visibility.",
    },
    {
      id: 6,
      title: "Data Analytics",
      category: "Data",
      duration: "10 Weeks",
      level: "Intermediate",
      mode: "Online Live",
      badge: "Popular",
      price: 4499,
      rating: 4.8,
      reviews: 178,
      enrolled: 980,
      instructor: "David Brown",
      instructorAvatar: "https://i.pravatar.cc/150?img=12",
      dateAdded: "2023-08-22",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80&auto=format",
      desc: "Understand data visualization, reporting techniques, dashboards, business insights, and analytics tools through practical real-world learning experiences.",
    },
    {
      id: 7,
      title: "Advanced React Patterns",
      category: "Development",
      duration: "4 Weeks",
      level: "Advanced",
      mode: "Self-Paced",
      badge: "New",
      price: 2499,
      rating: 5.0,
      reviews: 45,
      enrolled: 150,
      instructor: "Jane Doe",
      instructorAvatar: "https://i.pravatar.cc/150?img=47",
      dateAdded: "2024-02-15",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80&auto=format",
      desc: "Deep dive into advanced React concepts, performance optimization, custom hooks, and state management at scale.",
    }
  ];

  const courseFaqs = [
    { q: "Are the courses self-paced or scheduled?", a: "We offer both self-paced modules and scheduled live cohorts. Check the course tags for specific mode details." },
    { q: "Do I get a certificate upon completion?", a: "Yes, you will receive a verifiable industry-recognized certificate upon successfully passing the final project." },
    { q: "What is the refund policy?", a: "We offer a 7-day money-back guarantee on all our self-paced courses. Live cohorts are refundable up to the 2nd session." },
    { q: "Do I need prior experience?", a: "Beginner courses require no prior experience. Intermediate and Advanced courses have prerequisites listed on their detail pages." },
  ];

  const testimonials = [
    {
      quote: "The React course gave me exactly what I needed to transition from backend to full-stack. The capstone project was instrumental in my interview.",
      name: "Sarah Jenkins",
      role: "Software Developer",
      projectImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80",
      projectLink: "#",
    },
    {
      quote: "Practical, no-nonsense Python training. We built actual automation scripts that I use at work today.",
      name: "Michael Chen",
      role: "Data Analyst",
      projectImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80",
      projectLink: "#",
    },
    {
      quote: "The UI/UX design course completely changed how I approach my work. I created a full design system for my portfolio.",
      name: "Priya Patel",
      role: "Product Designer",
      projectImage: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&q=80",
      projectLink: "#",
    },
    {
      quote: "Learned IoT from scratch. My final project was a smart home automation system that I actually installed in my house!",
      name: "James Wilson",
      role: "Hardware Engineer",
      projectImage: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=400&q=80",
      projectLink: "#",
    }
  ];

  const categories = ["All", ...Array.from(new Set(courses.map(c => c.category)))];
  const levels = ["All", "Beginner", "Intermediate", "Advanced"];

  let filteredCourses = courses.filter(course => {
    const matchSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || course.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory = categoryFilter === "All" || course.category === categoryFilter;
    const matchLevel = levelFilter === "All" || course.level === levelFilter;
    return matchSearch && matchCategory && matchLevel;
  });

  // Sorting
  if (sortOption === "Price: Low-High") {
    filteredCourses.sort((a, b) => a.price - b.price);
  } else if (sortOption === "Price: High-Low") {
    filteredCourses.sort((a, b) => b.price - a.price);
  } else if (sortOption === "Newest") {
    filteredCourses.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
  } else {
    // Popular: sort by enrolled desc
    filteredCourses.sort((a, b) => b.enrolled - a.enrolled);
  }

  const displayedCourses = filteredCourses.slice(0, visibleCount);



  const getBadgeColor = (badge) => {
    switch (badge) {
      case 'Trending': return '#f59e0b'; // Amber
      case 'Bestseller': return '#ef4444'; // Red
      case 'New': return '#10b981'; // Emerald
      case 'Popular': return '#3b82f6'; // Blue
      default: return '#64748b';
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <>
      <style>{`
        .modern-course-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0,0,0,0.1) !important;
        }
        .modern-course-card:hover .course-thumbnail {
          transform: scale(1.05);
        }
        .course-cta-btn:active, .cta-hover-effect:active {
          transform: scale(0.95) !important;
        }
        .cta-hover-effect:hover {
          background-color: #2b8edb !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(61, 169, 252, 0.4);
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: .5; }
        }
      `}</style>

      {/* Header */}
      <section className="header-wrap" style={{backgroundImage:'linear-gradient(rgba(11, 20, 38, 0.75), rgba(11, 20, 38, 0.85)), url(/images/projenius-banner.webp)'}}>
        <div className="container title-section text-center h-100 d-flex flex-column justify-content-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="page-title text-white" 
            style={{textShadow: '0 2px 4px rgba(0,0,0,0.5)'}}>
            Our Courses
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="hero-subheadline text-white mt-3 mx-auto" 
            style={{opacity: 0.95, maxWidth: '600px', fontSize: '1.2rem', textShadow: '0 1px 2px rgba(0,0,0,0.5)'}}>
            Master in-demand skills with expert-led curriculum designed to accelerate your career.
          </motion.p>
        </div>
      </section>

      {/* Course Catalog Section */}
      <section className="modern-course-section section-padding py-5">
        <div className="container">
          
          {/* Sticky Filter Bar */}
          <div className="course-filter-bar mb-4 p-4 shadow-sm sticky-top" style={{backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', top: '20px', zIndex: 1000}}>
            <div className="row g-3 align-items-center">
              <div className="col-lg-3 col-md-12">
                <div className="search-box position-relative">
                  <i className="bi bi-search position-absolute" style={{left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8'}}></i>
                  <input 
                    type="text" 
                    className="form-control focus-ring" 
                    placeholder="Search courses..." 
                    style={{paddingLeft: '45px', borderRadius: '8px'}}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-lg-3 col-md-4">
                <select className="form-select" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} style={{borderRadius: '8px'}}>
                  {categories.map(cat => <option key={cat} value={cat}>{cat === "All" ? "All Categories" : cat}</option>)}
                </select>
              </div>
              <div className="col-lg-3 col-md-4">
                <select className="form-select" value={levelFilter} onChange={(e) => setLevelFilter(e.target.value)} style={{borderRadius: '8px'}}>
                  {levels.map(lvl => <option key={lvl} value={lvl}>{lvl === "All" ? "All Levels" : lvl}</option>)}
                </select>
              </div>
              <div className="col-lg-3 col-md-4">
                 <select className="form-select" value={sortOption} onChange={(e) => setSortOption(e.target.value)} style={{borderRadius: '8px'}}>
                  <option value="Popular">Sort by: Popular</option>
                  <option value="Newest">Sort by: Newest</option>
                  <option value="Price: Low-High">Price: Low to High</option>
                  <option value="Price: High-Low">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className="mb-0 text-muted" style={{fontSize: '15px'}}>
              Showing {displayedCourses.length} of {filteredCourses.length} courses
            </h5>
          </div>

          <div className="row g-4">
            {isLoading ? (
               // Skeleton loader
               Array.from({ length: 6 }).map((_, idx) => (
                 <div className="col-lg-4 col-md-6" key={idx}>
                   <div className="modern-course-card h-100 position-relative p-3" style={{border: '1px solid #e2e8f0', borderRadius: '16px'}}>
                     <div className="bg-light" style={{height: '200px', borderRadius: '12px', animation: 'pulse 1.5s infinite'}}></div>
                     <div className="bg-light mt-3" style={{height: '24px', width: '60%', animation: 'pulse 1.5s infinite'}}></div>
                     <div className="bg-light mt-2" style={{height: '40px', width: '100%', animation: 'pulse 1.5s infinite'}}></div>
                     <div className="bg-light mt-3" style={{height: '36px', width: '100%', borderRadius: '8px', animation: 'pulse 1.5s infinite'}}></div>
                   </div>
                 </div>
               ))
            ) : filteredCourses.length > 0 ? displayedCourses.map((course, index) => (
              <motion.div 
                className="col-lg-4 col-md-6" 
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="modern-course-card h-100 position-relative d-flex flex-column bg-white" style={{borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', transition: 'all 0.3s ease'}}>
                  {course.badge && (
                    <div className="badge position-absolute" style={{top: '15px', right: '15px', zIndex: 10, backgroundColor: getBadgeColor(course.badge), color: '#fff', padding: '6px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px', boxShadow: '0 4px 10px rgba(0,0,0,0.15)'}}>
                      {course.badge === 'Trending' && <i className="bi bi-fire me-1"></i>}
                      {course.badge === 'Bestseller' && <i className="bi bi-star-fill me-1"></i>}
                      {course.badge === 'New' && <i className="bi bi-stars me-1"></i>}
                      {course.badge === 'Popular' && <i className="bi bi-heart-fill me-1"></i>}
                      {course.badge}
                    </div>
                  )}
                  <div className="modern-course-image position-relative" style={{aspectRatio: '16/9', overflow: 'hidden', backgroundColor: '#f1f5f9'}}>
                    <img src={course.image} alt={course.title} loading="lazy" className="course-thumbnail" style={{width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease'}} />
                    <div className="position-absolute bottom-0 start-0 w-100 p-2" style={{background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)'}}>
                      <div className="d-flex align-items-center text-white" style={{fontSize: '13px'}}>
                        <img src={course.instructorAvatar} alt={course.instructor} className="rounded-circle border border-white me-2" style={{width: '30px', height: '30px', objectFit: 'cover'}} />
                        <span>By {course.instructor}</span>
                      </div>
                    </div>
                  </div>

                  <div className="modern-course-content d-flex flex-column flex-grow-1 p-4">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <span className="badge bg-primary bg-opacity-10 text-primary border border-primary-subtle rounded-pill px-3 py-2">{course.category}</span>
                      <div className="d-flex align-items-center" style={{fontSize: '14px', color: '#f59e0b', fontWeight: '600'}}>
                        <i className="bi bi-star-fill me-1"></i> {course.rating} <span className="text-muted ms-1 fw-normal">({course.reviews})</span>
                      </div>
                    </div>
                    <h4 className="mb-2 fw-bold" style={{color: '#0f172a', fontSize: '1.25rem'}}>{course.title}</h4>
                    
                    <div className="course-metadata mb-3 d-flex flex-wrap gap-3" style={{fontSize: '13px', color: '#64748b'}}>
                      <span className="d-flex align-items-center"><i className="bi bi-clock me-1"></i> {course.duration}</span>
                      <span className="d-flex align-items-center"><i className="bi bi-bar-chart me-1"></i> {course.level}</span>
                      <span className="d-flex align-items-center"><i className="bi bi-laptop me-1"></i> {course.mode}</span>
                    </div>

                    <p className="flex-grow-1 text-muted" style={{fontSize: '14px', lineHeight: '1.6'}}>{course.desc}</p>
                    
                    <hr className="my-3 text-muted opacity-25" />

                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div className="d-flex align-items-center text-muted" style={{fontSize: '13px'}}>
                        <i className="bi bi-people-fill me-2 text-primary"></i>
                        <span>{course.enrolled.toLocaleString()} students</span>
                      </div>
                      <div className="fw-bold" style={{fontSize: '1.25rem', color: '#0f172a'}}>
                        {course.price === 0 ? 'Free' : `₹${course.price.toLocaleString()}`}
                      </div>
                    </div>

                    <Link to="/coursedetails" state={{ course }} className="btn btn-primary w-100 course-cta-btn py-2 fw-semibold d-flex justify-content-center align-items-center" style={{borderRadius: '8px', transition: 'all 0.2s'}}>
                      View Course <i className="bi bi-arrow-right ms-2"></i>
                    </Link>
                  </div>
                </div>
              </motion.div>
            )) : (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="col-12 text-center py-5 empty-state bg-light rounded-4 border border-light"
              >
                <div style={{fontSize: '3rem', color: '#94a3b8'}} className="mb-3">
                  <i className="bi bi-search"></i>
                </div>
                <h4 className="fw-bold" style={{color: '#0f172a'}}>No courses found</h4>
                <p className="text-muted mb-4">We couldn't find any courses matching your current filters.</p>
                <button className="btn btn-outline-primary px-4 py-2 rounded-pill" onClick={() => { setSearchQuery(""); setCategoryFilter("All"); setLevelFilter("All"); setSortOption("Popular"); }}>
                  Clear All Filters
                </button>
              </motion.div>
            )}
          </div>
          
          {!isLoading && filteredCourses.length > visibleCount && (
            <div className="text-center mt-5">
              <button 
                className="btn btn-outline-primary rounded-pill px-4 py-2 fw-semibold" 
                onClick={() => setVisibleCount(prev => prev + 3)}
              >
                Load More Courses <i className="bi bi-arrow-down ms-2"></i>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Course Specific Testimonials */}
      <motion.section 
        initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp}
        className="course-testimonials py-5 bg-light"
      >
        <div className="container">
          <div className="section-heading text-center mb-5">
            <span id="sub-heading" className="d-block mb-2" style={{color: '#3da9fc', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase'}}>Student Success</span>
            <h2 className="fw-bold" style={{color: '#0B1426', fontSize: '2.5rem'}}>What Our Learners Built</h2>
          </div>
          <div className="row justify-content-center g-4">
            {testimonials.map((t, idx) => (
              <div className="col-lg-6 col-md-12" key={idx}>
                <div className="card border-0 shadow-sm h-100 p-0 overflow-hidden bg-white" style={{borderRadius: '16px'}}>
                  <div className="row g-0 h-100">
                    <div className="col-sm-5 position-relative">
                       <img src={t.projectImage} className="w-100 h-100" style={{objectFit: 'cover', minHeight: '200px'}} alt="Student Project" />
                       <div className="position-absolute top-0 end-0 p-2">
                         <a href={t.projectLink} className="btn btn-sm btn-light rounded-pill shadow-sm py-1 px-3 d-flex align-items-center" style={{fontSize: '12px', fontWeight: '600'}}>
                           <i className="bi bi-link-45deg me-1 fs-6"></i> View Project
                         </a>
                       </div>
                    </div>
                    <div className="col-sm-7 p-4 d-flex flex-column">
                      <div className="d-flex mb-2">
                        <i className="bi bi-star-fill text-warning me-1"></i>
                        <i className="bi bi-star-fill text-warning me-1"></i>
                        <i className="bi bi-star-fill text-warning me-1"></i>
                        <i className="bi bi-star-fill text-warning me-1"></i>
                        <i className="bi bi-star-fill text-warning"></i>
                      </div>
                      <p className="fst-italic mb-4 flex-grow-1" style={{color: '#475569', fontSize: '14px', lineHeight: '1.6'}}>"{t.quote}"</p>
                      <div className="d-flex align-items-center mt-auto">
                        <div className="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center fw-bold" style={{width: '40px', height: '40px'}}>{t.name.charAt(0)}</div>
                        <div className="ms-3">
                          <h6 className="mb-0 fw-bold" style={{color: '#0B1426'}}>{t.name}</h6>
                          <small className="text-muted">{t.role}</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* FAQ SECTION (Grid Style) */}
      <section className="faq-grid-section py-5">
        <div className="container">
          <div className="text-center mb-4">
            <h2 className="faq-grid-title">Looking for Answers?</h2>
            <p className="faq-grid-subtitle mx-auto" style={{maxWidth: '700px'}}>
              Before sending a message or enrolling, please check our comprehensive FAQ section regarding courses. You might find the solution instantly!
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
                      className={`faq-grid-card ${activeFaq === index ? "active" : ""}`}
                      onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                    >
                      <h5 className="faq-q">Q: {faq.q}</h5>
                      {activeFaq === index && (
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

      {/* Cross-Link Banner / Single CTA */}
      <motion.section 
        initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp}
        className="cross-link-banner py-5 mb-0" 
        style={{backgroundColor: '#0B1426'}}
      >
        <div className="container text-center py-4">
          <h2 className="text-white mb-3 fw-bold">Not sure which course fits your career goals?</h2>
          <p className="text-light opacity-75 mb-4 mx-auto" style={{maxWidth: '650px', fontSize: '1.1rem'}}>Stop guessing. Book a 1-on-1 mentorship call with our industry experts to get a personalized career roadmap before you enroll.</p>
          <a href="/career-guidance" className="btn btn-lg fw-semibold cta-hover-effect border-0" style={{backgroundColor: '#3DA9FC', color: '#fff', borderRadius: '8px', padding: '12px 30px'}}>
            Book a Career Call <i className="bi bi-arrow-up-right ms-2"></i>
          </a>
        </div>
      </motion.section>
    </>
  );
}