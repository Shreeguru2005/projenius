import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollStack, { ScrollStackItem } from "../Components/scrollstack";

gsap.registerPlugin(useGSAP, ScrollTrigger);
import "../index.css";
import "../assets/css/Service-page.css";
import "../assets/css/CareerGuidance.css";
import CountUp from "../Components/CountUp";

const guidanceCards = [
  {
    title: "Career Roadmap Planning",
    icon: "bi bi-signpost-split",
    image: "/images/cg-card-roadmap.jpg",
    desc: "Walk away with a clear, step-by-step learning roadmap tailored to your skills and target role.",
    colorClass: "accent-blue",
  },
  {
    title: "Resume Building",
    icon: "bi bi-file-earmark-person",
    image: "/images/cg-card-resume.jpg",
    desc: "Transform your resume from generic to job-ready by highlighting exactly what recruiters want to see.",
    colorClass: "accent-amber",
  },
  {
    title: "Interview Preparation",
    icon: "bi bi-chat-square-text",
    image: "/images/cg-card-interview.jpg",
    desc: "Gain confidence with mock interviews, technical problem-solving, and HR round strategies.",
    colorClass: "accent-teal",
  },
  {
    title: "LinkedIn Optimization",
    icon: "bi bi-linkedin",
    image: "/images/cg-card-linkedin.jpg",
    desc: "Build a professional profile that ranks higher in recruiter searches and attracts the right connections.",
    colorClass: "accent-blue",
  },
  {
    title: "Project Portfolio Support",
    icon: "bi bi-kanban",
    image: "/images/cg-card-portfolio.jpg",
    desc: "Develop and showcase practical projects that prove your real-world problem-solving abilities.",
    colorClass: "accent-amber",
  },
  {
    title: "Placement Guidance",
    icon: "bi bi-briefcase",
    image: "/images/cg-card-placement.jpg",
    desc: "Navigate job applications, referrals, and negotiations with end-to-end placement support.",
    colorClass: "accent-teal",
  },
];

const deliverables = [
  { text: "[TODO: A personalized career roadmap document (PDF)]", icon: "bi bi-file-earmark-pdf" },
  { text: "[TODO: An ATS-optimized resume reviewed line-by-line]", icon: "bi bi-file-person" },
  { text: "[TODO: 2 live mock interview sessions with recorded feedback]", icon: "bi bi-camera-video" },
  { text: "[TODO: A LinkedIn audit report with before/after recommendations]", icon: "bi bi-linkedin" },
  { text: "[TODO: A portfolio review checklist for your projects]", icon: "bi bi-check2-square" },
];

const logistics = [
  { label: "Format", value: "[TODO: 1:1 & Small Group]", icon: "bi bi-people" },
  { label: "Duration", value: "[TODO: 4–6 weeks + async support]", icon: "bi bi-calendar3" },
  { label: "Mode", value: "[TODO: Live Calls + WhatsApp]", icon: "bi bi-laptop" },
  { label: "Commitment", value: "[TODO: 2-3 hours/week]", icon: "bi bi-clock" },
];

const guidanceSteps = [
  { title: "Profile Review", desc: "We evaluate your current background and skills.", icon: "bi bi-search", colorHex: "#0284c7", hoverBg: "#e0f2fe" },
  { title: "Goal Discussion", desc: "We align your interests with real industry roles.", icon: "bi bi-bullseye", colorHex: "#d97706", hoverBg: "#fef3c7" },
  { title: "Skill Gap Analysis", desc: "We flag exactly what's missing for your target job.", icon: "bi bi-bar-chart-steps", colorHex: "#0f766e", hoverBg: "#ccfbf1" },
  { title: "Roadmap Creation", desc: "You receive a clear, actionable learning timeline.", icon: "bi bi-compass", colorHex: "#0284c7", hoverBg: "#e0f2fe" },
  { title: "Resume & Prep", desc: "We refine your materials and practice interviews.", icon: "bi bi-file-earmark-text", colorHex: "#d97706", hoverBg: "#fef3c7" },
  { title: "Placement Support", desc: "We guide you through applications and hiring.", icon: "bi bi-briefcase", colorHex: "#0f766e", hoverBg: "#ccfbf1" },
];

