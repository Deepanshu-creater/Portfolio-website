// Firstmain.jsx — Premium scroll-based portfolio v7.0 (FIXED THEME)
// React + Plain CSS + Framer Motion + GSAP ScrollTrigger
// Includes AUTO theme rotation + 6 premium themes (dark & bright)
// NO on-screen notifications - silent theme changes

import React, {
  useState, useEffect, useRef, useCallback, useMemo, memo,
} from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './firstmain.css';

import Skills from '../components/skill/skill';
import Projects from '../components/projects/projects';
import About from '../components/about/about';
import Contact from '../components/contact/contact';

gsap.registerPlugin(ScrollTrigger);

/* =====================================================
   THEME CONFIGURATION — 6 premium themes (dark + bright)
===================================================== */
const THEMES = {
  emerald: {
    name: 'Emerald', primary: '#10B981', primaryLight: '#34D399', primaryDark: '#059669',
    secondary: '#10B981', bgDark: '#0A0A0A', bgCard: '#1A1A1A', bgSurface: '#2A2A2A',
    text: '#FFFFFF', textMuted: '#9CA3AF', ringColor: '#10B981',
    glowColor: 'rgba(16,185,129,0.15)', gradientStart: '#0A0A0A', gradientEnd: '#064E3B',
  },
  royal: {
    name: 'Royal', primary: '#6366F1', primaryLight: '#818CF8', primaryDark: '#4F46E5',
    secondary: '#6366F1', bgDark: '#0F0F1A', bgCard: '#1A1A2E', bgSurface: '#252542',
    text: '#FFFFFF', textMuted: '#A5B4FC', ringColor: '#6366F1',
    glowColor: 'rgba(99,102,241,0.15)', gradientStart: '#0F0F1A', gradientEnd: '#1E1B4B',
  },
  rose: {
    name: 'Rose', primary: '#F43F5E', primaryLight: '#FB7185', primaryDark: '#E11D48',
    secondary: '#F43F5E', bgDark: '#0F0A0C', bgCard: '#1C1417', bgSurface: '#2D1F24',
    text: '#FFFFFF', textMuted: '#FDA4AF', ringColor: '#F43F5E',
    glowColor: 'rgba(244,63,94,0.12)', gradientStart: '#0F0A0C', gradientEnd: '#2B0D16',
  },
  amber: {
    name: 'Amber', primary: '#F59E0B', primaryLight: '#FBBF24', primaryDark: '#D97706',
    secondary: '#F59E0B', bgDark: '#FFFBF5', bgCard: '#FFFFFF', bgSurface: '#FEF3C7',
    text: '#1F2937', textMuted: '#92400E', ringColor: '#F59E0B',
    glowColor: 'rgba(245,158,11,0.1)', gradientStart: '#FFFBF5', gradientEnd: '#FEF7E6',
  },
  arctic: {
    name: 'Arctic', primary: '#06B6D4', primaryLight: '#22D3EE', primaryDark: '#0891B2',
    secondary: '#06B6D4', bgDark: '#F0F9FF', bgCard: '#FFFFFF', bgSurface: '#E0F2FE',
    text: '#0F172A', textMuted: '#475569', ringColor: '#06B6D4',
    glowColor: 'rgba(6,182,212,0.08)', gradientStart: '#F0F9FF', gradientEnd: '#E0F2FE',
  },
};

/* =====================================================
   TYPING HOOK
===================================================== */
function useTypingEffect(items) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = items[index];
    let t;
    if (deleting) {
      if (text.length === 0) { setDeleting(false); setIndex(i => (i + 1) % items.length); }
      else t = setTimeout(() => setText(s => s.slice(0, -1)), 30);
    } else {
      if (text.length === current.length) t = setTimeout(() => setDeleting(true), 2600);
      else t = setTimeout(() => setText(current.slice(0, text.length + 1)), 60);
    }
    return () => clearTimeout(t);
  }, [text, deleting, index, items]);
  return text;
}

/* =====================================================
   DATA
===================================================== */
const ROLES = [
  'Full-Stack Developer',
  'AI / ML Enthusiast',
  'MERN Stack Engineer',
  'Real-Time Platform Builder',
];

