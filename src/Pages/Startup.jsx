import React from "react";
import "../assets/css/Startup.css";

export default function Startup() {

  const services = [
    {
      icon: "bi-cpu",
      title: "AI & Smart Solutions",
    },
    {
      icon: "bi-display",
      title: "Website & App Development",
    },
    {
      icon: "bi-bar-chart",
      title: "Startup Growth Strategy",
    },
    {
      icon: "bi-cloud",
      title: "Cloud & IoT Integration",
    },
  ];


  /* PROCESS DATA */

  const processData = [
    {
      icon: "bi-briefcase",
      title: "Concept",
      desc: "We listen, research, ideate, marinate, present, and Duis aute irure dolor in reprehenderit in voluptate.",
    },
    {
      icon: "bi-columns-gap",
      title: "Production",
      desc: "The best crews with the most up-to-date gear and technologies capture your story. Duis aute irure dolor.",
    },
    {
      icon: "bi-grid",
      title: "Post Production",
      desc: "Producers, editors, designers, and animators, shape and sculpt your video ‘til it’s ready for prime time.",
    },
    {
      icon: "bi-lightbulb",
      title: "Planning",
      desc: "Creative planning and smart strategy help businesses launch scalable and modern digital solutions.",
    },
  ];

  const processSteps = [
    {
      icon: "bi-chat-dots",
      title: "Idea Discussion",
      desc: "We understand your startup vision, goals, business model, and project requirements clearly.",
    },
    {
      icon: "bi-search",
      title: "Planning & Research",
      desc: "Detailed market research and strategic planning help create the right product roadmap.",
    },
    {
      icon: "bi-palette",
      title: "UI/UX Design",
      desc: "Modern user-focused interfaces are designed for better engagement and seamless experience.",
    },
    {
      icon: "bi-code-slash",
      title: "Product Development",
      desc: "Scalable and secure development using modern technologies tailored for startup growth.",
    },
    {
      icon: "bi-check2-circle",
      title: "Testing & Deployment",
      desc: "Complete testing and deployment ensure smooth performance across all devices and platforms.",
    },
    {
      icon: "bi-arrow-repeat",
      title: "Ongoing Support",
      desc: "Continuous updates, maintenance, and technical support help your startup grow faster.",
    },
  ];

  const chooseData = [
    {
      icon: "bi-lightning-charge",
      title: "Fast Delivery",
      desc: "Quick and efficient development process to launch your startup product faster.",
    },
    {
      icon: "bi-wallet2",
      title: "Startup-Friendly Pricing",
      desc: "Affordable and flexible pricing models designed specifically for startup businesses.",
    },
    {
      icon: "bi-people",
      title: "Dedicated Team",
      desc: "Experienced designers and developers focused completely on your startup success.",
    },
    {
      icon: "bi-diagram-3",
      title: "Scalable Solutions",
      desc: "Modern scalable architecture built to support future growth and expansion.",
    },
    {
      icon: "bi-cpu",
      title: "Modern Technologies",
      desc: "We use the latest technologies and frameworks for secure high-performance solutions.",
    },
    {
      icon: "bi-shield-check",
      title: "Long-Term Support",
      desc: "Continuous maintenance updates and technical assistance for long-term growth.",
    },
  ];

  const portfolioData = [
    {
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop",
      title: "IoT Dashboard Platform",
      tech: "React • Node.js • IoT",
      desc: "Built an IoT dashboard platform that improved device monitoring efficiency.",
    },

    {
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
      title: "AI Analytics System",
      tech: "Python • AI • Flask",
      desc: "Developed an AI analytics platform for real-time business insights and automation.",
    },

    {
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
      title: "Startup CRM Solution",
      tech: "React • Firebase • API",
      desc: "Created a smart CRM system to streamline startup customer management workflows.",
    },

    {
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
      title: "Cloud Management App",
      tech: "Cloud • AWS • React",
      desc: "Designed a scalable cloud platform for secure startup infrastructure management.",
    },

    {
      image:
        "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1200&auto=format&fit=crop",
      title: "Smart Automation Tool",
      tech: "Automation • SaaS",
      desc: "Automated startup workflows and reduced manual operational tasks efficiently.",
    },
  ];

  return (
    <>

      {/* HEADER */}
      <div
        className="header-wrap"
        style={{
          backgroundImage:
            "linear-gradient(#081120cf,#081120cf), url(/images/projenius-banner.webp)",
        }}
      >
        <div className="container title-section">
          <h1 className="page-title">Startup Supporter</h1>
        </div>
      </div>

      {/* STARTUP SECTION */}
      <section className="startup-section">

        <div className="startup-container">

          {/* LEFT SIDE */}
          <div className="startup-images">

            <div className="startup-img-one">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop"
                alt=""
              />
            </div>

            <div className="startup-img-two">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop"
                alt=""
              />
            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="startup-content">

            {/* MINI TITLE */}
            <div className="startup-mini-title">

              <span>STARTUP SUPPORT PLATFORM</span>

            </div>

            {/* HEADING */}
            <h2>
              Building Smart Digital Solutions For Modern Startups.
            </h2>

            {/* DESCRIPTION */}
            <p>
              We help startups transform innovative ideas into scalable
              digital products with powerful technology solutions,
              modern UI/UX experiences, and long-term technical support.
            </p>

            {/* SERVICES */}
            <div className="startup-services">

              {services.map((item, index) => (
                <div className="startup-service-card" key={index}>

                  <div className="startup-icon">
                    <i className={`bi ${item.icon}`}></i>
                  </div>

                  <h4>{item.title}</h4>

                </div>
              ))}

            </div>

          </div>

        </div>

      </section>
      {/* PROCESS SECTION */}
      <section className="process-section">

        <div className="container">

          {/* TOP */}
          <div className="process-top">

            <div className="process-mini-title">
              <span id="sub-heading">Services for Startups</span>
            </div>

            <h2 id="title">
              Empowering startups with smart solutions
            </h2>

          </div>

          {/* CAROUSEL */}
          <div
            id="processCarousel"
            className="carousel slide"
            data-bs-ride="carousel"
            data-bs-interval="2500"
          >

            <div className="carousel-inner">

              {/* SLIDE 1 */}
              <div className="carousel-item active">

                <div className="row">

                  {processData.slice(0, 3).map((item, index) => (
                    <div className="col-lg-4" key={index}>

                      <div className="process-card">

                        <div className="process-icon">
                          <i className={`bi ${item.icon}`}></i>
                        </div>

                        <h3>{item.title}</h3>

                        <p>{item.desc}</p>

                      </div>

                    </div>
                  ))}

                </div>

              </div>

              {/* SLIDE 2 */}
              <div className="carousel-item">

                <div className="row">

                  {processData.slice(1, 4).map((item, index) => (
                    <div className="col-lg-4" key={index}>

                      <div className="process-card">

                        <div className="process-icon">
                          <i className={`bi ${item.icon}`}></i>
                        </div>

                        <h3>{item.title}</h3>

                        <p>{item.desc}</p>

                      </div>

                    </div>
                  ))}

                </div>

              </div>

            </div>

            {/* BUTTONS */}

            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#processCarousel"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon"></span>
            </button>

            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#processCarousel"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon"></span>
            </button>

          </div>

        </div>

      </section>
      <section className="startup-process-section">

        {/* BACKGROUND IMAGE */}
        <div className="startup-process-bg">

          {/* OVERLAY BOX */}
          <div className="container">

            <div className="startup-process-content">

              {/* MINI TITLE */}
              <div className="startup-process-mini">
                <span id="sub-heading">STARTUP PROCESS</span>
              </div>

              {/* TITLE */}
              <h2>
                Startup Development Process
              </h2>

              {/* PROCESS GRID */}
              <div className="row g-4">

                {processSteps.map((item, index) => (
                  <div className="col-lg-6" key={index}>

                    <div className="startup-process-card">

                      {/* ICON */}
                      <div className="startup-process-icon">
                        <i className={`bi ${item.icon}`}></i>
                      </div>

                      {/* TEXT */}
                      <div className="startup-process-text">

                        <h4>{item.title}</h4>

                        <p>{item.desc}</p>

                      </div>

                    </div>

                  </div>
                ))}

              </div>

            </div>

          </div>

        </div>

      </section>
      <section className="why-choose-section">

        <div className="container">

          {/* TOP AREA */}
          <div className="row align-items-center why-choose-top">

            {/* LEFT CONTENT */}
            <div className="col-lg-5">

              <div className="why-choose-content">

                <span id="sub-heading">
                  Why Choose Us
                </span>

                <h2 id="title">
                  Smart Startup
                  <br />
                  Solutions With
                  <br />
                  Expert Support
                </h2>

                <div className="why-line"></div>

                <p>
                  We help startups build scalable digital products with
                  modern technologies, dedicated teams, and long-term
                  technical support for sustainable business growth.
                </p>

              </div>

            </div>

            {/* RIGHT IMAGE */}
            <div className="col-lg-7">

              <div className="why-choose-image">

                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop"
                  alt=""
                />

              </div>

            </div>

          </div>

          {/* CARD AREA */}
          <div className="row g-4">

            {chooseData.map((item, index) => (
              <div className="col-lg-4 col-md-6" key={index}>

                <div className="why-card">

                  <div className="why-card-icon">
                    <i className={`bi ${item.icon}`}></i>
                  </div>

                  <h4>{item.title}</h4>

                  <p>{item.desc}</p>

                </div>

              </div>
            ))}

          </div>

        </div>

      </section>
      <section className="startup-portfolio-section">

        <div className="container">

          {/* TOP */}
          <div className="startup-portfolio-top">

            <div className="portfolio-mini-title">

              <span id="sub-heading">OUR PORTFOLIO</span>

            </div>

            <h2 id="title">
              Startup Projects &
              <br />
              Success Stories
            </h2>

          </div>

          {/* CAROUSEL */}
          <div
            id="portfolioCarousel"
            className="carousel slide"
            data-bs-ride="carousel"
            data-bs-interval="3000"
          >

            <div className="carousel-inner">

              {portfolioData.map((item, index) => (
                <div
                  className={`carousel-item ${index === 0 ? "active" : ""
                    }`}
                  key={index}
                >

                  {/* IMAGE ROW */}
                  <div className="portfolio-images-row">

                    {/* LEFT IMAGE */}
                    <div className="portfolio-small-image">
                      <img
                        src={
                          portfolioData[
                            (index - 2 + portfolioData.length) %
                            portfolioData.length
                          ].image
                        }
                        alt=""
                      />
                    </div>

                    {/* LEFT IMAGE */}
                    <div className="portfolio-small-image">
                      <img
                        src={
                          portfolioData[
                            (index - 1 + portfolioData.length) %
                            portfolioData.length
                          ].image
                        }
                        alt=""
                      />
                    </div>

                    {/* ACTIVE CENTER IMAGE */}
                    <div className="portfolio-small-image active-image">
                      <img src={item.image} alt="" />
                    </div>

                    {/* RIGHT IMAGE */}
                    <div className="portfolio-small-image">
                      <img
                        src={
                          portfolioData[
                            (index + 1) % portfolioData.length
                          ].image
                        }
                        alt=""
                      />
                    </div>

                    {/* RIGHT IMAGE */}
                    <div className="portfolio-small-image">
                      <img
                        src={
                          portfolioData[
                            (index + 2) % portfolioData.length
                          ].image
                        }
                        alt=""
                      />
                    </div>

                  </div>

                  {/* CONTENT */}
                  <div className="portfolio-main-content">

                    <h3>{item.title}</h3>

                    <span>{item.tech}</span>

                    <p>{item.desc}</p>

                    {/* STARS */}
                    <div className="portfolio-stars">

                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>

                    </div>

                  </div>

                </div>
              ))}

            </div>

            {/* BUTTONS */}

            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#portfolioCarousel"
              data-bs-slide="prev"
            >
              <i className="bi bi-arrow-left"></i>
            </button>

            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#portfolioCarousel"
              data-bs-slide="next"
            >
              <i className="bi bi-arrow-right"></i>
            </button>

          </div>

        </div>

      </section>
      <section className="startup-faq-section">

        <div className="container">

          <div className="row align-items-start">

            {/* LEFT SIDE */}
            <div className="col-lg-6">

              <div className="startup-faq-left">

                {/* MINI TITLE */}
                <div className="startup-faq-mini">

                  <span id="sub-heading">Startup FAQ</span>

                </div>

                {/* TITLE */}
                <h2 id="title ">
                  We help startups
                  <br />
                  build scalable
                  <br />
                  digital products
                </h2>

                {/* IMAGES */}
                <div className="startup-faq-images">

                  <div className="startup-faq-image">
                    <img
                      src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop"
                      alt=""
                    />
                  </div>

                  <div className="startup-faq-image">
                    <img
                      src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop"
                      alt=""
                    />
                  </div>

                </div>

                {/* FEATURE */}
                <div className="startup-feature-box">

                  <div className="startup-feature-icon">
                    <i className="bi bi-display"></i>
                  </div>

                  <div className="startup-feature-content">

                    <h4>Modern UI/UX Design</h4>

                    <p>
                      We create startup-focused digital experiences
                      with scalable and modern user interface systems.
                    </p>

                  </div>

                </div>

                {/* FEATURE */}
                <div className="startup-feature-box border-0">

                  <div className="startup-feature-icon">
                    <i className="bi bi-code-slash"></i>
                  </div>

                  <div className="startup-feature-content">

                    <h4>Startup Development</h4>

                    <p>
                      Fast and reliable product development process
                      designed specifically for startup businesses.
                    </p>

                  </div>

                </div>

              </div>

            </div>

            {/* RIGHT SIDE */}
            <div className="col-lg-6">

              <div className="startup-faq-right">

                <p className="startup-faq-desc">
                  We provide complete startup support including MVP
                  development, UI/UX design, product scaling, and
                  long-term technical maintenance solutions.
                </p>

                {/* ACCORDION */}
                <div
                  className="accordion startup-accordion"
                  id="startupAccordion"
                >

                  {/* ITEM */}
                  <div className="accordion-item">

                    <h2 className="accordion-header">

                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#faq1"
                      >
                        How long does MVP development take?
                      </button>

                    </h2>

                    <div
                      id="faq1"
                      className="accordion-collapse collapse show"
                      data-bs-parent="#startupAccordion"
                    >

                      <div className="accordion-body">

                        MVP development usually takes between 4 to 12
                        weeks depending on project complexity, features,
                        and startup requirements.

                      </div>

                    </div>

                  </div>

                  {/* ITEM */}
                  <div className="accordion-item">

                    <h2 className="accordion-header">

                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#faq2"
                      >
                        Do you provide post-launch support?
                      </button>

                    </h2>

                    <div
                      id="faq2"
                      className="accordion-collapse collapse"
                      data-bs-parent="#startupAccordion"
                    >

                      <div className="accordion-body">

                        Yes, we provide continuous technical support,
                        updates, maintenance, and performance monitoring.

                      </div>

                    </div>

                  </div>

                  {/* ITEM */}
                  <div className="accordion-item">

                    <h2 className="accordion-header">

                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#faq3"
                      >
                        Can you help with UI/UX design?
                      </button>

                    </h2>

                    <div
                      id="faq3"
                      className="accordion-collapse collapse"
                      data-bs-parent="#startupAccordion"
                    >

                      <div className="accordion-body">

                        Absolutely. We design modern, responsive,
                        startup-focused UI/UX systems for web and mobile apps.

                      </div>

                    </div>

                  </div>

                  {/* ITEM */}
                  <div className="accordion-item">

                    <h2 className="accordion-header">

                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#faq4"
                      >
                        Do you work with early-stage startups?
                      </button>

                    </h2>

                    <div
                      id="faq4"
                      className="accordion-collapse collapse"
                      data-bs-parent="#startupAccordion"
                    >

                      <div className="accordion-body">

                        Yes, we specialize in helping early-stage startups
                        validate ideas and launch scalable digital products.

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>
      <section className="startup-cta-section">

        <div className="container">

          <div className="row g-4 align-items-stretch">

            {/* LEFT CARD */}
            <div className="col-lg-6">

              <div className="startup-cta-card startup-cta-left">

                <div className="startup-cta-content">

                  <h2>
                    Ready to Build
                    <br />
                    Your Startup?
                  </h2>

                  <p>
                    Let’s turn your vision into a powerful
                    digital product.
                  </p>

                  <button className="startup-cta-btn">
                    Book Free Consultation
                  </button>

                </div>

              </div>

            </div>

            {/* RIGHT CARD */}
            <div className="col-lg-6">

              <div className="startup-cta-card startup-cta-right">

                <div className="startup-cta-overlay"></div>

                <div className="startup-cta-content">

                  <h2>
                    Need quick help?
                    <br />
                    Contact us now
                  </h2>

                  <a
                    href="/contact"
                    className="startup-contact-btn"
                  >
                    Contact Us
                  </a>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

    </>
  );
}