const mentors = [
  { name: "[TODO: Mentor 1]", role: "[TODO: Senior SDE @ Tech Corp]", detail: "[TODO: 5 years exp, reviewed 200+ resumes]", link: "#" },
  { name: "[TODO: Mentor 2]", role: "[TODO: Data Scientist @ Startup]", detail: "[TODO: Mentored 50+ students in AI/ML]", link: "#" },
  { name: "[TODO: Mentor 3]", role: "[TODO: UX Lead @ Agency]", detail: "[TODO: 4 years exp, placed 30+ designers]", link: "#" },
];

const comparisonData = [
  { feature: "Personalized to your background", featureIcon: "bi bi-bullseye", self: 'none', course: 'none', us: 'full' },
  { feature: "Live human feedback", featureIcon: "bi bi-chat-dots", self: 'none', course: 'none', us: 'full' },
  { feature: "Accountability & deadlines", featureIcon: "bi bi-calendar-check", self: 'partial', course: 'none', us: 'full' },
  { feature: "Resume reviewed by a real person", featureIcon: "bi bi-file-earmark-text", self: 'none', course: 'none', us: 'full' },
  { feature: "Direct placement support", featureIcon: "bi bi-briefcase", self: 'none', course: 'none', us: 'full' },
  { feature: "Access to a mentor for questions", featureIcon: "bi bi-headset", self: 'none', course: 'partial', us: 'full' },
];

const faqs = [
  { q: "Is the first career call really free?", a: "Yes, your initial 30-minute consultation is completely free with no obligation to sign up." },
  { q: "Who is this mentorship program for?", a: "Engineering students, freshers, and early-career professionals looking to break into tech roles like AI/ML, Full-Stack, and Data Science." },
  { q: "How long does the mentorship last?", a: "It depends on your goals. Some students need a quick 4-week prep, while others opt for a 3-month comprehensive journey." },
  { q: "Do you provide a job guarantee?", a: "While we do not give fake 100% job guarantees, we provide the exact preparation, referrals, and placement support that significantly boost your chances of getting hired." },
];

const successStories = [
  { name: "[TODO: Student Name]", detail: "[TODO: College / Branch]", outcome: "[TODO: Got shortlisted at 3 companies after resume rebuild]", rating: 5, avatar: "JD" },
  { name: "[TODO: Student Name]", detail: "[TODO: College / Branch]", outcome: "[TODO: Cleared technical interview for a Software Developer role]", rating: 5, avatar: "AS" },
];

