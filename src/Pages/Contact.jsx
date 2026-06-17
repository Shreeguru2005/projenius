import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "../index.css";
import "../assets/css/Contact-page.css";

export default function Contact() {

  const form = useRef();
  const [openFAQ, setOpenFAQ] = useState(null);
  const [showFAQs, setShowFAQs] = useState(false);


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
const faqs = [
  {
    question: "What services do you provide?",
    answer: "We provide web development, IoT solutions, UI/UX design, software development and digital transformation services."
  },
  {
    question: "How long does a project take?",
    answer: "Project timelines depend on project scope and complexity."
  },
  {
    question: "Do you provide custom software solutions?",
    answer: "Yes, we create customized software solutions based on business needs."
  },
  {
    question: "Will I get technical support after completion?",
    answer: "Yes, we provide maintenance and support."
  },
  {
    question: "How can I contact your team?",
    answer: "Through phone, email or contact form."
  },
  {
    question: "Do you provide SEO services?",
    answer: "Yes, we provide SEO services."
  },
  {
    question: "Do you develop mobile applications?",
    answer: "Yes, Android and iOS applications."
  },
  {
    question: "Can you redesign an existing website?",
    answer: "Yes, we can redesign existing websites."
  },
  {
    question: "Do you provide hosting support?",
    answer: "Yes, hosting and deployment support."
  },
  {
    question: "What industries do you work with?",
    answer: "Healthcare, Education, Retail and Enterprise."
  }
];
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

          <div className="row align-items-center g-5">

            {/* LEFT */}

            <div className="col-lg-5">
              <div className="contact-info-box">

                <span className="section-tag">
                  Contact Us
                </span>

                <h2>
                  Let’s Discuss Your Next Project
                </h2>

                <p>
                  Reach out to our team for software development, IoT
                  solutions, UI/UX design, and digital innovation services.
                </p>

                <div className="contact-detail-item">
                  <div className="contact-icon">
                    <i className="bi bi-telephone-fill"></i>
                  </div>

                  <div>
                    <h5>Phone</h5>

                    <span>
                      <a href="tel:+918925450473">
                        +91 89254 50473
                      </a>
                    </span>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <div className="contact-icon">
                    <i className="bi bi-envelope-fill"></i>
                  </div>

                  <div>
                    <h5>Email</h5>

                    <span>
                      <a href="mailto:teamprojenius2025@gmail.com">
                        teamprojenius2025@gmail.com
                      </a>
                    </span>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <div className="contact-icon">
                    <i className="bi bi-geo-alt-fill"></i>
                  </div>

                  <div>
                    <h5>Location</h5>
                    <span>Trichy, Tamil Nadu, India</span>
                  </div>
                </div>

              </div>
            </div>

            {/* RIGHT */}

            <div className="col-lg-7">
              <div className="contact-form-wrapper">

                <h3>Send Message</h3>

                <form ref={form} onSubmit={sendEmail}>

                  <div className="row">

                    <div className="col-md-6 mb-4">
                      <input
                        type="text"
                        name="user_name"
                        className="form-control custom-contact-input"
                        placeholder="Your Name"
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-4">
                      <input
                        type="email"
                        name="user_email"
                        className="form-control custom-contact-input"
                        placeholder="Email Address"
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-4">
                      <input
                        type="text"
                        name="user_phone"
                        className="form-control custom-contact-input"
                        placeholder="Phone Number"
                      />
                    </div>

                    <div className="col-md-6 mb-4">
                      <input
                        type="text"
                        name="subject"
                        className="form-control custom-contact-input"
                        placeholder="Subject"
                        required
                      />
                    </div>

                    <div className="col-12 mb-4">
                      <textarea
                        rows="6"
                        name="message"
                        className="form-control custom-contact-input"
                        placeholder="Write Your Message"
                        required
                      ></textarea>
                    </div>

                    <div className="col-12">
                      <button type="submit" className="btn">
                        Send Message
                        <i className="bi bi-arrow-up-right"></i>
                      </button>
                    </div>

                  </div>

                </form>

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
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>

          </div>
        </div>
      </section>
      <section className="faq-main-section">
  <div className="container">

    <div className="faq-title-wrap text-center">
      <span className="section-tag">FAQ</span>
      <h2>Frequently Asked Questions</h2>

<button
  className="faq-open-btn"
  onClick={() => setShowFAQs(!showFAQs)}
>
  {showFAQs ? "Hide Questions" : "Open Questions"}
</button>
    </div>

    {showFAQs && (
    <div className="row">

      <div className="col-lg-6">
        {faqs.slice(0, 5).map((faq, index) => (
          <div className="faq-card" key={index}>
            <div
              className="faq-question"
              onClick={() =>
                setOpenFAQ(
                  openFAQ === index ? null : index
                )
              }
            >
              <h5>{faq.question}</h5>

              <span>
                {openFAQ === index ||
                openFAQ === "all"
                  ? "−"
                  : "+"}
              </span>
            </div>
          

            {(openFAQ === index ||
              openFAQ === "all") && (
              <div className="faq-answer">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
      

      <div className="col-lg-6">
        {faqs.slice(5).map((faq, index) => (
          <div className="faq-card" key={index + 5}>
            <div
              className="faq-question"
              onClick={() =>
                setOpenFAQ(
                  openFAQ === index + 5
                    ? null
                    : index + 5
                )
              }
            >
              <h5>{faq.question}</h5>

              <span>
                {openFAQ === index + 5 ||
                openFAQ === "all"
                  ? "−"
                  : "+"}
              </span>
            </div>

            {(openFAQ === index + 5 ||
              openFAQ === "all") && (
              <div className="faq-answer">
                {faq.answer}
              </div>
            )}
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