const NAV_LINKS = [
  { id: 'hero', label: 'Home' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

const TECH_STACK = [
  { name: 'React',      emoji: '⚛️' },
  { name: 'Node.js',    emoji: '💚' },
  { name: 'Express',    emoji: '🚂' },
  { name: 'MongoDB',    emoji: '🍃' },
  { name: 'JavaScript', emoji: '🟡' },
  { name: 'TypeScript', emoji: '🔷' },
  { name: 'C++',        emoji: '⚙️' },
  { name: 'Python',     emoji: '🐍' },
  { name: 'TensorFlow', emoji: '🧠' },
  { name: 'Git',        emoji: '🌿' },
  { name: 'Docker',     emoji: '🐳' },
];

const SOCIAL_LINKS = [
  { icon: 'fab fa-github',      link: 'https://github.com/Deepanshu-creater', label: 'GitHub' },
  { icon: 'fab fa-linkedin-in', link: 'https://www.linkedin.com/in/deepanshu-sharma-3594a6319/', label: 'LinkedIn' },
  { icon: 'fas fa-envelope',    link: 'mailto:deepanshu@example.com', label: 'Email' },
  { icon: 'fas fa-code',        link: 'https://leetcode.com/', label: 'LeetCode' },
];

/* =====================================================
   ORBITING TECH STACK (around avatar)
===================================================== */
const OrbitTech = memo(({ items }) => (
  <div className="orbit-stack" aria-hidden="true">
    <div className="orbit-ring orbit-ring--1" />
    <div className="orbit-ring orbit-ring--2" />
    {items.map((tech, i) => {
      const angle = (i / items.length) * 360;
      return (
        <div
          key={tech.name}
          className="orbit-arm"
          style={{ '--angle': `${angle}deg`, '--delay': `${-(i / items.length) * 30}s` }}
        >
          <div className="orbit-counter">
            <div className="orbit-badge" title={tech.name}>
              <span className="orbit-emoji">{tech.emoji}</span>
            </div>
          </div>
        </div>
      );
    })}
  </div>
));

/* =====================================================
   NAVBAR
===================================================== */
const Navbar = memo(({ active, onNavigate }) => {
  const [open, setOpen] = useState(false);
  return (
    <nav className="navbar">
      <div className="nav-inner">
        <button className="nav-logo" onClick={() => onNavigate('hero')}>
          <span className="logo-mark">DS</span>
          <span className="logo-pulse" />
        </button>
        <ul className={`nav-links ${open ? 'open' : ''}`}>
          {NAV_LINKS.map(l => (
            <li key={l.id}>
              <button
                className={`nav-link ${active === l.id ? 'active' : ''}`}
                onClick={() => { onNavigate(l.id); setOpen(false); }}
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>
        <button
          className={`nav-burger ${open ? 'open' : ''}`}
          onClick={() => setOpen(o => !o)}
          aria-label="Menu"
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
});

/* =====================================================
   MAIN COMPONENT
===================================================== */
export default function Firstmain() {
  const [activeTheme ,setActiveTheme] = useState('emerald');
  const [autoMode, setAutoMode] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');

  const heroRef = useRef(null);
  const projectsRef = useRef(null);
  const skillsRef = useRef(null);
  const contactRef = useRef(null);

  const sectionRefs = useMemo(() => ({
    hero: heroRef, projects: projectsRef, skills: skillsRef, contact: contactRef,
  }), []);

  const currentTheme = THEMES[activeTheme];

  // Auto theme rotation effect (silent - no notifications)
  const themeKeys = useMemo(() => Object.keys(THEMES), []);
useEffect(() => {
  if (!autoMode) return;

  const interval = setInterval(() => {
    setActiveTheme((prevTheme) => {
      const currentIndex = themeKeys.indexOf(prevTheme);
      const nextIndex = (currentIndex + 1) % themeKeys.length;
      return themeKeys[nextIndex];
    });
  }, 8000);

  return () => clearInterval(interval);
}, [autoMode, themeKeys]);

  /* Apply theme variables directly to document element */
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('theme-transitioning');
    const t = currentTheme;
    
    // Apply all theme CSS variables
    root.style.setProperty('--theme-primary', t.primary);
    root.style.setProperty('--theme-primary-light', t.primaryLight);
    root.style.setProperty('--theme-primary-dark', t.primaryDark);
    root.style.setProperty('--theme-secondary', t.secondary);
    root.style.setProperty('--theme-bg-dark', t.bgDark);
    root.style.setProperty('--theme-bg-card', t.bgCard);
    root.style.setProperty('--theme-bg-surface', t.bgSurface);
    root.style.setProperty('--theme-text', t.text);
    root.style.setProperty('--theme-text-muted', t.textMuted);
    root.style.setProperty('--theme-ring-color', t.ringColor);
    root.style.setProperty('--theme-glow-color', t.glowColor);
    root.style.setProperty('--theme-gradient-start', t.gradientStart);
    root.style.setProperty('--theme-gradient-end', t.gradientEnd);
    
    // Also update body background directly for immediate effect
    document.body.style.backgroundColor = t.bgDark;
    
    const id = setTimeout(() => {
      root.classList.remove('theme-transitioning');
    }, 500);
    return () => clearTimeout(id);
  }, [currentTheme]);

  /* GSAP ScrollTrigger reveals */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.reveal-up').forEach(el => {
        gsap.from(el, {
          y: 60, opacity: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' },
        });
      });

      gsap.utils.toArray('.reveal-stagger').forEach(group => {
        gsap.from(group.children, {
          y: 40, opacity: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: group, start: 'top 85%', toggleActions: 'play none none reverse' },
        });
      });

      gsap.utils.toArray('.parallax-slow').forEach(el => {
        gsap.to(el, {
          yPercent: -15, ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
        });
      });

      // Active section detection
      Object.entries(sectionRefs).forEach(([id, ref]) => {
        if (!ref.current) return;
        ScrollTrigger.create({
          trigger: ref.current,
          start: 'top 50%',
          end: 'bottom 50%',
          onToggle: self => self.isActive && setActiveSection(id),
        });
      });
    });
    return () => ctx.revert();
  }, [sectionRefs]);

  /* Scroll progress for hero */
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

  const navigateTo = useCallback((id) => {
    sectionRefs[id]?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [sectionRefs]);

  const displayRole = useTypingEffect(ROLES);

  return (
    <div className="portfolio-root">
      {/* Background Layer */}
      <div className="bg-layer" aria-hidden="true">
        <div className="bg-gradient" />
        <div className="bg-grid" />
        <div className="bg-blob bg-blob--1" />
        <div className="bg-blob bg-blob--2" />
        <div className="bg-blob bg-blob--3" />
      </div>

      <Navbar active={activeSection} onNavigate={navigateTo} />

      {/* ============ HERO ============ */}
      <section id="hero" ref={heroRef} className="snap-section hero-section">
        <motion.div
          className="hero-inner"
          style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
        >
          <div className="hero-grid">
            <div className="hero-left">
              <motion.span
                className="hero-eyebrow"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                ◆ AVAILABLE FOR OPPORTUNITIES
              </motion.span>

              <motion.h1
                className="hero-name"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.7 }}
              >
                Deepanshu <br /><span className="hero-name-accent">Sharma</span>
              </motion.h1>

              <motion.div
                className="hero-role"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <span className="role-prefix">›</span>
                <span className="role-text">{displayRole}</span>
                <span className="role-cursor" />
              </motion.div>

              <motion.p
                className="hero-intro"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
              >
                I craft real-time, AI-integrated platforms — from multilingual chat
                systems to collaborative IDEs. Building thoughtful software that
                people actually use.
              </motion.p>

              <motion.div
                className="hero-ctas"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <button className="btn btn--primary" onClick={() => navigateTo('projects')}>
                  <i className="fas fa-rocket" /> View Projects
                </button>
                <button className="btn btn--secondary" onClick={() => navigateTo('contact')}>
                  <i className="fas fa-paper-plane" /> Contact Me
                </button>
                <a className="btn btn--ghost" href="/New_Deepanshu Sharma_Resume.pdf" download>
                  <i className="fas fa-download" /> Resume
                </a>
              </motion.div>

              <motion.div
                className="hero-socials"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.85 }}
              >
                {SOCIAL_LINKS.map(s => (
                  <a key={s.label} href={s.link} target="_blank" rel="noopener noreferrer"
                     className="social-btn" aria-label={s.label}>
                    <i className={s.icon} />
                  </a>
                ))}
              </motion.div>
            </div>

            <div className="hero-right">
              <motion.div
                className="orbit-wrap"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.8, type: 'spring' }}
              >
                <div className="profile-core">
                  <div className="profile-avatar">DS</div>
                  <div className="profile-pulse" />
                </div>
                <OrbitTech items={TECH_STACK} />
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          onClick={() => navigateTo('projects')}
        >
          <span>SCROLL</span>
          <div className="scroll-mouse"><span /></div>
        </motion.div>
      </section>

      {/* ============ PROJECTS ============ */}
      <section id="projects" ref={projectsRef} className="snap-section panel-section">
        <div className="section-head reveal-up">
          <span className="section-eyebrow">◆ WORK</span>
          <h2 className="section-title">Selected Projects</h2>
          <p className="section-sub">Real systems serving real users.</p>
        </div>
        <div className="section-body reveal-stagger">
          <Projects />
        </div>
      </section>

      {/* ============ SKILLS ============ */}
      <section id="skills" ref={skillsRef} className="snap-section panel-section">
        <div className="section-head reveal-up">
          <span className="section-eyebrow">◆ TOOLKIT</span>
          <h2 className="section-title">Skills &amp; Stack</h2>
          <p className="section-sub">Technologies I build with daily.</p>
        </div>
        <div className="section-body parallax-slow reveal-stagger">
          <Skills />
        </div>
        <div className="about-inline reveal-up">
          <About />
        </div>
      </section>

      {/* ============ CONTACT ============ */}
      <section id="contact" ref={contactRef} className="snap-section panel-section contact-section">
        <div className="section-head reveal-up">
          <span className="section-eyebrow">◆ SAY HELLO</span>
          <h2 className="section-title">Let's build together</h2>
          <p className="section-sub">Got an idea, role, or collaboration in mind?</p>
        </div>
        <div className="section-body reveal-up">
          <Contact />
        </div>

        <footer className="site-footer">
          <span className="footer-copy">© 2026 Deepanshu Sharma</span>
          <span className="footer-dot" />
          <span className="footer-brand">DS_OS v7.0</span>
          <span className="footer-dot" />
          <span className="footer-status">
            <span className="footer-pulse" /> ALL SYSTEMS OPERATIONAL
          </span>
        </footer>
      </section>
    </div>
  );
}