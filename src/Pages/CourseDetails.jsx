import React from "react";
import "../assets/css/CourseDetails.css";

export default function CourseDetails() {
  const instructors = [
    {
      name: "Sophia Miller",
      role: "Marketing Expert",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    },
    {
      name: "Leslie Alexander",
      role: "UI/UX Designer",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    },
    {
      name: "Emma Wilson",
      role: "Data Analyst",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
    },
  ];

  const relatedCourses = [
    {
      title: "Web Development",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      price: "$119",
    },
    {
      title: "Digital Marketing",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
      price: "$89",
    },
    {
      title: "UI / UX Design",
      image:
        "https://images.unsplash.com/photo-1559028012-481c04fa702d",
      price: "$59",
    },
    {
      title: "Business Consulting",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
      price: "$67",
    },
  ];

  return (
    <>
      {/* Header */}
      <section className="header-wrap" style={{backgroundImage:'linear-gradient(#1219297d), url(/images/projenius-banner.webp)'}}>
        <div className="container title-section">
          <h1 className="page-title">Course Details</h1>
        </div>
      </section>

      {/* Course Details */}
      <section className="course-details-section">
        <div className="container">
          <div className="row g-4">
            {/* LEFT SIDE */}
            <div className="col-lg-8">
              <div className="course-about-box">
                <span className="course-tag">
                  Smart Learning Program
                </span>

                <h2>
                  Building Smart Solutions With AI, IoT & Innovation
                </h2>

                <p>
                  Learn modern technologies with real-time projects,
                  expert mentorship, practical workshops, and industry
                  focused training programs designed for future careers.
                </p>

                <div className="row mt-4">
                  <div className="col-md-6">
                    <ul>
                      <li>Fundamentals of Data Science</li>
                      <li>Programming for Data Science</li>
                      <li>Machine Learning Basics</li>
                      <li>Cloud Computing Concepts</li>
                    </ul>
                  </div>

                  <div className="col-md-6">
                    <ul>
                      <li>Data Analytics Techniques</li>
                      <li>Real-world Applications</li>
                      <li>Capstone Project</li>
                      <li>Industry Level Workshops</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Instructor */}
              <div className="course-about-box mt-4">
                <div className="section-title-wrap">
                  <span>Our Trainers</span>

                  <h3>Meet The Creative Minds</h3>
                </div>

                <div className="row g-4 mt-2">
                  {instructors.map((item, index) => (
                    <div className="col-md-4" key={index}>
                      <div className="instructor-card">
                        <img src={item.image} alt={item.name} />

                        <div className="instructor-content">
                          <h4>{item.name}</h4>

                          <p>{item.role}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="col-lg-4">
              <div className="course-sidebar-box">
                <div className="video-thumbnail">
                  <img
                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
                    alt=""
                  />

                  <div className="play-btn">
                    <i className="bi bi-play-fill"></i>
                  </div>
                </div>

                <div className="feature-list">
                  <div className="feature-item">
                    <span>Lectures</span>
                    <strong>236</strong>
                  </div>

                  <div className="feature-item">
                    <span>Quiz</span>
                    <strong>43</strong>
                  </div>

                  <div className="feature-item">
                    <span>Duration</span>
                    <strong>4 Months</strong>
                  </div>

                  <div className="feature-item">
                    <span>Skill Level</span>
                    <strong>All Levels</strong>
                  </div>

                  <div className="feature-item">
                    <span>Language</span>
                    <strong>English</strong>
                  </div>

                  <div className="feature-item">
                    <span>Students</span>
                    <strong>774</strong>
                  </div>
                </div>

                <div className="course-price">
                  <h2>$5,722</h2>

                  <a href="/coursedetails" className="btn">
                      <span className="btn-content">Enroll Now <i className="bi bi-arrow-up-right ms-3"></i></span>
                    </a>
                </div>
              </div>
            </div>
          </div>

          {/* Related Courses */}
          <div className="related-course-section">
            <div className="section-title-wrap text-center">
              <span>Our Courses</span>

              <h3>You May Like</h3>
            </div>

            <div className="row g-4 mt-3">
              {relatedCourses.map((course, index) => (
                <div className="col-lg-3 col-md-6" key={index}>
                  <div className="related-course-card">
                    <img src={course.image} alt={course.title} />

                    <div className="related-course-content">
                      <h4>{course.title}</h4>

                      <div className="course-rating">
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                      </div>

                      <div className="course-bottom">
                        <h5>{course.price}</h5>

                        <button className="btn">View More</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}