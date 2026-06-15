import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import "../index.css";
import "../assets/css/Contact-page.css";

export default function Contact() {

  const form = useRef();

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

      {/* FAQ */}

      <section className="faq-main-section">
        <div className="container">

          <div className="faq-title-wrap text-center">
            <span className="section-tag">
              FAQ
            </span>

            <h2>Frequently Asked Questions</h2>
          </div>

          <div className="accordion custom-faq" id="faqAccordion">

            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#faq1"
                >
                  What services do you provide?
                </button>
              </h2>

              <div
                id="faq1"
                className="accordion-collapse collapse show"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  We provide web development, IoT solutions, UI/UX design,
                  software development, and digital transformation services.
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#faq2"
                >
                  How long does a project take?
                </button>
              </h2>

              <div
                id="faq2"
                className="accordion-collapse collapse"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  Project timelines depend on the scope, features, and
                  complexity of the project requirements.
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#faq3"
                >
                  Do you provide custom software solutions?
                </button>
              </h2>

              <div
                id="faq3"
                className="accordion-collapse collapse"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  Yes, we create customized software solutions based on your
                  business and industry needs.
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#faq4"
                >
                  Will I get technical support after completion?
                </button>
              </h2>

              <div
                id="faq4"
                className="accordion-collapse collapse"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  Yes, we provide maintenance, updates, and technical support
                  after project delivery.
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#faq5"
                >
                  How can I contact your team?
                </button>
              </h2>

              <div
                id="faq5"
                className="accordion-collapse collapse"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  You can contact us through the contact form, phone number,
                  or email mentioned on this page.
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>
    </>
  );
}