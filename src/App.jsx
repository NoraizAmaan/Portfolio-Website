import React, { useEffect, useState } from "react";
import Loader from "./components/Loader";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Dashboard from "./components/Dashboard";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  // Scroll logic for showing/hiding top button when reaching the contact section
  useEffect(() => {
    if (isLoading) return;

    const toggleScrollBtn = () => {
      const contactEl = document.getElementById("contactMe");
      if (contactEl) {
        const contactTopOffset = contactEl.offsetTop;
        // Show button once user scrolls near or into the contact section
        if (window.scrollY >= contactTopOffset - 200) {
          setShowScrollBtn(true);
        } else {
          setShowScrollBtn(false);
        }
      } else {
        // Fallback if contactMe section is not found
        if (window.scrollY > 1500) {
          setShowScrollBtn(true);
        } else {
          setShowScrollBtn(false);
        }
      }
    };

    window.addEventListener("scroll", toggleScrollBtn);
    return () => window.removeEventListener("scroll", toggleScrollBtn);
  }, [isLoading]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // IntersectionObserver for fade-in animations on scroll
  useEffect(() => {
    if (isLoading) {
      document.body.classList.add("scroll-lock");
      return;
    }

    document.body.classList.remove("scroll-lock");

    // Allow components to mount before running querySelector
    const timer = setTimeout(() => {
      const fadeElements = document.querySelectorAll(".fade-in");
      const revealOnScroll = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("appear");
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: "0px 0px -50px 0px"
        }
      );

      fadeElements.forEach((el) => {
        revealOnScroll.observe(el);
      });

      return () => revealOnScroll.disconnect();
    }, 100);

    return () => clearTimeout(timer);
  }, [isLoading]);

  return (
    <>
      {isLoading ? (
        <Loader onFinished={() => setIsLoading(false)} />
      ) : (
        <div id="wrapper">
          {/* Background Glow Elements */}
          <div className="glow-blob blob-1"></div>
          <div className="glow-blob blob-2"></div>
          <div className="glow-blob blob-3"></div>

          <Header />
          <Hero />
          <Experience />
          <Projects />
          <Skills />
          <Dashboard />
          <Contact />
          <Footer />

          {/* Scroll to Top Button */}
          <button 
            className={`scroll-to-top-btn ${showScrollBtn ? "visible" : ""}`}
            onClick={scrollToTop}
            aria-label="Scroll to top"
            title="Scroll to top"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="19" x2="12" y2="5"></line>
              <polyline points="5 12 12 5 19 12"></polyline>
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