export default function CareerGuidance() {
  const [showFaq, setShowFaq] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeStep, setActiveStep] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('2:30 PM');
  const [availableDates, setAvailableDates] = useState([]);
  const targetRef = useRef(null);
  const circleContainerRef = useRef(null);
  const ringRef = useRef(null);
  const nodesRef = useRef([]);
  const tableRef = useRef(null);

  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });
  
  // Parallax background moving at 30% speed
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  useEffect(() => {
    const generateDates = () => {
      let dates = [];
      let d = new Date();
      while (dates.length < 5) {
        d.setDate(d.getDate() + 1);
        if (d.getDay() !== 0 && d.getDay() !== 6) {
          dates.push({
            dateObj: new Date(d),
            dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
            dateNum: d.getDate().toString()
          });
        }
      }
      return dates;
    };
    const dates = generateDates();
    setAvailableDates(dates);
    if(dates.length > 0) setSelectedDate(dates[0].dateNum);

    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useGSAP(() => {
    if (shouldReduceMotion) return;

    // SVG Ring Drawing Animation
    gsap.fromTo(ringRef.current, 
      { strokeDasharray: "1383", strokeDashoffset: "1383" }, 
      { 
        strokeDashoffset: 0, 
        duration: 1.2, 
        ease: "power2.out",
        scrollTrigger: {
          trigger: circleContainerRef.current,
          start: "top 75%",
        }
      }
    );

    // Nodes Pop-in Animation
    gsap.set(nodesRef.current, { scale: 0 });
    
    gsap.to(nodesRef.current, {
      scale: 1,
      rotation: (i) => (i % 2 === 0 ? 8 : -8),
      ease: "back.out(1.5)",
      stagger: { each: 0.12, amount: 0.5 },
      scrollTrigger: {
        trigger: circleContainerRef.current,
        start: "top 75%",
      },
      onComplete: () => {
         gsap.to(nodesRef.current, { rotation: 0, duration: 0.3, ease: "power1.inOut" });
      }
    });

    // Table Animation
    if (tableRef.current) {
      const rows = tableRef.current.querySelectorAll('.cg-table-row, .cg-mobile-feature-card');
      const icons = tableRef.current.querySelectorAll('.status-icon');
      
      gsap.fromTo(rows, 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, y: 0, 
          duration: 0.5, 
          stagger: 0.1, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: tableRef.current,
            start: "top 80%",
          }
        }
      );

      gsap.fromTo(icons,
        { scale: 0 },
        {
          scale: 1,
          duration: 0.4,
          stagger: 0.05,
          ease: "back.out(1.5)",
          delay: 0.2, // slight delay after row fade in
          scrollTrigger: {
            trigger: tableRef.current,
            start: "top 80%",
          }
        }
      );
    }
  }, { scope: targetRef });

  const renderStatusIcon = (status) => {
    if (status === 'full') return <i className="bi bi-check-circle-fill status-icon icon-full" aria-label="Yes"></i>;
    if (status === 'partial') return <i className="bi bi-dash-circle status-icon icon-partial" aria-label="Partial"></i>;
    return <i className="bi bi-x status-icon icon-none" aria-label="No"></i>;
  };

  // Toggle functions removed as we are using inline toggle for grid

  const handleBookingClick = (e) => {
    e.preventDefault();
    const text = encodeURIComponent(`Hello ProJenius, I am interested in the career call. I would like to book a session on ${selectedDate}th at ${selectedTime}.`);
    window.open(`https://wa.me/919025476322?text=${text}`, "_blank");
  };

  return (
    <>
      <section className="header-wrap career-hero" style={{backgroundImage:'linear-gradient(rgba(10, 14, 26, 0.9), rgba(10, 14, 26, 0.9)), url(/images/about-main-image.png)'}}>
        <div className="container title-section text-center">
          <h1 className="page-title">Career Guidance</h1>
          <p className="hero-subheadline">From confused fresher to job-ready candidate — with a mentor guiding every step.</p>
        </div>
      </section>

      {/* Book a Call Section */}
      <section id="book-call" className="book-call-section section-padding" style={{ backgroundColor: '#f0fdf4' }}>
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6" data-aos="fade-right">
              <h2 className="book-call-headline text-dark fw-bold">A Small Fee. A Serious Conversation.</h2>
              <p className="text-muted small fw-bold mb-3"><i className="bi bi-people-fill text-primary me-1"></i> Trusted by 500+ students so far</p>
              <p className="book-call-subheadline text-muted mt-2">
                Why ₹99, not free? A nominal fee filters for students who are genuinely serious, allowing our mentors to give their full, undistracted attention rather than rushing through high-volume, low-commitment calls.
              </p>
              
              <div className="book-call-deliverables mt-4">
                <p className="fw-bold mb-3 text-dark">What's included in your session:</p>
                <ul className="list-unstyled">
                  <li className="mb-2"><i className="bi bi-check-circle-fill text-primary me-2"></i> A real assessment of your current resume/profile against your target role</li>
                  <li className="mb-2"><i className="bi bi-check-circle-fill text-primary me-2"></i> A personalized first-draft roadmap you keep regardless of whether you continue with ProJenius</li>
                  <li className="mb-2"><i className="bi bi-check-circle-fill text-primary me-2"></i> Direct, honest feedback on your biggest current gap</li>
                  <li className="mb-2"><i className="bi bi-check-circle-fill text-primary me-2"></i> A clear recommendation on next steps — including telling you honestly if ProJenius isn't the right fit for you</li>
                </ul>
              </div>

              <div className="book-call-chips-row mt-4 mb-4 d-flex flex-wrap gap-2">
                <span className="bc-chip-solid"><i className="bi bi-arrow-return-left"></i> ₹99 (fully refundable if you're not satisfied) [TODO: confirm]</span>
                <span className="bc-chip-solid"><i className="bi bi-clock-fill"></i> 30 Minutes</span>
                <span className="bc-chip-solid"><i className="bi bi-person-video3"></i> 1:1 With a Real Mentor, Not a Sales Rep</span>
                <span className="bc-chip-solid"><i className="bi bi-wallet2"></i> [TODO: Credited toward program fee if enrolled]</span>
              </div>

            </div>
            
            <div className="col-lg-6" data-aos="fade-left">
              <div className="bc-widget-mockup shadow-lg" style={{ borderRadius: '24px', backgroundColor: '#fff', border: '1px solid #e2e8f0', padding: '0', display: 'flex', flexDirection: 'column' }}>
                <div className="bc-mockup-header p-4 border-bottom text-center">
                  <h4 className="fw-bold mb-0">Book a Call - ₹99</h4>
                </div>
                <div className="bc-mockup-body text-center" style={{ padding: '32px 32px 40px' }}>
                  <i className="bi bi-calendar3 bc-mockup-icon mb-3" style={{ fontSize: '3rem', color: '#cbd5e1' }}></i>
                  <h5>Select a Date & Time</h5>
                  <p className="text-muted small mb-4">[TODO: connect actual booking tool e.g., Calendly]</p>
                  <div className="bc-mockup-calendar">
                    <div className="bc-cal-row">
                      {availableDates.map((d, i) => <span key={i}>{d.dayName.substring(0, 2)}</span>)}
                    </div>
                    <div className="bc-cal-row dates">
                      {availableDates.map((d, i) => (
                        <span key={i} className={selectedDate === d.dateNum ? "active" : ""} style={selectedDate === d.dateNum ? {backgroundColor: '#0ea5e9'} : {}} onClick={() => setSelectedDate(d.dateNum)}>{d.dateNum}</span>
                      ))}
                    </div>
                  </div>
                  <div className="bc-mockup-times mt-4 mb-4">
                    {['10:00 AM', '2:30 PM', '4:00 PM', '6:00 PM'].map(time => (
                      <span key={time} className={`bc-time ${selectedTime === time ? "active" : ""}`} style={selectedTime === time ? {backgroundColor: '#0ea5e9', borderColor: '#0ea5e9', color: '#fff'} : {}} onClick={() => setSelectedTime(time)}>{time}</span>
                    ))}
                  </div>
                  
                  {/* Testimonial Snippet inside flow */}
                  <div className="mb-4 text-start position-relative" style={{ background: '#f8fafc', padding: '16px 20px', borderRadius: '12px', borderLeft: '4px solid #f59e0b' }}>
                    <i className="bi bi-quote fs-4 text-muted position-absolute" style={{top: '5px', left: '10px', opacity: 0.1}}></i>
                    <p className="small mb-1 fst-italic position-relative" style={{ zIndex: 1, color: '#334155' }}>"[TODO: Insert quote from a past caller about the ₹99 session being completely worth the fee and highly clarifying.]"</p>
                    <div className="small fw-bold text-muted">- [TODO: Name]</div>
                  </div>

                  <a href="#" onClick={handleBookingClick} className="btn btn-primary-custom btn-lg w-100 shadow-sm" style={{ backgroundColor: '#0ea5e9', borderColor: '#0ea5e9' }}>Book Your Session &rarr;</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      <section ref={targetRef} id="services" className="service-1 career-guidance-section section-padding cg-parallax-section cg-dark-theme">
        {!shouldReduceMotion ? (
          <motion.div 
            className="cg-parallax-bg" 
            style={{ y: yBg, backgroundImage: "linear-gradient(rgba(15, 23, 42, 0.95), rgba(15, 23, 42, 0.95)), url(/images/cg_services_bg.png)" }}
          />
        ) : (
          <div className="cg-parallax-bg fallback-bg" style={{ backgroundImage: "linear-gradient(rgba(15, 23, 42, 0.95), rgba(15, 23, 42, 0.95)), url(/images/cg_services_bg.png)" }} />
        )}

        <div className="container relative-z">
          <div className="section-heading text-center" data-aos="fade-up">
            <span id="sub-heading">Core Services</span>
            <h2 id="title">Everything You Need to Get Hired</h2>
          </div>

          {isMobile || shouldReduceMotion ? (
            <div className="row g-4 cg-cards-grid mt-4">
              {guidanceCards.map((card) => (
                <div className="col-12" key={card.title}>
                  <div className="cg-box cg-box-layered">
                    <div className="cg-card-image-header">
                      <img src={card.image} alt={card.title} className="cg-card-image" loading="lazy" />
                      <div className={`cg-card-overlay ${card.colorClass}-overlay`}></div>
                    </div>
                    <div className={`cg-icon-circle ${card.colorClass}`}>
                      <i className={card.icon}></i>
                    </div>
                    <div className="cg-box-content">
                      <h4 className="cg-box-title text-center">{card.title}</h4>
                      <p className="cg-box-desc text-center">{card.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <ScrollStack
              useWindowScroll={true}
              itemDistance={110}
              itemScale={0.025}
              itemStackDistance={22}
              baseScale={0.9}
              rotationAmount={0.4}
              blurAmount={0}
            >
              {guidanceCards.map((card) => (
                <ScrollStackItem key={card.title} itemClassName={`cg-stack-card cg-stack-${card.colorClass}`}>
                  <div className="cg-card-image-header cg-stack-image-header">
                    <img src={card.image} alt={card.title} className="cg-card-image" loading="lazy" />
                    <div className={`cg-card-overlay ${card.colorClass}-overlay`}></div>
                  </div>
                  <div className={`cg-icon-circle ${card.colorClass} cg-stack-icon`}>
                    <i className={card.icon}></i>
                  </div>
                  <div className="cg-box-content cg-stack-content">
                    <h4 className="cg-box-title text-center">{card.title}</h4>
                    <p className="cg-box-desc text-center">{card.desc}</p>
                  </div>
                </ScrollStackItem>
              ))}
            </ScrollStack>
          )}
        </div>
      </section>

 


      <section id="process" className="career-guidance-process section-padding bg-light-alt">
        <div className="container">
          <div className="section-heading text-center" data-aos="fade-up">
            <span id="sub-heading">Guidance Process</span>
            <h2 id="title">A Practical Path for Students and Freshers</h2>
          </div>

          {/* Desktop Circular Layout (hidden on mobile) */}
          <div className="cg-circular-container d-none d-md-flex" ref={circleContainerRef}>
            <svg className="cg-circular-svg" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0284c7" />
                  <stop offset="50%" stopColor="#d97706" />
                  <stop offset="100%" stopColor="#0f766e" />
                </linearGradient>
              </defs>

              <circle cx="300" cy="300" r="220" fill="none" stroke="#e2e8f0" strokeWidth="2" />
              
              {/* Dynamic Active Arc (draws from top to activeStep) */}
              {activeStep !== null && (
                <path 
                  d={`M 300 80 A 220 220 0 ${activeStep > 2 ? 1 : 0} 1 ${300 + 220 * Math.cos(((activeStep * 60) - 90) * Math.PI / 180)} ${300 + 220 * Math.sin(((activeStep * 60) - 90) * Math.PI / 180)}`}
                  fill="none" 
                  stroke={guidanceSteps[activeStep].colorHex} 
                  strokeWidth="4"
                  strokeLinecap="round"
                  style={{ transition: 'all 0.4s ease' }}
                />
              )}

              {!shouldReduceMotion && (
                <circle 
                  ref={ringRef}
                  cx="300" cy="300" r="220" 
                  fill="none" 
                  stroke="url(#ringGrad)" 
                  strokeWidth="3"
                  strokeLinecap="round"
                  style={{ opacity: activeStep === null ? 1 : 0.3, transition: 'opacity 0.4s ease' }}
                />
              )}
            </svg>

            {guidanceSteps.map((step, index) => {
              const angle = (index * 60) - 90; // Start at top (-90 deg)
              const radians = angle * (Math.PI / 180);
              const radius = 220;
              const x = 300 + radius * Math.cos(radians);
              const y = 300 + radius * Math.sin(radians);
              
              const isHovered = activeStep === index;
              const isDimmed = activeStep !== null && activeStep !== index;

              return (
                <div 
                  className={`cg-circle-node ${isHovered ? 'active' : ''} ${isDimmed ? 'dimmed' : ''}`}
                  key={index}
                  ref={el => nodesRef.current[index] = el}
                  style={{ 
                    left: `${x}px`, top: `${y}px`,
                    '--hover-bg': step.hoverBg,
                    '--hover-color': step.colorHex,
                    '--node-bg': step.colorHex,
                  }}
                  onMouseEnter={() => setActiveStep(index)}
                  onMouseLeave={() => setActiveStep(null)}
                  onClick={() => setActiveStep(index)}
                  tabIndex={0}
                  onFocus={() => setActiveStep(index)}
                  onBlur={() => setActiveStep(null)}
                >
                  <div className="node-content text-white">
                    <i className={`${step.icon} node-icon`}></i>
                    <div className="node-number">{index + 1}</div>
                  </div>
                  <div className={`node-label angle-${angle < 0 ? angle + 360 : angle}`}>
                    {step.title}
                  </div>
                </div>
              );
            })}

            <div className="cg-circle-center text-center">
              {activeStep === null ? (
                <div className="center-default-state fade-in">
                  <div className="center-accent-line mx-auto mb-3" style={{ width: '40px', height: '4px', borderRadius: '2px', backgroundColor: '#94a3b8' }}></div>
                  <h3 className="center-title">6 Steps to Your Career Breakthrough</h3>
                  <p className="center-desc text-muted">Hover over any step to see details.</p>
                </div>
              ) : (
                <div key={activeStep} className="center-active-state fade-in">
                  <div className="center-accent-line mx-auto mb-3" style={{ width: '40px', height: '4px', borderRadius: '2px', backgroundColor: guidanceSteps[activeStep].colorHex }}></div>
                  <span className="center-step-number" style={{ color: guidanceSteps[activeStep].colorHex, backgroundColor: guidanceSteps[activeStep].hoverBg }}>Step {activeStep + 1}</span>
                  <h3 className="center-title" style={{ color: guidanceSteps[activeStep].colorHex }}>{guidanceSteps[activeStep].title}</h3>
                  <p className="center-desc text-dark mt-2">{guidanceSteps[activeStep].desc}</p>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Stacked Layout */}
          <div className="cg-vertical-timeline d-block d-md-none mt-4">
            {guidanceSteps.map((step, index) => (
              <div className="cg-vertical-step" key={index} data-aos="fade-up">
                <div className="v-step-number">{index + 1}</div>
                <div className="v-step-content">
                  <h4 className="v-step-title">{step.title}</h4>
                  <p className="v-step-desc">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Deliverables Section (Moved here) */}
      <section className="career-deliverables section-padding cg-dark-theme">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-5" data-aos="fade-right">
              <span id="sub-heading">Tangible Outcomes</span>
              <h2 id="title">Not Just Advice. <span className="text-accent-amber">Real Deliverables.</span></h2>
              <p className="cg-deliverable-text mt-3">We don't just tell you what to do — we work with you to create the actual assets you need to land interviews. Walk away with concrete materials that prove your value to employers.</p>
            </div>
            <div className="col-lg-7" data-aos="fade-left">
              <ul className="cg-deliverable-list">
                {deliverables.map((item, index) => (
                  <li key={index} className="cg-deliverable-item">
                    <div className="cg-deliverable-icon"><i className={item.icon}></i></div>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Who Is This For */}
      <section className="who-is-it-for section-padding bg-white">
        <div className="container">
          <div className="section-heading text-center" data-aos="fade-up">
            <span id="sub-heading">Target Audience</span>
            <h2 id="title">Who Is This Mentorship For?</h2>
          </div>
          <div className="row g-4 mt-5">
            {[
              { title: "College Students", desc: "Get ahead of campus placements with industry-ready skills and an impressive portfolio.", icon: "bi bi-backpack", color: "#3b82f6" },
              { title: "Recent Graduates", desc: "Bridge the gap between academic theory and what companies actually hire for.", icon: "bi bi-mortarboard", color: "#10b981" },
              { title: "Career Switchers", desc: "Transition into tech roles smoothly with a focused, fast-tracked learning roadmap.", icon: "bi bi-arrow-repeat", color: "#f59e0b" },
              { title: "Working Professionals", desc: "Upskill to secure promotions or switch to higher-paying companies and roles.", icon: "bi bi-briefcase", color: "#8b5cf6" },
            ].map((audience, i) => (
              <div className="col-lg-3 col-md-6" key={i} data-aos="fade-up" data-aos-delay={i * 100}>
                <div className="audience-card text-center p-4 h-100 shadow-sm" style={{ borderRadius: '16px', border: '1px solid #f1f5f9', transition: 'all 0.3s', cursor: 'pointer', backgroundColor: '#fff' }} 
                     onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'; }}
                     onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)'; }}>
                  <div className="audience-icon-wrapper mx-auto mb-4 d-flex justify-content-center align-items-center" style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: `${audience.color}15`, color: audience.color, fontSize: '2rem', transition: 'all 0.3s' }}>
                    <i className={audience.icon}></i>
                  </div>
                  <h4 className="fw-bold mb-3">{audience.title}</h4>
                  <p className="text-muted">{audience.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="career-comparison section-padding cg-premium-bg" ref={tableRef}>
        <div className="container">
          <div className="section-heading text-center" data-aos="fade-up">
            <span id="sub-heading">Why ProJenius</span>
            <h2 id="title">Not Just Another Online Course</h2>
          </div>
          
          <div className="cg-table-wrapper mt-5">
            {!isMobile && !shouldReduceMotion ? (
              <table className="cg-comparison-table">
                <thead>
                  <tr>
                    <th className="feature-col">Feature</th>
                    <th className="col-self">Self-Study (YouTube)</th>
                    <th className="col-course">Generic Online Courses</th>
                    <th className="col-us projenius-col">
                      <div className="winner-badge">Recommended</div>
                      ProJenius Mentorship
                      <div className="shimmer-sweep"></div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, i) => (
                    <tr key={i} className="cg-table-row">
                      <td className="feature-cell">
                        <i className={`${row.featureIcon} feature-icon-inline`}></i>
                        {row.feature}
                      </td>
                      <td className="col-self">{renderStatusIcon(row.self)}</td>
                      <td className="col-course">{renderStatusIcon(row.course)}</td>
                      <td className="col-us projenius-cell">
                        {renderStatusIcon(row.us)}
                        <div className="shimmer-sweep"></div>
                      </td>
                    </tr>
                  ))}
                  <tr className="cg-table-row closing-row">
                    <td colSpan="4" className="text-center py-4">
                      <h5 className="mb-0 text-white">
                        ProJenius wins on every category <span className="ms-2 text-accent-amber" style={{fontWeight: '800'}}>✓ 6/6 categories</span>
                      </h5>
                    </td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <div className="cg-mobile-comparison">
                {comparisonData.map((row, i) => (
                  <div key={i} className="cg-mobile-feature-card">
                    <div className="m-feature-header">
                      <i className={`${row.featureIcon} feature-icon-inline`}></i>
                      <h5>{row.feature}</h5>
                    </div>
                    <div className="m-feature-options">
                      <div className="m-option">
                        <span className="m-label">Self-Study</span>
                        <span className="m-status">{renderStatusIcon(row.self)}</span>
                      </div>
                      <div className="m-option">
                        <span className="m-label">Generic Courses</span>
                        <span className="m-status">{renderStatusIcon(row.course)}</span>
                      </div>
                      <div className="m-option m-winner">
                        <span className="m-label">ProJenius</span>
                        <span className="m-status">{renderStatusIcon(row.us)}</span>
                        <div className="shimmer-sweep"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="results" className="career-outcomes section-padding">
        <div className="container">
          <div className="section-heading text-center" data-aos="fade-up">
            <span id="sub-heading">Proven Results</span>
            <h2 id="title">Real Impact on Careers</h2>
          </div>

          <div className="cg-stats-strip row g-4 text-center" data-aos="zoom-in">
            <div className="col-lg-3 col-md-6 col-6">
              <h3 className="stat-number"><CountUp to={500} suffix="+" /></h3>
              <p className="stat-label">[TODO: Students Mentored]</p>
            </div>
            <div className="col-lg-3 col-md-6 col-6">
              <h3 className="stat-number"><CountUp to={45} suffix=" Days" /></h3>
              <p className="stat-label">[TODO: Avg Time to Placement]</p>
            </div>
            <div className="col-lg-3 col-md-6 col-6">
              <h3 className="stat-number"><CountUp to={30} suffix="+" /></h3>
              <p className="stat-label">[TODO: Hiring Partners]</p>
            </div>
            <div className="col-lg-3 col-md-6 col-6">
              <h3 className="stat-number"><CountUp to={98} suffix="%" /></h3>
              <p className="stat-label">[TODO: Satisfaction Rate]</p>
            </div>
          </div>
        </div>
      </section>

      <section className="faq-grid-section">
        <div className="container">
          <div className="text-center mb-4">
            <h2 className="faq-grid-title">Looking for Answers?</h2>
            <p className="faq-grid-subtitle mx-auto" style={{maxWidth: '700px'}}>
              Before booking a call, please check our comprehensive FAQ section. You might find the solution instantly!
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



      <section className="career-final-cta section-padding">
        <div className="container text-center" data-aos="zoom-in">
          <h2 className="cta-headline">Ready to plan your career path?</h2>
          <p className="cta-subtext">Book your career consultation today. No obligations, just clarity.</p>
          <a href="https://wa.me/919025476322?text=Hello%20ProJenius%2C%20I%20was%20interested%20in%20that%20career%20call." target="_blank" rel="noreferrer" className="btn btn-primary-custom btn-lg mt-4">Book a Call - ₹99</a>
        </div>
      </section>
    </>
  );
}
