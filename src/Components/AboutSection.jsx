import { useEffect } from "react";
import { Bot, Boxes, Code2, Rocket } from "lucide-react";
import '../index.css';
import '../assets/css/AboutSection.css';
import CountUp from "./CountUp";

export default function AboutSection() {

    useEffect(() => {
        const elements = document.querySelectorAll(".reveal");

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("active");
                    }
                });
            },
            { threshold: 0.2 }
        );

        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <section className="about-section about-v2 container">
            <div className="row">

                {/* LEFT */}
                <div className="col-lg-6 col-12 reveal">
                    <div className="about-left reveal">
                        <div className="about-left-inner">

                            <div className="about-left-top custom-image-layout">

                                <div className="about-left-main-img">
                                    <img src="/images/about-main-image.png" alt="" />
                                </div>

                                <div className="about-left-secondary-img">
                                    <img src="/images/software-developement-training.png" alt="Software development training session"  className="second-img"/>
                                </div>

                            </div>

                            {/* CENTER BOX */}
                            <div className="about-left-bottom">
                                <div className="about-left-bottom-inner about-item--flexnw">

                                    <div className="about-third--image">
                                        <img src="images/about-third-image.png" alt="" />
                                    </div>

                                    <div className="about-counter--holder">
                                        <div className="about-counter--bnumber">
                                            <CountUp to={2200} suffix="+" />
                                        </div>
                                        <div className="about-counter--btitle">
                                            Satisfied Clients
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* RIGHT */}
                <div className="col-lg-6 col-12 ab-2 reveal">

                    <span className="about" id="sub-heading">Who we are</span>

                    <h2 className="section-title text-center" id="title">
                        Innovating Ideas Into Smart Solutions
                    </h2>

                    <div className="about-video-wrapper">
                        <iframe
                            src="https://www.youtube.com/embed/1adzVmNh078"
                            title="Projenius Introduction"
                            frameBorder="0"
                            allowFullScreen
                        ></iframe>
                    </div>

                    <ul className="icon-list icon-list--grid">

                        <li className="list">
                            <span className="about-feature-icon icon-software">
                                <Code2 size={24} strokeWidth={2.2} />
                            </span>
                            <span>Innovative Software & AI Solutions</span>
                        </li>

                        <li className="list">
                            <span className="about-feature-icon icon-iot">
                                <Bot size={24} strokeWidth={2.2} />
                            </span>
                            <span>Smart IoT & Product Development</span>
                        </li>

                        <li className="list">
                            <span className="about-feature-icon icon-training">
                                <Boxes size={24} strokeWidth={2.2} />
                            </span>
                            <span>Training, Workshops & Mentorship</span>
                        </li>

                        <li className="list">
                            <span className="about-feature-icon icon-impact">
                                <Rocket size={24} strokeWidth={2.2} />
                            </span>
                            <span>Practical Technology for Real-World Impact</span>
                        </li>

                    </ul>

                </div>

            </div>
        </section>
        
    );
}
