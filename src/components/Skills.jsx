import React from "react";
import TechStackCanvas from "./TechStackCanvas";

const skillCategories = [
  {
    title: "Languages",
    skills: [
      { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "C++", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
      { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
      { name: "SQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" }
    ]
  },
  {
    title: "Web Stack",
    skills: [
      { name: "React.js", logo: "/Images/stack/React.png" },
      { name: "Angular", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg" },
      { name: "Node.js", logo: "/Images/stack/NodeJs.svg" },
      { name: "Express", logo: "/Images/stack/Express.png" },
      { name: "Django", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" },
      { name: "Next.js", logo: "/Images/stack/Next.svg" }
    ]
  },
  {
    title: "Cloud & Databases",
    skills: [
      { name: "MongoDB", logo: "/Images/stack/MongoDB.svg" },
      { name: "GCP", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" },
      { name: "AWS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", isInverted: true },
      { name: "Azure", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" },
      { name: "Vercel", logo: "/Images/stack/Vercel.svg", isInverted: true }
    ]
  },
  {
    title: "Tools & Concepts",
    skills: [
      { name: "Git", logo: "/Images/stack/Git.svg" },
      { name: "GitHub", logo: "/Images/stack/Github.svg", isInverted: true },
      { name: "Postman", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" },
      { name: "JWT Auth", render: () => <><span style={{ color: "var(--accent-cyan)", fontWeight: "bold", fontSize: "11px" }}>JWT</span> Auth</> },
      { name: "RBAC Security", render: () => <><span style={{ color: "var(--accent-purple)", fontWeight: "bold", fontSize: "11px" }}>RBAC</span> Security</> }
    ]
  }
];

const marqueeSkills = [
  { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "C++", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
  { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "SQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "React.js", logo: "/Images/stack/React.png" },
  { name: "Angular", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg" },
  { name: "Node.js", logo: "/Images/stack/NodeJs.svg" },
  { name: "Express", logo: "/Images/stack/Express.png" },
  { name: "Django", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" },
  { name: "Next.js", logo: "/Images/stack/Next.svg" },
  { name: "MongoDB", logo: "/Images/stack/MongoDB.svg" },
  { name: "GCP", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" },
  { name: "AWS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", isInverted: true },
  { name: "Azure", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" },
  { name: "Vercel", logo: "/Images/stack/Vercel.svg", isInverted: true },
  { name: "Git", logo: "/Images/stack/Git.svg" },
  { name: "GitHub", logo: "/Images/stack/Github.svg", isInverted: true },
  { name: "Postman", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" }
];

export default function Skills() {
  return (
    <section className="skillContainer" id="skills">
      <div className="skills-wrapper">
        <div className="leftSkillContainer fade-in">
          <h2 className="skillHeading">My <span>Technical</span> Stack</h2>
          <div className="skillSubHeading">
            <p>
              I specialize in full stack technologies, focusing on creating fast, interactive, and modular applications. My cloud certifications empower me to architect secure, scalable hosting configurations.
            </p>
            <p>
              Additionally, my hands-on work with AI pipelines and automated workflows (Agentic AI platforms like AAVA) bridges the gap between software development and intelligent orchestration.
            </p>
          </div>
          {/* Interactive WebGL Canvas */}
          <TechStackCanvas />
        </div>

        <div className="rightSkillContainer fade-in">
          {skillCategories.map((cat, catIdx) => (
            <div className="skillCategory" key={catIdx}>
              <h3>{cat.title}</h3>
              <div className="skillList">
                {cat.skills.map((skill, sIdx) => (
                  <div className="skillItem" key={sIdx}>
                    {skill.render ? (
                      skill.render()
                    ) : (
                      <>
                        <img 
                          src={skill.logo} 
                          alt={`${skill.name} Logo`} 
                          className={skill.isInverted ? "theme-invert" : ""}
                        />{" "}
                        {skill.name}
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Infinite Tech Stack Logo Slider */}
      <div className="skills-slider-wrap fade-in">
        <div className="skills-slider-track">
          {/* Set 1 */}
          {marqueeSkills.map((sk, idx) => (
            <div className="skills-slide" key={`set1-${idx}`}>
              <img 
                src={sk.logo} 
                alt={sk.name} 
                className={sk.isInverted ? "theme-invert" : ""}
              />
              <span>{sk.name}</span>
            </div>
          ))}
          {/* Set 2 (Duplicate for loop) */}
          {marqueeSkills.map((sk, idx) => (
            <div className="skills-slide" key={`set2-${idx}`}>
              <img 
                src={sk.logo} 
                alt={sk.name} 
                className={sk.isInverted ? "theme-invert" : ""}
              />
              <span>{sk.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
