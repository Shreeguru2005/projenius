import React, { useState, useEffect } from "react";
import "../assets/css/ProductSection.css";
import AOS from "aos";
import "aos/dist/aos.css";



const tabsData = [
  {
    title: "AI-Powered Nut Sorting & Grading System",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978",
    description:
      "Creative marketing strategies to improve online visibility.",
  },
  {
    title: "IoT Kit",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995",
    description:
      "Smart AI-powered systems for automation and business growth.",
  },  
  {
    title: "EduTech Platform",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    description:
      "Modern responsive websites with premium UI and smooth performance.",
  },
  
];

const ProductSection = () => {
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
  AOS.init({
    duration: 1000,
  once: true,
  offset: 80,
  easing: "ease-in-out",
  });
}, []);

  return (
    <section className="tabs-section">
      <div className="container">
        <div className="heading">
          <span id="sub-heading" data-aos="fade-up" data-aos-delay="150">Our Product</span>
          <h2 id="title" data-aos="fade-up" data-aos-delay="200">Innovative Products for Smart Future</h2>
          <p data-aos="fade-up" data-aos-delay="250">Explore our range of innovative solutions designed to empower your business.</p>
        </div>
        <div className="tabs-header" data-aos="fade-up"
              data-aos-delay='300'>
          {tabsData.map((tab, index) => (
            <button
              key={index}
              className={activeTab === index ? "tab-btn active" : "tab-btn"}
              onClick={() => setActiveTab(index)}
              
            >
              {tab.title}
            </button>
          ))}
        </div>

        <div className="tabs-content">
          <div className="tabs-image">
            <img
              src={tabsData[activeTab].image}
              alt={tabsData[activeTab].title}
              data-aos="fade-right"
              data-aos-delay='400'
            />
          </div>

          <div className="tabs-text" data-aos="fade-left" data-aos-delay='450'>
            <h2>{tabsData[activeTab].title}</h2>
            <p>{tabsData[activeTab].description}</p>

            <button className="explore-btn">Explore More</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;