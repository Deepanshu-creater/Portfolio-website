import React, { useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import './skill.css';

// ============================================
// SKILLS DATA - FUTURISTIC TECH ECOSYSTEM
// ============================================
const skillCategories = [
  {
    category: "Frontend Systems",
    icon: "🖥",
    color: "#00ffff",
    skills: [
      { name: "React.js", level: 95, icon: "⚛️" },
      { name: "Next.js", level: 85, icon: "▲" },
      { name: "Redux", level: 88, icon: "🔄" },
      { name: "Framer Motion", level: 90, icon: "🎬" },
      { name: "CSS3/HTML5", level: 95, icon: "🎨" }
    ]
  },
  {
    category: "Backend Architecture",
    icon: "⚙️",
    color: "#ff00ff",
    skills: [
      { name: "Node.js", level: 92, icon: "💚" },
      { name: "Express.js", level: 90, icon: "🚂" },
      { name: "WebSockets", level: 85, icon: "🔌" },
      { name: "Socket.io", level: 88, icon: "📡" },
      { name: "REST APIs", level: 93, icon: "🔗" }
    ]
  },
  {
    category: "Database & Storage",
    icon: "🗄",
    color: "#00ff88",
    skills: [
      { name: "MongoDB", level: 90, icon: "🍃" },
      { name: "Firebase", level: 82, icon: "🔥" },
      { name: "AWS Lambda", level: 75, icon: "☁️" }
    ]
  },
  {
    category: "DevOps & AI Tools",
    icon: "🤖",
    color: "#ffaa00",
    skills: [
      { name: "Docker", level: 78, icon: "🐳" },
      { name: "Git/GitHub", level: 92, icon: "📦" },
      { name: "Ollama", level: 80, icon: "🦙" },
      { name: "Claude AI", level: 85, icon: "🧠" },
      { name: "AI Integration", level: 82, icon: "⚡" }
    ]
  },
  {
    category: "Languages",
    icon: "💻",
    color: "#ff6699",
    skills: [
      { name: "JavaScript", level: 95, icon: "JS" },
      { name: "C/C++", level: 80, icon: "C" },
      { name: "Java", level: 78, icon: "☕" },
      { name: "Python", level: 75, icon: "🐍" }
    ]
  }
];

// ============================================
// MAGNETIC SKILL CARD
// ============================================
const SkillCard = ({ category, index }) => {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });
  const rotateX = useTransform(springY, [-0.3, 0.3], ["5deg", "-5deg"]);
  const rotateY = useTransform(springX, [-0.3, 0.3], ["-5deg", "5deg"]);

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className="skill-card-futuristic"
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 800 }}
    >
      {/* Category header */}
      <div className="skill-card-header">
        <span className="category-icon">{category.icon}</span>
        <h3 className="category-name">{category.category}</h3>
        <span className="category-count">{category.skills.length} modules</span>
      </div>

      {/* Skills list */}
      <div className="skill-pills-container">
        {category.skills.map((skill, i) => (
          <motion.div
            key={skill.name}
            className="skill-pill-futuristic"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + index * 0.1 + i * 0.05 }}
            whileHover={{ scale: 1.05, y: -3 }}
          >
            <div className="pill-header">
              <span className="pill-icon">
                {skill.icon?.length > 2 ? '⚡' : skill.icon}
              </span>
              <span className="pill-name">{skill.name}</span>
            </div>
            <div className="pill-level-bar">
              <motion.div
                className="pill-level-fill"
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 + index * 0.1 + i * 0.05, ease: "easeOut" }}
                style={{
                  background: `linear-gradient(90deg, ${category.color}, ${category.color}60)`,
                  boxShadow: `0 0 10px ${category.color}40`
                }}
              />
            </div>
            <span className="pill-percentage">{skill.level}%</span>
          </motion.div>
        ))}
      </div>

      {/* Card edge accent */}
      <div className="card-accent-line" style={{ background: category.color }} />
    </motion.div>
  );
};

// ============================================
// FLOATING ORBITING PARTICLES
// ============================================
const OrbitingParticles = () => (
  <div className="orbiting-particles-container">
    {[...Array(12)].map((_, i) => (
      <motion.div
        key={i}
        className="orbit-particle"
        animate={{
          x: [0, Math.cos(i * 30 * Math.PI / 180) * 30, 0],
          y: [0, Math.sin(i * 30 * Math.PI / 180) * 30, 0],
          opacity: [0.2, 0.6, 0.2]
        }}
        transition={{
          duration: 4 + i * 0.3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: i * 0.2
        }}
        style={{
          left: `${50 + Math.cos(i * 30 * Math.PI / 180) * 40}%`,
          top: `${50 + Math.sin(i * 30 * Math.PI / 180) * 40}%`,
          background: i % 2 === 0 ? 'var(--theme-secondary)' : 'var(--theme-accent)'
        }}
      />
    ))}
  </div>
);

// ============================================
// MAIN SKILLS COMPONENT
// ============================================
export default function Skills() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <motion.div 
      className="skills-ecosystem-container"
      ref={sectionRef}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {/* Background orbiting particles */}
      <OrbitingParticles />

      {/* Section header */}
      <motion.div className="skills-header">
        <div className="skills-header-line" />
        <h2 className="skills-title">
          <span className="skills-title-bracket">[</span>
          Tech Ecosystem
          <span className="skills-title-bracket">]</span>
        </h2>
        <p className="skills-subtitle">Active neural modules and deployment stack</p>
        <div className="skills-header-line" />
      </motion.div>

      {/* Skills grid */}
      <motion.div 
        className="skills-grid-futuristic"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
        }}
      >
        {skillCategories.map((category, index) => (
          <SkillCard key={category.category} category={category} index={index} />
        ))}
      </motion.div>

      {/* System summary bar */}
      <motion.div 
        className="skills-summary-bar"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
      >
        <div className="summary-item">
          <span className="summary-value">{skillCategories.length}</span>
          <span className="summary-label">Domains</span>
        </div>
        <div className="summary-divider" />
        <div className="summary-item">
          <span className="summary-value">
            {skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0)}
          </span>
          <span className="summary-label">Technologies</span>
        </div>
        <div className="summary-divider" />
        <div className="summary-item">
          <span className="summary-value">
            {Math.round(skillCategories.reduce((acc, cat) => 
              acc + cat.skills.reduce((s, skill) => s + skill.level, 0) / cat.skills.length, 0
            ) / skillCategories.length)}%
          </span>
          <span className="summary-label">Avg Proficiency</span>
        </div>
      </motion.div>
    </motion.div>
  );
}