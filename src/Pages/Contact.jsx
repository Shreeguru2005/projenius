import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import TestimonialSection from "../Components/TestimonialSection";
import "../index.css";
import "../assets/css/Contact-page.css";

export default function Contact() {

  const form = useRef();
  const [showFaq, setShowFaq] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  const faqs = [
    { q: "What services does ProJenius offer?", a: "We offer custom solutions in Machine Learning, Web Development, App Development, IoT integration, Graphic Designing, Video Editing, and Data Analysis. All projects are tailored to your requirements." },
    { q: "How do I start a project with ProJenius?", a: "You can reach out to us through the contact form, phone, or email to schedule an initial consultation." },
    { q: "Is there an advance payment required?", a: "Yes, we usually require a partial advance payment before commencing the project." },
    { q: "What if my project involves hardware components?", a: "We have specialized teams to handle hardware integration, especially for IoT solutions." },
    { q: "How are changes to the project handled?", a: "Changes are handled through a formal change request process to ensure clear communication and timeline adjustments." },
    { q: "What is the typical timeline for a project?", a: "Timelines vary depending on project complexity, ranging from a few weeks to several months." },
    { q: "Who owns the final deliverables?", a: "Upon full payment, the client owns the final deliverables unless specified otherwise in the contract." },
    { q: "Is my information kept confidential?", a: "Absolutely. We sign an NDA to ensure all your information is strictly confidential." },
    { q: "Can I terminate a project midway?", a: "Yes, subject to the termination clauses in our service agreement." },
    { q: "How can I contact the ProJenius team?", a: "Use the contact form on this page or email us directly at teamprojenius2025@gmail.com." },
  ];

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_zyx94vi",
        "template_8as1pq2",
        form.current,
        "--8wWEAHJihOuV3Na"
      )
      .then(
        () => {
          alert("Message Sent Successfully!");
          e.target.reset();
        },
        (error) => {
          alert("Failed to send message");
          console.log(error.text);
        }
      );
  };

  return (
    <>
      <section
        className="header-wrap"
        style={{
          backgroundImage:
            "linear-gradient(#1219297d), url(/images/projenius-banner.webp)",
        }}
      >
        <div className="container title-section">
          <h1 className="page-title">Contact Us</h1>
        </div>
      </section>

      {/* CONTACT SECTION */}

      <section className="contact-main-section">
        <div className="container">
          
          <div className="text-center mb-5 pb-3">
            <h2 className="confirm-quote-title">Confirm Your Quote</h2>
            <p className="confirm-quote-subtitle mx-auto" style={{maxWidth: '650px'}}>
              Share your project details below. Our team will review your requirements and get back to you with clarity and confidence.
            </p>
          </div>

          <div className="row g-5">
            {/* LEFT - FORM */}
            <div className="col-lg-7">
              <div className="quote-form-card">
                <h3>Project & Quote Details</h3>
                <p className="quote-form-subtitle">Fill in the details below so we can prepare the best solution for you.</p>

                <form ref={form} onSubmit={sendEmail}>
                  <div className="row g-4 mt-2">
                    <div className="col-md-6">
                      <label className="form-label quote-label">Full Name</label>
                      <input type="text" name="user_name" className="form-control custom-quote-input" placeholder="Your full name" required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label quote-label">Email Address</label>
                      <input type="email" name="user_email" className="form-control custom-quote-input" placeholder="your.email@example.com" required />
                    </div>
                    <div className="col-12">
                      <label className="form-label quote-label">Phone Number</label>
                      <input type="text" name="user_phone" className="form-control custom-quote-input" placeholder="+91 98765 43210" />
                    </div>
                    <div className="col-12">
                      <label className="form-label quote-label">Service Interested In</label>
                      <select name="service" className="form-select custom-quote-input" required>
                        <option value="">Select a service</option>
                        <option value="Web Development">Web Development</option>
                        <option value="IoT Solutions">IoT Solutions</option>
                        <option value="UI/UX Design">UI/UX Design</option>
                        <option value="Carrier Guidance">Carrier Guidance</option>
                        <option value="Workshops">Workshops</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="col-12">
                      <label className="form-label quote-label">Project Details</label>
                      <textarea rows="4" name="message" className="form-control custom-quote-input" placeholder="Briefly describe your project..." required></textarea>
                    </div>
                    <div className="col-12 mt-4">
                      <button type="submit" className="btn quote-submit-btn w-100">
                        Submit Details
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* RIGHT - INFO CARDS */}
            <div className="col-lg-5">
              
              {/* TOP CARD */}
              <div className="talk-first-card mb-4">
                <h4>Need to Talk First?</h4>
                <p>Prefer a quick discussion before confirming your quote? Reach out to us directly — we're happy to help.</p>
                
                <div className="talk-contact-list mt-4">
                  <div className="talk-contact-item">
                    <i className="bi bi-telephone"></i>
                    <span>+91 89254 50473</span>
                  </div>
                  
                  <div className="talk-contact-item mt-3">
                    <i className="bi bi-envelope"></i>
                    <span>teamprojenius2025@gmail.com</span>
                  </div>
                </div>

                <p className="talk-response-time mt-4">We usually respond within 24 hours.</p>
              </div>

              {/* BOTTOM CARD */}
              <div className="what-happens-card">
                <h4>What Happens Next?</h4>
                
                <div className="step-list mt-4">
                  <div className="step-item">
                    <div className="step-number">01</div>
                    <div className="step-text">We carefully review your project requirements and objectives.</div>
                  </div>

                  <div className="step-item">
                    <div className="step-number">02</div>
                    <div className="step-text">Our team may reach out for clarification or suggestions.</div>
                  </div>

                  <div className="step-item">
                    <div className="step-number">03</div>
                    <div className="step-text">You receive a transparent quote with timelines and deliverables.</div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* MAP */}

      <section className="map-section">
        <div className="container">
          <div className="map-wrapper">

            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3930.2433611788306!2d78.08760837503!3d9.91367849018737!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00cfb5c8f13bb3%3A0xc245f4db34baf398!2sProJenius%20Innovation%20Technology%20Private%20Limited!5e0!3m2!1sen!2sin!4v1778601496079!5m2!1sen!2sin"
              width="100%"
              height="500"
              style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) brightness(100%) contrast(100%)" }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>

          </div>
        </div>
      </section>

      {/* FAQ */}

      <section className="faq-grid-section">
        <div className="container">
          <div className="text-center mb-4">
            <h2 className="faq-grid-title">Looking for Answers?</h2>
            <p className="faq-grid-subtitle mx-auto" style={{maxWidth: '700px'}}>
              Before sending a message, please check our comprehensive FAQ section or Help Center. You might find the solution instantly!
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
                {faqs.map((faq, index) => (
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



      {/* GOOGLE REVIEWS */}
      <TestimonialSection />

    </>
  );
}