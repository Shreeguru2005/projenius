import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import CountUp from "../Components/CountUp";
import "../assets/css/CourseDetails.css";

export default function CourseDetails() {
  const location = useLocation();
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Data Binding fallback (Bug 4 fix)
  const defaultCourse = {
    title: "Building Smart Solutions With AI, IoT & Innovation",
    category: "Smart Learning Program",
    duration: "4 Months",
    level: "All Levels",
    mode: "Online Live",
    price: 5722,
    rating: 4.8,
    reviews: 320,
    enrolled: 774,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80&auto=format",
    desc: "Learn modern technologies with real-time projects, expert mentorship, practical workshops, and industry focused training programs designed for future careers."
  };

  const course = location.state?.course || defaultCourse;

  // Generate mock curriculum based on title to make it dynamic
  const getCurriculum = (title) => {
    if (title.toLowerCase().includes('react')) {
      return ["React Fundamentals", "Hooks & Context API", "State Management (Redux/Zustand)", "Routing & API Integration", "Performance Optimization", "Capstone Project: E-Commerce App"];
    } else if (title.toLowerCase().includes('design')) {
      return ["Design Thinking & User Research", "Wireframing & Prototyping", "Figma Mastery", "Design Systems & Components", "Interaction Design", "Portfolio Building"];
    } else if (title.toLowerCase().includes('python')) {
      return ["Python Basics & Syntax", "Data Structures", "Object-Oriented Programming", "Working with APIs", "Automation Scripts", "Final Project: Web Scraper"];
    } else if (title.toLowerCase().includes('data')) {
      return ["Fundamentals of Data Science", "Programming for Data Science", "Machine Learning Basics", "Data Analytics Techniques", "Real-world Applications", "Capstone Project"];
    } else {
      return ["Fundamentals of " + course.category, "Core Concepts & Syntax", "Advanced Techniques", "Real-world Applications", "Industry Level Workshops", "Capstone Project"];
    }
  };

  const curriculum = getCurriculum(course.title);

  // WhatsApp Enrollment Redirect (Part 5)
  const handleEnroll = (e) => {
    e.preventDefault();
    setIsRedirecting(true);
    
    // Admin WhatsApp Number (constant)
    const ADMIN_WA_NUMBER = "919025476322";
    const formattedPrice = course.price === 0 ? "Free" : `₹${course.price.toLocaleString()}`;
    const message = `Hi! I'm interested in enrolling in the ${course.title} course (${formattedPrice}). Could you share the enrollment details?`;
    
    const waUrl = `https://wa.me/${ADMIN_WA_NUMBER}?text=${encodeURIComponent(message)}`;
    
    // Open in new tab after a brief delay for UX
    setTimeout(() => {
      window.open(waUrl, "_blank", "noopener,noreferrer");
      setIsRedirecting(false);
    }, 400);
  };

  const relatedCourses = [
    {
      title: "Web Development",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
      price: "$119",
      rating: 4.7,
      reviews: 120,
      badge: "Popular"
    },
    {
      title: "Digital Marketing",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      price: "$89",
      rating: 4.6,
      reviews: 85,
    },
    {
      title: "UI / UX Design",
      image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800&q=80",
      price: "$59",
      rating: 4.9,
      reviews: 210,
      badge: "Bestseller"
    },
    {
      title: "Business Consulting",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
      price: "$67",
      rating: 4.5,
      reviews: 64,
    },
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const listItem = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <>
      {/* Header */}
      <section className="header-wrap" style={{backgroundImage:'linear-gradient(rgba(11, 20, 38, 0.75), rgba(11, 20, 38, 0.85)), url(/images/projenius-banner.webp)'}}>
        <div className="container title-section text-center h-100 d-flex flex-column justify-content-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="page-title text-white" 
            style={{textShadow: '0 2px 4px rgba(0,0,0,0.5)'}}>
            Course Details
          </motion.h1>
        </div>
      </section>

      {/* Course Details */}
      <section className="course-details-section py-5">
        <div className="container">
          <div className="row g-4 position-relative">
            {/* LEFT SIDE */}
            <div className="col-lg-8">
              <motion.div 
                initial="hidden" animate="visible" variants={fadeInUp}
                className="course-about-box shadow-sm mb-4"
                style={{border: '1px solid #e2e8f0', borderRadius: '24px'}}
              >
                <span className="course-tag">
                  {course.category}
                </span>

                <h2 className="fw-bold mb-3" style={{color: '#0B1426'}}>
                  {course.title}
                </h2>

                <p className="text-muted" style={{fontSize: '1.1rem', lineHeight: '1.7'}}>
                  {course.desc}
                </p>

                <hr className="my-5 text-muted opacity-25" />

                <h4 className="mb-4 fw-bold" style={{color: '#0B1426'}}>What you'll learn</h4>
                <motion.div 
                  variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
                  className="row g-4"
                >
                  {curriculum.map((item, idx) => (
                    <motion.div variants={listItem} className="col-md-6" key={idx}>
                      <div className="d-flex align-items-start">
                        <div className="flex-shrink-0 mt-1 me-3">
                          <i className="bi bi-check-circle-fill text-success fs-5"></i>
                        </div>
                        <div>
                          <span style={{color: '#475569', fontWeight: '500', fontSize: '1.05rem'}}>{item}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>

            {/* RIGHT SIDE (Sticky Sidebar) */}
            <div className="col-lg-4">
              <div className="sticky-top" style={{top: '100px', zIndex: 10}}>
                <motion.div 
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
                  className="course-sidebar-box shadow-sm d-flex flex-column"
                  style={{border: '1px solid #e2e8f0', borderRadius: '24px'}}
                >
                  <div className="video-thumbnail position-relative overflow-hidden rounded-4">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-100 object-fit-cover"
                      style={{height: '240px', transition: 'transform 0.4s ease'}}
                    />
                    <div className="play-btn-wrapper position-absolute top-50 start-50 translate-middle">
                      <div className="play-btn d-flex justify-content-center align-items-center shadow">
                        <i className="bi bi-play-fill"></i>
                      </div>
                    </div>
                  </div>

                  <div className="feature-list mt-4 flex-grow-1">
                    <div className="feature-item d-flex justify-content-between py-3 border-bottom border-light">
                      <span className="text-muted d-flex align-items-center"><i className="bi bi-journal-text me-2 text-primary"></i> Lectures</span>
                      <strong className="text-dark">24</strong>
                    </div>

                    <div className="feature-item d-flex justify-content-between py-3 border-bottom border-light">
                      <span className="text-muted d-flex align-items-center"><i className="bi bi-patch-question me-2 text-primary"></i> Quiz</span>
                      <strong className="text-dark">6</strong>
                    </div>

                    <div className="feature-item d-flex justify-content-between py-3 border-bottom border-light">
                      <span className="text-muted d-flex align-items-center"><i className="bi bi-clock-history me-2 text-primary"></i> Duration</span>
                      <strong className="text-dark">{course.duration}</strong>
                    </div>

                    <div className="feature-item d-flex justify-content-between py-3 border-bottom border-light">
                      <span className="text-muted d-flex align-items-center"><i className="bi bi-bar-chart-steps me-2 text-primary"></i> Skill Level</span>
                      <strong className="text-dark">{course.level}</strong>
                    </div>

                    <div className="feature-item d-flex justify-content-between py-3 border-bottom border-light">
                      <span className="text-muted d-flex align-items-center"><i className="bi bi-globe me-2 text-primary"></i> Mode</span>
                      <strong className="text-dark">{course.mode}</strong>
                    </div>

                    <div className="feature-item d-flex justify-content-between py-3">
                      <span className="text-muted d-flex align-items-center"><i className="bi bi-people me-2 text-primary"></i> Students</span>
                      <strong className="text-dark">
                        <CountUp to={course.enrolled || 774} duration={2} />+
                      </strong>
                    </div>
                  </div>

                  <div className="course-price text-center mt-4 pt-4 border-top border-light">
                    <h2 className="fw-bold mb-4" style={{color: '#0B1426', fontSize: '2.5rem'}}>
                      {course.price === 0 ? 'Free' : (course.price > 1000 ? `₹${course.price.toLocaleString()}` : `$${course.price}`)}
                    </h2>

                    <button 
                      onClick={handleEnroll} 
                      className={`btn btn-primary w-100 py-3 fw-bold rounded-pill d-flex justify-content-center align-items-center shadow-sm enroll-btn ${isRedirecting ? 'disabled' : ''}`}
                      style={{transition: 'all 0.2s ease', backgroundColor: '#3DA9FC', borderColor: '#3DA9FC'}}
                    >
                      {isRedirecting ? (
                        <><span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Redirecting...</>
                      ) : (
                        <>Enroll via WhatsApp <i className="bi bi-whatsapp ms-2 fs-5"></i></>
                      )}
                    </button>
                    <small className="d-block mt-3 text-muted" style={{fontSize: '0.85rem'}}>
                      <i className="bi bi-shield-check me-1 text-success"></i> Secure enrollment process
                    </small>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Related Courses (Bug 1: fixed spacing, Bug 2: fixed gap) */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={fadeInUp}
            className="related-course-section mt-5 pt-5"
          >
            <div className="section-title-wrap text-center mb-5">
              <span className="d-inline-block px-4 py-2 rounded-pill bg-primary bg-opacity-10 text-primary fw-bold mb-3" style={{letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.9rem'}}>Our Courses</span>
              <h3 className="fw-bold fs-1" style={{color: '#0B1426'}}>You May Like</h3>
            </div>

            <div className="row g-4">
              {relatedCourses.map((c, index) => (
                <div className="col-lg-3 col-md-6" key={index}>
                  <div className="related-course-card bg-white h-100 position-relative d-flex flex-column shadow-sm border border-light" style={{borderRadius: '16px', overflow: 'hidden', transition: 'all 0.3s ease'}}>
                    {c.badge && (
                      <div className="position-absolute" style={{top: '12px', right: '12px', zIndex: 10, backgroundColor: c.badge === 'Popular' ? '#3b82f6' : '#f59e0b', color: '#fff', padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px', boxShadow: '0 4px 10px rgba(0,0,0,0.15)'}}>
                        {c.badge}
                      </div>
                    )}
                    <div className="overflow-hidden position-relative" style={{aspectRatio: '16/10'}}>
                      <img src={c.image} alt={c.title} className="w-100 h-100 object-fit-cover card-img-hover" style={{transition: 'transform 0.4s ease'}} />
                    </div>

                    <div className="related-course-content p-4 d-flex flex-column flex-grow-1">
                      <h4 className="fw-bold mb-2" style={{color: '#0f172a', fontSize: '1.15rem'}}>{c.title}</h4>

                      <div className="course-rating d-flex align-items-center mb-3 text-warning" style={{fontSize: '0.9rem'}}>
                        <i className="bi bi-star-fill"></i>
                        <span className="text-dark fw-bold ms-2">{c.rating}</span>
                        <span className="text-muted ms-1">({c.reviews} reviews)</span>
                      </div>

                      <div className="mt-auto pt-3 border-top d-flex justify-content-between align-items-center gap-3 flex-wrap">
                        <h5 className="fw-bold mb-0" style={{color: '#3da9fc', fontSize: '1.3rem'}}>{c.price}</h5>
                        <Link to="/courses" className="btn btn-outline-primary btn-sm rounded-pill px-3 py-2 fw-semibold course-card-btn" style={{transition: 'all 0.2s'}}>
                          View More
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <style>{`
        .enroll-btn:hover {
          background-color: #2b8edb !important;
          border-color: #2b8edb !important;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(61, 169, 252, 0.4) !important;
        }
        .enroll-btn:active {
          transform: scale(0.96) !important;
        }
        .video-thumbnail:hover img {
          transform: scale(1.05);
        }
        .play-btn-wrapper {
          z-index: 2;
        }
        .play-btn {
          width: 70px;
          height: 70px;
          background: rgba(255, 255, 255, 0.95);
          color: #3DA9FC;
          border-radius: 50%;
          font-size: 28px;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .video-thumbnail:hover .play-btn {
          transform: scale(1.15);
          background: #ffffff;
          color: #2b8edb;
          box-shadow: 0 0 0 10px rgba(255, 255, 255, 0.2);
        }
        .related-course-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 35px rgba(0,0,0,0.1) !important;
        }
        .related-course-card:hover .card-img-hover {
          transform: scale(1.05);
        }
        .course-card-btn:hover {
          background-color: #3DA9FC;
          color: white;
          transform: translateY(-2px);
        }
        .course-card-btn:active {
          transform: scale(0.95);
        }
      `}</style>
    </>
  );
}