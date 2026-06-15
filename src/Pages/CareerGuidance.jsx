import React from "react";
import "../index.css";
import "../assets/css/Service-page.css";

const guidanceCards = [
  {
    title: "Career Roadmap Planning",
    icon: "bi bi-signpost-split icon",
    desc:
      "Choose the right technology path with a clear learning plan based on your skills, interests, and career goals.",
  },
  {
    title: "Resume Building",
    icon: "bi bi-file-earmark-person icon",
    desc:
      "Create a professional resume that highlights projects, internships, tools, achievements, and job-ready strengths.",
  },
  {
    title: "Interview Preparation",
    icon: "bi bi-chat-square-text icon",
    desc:
      "Practice technical questions, HR rounds, communication skills, mock interviews, and confident answer framing.",
  },
  {
    title: "LinkedIn Optimization",
    icon: "bi bi-linkedin icon",
    desc:
      "Improve your profile, headline, project descriptions, skills, and visibility for recruiters and professional networking.",
  },
  {
    title: "Project Portfolio Support",
    icon: "bi bi-kanban icon",
    desc:
      "Plan, polish, and present portfolio projects that show practical ability and make your applications stronger.",
  },
  {
    title: "Placement Guidance",
    icon: "bi bi-briefcase icon",
    desc:
      "Get support with job search strategy, role selection, application preparation, and placement readiness.",
  },
];

const steps = [
  "Profile Review",
  "Goal Discussion",
  "Skill Gap Analysis",
  "Roadmap Creation",
  "Resume & Interview Prep",
  "Placement Support",
];

export default function CareerGuidance() {
  return (
    <>
      <section className="header-wrap" style={{backgroundImage:'linear-gradient(#1219299c), url(/images/projenius-banner.webp)'}}>
        <div className="container title-section">
          <h1 className="page-title">Career Guidance</h1>
        </div>
      </section>

      <section className="service-1 container career-guidance-section">
        <div className="section-heading text-center">
          <span id="sub-heading">Career Support</span>
          <h2 id="title">Move From Learning to Opportunity</h2>
        </div>

        <div className="row">
          {guidanceCards.map((card, index) => (
            <div className="col-lg-3 col-md-6 col-12" key={card.title}>
              <div className="box">
                <div className={`icon-circle ${index % 2 === 1 ? "even" : ""}`}>
                  <i className={card.icon}></i>
                </div>
                <h4 className="box-title text-center">{card.title}</h4>
                <p className="box-desc text-center">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="career-guidance-process">
        <div className="container">
          <div className="section-heading text-center">
            <span id="sub-heading">Guidance Process</span>
            <h2 id="title">A Practical Path for Students and Freshers</h2>
          </div>

          <div className="internship-process">
            {steps.map((step) => (
              <div className="internship-process-step" key={step}>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
