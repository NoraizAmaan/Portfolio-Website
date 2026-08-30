import React, { useEffect, useRef } from "react";
import Typed from "typed.js";

export default function Hero() {
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [
        `Hi there, I'm Noraiz Amaan !<br><span class="prompt">&gt;</span> I do code and projects come to life !`
      ],
      loop: true,
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 8000,
      smartBackspace: true,
      cursorChar: "_"
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <section className="heroSection" id="about">
      {/* Background Video */}
      <div className="hero-video-container">
        <video className="hero-video" autoPlay loop muted playsInline preload="auto">
          <source src="/Images/userAsset/hero-bg-2.mp4" type="video/mp4" />
        </video>
        <div className="hero-video-overlay"></div>
        <div className="hero-video-texture-overlay"></div>
      </div>

      <h3 className="fadedText">Noraiz Amaan</h3>
      
      <div className="infoContainer fade-in">
        <div className="terminal-container">
          <div className="terminal-header">
            <div className="terminal-dots">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
            </div>
          </div>
          <div className="terminal-content">
            <div className="terminal-line">
              <span className="prompt">&gt; </span>
              <span ref={el} className="typing-text"></span>
            </div>
          </div>
        </div>
        <div className="hero-details-row">
          <div className="hero-text-block">
            <p className="desc">
              Associate Engineer at Ascendion and a Full Stack Web Developer. B.Tech graduate in Computer Science and Engineering from VIT (2025). Specializing in MERN/MEAN stack, cloud deployments (AWS/GCP), and Agentic AI workflow automation.
            </p>
            <div className="btn-container">
              <a href="#contactMe" className="btn btn-primary">Hire Me</a>
              <a href="#projects" className="btn btn-secondary">View Work</a>
            </div>
          </div>
          <div className="hero-mobile-avatar">
            <div className="avatar-glow"></div>
            <img src="/Images/userAsset/avatar.png" alt="Noraiz Amaan 3D Avatar" />
          </div>
        </div>
      </div>

      <div className="imgContainer fade-in">
        {/* Absolute Icons Floating around User Image */}
        <div className="absolute-icon icon-dots">
          <img src="/Images/userAsset/dots.png" alt="Dots Element" />
        </div>
        <div className="absolute-icon icon-cube">
          <img src="/Images/userAsset/cube.png" alt="Cube Element" />
        </div>
        <div className="absolute-icon icon-circle">
          <img src="/Images/userAsset/circle.png" alt="Circle Element" />
        </div>
        <div className="absolute-icon icon-plus">
          <img src="/Images/userAsset/plus.png" alt="Plus Element" />
        </div>
        
        <div className="userImage">
          <div className="avatar-glow"></div>
          <div className="avatar-stars"></div>
          <img src="/Images/userAsset/avatar.png" alt="Noraiz Amaan 3D Avatar" />
        </div>
      </div>
    </section>
  );
}
