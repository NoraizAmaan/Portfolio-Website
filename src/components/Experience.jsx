import React, { useEffect, useRef } from "react";

const experienceData = [
  {
    logo: "/Images/userAsset/ascendion-logo.png",
    date: "July 2025 - Present",
    role: "Associate Engineer",
    company: "Ascendion | Hyderabad, India",
    tags: ["MERN/MEAN Stack", "RESTful APIs", "Agentic AI (AAVA)"],
    points: [
      "Built and enhanced scalable full-stack web applications using MERN/MEAN stack (React.js, Angular, Node.js, Express.js, MongoDB), delivering 10+ production features and improving user experience.",
      "Designed and deployed RESTful APIs and backend services, optimizing application performance by ~25% and resolving 15+ production issues.",
      "Leveraged the AAVA agentic AI platform within the EngineeringAI framework to automate engineering workflows and accelerate SDLC delivery by ~20%."
    ]
  },
  {
    logo: "/Images/userAsset/infosys-springboard-logo.png",
    date: "Oct 2024 - Jan 2025",
    role: "AI & ML Intern",
    company: "Infosys (Springboard 5.0) | Remote",
    tags: ["AI & ML (Springboard)", "Image Processing", "Summit Nominee"],
    points: [
      "Completed an Artificial Intelligence and Machine Learning Internship under Infosys Springboard Internship 5.0.",
      "Led the development of a machine learning-based advanced skin disease diagnosis system, leveraging image processing trained on 100+ dermatological images.",
      "Project was shortlisted for the prestigious national Infosys Springboard Summit 2025 at Mysore."
    ]
  },
  {
    logo: "/Images/userAsset/innobyte-services-logo.png",
    date: "Nov 2024 - Dec 2024",
    role: "Web Developer Intern",
    company: "Innobyte Services | Remote",
    tags: ["React.js & CSS3", "Custom Animations", "Responsive Layouts"],
    points: [
      "Redesigned client websites using HTML5, CSS3, JavaScript, and React.js to enhance responsiveness, layout consistency, and user engagement across modern devices and browsers.",
      "Improved user experience by adding 10+ custom animations and interactive components, optimizing performance and resolving 20+ responsive layout bugs."
    ]
  },
  {
    logo: "/Images/userAsset/sail-logo.png",
    date: "Oct 2023 - Dec 2023",
    role: "Vocational Trainee (Project Based)",
    company: "Steel Authority of India Limited (SAIL) | Bokaro, India",
    tags: ["Django & Python", "MySQL & Render", "Team Collaboration"],
    points: [
      "Conducted an 8-week project-based training within Bokaro Steel Plant's C & IT Department.",
      "Engineered and deployed an internal Team Collaboration website using Django, HTML5, CSS3, JavaScript, Python, and MySQL on Render, enhancing communication efficiency."
    ]
  }
];

export default function Experience() {
  const timelineRef = useRef(null);
  const progressRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const handleTimelineScroll = () => {
      const container = timelineRef.current;
      const progress = progressRef.current;
      if (!container || !progress) return;

      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Start filling the bar when the top of the container crosses 55% of the viewport.
      // Fill completely when the bottom crosses 55% of the viewport.
      const triggerPoint = viewportHeight * 0.55;
      const totalHeight = rect.height;
      const currentScroll = triggerPoint - rect.top;

      let progressPercent = (currentScroll / totalHeight) * 100;
      progressPercent = Math.min(Math.max(progressPercent, 0), 100);

      progress.style.height = `${progressPercent}%`;

      // Highlight individual timeline items (dot and card) when they cross the trigger point
      itemsRef.current.forEach((item) => {
        if (!item) return;
        const itemRect = item.getBoundingClientRect();
        const dotTop = itemRect.top + 30; // 30px is top offset of dot inside timeline-item
        if (dotTop < triggerPoint) {
          item.classList.add("active");
        } else {
          item.classList.remove("active");
        }
      });
    };

    window.addEventListener("scroll", handleTimelineScroll);
    window.addEventListener("resize", handleTimelineScroll);
    
    // Initial check on load
    handleTimelineScroll();

    return () => {
      window.removeEventListener("scroll", handleTimelineScroll);
      window.removeEventListener("resize", handleTimelineScroll);
    };
  }, []);

  return (
    <section className="timeline-section" id="experience">
      <div className="sectionHeader fade-in">
        <h2>Professional Journey</h2>
        <p>A timeline of my professional experience, internships, and engineering contributions.</p>
      </div>

      <div ref={timelineRef} className="timeline-container fade-in">
        <span ref={progressRef} className="timeline-progress"></span>
        
        {experienceData.map((exp, index) => (
          <div 
            key={index} 
            ref={(el) => (itemsRef.current[index] = el)} 
            className="timeline-item"
          >
            <div className="timeline-dot"></div>
            
            <div className="timeline-side-info">
              <img src={exp.logo} alt={`${exp.role} Logo`} className="timeline-brand-logo" />
              <div className="timeline-side-date">{exp.date}</div>
              <div className="timeline-side-tags">
                {exp.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="side-tag">{tag}</span>
                ))}
              </div>
            </div>

            <div className="timeline-content">
              <span className="timeline-date">{exp.date}</span>
              <h3>{exp.role}</h3>
              <div className="timeline-company">
                <img src={exp.logo} alt={`${exp.role} Logo Inline`} className="timeline-logo-inline" />
                {exp.company}
              </div>
              <ul className="timeline-desc">
                {exp.points.map((pt, pIdx) => (
                  <li key={pIdx}>{pt}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
