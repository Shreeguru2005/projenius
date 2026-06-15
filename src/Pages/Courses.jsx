import React from "react";
import "../index.css";
import "../assets/css/Service-page.css";

export default function Courses() {
  const courses = [
    {
      title: "React Development",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      desc:
        "Learn modern React development with components, hooks, routing, APIs, responsive layouts, and real-time project implementation techniques.",
    },
    {
      title: "UI/UX Designing",
      image:
        "https://images.unsplash.com/photo-1559028012-481c04fa702d",
      desc:
        "Create attractive user interfaces and improve digital experiences using wireframes, design systems, prototypes, and creative tools effectively.",
    },
    {
      title: "Python Programming",
      image:
        "https://images.unsplash.com/photo-1526379095098-d400fd0bf935",
      desc:
        "Master Python programming fundamentals with practical coding exercises, automation projects, data handling, and beginner-friendly development concepts.",
    },
    {
      title: "IoT Development",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475",
      desc:
        "Build smart IoT solutions using sensors, embedded systems, cloud connectivity, automation concepts, and hardware programming techniques successfully.",
    },
    {
      title: "Digital Marketing",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
      desc:
        "Learn SEO, social media marketing, content strategy, branding, analytics, and advertising methods to grow online business visibility.",
    },
    {
      title: "Data Analytics",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
      desc:
        "Understand data visualization, reporting techniques, dashboards, business insights, and analytics tools through practical real-world learning experiences.",
    },
  ];

  return (
    <>
      {/* Header */}
      <section className="header-wrap" style={{backgroundImage:'linear-gradient(#1219297d), url(/images/projenius-banner.webp)'}}>
        <div className="container title-section">
          <h1 className="page-title">Our Courses</h1>
        </div>
      </section>

      {/* Course Section */}
      <section className="modern-course-section">
        <div className="container">
          <div className="section-heading text-center">
            <span id="sub-heading">Popular Programs</span>

            <h2 id="title">Explore Our Courses</h2>
          </div>

          <div className="row g-4">
            {courses.map((course, index) => (
              <div className="col-lg-4 col-md-6" key={index}>
                <div className="modern-course-card">
                  <div className="modern-course-image">
                    <img src={course.image} alt={course.title} />
                  </div>

                  <div className="modern-course-content">
                    <h3>{course.title}</h3>

                    <p>{course.desc}</p>

                    <a href="/coursedetails" className="btn">
                      <span className="btn-content">View More <i className="bi bi-arrow-up-right ms-3"></i></span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}