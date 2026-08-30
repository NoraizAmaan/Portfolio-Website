import React, { useEffect, useRef, useState } from "react";

const educationData = [
  {
    date: "2021 – 2025",
    grade: "Secured 8.40 CGPA",
    title: "B.Tech (Computer Science and Engineering)",
    institution: "Vellore Institute of Technology, Bhopal",
    iconClass: "cap-theme",
    logo: "/Images/userAsset/vitb logo.png"
  },
  {
    date: "2019 – 2021",
    grade: "Secured 89.5%",
    title: "Class XII (Senior Secondary)",
    institution: "M.G.M Higher Secondary School, Bokaro Steel City, Jharkhand, CBSE",
    iconClass: "book-theme",
    logo: "/Images/userAsset/mgmschool logo.jpg"
  },
  {
    date: "2009 – 2019",
    grade: "Secured 86.0%",
    title: "Class X (Secondary)",
    institution: "M.G.M Higher Secondary School, Bokaro Steel City, Jharkhand, CBSE",
    iconClass: "school-theme",
    logo: "/Images/userAsset/mgmschool logo.jpg"
  }
];

const certificationsData = [
  {
    id: "gcp-cdl",
    name: "Google Cloud Certified Cloud Digital Leader",
    org: "Google Cloud",
    icon: "fa-brands fa-google",
    date: "Jul 2024",
    link: "https://drive.google.com/file/d/1t5W3yZadkScDmJhlbC-cw-e4uGpcZj3b/view?usp=sharing",
    pocketClass: "grad-gcp-digital",
    envelopeClass: "cert-gcp-digital",
    gradColorStart: "#0284c7",
    gradColorEnd: "#0369a1",
    strokeColor: "rgba(14, 165, 233, 0.4)"
  },
  {
    id: "aws-cp",
    name: "AWS Certified Cloud Practitioner",
    org: "Amazon Web Services",
    icon: "fa-brands fa-aws",
    date: "Feb 2024",
    link: "https://drive.google.com/file/d/1msZjLm1B2lhw684DsGWLmDsggpeE5kv1/view?usp=sharing",
    pocketClass: "grad-aws-practitioner",
    envelopeClass: "cert-aws-practitioner",
    gradColorStart: "#ea580c",
    gradColorEnd: "#7c2d12",
    strokeColor: "rgba(234, 88, 12, 0.4)"
  },
  {
    id: "adobe-uiux",
    name: "Cognixia's Generative AI Level 101 & 201",
    org: "Cognixia",
    icon: "fa-brands fa-adobe",
    date: "Oct 2025",
    link: "https://drive.google.com/file/d/1z0fyftMU0-P7sEEUuJUwa9MKOyfImwKe/view?usp=sharing",
    pocketClass: "grad-uiux",
    envelopeClass: "cert-uiux",
    gradColorStart: "#be123c",
    gradColorEnd: "#881337",
    strokeColor: "rgba(244, 63, 94, 0.4)"
  },
  {
    id: "gcp-fs",
    name: "Full Stack Web Developer",
    org: "Udemy (Instructors: Hitesh Choudhary)",
    icon: "fa-brands fa-google",
    date: "Aug 2026",
    link: "https://www.udemy.com/certificate/UC-8d720d83-ca76-473c-87ee-0906ef4711e6/",
    pocketClass: "grad-fullstack",
    envelopeClass: "cert-fullstack",
    gradColorStart: "#1d4ed8",
    gradColorEnd: "#1e3a8a",
    strokeColor: "rgba(59, 130, 246, 0.4)"
  },
  {
    id: "aws-sa",
    name: "Solutions Architect Virtual Experience Program",
    org: "Forage & AWS",
    icon: "fa-brands fa-aws",
    date: "Feb 2022",
    link: "https://drive.google.com/file/d/1V7ogDnIaKhTiNGutOU7aOjNxX-3baSAa/view?usp=sharing",
    pocketClass: "grad-aws",
    envelopeClass: "cert-aws",
    gradColorStart: "#b45309",
    gradColorEnd: "#78350f",
    strokeColor: "rgba(245, 158, 11, 0.4)"
  },
  {
    id: "meta-react",
    name: "Microsoft Azure AZ900 Fundamentals",
    org: "Udemy",
    icon: "fa-brands fa-react",
    date: "July 2026",
    link: "https://www.udemy.com/certificate/UC-663bbe16-111f-4193-9207-3a5e1634b0fc/",
    pocketClass: "grad-react",
    envelopeClass: "cert-react",
    gradColorStart: "#0e7490",
    gradColorEnd: "#155e75",
    strokeColor: "rgba(6, 182, 212, 0.4)"
  },
  {
    id: "umich-ml",
    name: "Applied Machine Learning in Python",
    org: "Coursera (Unv. of Michigan)",
    icon: "fa-solid fa-brain",
    date: "Jan 2023",
    link: "https://drive.google.com/file/d/1aOShxy6inmLpR7whfG10qNwKdHXQhSXE/view?usp=sharing",
    pocketClass: "grad-ml",
    envelopeClass: "cert-ml",
    gradColorStart: "#7c3aed",
    gradColorEnd: "#4c1d95",
    strokeColor: "rgba(139, 92, 246, 0.4)"
  },
  {
    id: "scaler-cpp",
    name: "C++ Course: Learn the Essentials",
    org: "Scaler",
    icon: "fa-solid fa-code",
    date: "Jan 2025",
    link: "https://drive.google.com/file/d/16QDx9xh_Ox8HMVy6ZW9693mWfqV1eFxt/view?usp=sharing",
    pocketClass: "grad-scaler-cpp",
    envelopeClass: "cert-scaler-cpp",
    gradColorStart: "#0f766e",
    gradColorEnd: "#134e4a",
    strokeColor: "rgba(20, 184, 166, 0.4)"
  },
  {
    id: "infosys-ai",
    name: "Artificial Intelligence Primer & Principles of Generative AI",
    org: "Infosys Springboard",
    icon: "fa-solid fa-robot",
    date: "Aug 2024",
    link: "https://drive.google.com/file/d/1quybiNM6q48_2i9Pm_9AMqfJdEsGJPgT/view?usp=sharing",
    pocketClass: "grad-infosys-ai",
    envelopeClass: "cert-infosys-ai",
    gradColorStart: "#0369a1",
    gradColorEnd: "#075985",
    strokeColor: "rgba(14, 165, 233, 0.4)"
  },
  {
    id: "kaggle-sql",
    name: "Intro to SQL",
    org: "Kaggle",
    icon: "fa-solid fa-database",
    date: "Feb 2023",
    link: "https://www.kaggle.com/learn/certification/noraizamaan/intro-to-sql",
    pocketClass: "grad-kaggle-sql",
    envelopeClass: "cert-kaggle-sql",
    gradColorStart: "#0284c7",
    gradColorEnd: "#1d4ed8",
    strokeColor: "rgba(6, 182, 212, 0.4)"
  },
  {
    id: "hackerrank-python",
    name: "Python (Basics)",
    org: "HackerRank",
    icon: "fa-brands fa-python",
    date: "Dec 2022",
    link: "https://www.hackerrank.com/certificates/f7e0b4dd5785",
    pocketClass: "grad-hackerrank",
    envelopeClass: "cert-hackerrank",
    gradColorStart: "#15803d",
    gradColorEnd: "#14532d",
    strokeColor: "rgba(34, 197, 94, 0.4)"
  },
  {
    id: "google-dm",
    name: "The Fundamentals of Digital Marketing",
    org: "Google Digital Garage",
    icon: "fa-brands fa-google",
    date: "Dec 2022",
    link: "https://drive.google.com/file/d/1Xr8BGxicwT6kowxDuOFH5IIcfceDGrAQ/view?usp=sharing",
    pocketClass: "grad-google-dm",
    envelopeClass: "cert-google-dm",
    gradColorStart: "#b91c1c",
    gradColorEnd: "#7f1d1d",
    strokeColor: "rgba(239, 68, 68, 0.4)"
  },
  {
    id: "uipath-rpa",
    name: "Introduction to RPA and Automation",
    org: "UiPath",
    icon: "fa-solid fa-robot",
    date: "Apr 2022",
    link: "https://drive.google.com/file/d/1zVhLGixG-kWedgXveGGEsA7kA5MlPDwN/view?usp=sharing",
    pocketClass: "grad-uipath-rpa",
    envelopeClass: "cert-uipath-rpa",
    gradColorStart: "#9333ea",
    gradColorEnd: "#6b21a8",
    strokeColor: "rgba(168, 85, 247, 0.4)"
  }
];

