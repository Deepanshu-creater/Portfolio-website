import React, { useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import './about.css';

// ============================================
// ANIMATION VARIANTS
// ============================================
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 100, damping: 20 }
  }
};

const statCounterVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 120, damping: 15 }
  }
};

// ============================================
// DIGITAL IDENTITY CARD
// ============================================
const IdentityCard = ({ icon, title, content, delay }) => (
  <motion.div
    className="identity-card"
    variants={itemVariants}
    whileHover={{ y: -5, scale: 1.02 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
  >
    <div className="identity-card-header">
      <span className="identity-icon">{icon}</span>
      <h3 className="identity-title">{title}</h3>
    </div>
    <p className="identity-content">{content}</p>
    <div className="identity-card-glow" />
  </motion.div>
);

// ============================================
// ANIMATED STATISTIC
// ============================================
const AnimatedStatistic = ({ value, label, suffix, delay }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  return (
    <motion.div
      ref={ref}
      className="stat-item"
      variants={statCounterVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ delay }}
    >
      <span className="stat-value">
        {value}
        <span className="stat-suffix">{suffix}</span>
      </span>
      <span className="stat-label">{label}</span>
    </motion.div>
  );
};

// ============================================
// MAIN ABOUT COMPONENT
// ============================================
export default function About() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const identityCards = [
    {
      icon: "🎯",
      title: "Mission Protocol",
      content: "Engineering scalable, real-time web ecosystems that push the boundaries of user experience and system architecture. Every line of code serves a purpose in the grand design of seamless digital interaction."
    },
    {
      icon: "🧬",
      title: "Core Architecture",
      content: "Specialized in MERN stack deployment with deep integration of WebSocket communication layers, AI model orchestration, and cloud-native infrastructure for production-grade applications."
    },
    {
      icon: "⚡",
      title: "Problem Solving Matrix",
      content: "Trained in algorithmic thinking through C, C++, and Java. Each challenge is approached as a system to be optimized, not just a bug to be fixed. Data structures are the foundation of elegant solutions."
    },
    {
      icon: "🤖",
      title: "AI Systems Integration",
      content: "Passionate about bridging traditional web development with cutting-edge AI capabilities. Integrating models like Claude and Ollama into real-time collaborative platforms for next-gen user experiences."
    }
  ];

  return (
    <motion.div
      className="about-identity-container"
      ref={sectionRef}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {/* Holographic header */}
      <motion.div className="about-header" variants={itemVariants}>
        <div className="about-header-decorator">
          <span className="decorator-diamond">◆</span>
          <span className="decorator-text">IDENTITY_PROFILE</span>
          <span className="decorator-diamond">◆</span>
        </div>
        <h2 className="about-title">
          <span className="about-bracket">{'//'}</span> Developer Matrix
        </h2>
        <p className="about-subtitle">Holographic identity panel v3.0</p>
      </motion.div>

      {/* Bio section */}
      <motion.div className="about-bio-section" variants={itemVariants}>
        <div className="bio-avatar-area">
          <motion.div 
            className="bio-avatar"
            animate={{
              boxShadow: [
                "0 0 20px rgba(0,255,255,0.15)",
                "0 0 40px rgba(0,255,255,0.3)",
                "0 0 20px rgba(0,255,255,0.15)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span className="avatar-initials">DS</span>
            <div className="avatar-scan-line" />
          </motion.div>
          <div className="bio-status">
            <span className="bio-status-dot" />
            <span className="bio-status-text">ACTIVE DEVELOPER</span>
          </div>
        </div>
        <div className="bio-content">
          <motion.p className="bio-text" variants={itemVariants}>
            Full-stack developer engineering modern, responsive, and efficient web applications. 
            Passionate about creating seamless user experiences and solving real-world problems 
            through technology and innovative architecture.
          </motion.p>
          <motion.p className="bio-text" variants={itemVariants}>
            Specialized in MERN stack with expertise in scalable backend systems, intuitive 
            frontend interfaces, and cloud integrations. Currently exploring the frontiers 
            of AI-integrated real-time systems.
          </motion.p>
        </div>
      </motion.div>

      {/* Identity cards grid */}
      <motion.div className="identity-cards-grid" variants={containerVariants}>
        {identityCards.map((card, index) => (
          <IdentityCard
            key={card.title}
            icon={card.icon}
            title={card.title}
            content={card.content}
            delay={index * 0.1}
          />
        ))}
      </motion.div>

      {/* Statistics dashboard */}
      <motion.div className="about-stats-dashboard" variants={itemVariants}>
        <div className="stats-grid">
          <AnimatedStatistic value="10+" label="Projects Deployed" suffix="" delay={0.2} />
          <AnimatedStatistic value="3+" label="AI Integrations" suffix="" delay={0.3} />
          <AnimatedStatistic value="5+" label="Tech Domains" suffix="" delay={0.4} />
          <AnimatedStatistic value="24/7" label="Learning Mode" suffix="" delay={0.5} />
        </div>
      </motion.div>

      {/* Technology philosophy */}
      <motion.div className="about-philosophy" variants={itemVariants}>
        <div className="philosophy-quote">
          <span className="quote-mark">"</span>
          <p>
            Every system I build is a reflection of my belief that technology should be 
            invisible, intuitive, and powerful. The best code is the one that feels like magic 
            to the user while being robust to the engineer.
          </p>
          <span className="quote-attribution">— Deepanshu Sharma</span>
        </div>
      </motion.div>

      {/* Ambient scan effect */}
      <div className="about-scan-effect" />
    </motion.div>
  );
}