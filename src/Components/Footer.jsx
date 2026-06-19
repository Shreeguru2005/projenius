import { Link } from "react-router-dom";
import { useState } from "react";
import "../assets/css/Footer.css";
import "../assets/css/Floating.css";
import ChatBot from "./ChatBot";

const Arrow = () => (
    <span className="footer-arrow">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
    </span>
);

export default function Footer() {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("");

    const handleNewsletterSubmit = async (event) => {
        event.preventDefault();
        setStatus("Subscribing...");

        try {
            const response = await fetch(`${API_BASE_URL}/api/newsletter/subscribe`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Subscription failed.");
            }

            setEmail("");
            setStatus(data.alreadySubscribed ? "Already subscribed." : "Subscribed successfully.");
        } catch (error) {
            setStatus(error.message || "Subscription failed.");
        }
    };

    return (
        <>
            <footer className="main-footer">
                <div className="footer-container">
                    
                    {/* TOP BAR */}
                    <div className="footer-topbar">
                        <div className="footer-call">
                            <div className="footer-call-icon">
                                <i className="bi bi-telephone-fill"></i>
                            </div>
                            <div>
                                <div className="footer-small-title">Give us a call</div>
                                <div className="footer-phone">+91 90254 76322</div>
                            </div>
                        </div>

                        <div className="footer-newsletter">
                            <div className="footer-news-text">
                                <span className="footer-news-text-light">Join</span>{" "}
                                <span className="footer-news-text-bold">Newsletter</span>
                            </div>
                            <form className="footer-news-form" onSubmit={handleNewsletterSubmit}>
                                <input
                                    required
                                    type="email"
                                    placeholder="Your email address"
                                    className="footer-input"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                />
                                <button className="footer-submit-btn">
                                    Subscribe
                                </button>
                            </form>
                            {status && <small className="footer-news-status">{status}</small>}
                        </div>
                    </div>

                    {/* MAIN FOOTER GRID */}
                    <div className="footer-main-grid">
                        
                        {/* BRAND */}
                        <div className="footer-col brand-col">
                            <div className="footer-logo-wrap">
                                <img
                                    src="images/projenius-logo.webp"
                                    alt="ProJenius"
                                    className="footer-logo"
                                />
                            </div>
                            <p className="footer-description">
                                Improve efficiency and provide a better customer experience with modern technology services tailored for your success.
                            </p>
                            <div className="footer-socials">
                                <a href="https://wa.me/919025476322?text=Hello%20I%20want%20to%20know%20more%20about%20your%20services" target="_blank" rel="noreferrer" className="footer-social whatsapp">
                                    <i className="bi bi-whatsapp"></i>
                                </a>
                                <a href="https://instagram.com/projenius_" target="_blank" rel="noreferrer" className="footer-social instagram">
                                    <i className="bi bi-instagram"></i>
                                </a>
                                <a href="https://www.facebook.com/profile.php?id=61560720950335&sk=followers" target="_blank" rel="noreferrer" className="footer-social facebook">
                                    <i className="bi bi-facebook"></i>
                                </a>
                                <a href="https://www.linkedin.com/in/projenius-498444374/" target="_blank" rel="noreferrer" className="footer-social linkedin">
                                    <i className="bi bi-linkedin"></i>
                                </a>
                            </div>
                        </div>

                        {/* QUICK LINKS */}
                        <div className="footer-col links-col">
                            <h4 className="footer-column-title">Quick Links</h4>
                            <ul className="footer-links">
                                <li><Link to="/" className="footer-link"><Arrow />Home</Link></li>
                                <li><Link to="/about" className="footer-link"><Arrow />About</Link></li>
                                <li><Link to="/courses" className="footer-link"><Arrow />Courses</Link></li>
                                <li><Link to="/internship" className="footer-link"><Arrow />Internship</Link></li>
                                <li><Link to="/workshop" className="footer-link"><Arrow />Workshop</Link></li>
                                <li><Link to="/startup" className="footer-link"><Arrow />Startup Supporter</Link></li>
                                <li><Link to="/contact" className="footer-link"><Arrow />Contact</Link></li>
                            </ul>
                        </div>

                        {/* CONTACT */}
                        <div className="footer-col contact-col">
                            <h4 className="footer-column-title">Contact</h4>
                            <div className="footer-contact-wrap">
                                <div className="footer-contact-item">
                                    <div className="footer-contact-icon">
                                        <i className="bi bi-geo-alt-fill"></i>
                                    </div>
                                    <div className="footer-contact-text">
                                        Plot No 3, Erikarai St, Velmurugan Nagar, Namachivaya Nagar, Madurai, Tamil Nadu 625003
                                    </div>
                                </div>
                                <div className="footer-contact-item">
                                    <div className="footer-contact-icon">
                                        <i className="bi bi-envelope-fill"></i>
                                    </div>
                                    <div className="footer-contact-text">
                                        <a href="mailto:teamprojenius2025@gmail.com">teamprojenius2025@gmail.com</a> 
                                    </div>
                                </div>
                                <div className="footer-contact-item">
                                    <div className="footer-contact-icon">
                                        <i className="bi bi-telephone-fill"></i>
                                    </div>
                                    <div className="footer-contact-text">
                                        <a href="tel:+91 90254 76322">+91 90254 76322</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* FIND US */}
                        <div className="footer-col map-col">
                            <h4 className="footer-column-title">Find Us</h4>
                            <div className="footer-map-wrap">
                                <div className="footer-map">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3930.2433611788306!2d78.08760837503!3d9.91367849018737!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00cfb5c8f13bb3%3A0xc245f4db34baf398!2sProJenius%20Innovation%20Technology%20Private%20Limited!5e0!3m2!1sen!2sin!4v1778601496079!5m2!1sen!2sin"
                                        width="100%"
                                        height="150"
                                        style={{ border: 0 }}
                                        allowFullScreen=""
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="Google Map"
                                    ></iframe>
                                </div>
                                <div className="footer-map-address">
                                    <p>HQ: Velmurugan Nagar, Madurai</p>
                                </div>
                                <a 
                                    href="https://maps.google.com/?q=ProJenius+Innovation+Technology+Private+Limited" 
                                    target="_blank" 
                                    rel="noreferrer" 
                                    className="btn-get-directions"
                                >
                                    Get Directions <i className="bi bi-arrow-right"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* BOTTOM BAR */}
                    <div className="footer-bottom">
                        <div className="footer-copy">
                            © Copyright 2026 ProJenius. All rights reserved.
                        </div>
                        <div className="footer-bottom-links">
                            <Link to="/privacy-policy">Privacy Policy</Link>
                            <Link to="/terms-conditions">Terms & Conditions</Link>
                        </div>
                    </div>
                    
                </div>
            </footer>
            
            <ChatBot />
        </>
    );
}
