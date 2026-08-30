import React, { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const [status, setStatus] = useState("idle"); // idle, sending, sent

  const handleChange = (e) => {
    const { id, value } = e.target;
    const fieldMap = {
      "form-name": "name",
      "form-email": "email",
      "form-subject": "subject",
      "form-message": "message"
    };
    setFormData((prev) => ({
      ...prev,
      [fieldMap[id]]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      // Use hosted URL from VITE_API_URL or relative path (local proxy)
      const apiUrl = import.meta.env.VITE_API_URL || "";
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus("sent");
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: ""
        });
      } else {
        alert(data.message || "Failed to send message. Please try again.");
        setStatus("error");
      }
    } catch (error) {
      console.error("Contact form error:", error);
      alert("Could not connect to the contact server. Please verify the backend is running.");
      setStatus("error");
    } finally {
      setTimeout(() => {
        setStatus("idle");
      }, 4000);
    }
  };

  const isSending = status === "sending";
  const isSent = status === "sent";

  return (
    <>
      {/* Contact Me Section Start */}
      <section className="contactMeSection" id="contactMe">
        <div className="contact-container fade-in">
          <div className="contact-info">
            <h3>Let's Connect</h3>
            <p>Have an interesting project or seeking to hire a full stack engineer? Feel free to reach out. I would love to chat.</p>
            <div className="contact-details">
              <a href="mailto:noraizamaan150303@gmail.com" className="contact-detail-item">
                <svg xmlns="http://www.w3.org/2000/svg" className="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinelinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                noraizamaan150303@gmail.com
              </a>
              <div className="contact-detail-item">
                <svg xmlns="http://www.w3.org/2000/svg" className="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" strokeLinecap="round" strokeLinelinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                Hyderabad / Bokaro Steel City, India
              </div>
              <a href="https://linkedin.com/in/noraiz-amaan" target="_blank" rel="noreferrer" className="contact-detail-item">
                <svg xmlns="http://www.w3.org/2000/svg" className="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" strokeLinecap="round" strokeLinelinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
                linkedin.com/in/noraiz-amaan
              </a>
              <a href="https://github.com/NoraizAmaan" target="_blank" rel="noreferrer" className="contact-detail-item">
                <svg xmlns="http://www.w3.org/2000/svg" className="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
                github.com/NoraizAmaan
              </a>
            </div>
          </div>

          <div className="contactUsForm mail-window">
            <div className="mail-header">
              <div className="mail-dots">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
            </div>
            <form id="contact-form" onSubmit={handleSubmit}>
              <div className="mail-row">
                <label htmlFor="form-name" className="mail-label">Name</label>
                <input 
                  className="mail-input" 
                  type="text" 
                  id="form-name" 
                  required 
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name" 
                />
              </div>
              <div className="mail-row">
                <label htmlFor="form-email" className="mail-label">From</label>
                <input 
                  className="mail-input" 
                  type="email" 
                  id="form-email" 
                  required 
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your_email@xyz.com" 
                />
              </div>
              <div className="mail-row">
                <span className="mail-label">To</span>
                <div className="mail-to-pill">
                  <span className="pill-name">Noraiz Amaan&nbsp;</span><span className="pill-email">&lt;noraizamaan150303@gmail.com&gt;</span>
                </div>
              </div>
              <div className="mail-row">
                <label htmlFor="form-subject" className="mail-label">Subject</label>
                <input 
                  className="mail-input" 
                  type="text" 
                  id="form-subject" 
                  required 
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject" 
                />
              </div>
              <div className="mail-row message-row">
                <label htmlFor="form-message" className="mail-label">Message</label>
                <textarea 
                  className="mail-input" 
                  name="message" 
                  id="form-message" 
                  required 
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Enter your message"
                ></textarea>
              </div>
              <div className="formBtn mail-btn-container">
                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  id="submit-btn"
                  disabled={isSending || isSent || status === "error"}
                  style={{
                    background: isSent 
                      ? "linear-gradient(135deg, #10b981 0%, #059669 100%)" 
                      : status === "error"
                      ? "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)"
                      : ""
                  }}
                >
                  {isSending && (
                    <>
                      Sending... <i className="fa-solid fa-spinner fa-spin"></i>
                    </>
                  )}
                  {isSent && (
                    <>
                      Sent Successfully! <i className="fa-solid fa-check"></i>
                    </>
                  )}
                  {status === "error" && (
                    <>
                      Failed to Send <i className="fa-solid fa-triangle-exclamation"></i>
                    </>
                  )}
                  {status === "idle" && (
                    <>
                      Send Message <i className="submit-icon fa-solid fa-paper-plane"></i>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Connect Cards Section Start */}
      <section className="connect-cards-section fade-in" id="quick-links">
        <div className="connect-cards-container">
          {/* Left Card: Artistic Portrait */}
          <div className="artistic-portrait-card">
            <img src="/Images/userAsset/Noraiz Amaan Portait.png" alt="Noraiz Amaan Artistic Portrait" className="portrait-img" />
            <div className="portrait-overlay">
              <h4 className="portrait-name">Noraiz</h4>
              <div className="portrait-socials">
                <a href="https://linkedin.com/in/noraiz-amaan" target="_blank" rel="noreferrer" className="social-pill" aria-label="LinkedIn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinelinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
                <a href="https://github.com/NoraizAmaan" target="_blank" rel="noreferrer" className="social-pill" aria-label="GitHub">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                </a>
                <a href="https://x.com/NoraizAmaan" target="_blank" rel="noreferrer" className="social-pill" aria-label="Twitter/X">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Stacked Cards */}
          <div className="connect-links-column">
            {/* Resume Download Card */}
            <a href="https://drive.google.com/file/d/1G956PS1gIbOcxc2_5Km5QCda7xujc8RB/view?usp=sharing" className="resume-download-card" target="_blank" rel="noreferrer">
              <div className="resume-card-content">
                <svg xmlns="http://www.w3.org/2000/svg" className="pdf-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
                <span className="resume-filename">resume.pdf</span>
              </div>
            </a>

            {/* Hire Me Card */}
            <div className="hire-upwork-card hire-me-card">
              <div className="platforms-container">
                <a href="https://www.upwork.com/freelancers/~010b46d2958f9cb893?mp_source=share" target="_blank" rel="noreferrer" className="platform-link upwork-platform" aria-label="Hire me on Upwork">
                  <svg viewBox="0 0 24 24" className="upwork-logo" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.561 2.25c-2.482 0-4.321 1.488-5.074 3.738a9.497 9.497 0 0 0-1.895-3.08l-.348-.382H8.38v8.665c0 1.957-.803 2.928-2.387 2.928-1.583 0-2.386-.97-2.386-2.928V2.526H.75v8.665c0 4.195 2.193 6.559 5.243 6.559 3.053 0 5.244-2.364 5.244-6.559V7.933a7.354 7.354 0 0 1 1.464 2.809l.135.484v.006c-.461 2.05-.705 4.39-.705 6.643h2.857v-.03c0-2.032.222-4.116.638-5.96a4.845 4.845 0 0 0 3.722 1.484c2.81 0 4.908-2.073 4.908-5.69 0-3.616-2.1-5.689-4.908-5.689zm0 8.523c-1.39 0-2.392-1.077-2.392-2.833 0-1.756 1.002-2.832 2.392-2.832 1.388 0 2.391 1.076 2.391 2.832 0 1.756-1.003 2.833-2.391 2.833z"/>
                  </svg>
                </a>
                <a href="https://www.fiverr.com/noraiz_amaan/?public_mode=true" target="_blank" rel="noreferrer" className="platform-link fiverr-platform" aria-label="Hire me on Fiverr">
                  <svg viewBox="0 0 24 24" className="fiverr-logo" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.004 15.588a.995.995 0 1 0 .002-1.99.995.995 0 0 0-.002 1.99zm-.996-3.705h-.85c-.546 0-.84.41-.84 1.092v2.466h-1.61v-3.558h-.684c-.547 0-.84.41-.84 1.092v2.466h-1.61v-4.874h1.61v.74c.264-.574.626-.74 1.163-.74h1.972v.74c.264-.574.625-.74 1.162-.74h.527v1.316zm-6.786 1.501h-3.359c.088.546.43.858 1.006.858.43 0 .732-.175.83-.487l1.425.4c-.351.848-1.22 1.364-2.255 1.364-1.748 0-2.549-1.355-2.549-2.515 0-1.14.703-2.505 2.45-2.505 1.856 0 2.471 1.384 2.471 2.408 0 .224-.01.37-.02.477zm-1.562-.945c-.04-.42-.342-.81-.889-.81-.508 0-.81.225-.908.81h1.797zM7.508 15.44h1.416l1.767-4.874h-1.62l-.86 2.837-.878-2.837H5.72l1.787 4.874zm-6.6 0H2.51v-3.558h1.524v3.558h1.591v-4.874H2.51v-.302c0-.332.235-.536.606-.536h.918V8.412H2.85c-1.162 0-1.943.712-1.943 1.755v.4H0v1.316h.908v3.558z"/>
                  </svg>
                </a>
              </div>
              <div className="hire-me-label">Hire Me</div>
              <div className="badge-row">
                <span className="upwork-badge">100% Job Success</span>
                <span className="upwork-badge">Top Rated</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
