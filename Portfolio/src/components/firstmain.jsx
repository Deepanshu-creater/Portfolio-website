// Updated JSX — Firstmain.jsx
import React, { useState } from 'react';
import './firstmain.css';
import ProfilePic from './Screenshot 2025-03-15 234000.png';
import Pdf from './Deepanshu Sharma Resume.pdf';
import Skills from '../components/skill/skill';
import Projects from '../components/projects/projects';
import About from '../components/about/about';
import Contact from '../components/contact/contact';

export default function Firstmain() {
  const [cross, setCross] = useState(true);
  return (
    <>
      <div className='portfolio-container' id="main">
        <button className="cross-toggle" onClick={() => setCross(!cross)}>
          {cross ? "☰ Open" : "✖ Close"}
        </button>

        <h3 className="logo">Portfolio.</h3>
        <nav className={`navbar ${cross ? "hide-content" : ""}`}>
          <ul className="nav-links">
            <li><a href="#main">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>

        <div className="hero-section frosted-glass">
          <div className="hero-text">
            <h4>Hello, It's Me</h4>
            <h1><strong>Deepanshu Sharma</strong></h1>
            <h4>
              And I'm a <span className="highlight">Full-Stack Developer</span>
            </h4>
            <p>
              I love building innovative and scalable web applications that solve real-world problems.
            </p>

            <div className="social-icons">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram" />
            </a>
  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
    <i className="fab fa-twitter"></i>
  </a>
  <a href="https://github.com" target="_blank" rel="noopener noreferrer">
    <i className="fab fa-github"></i>
  </a>
  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
    <i className="fab fa-linkedin-in"></i>
  </a>
</div>

            <a href={Pdf} download="My_CV.pdf">
              <button className="download-cv">Download CV</button>
            </a>
          </div>

          <div className="hero-image">
            <div className="img-border">
              <img src={ProfilePic} alt="Profile" />
            </div>
          </div>
        </div>
      </div>

      {/* Sections */}
      <div id="about" className="frosted-glass" style={{ background: '#1a1a2e' }}>
  <About />
</div>

      <div id="skills" className="frosted-glass"><Skills /></div>
      <div id="projects" className="frosted-glass"><Projects /></div>
      <div id="contact" className="frosted-glass"><Contact /></div>

      <footer className="footer">
        <div className="footer-content">
          <h3>Deepanshu Sharma</h3>
          <p>Building scalable, fast, and beautiful web apps.</p>

          <ul className="footer-nav">
            <li><a href="#main">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>

          <div className="footer-socials">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram" />
          </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter" />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-github" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin-in" />
            </a>
          </div>

          <p className="footer-credit">© 2025 Deepanshu Sharma. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
