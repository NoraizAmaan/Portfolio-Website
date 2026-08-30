import React from "react";

const projectsData = [
  {
    title: "Nexus Portal",
    img: "/Images/projects/Project1.png",
    desc: "Enterprise Project Management & Analytics System featuring secure JWT/SSO (Google, MS), RBAC, interactive dashboards via Recharts, jsPDF, multilingual support (i18next), and an AI-powered assistant integrated using Gemini API.",
    tags: ["React.js", "Node.js", "MongoDB", "Gemini API", "Three.js", "JWT"],
    github: "https://github.com/NoraizAmaan/Nexus-Project.git",
    live: "https://nexus-frontend-red.vercel.app/"
  },
  {
    title: "Insurance Management",
    img: "/Images/projects/Project2.png",
    desc: "Angular-based portal with Node.js/Express.js backend and MongoDB. Supports secure roles (Customer, Agent, Admin) for policy buying, claim submissions, transaction/payment gateways, and detailed audit reporting.",
    tags: ["Angular", "Node.js", "Express.js", "MongoDB", "RESTful APIs"],
    github: "https://github.com/NoraizAmaan/Insurance-Management.git",
    live: "https://insurance-management-psi.vercel.app/"
  },
  {
    title: "Banking App",
    img: "/Images/projects/Project3.png",
    desc: "Full-stack application managing core operations: account creation, transfers, deposits, withdrawals, and transaction history. Includes role-based dashboards for loan processing and account auditing.",
    tags: ["React.js", "Node.js", "Express.js", "MongoDB", "RESTful APIs"],
    github: "https://github.com/NoraizAmaan/banking-app.git",
    live: "#"
  },
  {
    title: "Deepfake Video Detection",
    img: "/Images/projects/Project4.png",
    desc: "A deep learning research-oriented system utilizing ResNeXt CNN for spatial feature extraction and LSTM networks for temporal analysis. Attained 85% accuracy on sample datasets, deployed with a Django web interface.",
    tags: ["Django", "Python", "ResNeXt", "LSTM", "Machine Learning"],
    github: "https://github.com/NoraizAmaan/Deepfake-Detection.git",
    live: "#"
  },
  {
    title: "Cognion",
    img: "/Images/projects/Project5.png",
    desc: "Mental health support platform built using React.js and Firebase. Implements anonymous doctor/mentor bookings, secure chat interfaces, and 4+ key wellness companion helper modules.",
    tags: ["React.js", "Firebase", "Authentication", "Realtime DB", "Tailwind CSS"],
    github: "https://github.com/NoraizAmaan/Cognion--Cognitive-Companion-.git",
    live: "https://cognion-cognitive-companion.vercel.app/"
  },
  {
    title: "CoLab",
    img: "/Images/projects/Project6.png",
    desc: "Modern team collaboration platform built using Django, Python, HTML5, CSS3, JavaScript, and MySQL, and deployed on Render. Features real-time messaging, secure file sharing, and collaborative workspaces to enhance team communication and productivity while providing practical insight into industry workflows and development.",
    tags: ["Django", "Python", "HTML5", "CSS3", "JavaScript", "MySQL", "Render"],
    github: "https://github.com/NoraizAmaan/SAIL---CoLab-.git",
    live: "https://colab-wez2.onrender.com/"
  }
];

export default function Projects() {
  return (
    <section id="projects" className="projectSection">
      <div className="sectionHeader fade-in">
        <h2>Featured Projects</h2>
        <p>A curation of engineering projects spanning enterprise web applications, AI integrations, and cloud services.</p>
      </div>
      
      <div className="projectGrid fade-in">
        {projectsData.map((project, idx) => (
          <div className="projectCard" key={idx}>
            <div 
              className="projectImg" 
              style={{ backgroundImage: `url('${project.img}')` }}
            ></div>
            <div className="projectContent">
              <h3 className="projectHeading">{project.title}</h3>
              <p className="projectSubHeading">{project.desc}</p>
              <div className="projectSkillsContainer">
                {project.tags.map((tag, tIdx) => (
                  <span className="projectSkillTag" key={tIdx}>{tag}</span>
                ))}
              </div>
              <div className="btnGroup">
                <a href={project.github} target="_blank" rel="noreferrer">
                  <i className="fa-brands fa-github"></i> GitHub
                </a>
                {project.live !== "#" && (
                  <a href={project.live} target="_blank" rel="noreferrer">
                    <i className="fa-solid fa-link"></i> Live Link
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
