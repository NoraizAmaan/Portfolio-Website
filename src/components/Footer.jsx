import React from "react";

export default function Footer() {
  return (
    <footer>
      <div className="footerContainer">
        <div className="footerLogo">Noraiz Amaan</div>
        <div className="footerCopy">&copy; 2026 Noraiz Amaan. All Rights Reserved.</div>
        <div className="footerIcons">
          <a href="https://linkedin.com/in/noraiz-amaan" target="_blank" rel="noreferrer">
            <i className="fa-brands fa-linkedin"></i>
          </a>
          <a href="https://github.com/NoraizAmaan" target="_blank" rel="noreferrer">
            <i className="fa-brands fa-github"></i>
          </a>
          <a href="https://x.com/NoraizAmaan" target="_blank" rel="noreferrer">
            <i className="fa-brands fa-twitter"></i>
          </a>
          <a href="https://www.instagram.com/noraiz_amaan/?hl=en" target="_blank" rel="noreferrer">
            <i className="fa-brands fa-instagram"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}
