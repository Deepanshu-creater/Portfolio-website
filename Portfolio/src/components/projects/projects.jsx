// projects.jsx — Redesigned Glassmorphism Grid v2.0
// Performance: CSS transitions only, React.memo, no filter animations
import React, { memo } from 'react';
import { motion } from 'framer-motion';
import './projects.css';

// ============================================
// PROJECTS DATA — with correct live links
// ============================================
const projectsData = [
  {
    id: 'unme',
    title: 'U&Me',
    subtitle: 'Real-Time Communication Protocol',
    desc: 'A real-time chat app engineered for seamless, low-latency conversations. Features typing indicators, online status, and message persistence.',
    tech: ['React', 'Node.js', 'MongoDB', 'Socket.io', 'WebSockets'],
    link: 'https://u-me-chat-app.vercel.app/',
    github: null,
    status: 'Live',
    accent: '#00ffff',
    metrics: { uptime: '99.9%', latency: '<50ms' },
  },
  {
    id: 'portfolio',
    title: 'Portfolio Website',
    subtitle: 'Futuristic Developer OS',
    desc: 'An immersive, cinematic portfolio experience built as a futuristic operating system interface with dynamic themes and holographic UI.',
    tech: ['React', 'Framer Motion', 'CSS3', 'EmailJS'],
    link: 'https://myportfolio-ten-iota.vercel.app/',
    github: 'https://github.com/Deepanshu-creater',
    status: 'Live',
    accent: '#aa00ff',
    metrics: { uptime: '99.7%', latency: '<30ms' },
  },
  {
  id: 'codeflux',
  title: 'CodeFlux',
  subtitle: 'AI-Powered Real-Time Collaborative IDE',
  desc: 'A full-stack collaborative coding platform that enables multiple developers to code together in real time with AI assistance, live chat, code execution, and seamless project sharing.',
  tech: [
    'React.js',
    'Node.js',
    'Express.js',
    'MongoDB',
    'Socket.IO',
    'Monaco Editor',
    'Judge0 API',
    'Gemini AI'
  ],
  link: 'https://codefluz.vercel.app/',
  github: null,
  status: 'Production',
  accent: '#00d9ff',
  metrics: {
    uptime: '99.2%',
    latency: '<80ms'
  }
},
];

// ============================================
// ENTRANCE ANIMATION VARIANTS
// ============================================
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 22 },
  },
};

// ============================================
// SINGLE PROJECT CARD (memoized)
// ============================================
const ProjectCard = memo(({ project }) => {
  return (
    <motion.div
      className={`proj-card proj-card--${project.id}`}
      variants={cardVariants}
      style={{ '--card-accent': project.accent }}
    >
      {/* Top bar */}
      <div className="proj-card__topbar">
        <span className={`proj-card__status proj-card__status--${project.status === 'Live' ? 'live' : 'beta'}`}>
          <span className="proj-card__status-dot" />
          {project.status}
        </span>
        <div className="proj-card__metrics">
          <span className="proj-card__metric">{project.metrics.uptime} uptime</span>
          <span className="proj-card__metric-sep">·</span>
          <span className="proj-card__metric">{project.metrics.latency} latency</span>
        </div>
      </div>

      {/* Title */}
      <h3 className="proj-card__title">{project.title}</h3>
      <p className="proj-card__subtitle">{project.subtitle}</p>

      {/* Description */}
      <p className="proj-card__desc">{project.desc}</p>

      {/* Tech pills */}
      <div className="proj-card__tech">
        {project.tech.map((t) => (
          <span key={t} className="proj-card__pill">{t}</span>
        ))}
      </div>

      {/* CTA buttons */}
      <div className="proj-card__actions">
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="proj-card__btn proj-card__btn--primary"
        >
          <i className="fas fa-external-link-alt" />
          Live Demo
        </a>
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="proj-card__btn proj-card__btn--ghost"
          >
            <i className="fab fa-github" />
            GitHub
          </a>
        )}
      </div>

      {/* Decorative accent line */}
      <div className="proj-card__accent-line" />
    </motion.div>
  );
});

// ============================================
// MAIN PROJECTS COMPONENT
// ============================================
export default function Projects() {
  return (
    <div className="projects-container">
      {/* Header */}
      <div className="projects-header">
        <div className="projects-header__deco">
          <span className="projects-header__line" />
          <span className="projects-header__diamond">◆</span>
          <span className="projects-header__line" />
        </div>
        <h2 className="projects-header__title">
          <span className="projects-header__bracket">[</span>
          Deployed Systems
          <span className="projects-header__bracket">]</span>
        </h2>
        <p className="projects-header__sub">Active production modules and experimental builds</p>
        <div className="projects-header__status">
          <span className="projects-header__status-dot" />
          ALL SYSTEMS OPERATIONAL
        </div>
      </div>

      {/* Cards grid */}
      <motion.div
        className="projects-grid"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {projectsData.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </motion.div>
    </div>
  );
}