const statsData = [
  { num: "100+", label: "GFG Coding Problems" },
  { num: "5★ / 3★", label: "HackerRank Python/SQL" },
  { num: "Lvl 23", label: "Google Crowdsource" },
  { num: "70+", label: "Cloud Skills Badges" }
];

export default function Dashboard() {
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const [cardWidth, setCardWidth] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Resize and width calculation logic
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      let visible = 4;
      if (width > 1200) visible = 4;
      else if (width > 992) visible = 3;
      else if (width > 600) visible = 2;
      else visible = 1;
      
      setVisibleCount(visible);

      const firstCard = trackRef.current?.firstElementChild;
      if (firstCard) {
        setCardWidth(firstCard.clientWidth);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    // Trigger update after fonts/layout load fully
    const timer = setTimeout(handleResize, 150);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };
  }, []);

  const maxIndex = Math.max(0, certificationsData.length - visibleCount);

  // Ensure index remains bounded
  useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, maxIndex));
  }, [visibleCount, maxIndex]);

  const slideNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const slidePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  // Swipe handling for mobile
  const touchStartX = useRef(0);
  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    const swipeThreshold = 50;
    const diff = touchStartX.current - touchEndX;

    if (diff > swipeThreshold) {
      slideNext();
    } else if (diff < -swipeThreshold) {
      slidePrev();
    }
  };

  const offset = currentIndex * (cardWidth + 24); // 24px is row gap in CSS

  return (
    <section className="dashboard-section" id="dashboard">
      <div className="sectionHeader fade-in">
        <h2>Education & Credentials</h2>
        <p>An overview of my academic foundation, cloud certifications, and programming achievements.</p>
      </div>

      <div className="education-container fade-in">
        <h3><i className="fa-solid fa-graduation-cap"></i> Education</h3>
        <div className="education-timeline-container">
          <div className="education-timeline-line"></div>
          
          {educationData.map((edu, idx) => {
            const alignClass = idx % 2 === 0 ? "left-align" : "right-align";
            return (
              <div key={idx} className={`edu-timeline-item ${alignClass}`}>
                <div className="edu-timeline-card">
                  <div className={`edu-card-icon-container ${edu.iconClass}`}>
                    <img src={edu.logo} alt={`${edu.title} logo`} className="edu-card-logo" />
                  </div>
                  <div className="edu-card-content">
                    <div className="edu-card-top-row">
                      <span className="edu-date-pill">{edu.date}</span>
                      <span className="edu-grade-text">• {edu.grade}</span>
                    </div>
                    <h4 className="edu-card-title">{edu.title}</h4>
                    <p className="edu-card-institution">{edu.institution}</p>
                    <div className="edu-card-footer-line"></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Certifications Carousel Slider */}
      <div className="certifications-container fade-in">
        <h3><i className="fa-solid fa-award"></i> Professional Certifications</h3>
        <div className="slider-wrapper">
          <button 
            className="slider-btn prev-btn" 
            aria-label="Previous Certifications"
            onClick={slidePrev}
            disabled={currentIndex === 0}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          
          <div 
            ref={viewportRef} 
            className="slider-viewport"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div 
              ref={trackRef} 
              className="slider-track"
              style={{ transform: `translateX(-${offset}px)` }}
            >
              {certificationsData.map((cert) => (
                <div key={cert.id} className={`cert-card-envelope ${cert.envelopeClass}`}>
                  <div className="certificate-paper">
                    <div className="cert-header">
                      <div className="cert-seal"></div>
                      <div className="cert-title-top">CERTIFICATE</div>
                      <div className="cert-subtitle-top">OF ACHIEVEMENT</div>
                    </div>
                    <div className="cert-body">
                      <p className="cert-presented">THIS CERTIFICATE IS PRESENTED TO</p>
                      <h5 className="cert-recipient-name">Noraiz Amaan</h5>
                      <p className="cert-text">for successfully completing all requirements for the professional certification</p>
                    </div>
                  </div>
                  <div className="envelope-pocket">
                    <svg className="pocket-svg" viewBox="0 0 270 230" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id={`grad-${cert.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor={cert.gradColorStart} />
                          <stop offset="100%" stopColor={cert.gradColorEnd} />
                        </linearGradient>
                      </defs>
                      <path 
                        d="M 0,20 Q 135,45 270,20 L 270,230 L 0,230 Z" 
                        fill={`url(#grad-${cert.id})`} 
                        stroke={cert.strokeColor} 
                        strokeWidth="2" 
                      />
                    </svg>
                    <div className="envelope-pocket-content">
                      <h4 className="cert-name">{cert.name}</h4>
                      <div className="cert-meta">
                        <span className="cert-org"><i className={cert.icon}></i> {cert.org}</span>
                        <span className="cert-divider">•</span>
                        <span className="cert-date"><i className="fa-solid fa-calendar-days"></i> {cert.date}</span>
                      </div>
                      <a 
                        href={cert.link} 
                        className="cert-view-btn" 
                        target="_blank" 
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        View <i className="fa-solid fa-up-right-from-square"></i>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button 
            className="slider-btn next-btn" 
            aria-label="Next Certifications"
            onClick={slideNext}
            disabled={currentIndex >= maxIndex}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="statsGrid fade-in">
        {statsData.map((stat, idx) => (
          <div key={idx} className="statCard">
            <div className="statNum">{stat.num}</div>
            <div className="statLabel">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
