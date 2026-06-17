import React, { useEffect } from "react";
import "../assets/css/TestimonialSection.css";
import "../index.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import AOS from "aos";
import "aos/dist/aos.css";

const googleReviewsData = [
  {
    id: 1,
    name: "Kanniappan C",
    role: "Client",
    review: "“Projenius provided a very good learning experience. The course content was well-structured and easy to understand, even for beginners. The explanations and practical examples helped me gain a clear understanding of the concepts.”",
    color: "#0ea5e9"
  },
  {
    id: 2,
    name: "MATHAN KUMAR",
    role: "Client",
    review: "“Just came across this amazing page that provides solutions for final year projects, and honestly, I’m impressed! The quality of work is top-notch, well-structured, and clearly shows deep understanding of the concepts.”",
    color: "#eab308"
  },
  {
    id: 3,
    name: "Sowbharnika Srinivasan",
    role: "Client",
    review: "“I had a good and positive experience. The support and guidance provided during my project were really helpful and made things much clearer and easier to improve on. I’m thankful for the assistance.”",
    color: "#8b5cf6"
  },
  {
    id: 4,
    name: "Harshini 33",
    role: "Client",
    review: "“Projenius is not just a service provider; they’re a problem-solving partner. If you’re a student looking to bring a project to life, or a startup aiming to build scalable tech solutions, Projenius is a reliable choice.”",
    color: "#f43f5e"
  },
  {
    id: 5,
    name: "Dhivena Dharshana",
    role: "Client",
    review: "“I asked Projenius Freelancing to create a website for me, and they did an excellent job. The design is neat, user-friendly, and exactly what I wanted. They were very supportive and delivered everything on time.”",
    color: "#10b981"
  },
  {
    id: 6,
    name: "Suba Dhayalan",
    role: "Client",
    review: "“A trust worthy place where you can build your skills and future in a friendly and coexisting environment.”",
    color: "#3b82f6"
  },
  {
    id: 7,
    name: "Keerthana Seenivasagan",
    role: "Intern",
    review: "“I had a great experience during my internship. The environment was supportive, and I had the opportunity to learn practical skills. The mentors were friendly and provided valuable guidance throughout the internship.”",
    color: "#f59e0b"
  },
  {
    id: 8,
    name: "Aariyan Siddharth",
    role: "Video Editing Intern",
    review: "“I've been there as a video editing intern, wholesome experience, sweet bosses, happy time.”",
    color: "#6366f1"
  },
  {
    id: 9,
    name: "NAvAJITH SENTHILKUMAR",
    role: "Intern",
    review: "“Currently I'm working here as an intern and having a great experience over here. Truly a great atmosphere to work and learn ✨”",
    color: "#ec4899"
  },
  {
    id: 10,
    name: "SWATI A S",
    role: "EC Student",
    review: "“Such a hardworking team, not just working, but constantly building innovations. Keep rocking and continue your amazing service 💫💫”",
    color: "#14b8a6"
  },
  {
    id: 11,
    name: "Aruna Sree N",
    role: "Client",
    review: "“I had a very positive experience with ProJenius. The project was delivered on time with great attention to detail. The team was highly professional, responsive, and ensured everything was handled efficiently. Their commitment to deadlines is truly commendable.”",
    color: "#0f766e"
  },
  {
    id: 12,
    name: "Hari Haran",
    role: "Client",
    review: "“Met deadlines without exceeding my budget, had accountability. Best wishes for your future ventures.”",
    color: "#64748b"
  },
  {
    id: 13,
    name: "Malar Abinaya",
    role: "Client",
    review: "“Good service and friendly team. Had a nice experience 👍”",
    color: "#84cc16"
  },
  {
    id: 14,
    name: "vishnu lax",
    role: "Client",
    review: "“A very good team to work with, and a bunch of energetic and enthusiastic folks, too!”",
    color: "#a855f7"
  },
  {
    id: 15,
    name: "Nivas Kumar",
    role: "Client",
    review: "“ProJenius is the best place for IoT and Web Development training in Madurai. I gained real-time project experience and excellent mentorship. Highly recommended for students looking for internships and practical learning.”",
    color: "#d946ef"
  }
];

export default function TestimonialSection() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 80,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <section className="testimonial-section">
      <div className="container">
        <div className="testimonial-wrapper">

          {/* LEFT CONTENT */}

          <div
            className="testimonial-left"
            data-aos="fade-right"
            data-aos-delay="150"
          >
            <Swiper
              modules={[Navigation, Autoplay, EffectFade]}
              effect="fade"
              fadeEffect={{ crossFade: true }}
              spaceBetween={30}
              slidesPerView={1}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              loop={true}
              className="testimonial-swiper"
            >
              {googleReviewsData.map((review) => (
                <SwiperSlide key={review.id}>
                  
                  {/* GOOGLE REVIEW BADGE */}
                  <div className="google-review-badge">
                    <span className="google-text">Google</span>
                    <div className="stars">
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                    </div>
                  </div>

                  {/* REVIEW TEXT */}
                  <p className="testimonial-text">{review.review}</p>

                  <div className="testimonial-line"></div>

                  {/* CLIENT INFO */}
                  <div className="client-info">
                    <div className="client-image" style={{ backgroundColor: review.color }}>
                      <span>{review.name.charAt(0).toUpperCase()}</span>
                    </div>
                    
                    <div className="client-details">
                      <h4>{review.name}</h4>
                      <span>{review.role}</span>
                    </div>
                  </div>

                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* RIGHT IMAGE */}

          <div
            className="testimonial-right"
            data-aos="fade-left"
            data-aos-delay="300"
          >

            <div className="quote-icon">
              <i className="bi bi-quote"></i>
            </div>

            <img
              src="https://pngimg.com/uploads/businessman/businessman_PNG6564.png"
              alt="Businessman"
            />

          </div>

        </div>
      </div>
    </section>
  );
}