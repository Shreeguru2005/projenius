import React from "react";
import "../index.css";
import "../assets/css/Service-page.css";

export default function Services() {
  const developmentServices = [
    {
      title: "Website Development",
      icon: "bi bi-window-stack icon",
      desc:
        "Responsive business websites with fast loading pages, clear navigation, SEO-friendly structure, and polished visual design.",
    },
    {
      title: "Web App Development",
      icon: "bi bi-code-square icon",
      desc:
        "Custom web applications with dashboards, user flows, forms, APIs, admin panels, and scalable frontend architecture.",
    },
    {
      title: "Mobile App Development",
      icon: "bi bi-phone icon",
      desc:
        "Mobile-first app experiences for Android and cross-platform use cases with clean screens and practical feature flows.",
    },
    {
      title: "E-Commerce Solutions",
      icon: "bi bi-cart-check icon",
      desc:
        "Online stores with product catalogs, enquiry flows, payment-ready structure, order management, and conversion-focused pages.",
    },
    {
      title: "UI / UX for Products",
      icon: "bi bi-palette icon",
      desc:
        "Wireframes, prototypes, design systems, and interface improvements that make products easier to understand and use.",
    },
    {
      title: "Product Maintenance",
      icon: "bi bi-tools icon",
      desc:
        "Ongoing updates, bug fixes, performance improvements, feature additions, and technical support after launch.",
    },
  ];

  return (
    <>
      <section className="header-wrap" style={{backgroundImage:'linear-gradient(#1219299c), url(/images/projenius-banner.webp)'}}>
        <div className="container title-section">
          <h1 className="page-title">Development</h1>
        </div>
      </section>

      <section className="service-1 container">
        <div className="section-heading text-center">
          <span id="sub-heading">Development Services</span>
          <h2 id="title">Build Digital Products That Work Smoothly</h2>
        </div>

        <div className="row">
          {developmentServices.map((service, index) => (
            <div className="col-lg-3 col-md-6 col-12" key={index}>
              <div className="box">
                <div className={`icon-circle ${index % 2 === 1 ? "even" : ""}`}>
                  <i className={service.icon}></i>
                </div>
                <h4 className="box-title text-center">{service.title}</h4>
                <p className="box-desc text-center">{service.desc}</p>
                {service.link && (
                  <a href={service.link} className="service-link">
                    View Details
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
