import React, { useEffect, useRef, useState } from "react";

export default function Loader({ onFinished }) {
  const canvasRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [statusMain, setStatusMain] = useState("Initializing System");
  const [statusSub, setStatusSub] = useState("Preparing all systems");
  
  // Matrix Code Rain Variables
  const matrixIntervalRef = useRef(null);

  // Terminal Lines State
  const [lines, setLines] = useState([
    { text: "", isCommand: true, className: "", showCursor: false },
    { text: "", isCommand: true, className: "", showCursor: false },
    { text: "", isCommand: true, className: "", showCursor: false },
    { text: "", isCommand: false, className: "terminal-loader", showCursor: false },
    { text: "", isCommand: false, className: "terminal-success", showCursor: false },
    { text: "", isCommand: false, className: "terminal-info", showCursor: false },
  ]);

  const [isSlideUp, setIsSlideUp] = useState(false);

  // Helper to type a line
  const typeLine = (lineIndex, text, speed) => {
    return new Promise((resolve) => {
      setLines((prev) => {
        const next = [...prev];
        next[lineIndex] = { ...next[lineIndex], showCursor: true, text: "" };
        return next;
      });

      let currentText = "";
      let charIndex = 0;

      const timer = setInterval(() => {
        if (charIndex < text.length) {
          currentText += text.charAt(charIndex);
          setLines((prev) => {
            const next = [...prev];
            next[lineIndex] = { ...next[lineIndex], text: currentText };
            return next;
          });
          charIndex++;
        } else {
          clearInterval(timer);
          setLines((prev) => {
            const next = [...prev];
            next[lineIndex] = { ...next[lineIndex], showCursor: false };
            return next;
          });
          resolve();
        }
      }, speed);
    });
  };

  // Helper to animate progress bar
  const animateProgress = (startVal, endVal, duration) => {
    const startTime = performance.now();
    return new Promise((resolve) => {
      function update(time) {
        const elapsed = time - startTime;
        const currentProgress = startVal + (endVal - startVal) * Math.min(1, elapsed / duration);
        setProgress(currentProgress);

        if (elapsed < duration) {
          requestAnimationFrame(update);
        } else {
          setProgress(endVal);
          resolve();
        }
      }
      requestAnimationFrame(update);
    });
  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Run Matrix Rain
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const matrixChars = ["0", "1", "#", "*", "(", "="];
    const fontSize = 14;
    let columns = Math.floor(canvas.width / fontSize);
    let drops = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -80;
    }

    const drawMatrix = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        if (Math.random() > 0.98) {
          ctx.fillStyle = "#ffffff";
        } else if (Math.random() > 0.5) {
          ctx.fillStyle = "rgba(6, 182, 212, 0.9)";
        } else {
          ctx.fillStyle = "rgba(99, 102, 241, 0.9)";
        }

        ctx.fillText(char, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const handleResize = () => {
      columns = Math.floor(canvas.width / fontSize);
      const oldLength = drops.length;
      if (columns > oldLength) {
        for (let i = oldLength; i < columns; i++) {
          drops[i] = Math.random() * -80;
        }
      } else {
        drops.length = columns;
      }
    };
    window.addEventListener("resize", handleResize);

    matrixIntervalRef.current = setInterval(drawMatrix, 40);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("resize", handleResize);
      if (matrixIntervalRef.current) {
        clearInterval(matrixIntervalRef.current);
      }
    };
  }, []);

  // Run Boot Sequence
  useEffect(() => {
    let active = true;

    const runSequence = async () => {
      // Phase 1: git init & add
      if (!active) return;
      setStatusMain("Initializing System");
      setStatusSub("Preparing all systems");
      animateProgress(0, 25, 1000);
      await typeLine(0, "git init && git add .", 35);
      await delay(150);

      // Phase 2: git commit
      if (!active) return;
      setStatusMain("Loading UI Textures");
      setStatusSub("Optimizing visual sprites");
      animateProgress(25, 48, 1000);
      await typeLine(1, "git commit -m \"chore: bootstrap\"", 28);
      await delay(150);

      // Phase 3: pnpm install
      if (!active) return;
      setStatusMain("Compiling Shaders");
      setStatusSub("Calibrating graphics engine");
      animateProgress(48, 72, 1100);
      await typeLine(2, "pnpm i && pnpm dev", 35);
      await delay(100);

      // Phase 4: compiling
      if (!active) return;
      animateProgress(72, 85, 600);
      await typeLine(3, "⌛ compiling...", 25);
      await delay(250);

      // Phase 5: build verification
      if (!active) return;
      setStatusMain("Download Complete");
      setStatusSub("Verification successful");
      animateProgress(85, 96, 600);
      await typeLine(4, "✓ types ok · ✓ lint ok · ✓ built in 1.23s", 18);
      await delay(150);

      // Phase 6: server ready
      if (!active) return;
      animateProgress(96, 100, 300);
      await typeLine(5, "localhost:5173 - ready", 18);

      if (!active) return;
      setStatusMain("Ready to Enter Portfolio");
      setStatusSub("Launching portfolio website...");
      await delay(600);

      if (!active) return;
      // Slide Up Transition
      setIsSlideUp(true);

      // Stop matrix loop for memory / CPU optimization
      if (matrixIntervalRef.current) {
        clearInterval(matrixIntervalRef.current);
      }

      await delay(850);
      onFinished();
    };

    runSequence();

    return () => {
      active = false;
    };
  }, [onFinished]);

  const roundedProgress = Math.min(100, Math.floor(progress));
  const assetsProgress = Math.min(100, Math.floor(roundedProgress * 1.0));
  const shadersProgress = Math.min(100, Math.floor(roundedProgress * 0.85));

  return (
    <div id="loader-overlay" className={isSlideUp ? "slide-up" : ""}>
      <canvas ref={canvasRef} id="matrix-canvas"></canvas>

      <div className="loader-container">
        {/* Terminal Box */}
        <div className="terminal-box">
          <div className="terminal-box-header">
            <div className="terminal-dots">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
            </div>
            <span className="terminal-title">~/workspace</span>
          </div>
          <div className="terminal-box-body">
            {lines.map((line, idx) => (
              <div className="typing-line" key={idx}>
                {line.isCommand && <span className="terminal-prompt">$ </span>}
                <span className={line.className}>{line.text}</span>
                {line.showCursor && <span className="terminal-cursor"></span>}
              </div>
            ))}
          </div>
        </div>

        {/* Code Scanning Highlight Text */}
        <div className="scanning-code-wrapper">
          <div className="scanning-highlight-bar"></div>
          <code className="scanning-code">
            {"const app = init(skills) => { return skills.map(s) && deploy(s) }"}
          </code>
        </div>

        {/* Launcher Dialog */}
        <div className="launcher-dialog">
          <div className="launcher-header">
            <span className="launcher-badge">LAUNCHER</span>
            <span className="launcher-subtitle">// Boot sequence</span>
            <div className="launcher-dots">
              <span className="launcher-dot orange"></span>
              <span className="launcher-dot gray"></span>
            </div>
          </div>
          <div className="launcher-content">
            <div className="launcher-status">
              <span className="status-indicator">&gt;</span>
              <span className="status-main">{statusMain}</span>
            </div>
            <div className="launcher-substatus">{statusSub}</div>

            <div className="progress-section">
              <div className="progress-header">
                <span className="progress-title">Installation Progress</span>
                <span className="progress-percentage">{roundedProgress}%</span>
              </div>
              <div className="progress-bar-track">
                <div className="progress-bar-fill" style={{ width: `${roundedProgress}%` }}></div>
              </div>
            </div>

            <div className="launcher-footer">
              <span className="footer-stat">Assets: {assetsProgress}%</span>
              <span className="footer-stat">Shaders: {shadersProgress}%</span>
              <span className="footer-stat" style={{ color: roundedProgress >= 100 ? "#10b981" : "" }}>
                {roundedProgress >= 100 ? "Network: Online" : "Network: Syncing..."}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
