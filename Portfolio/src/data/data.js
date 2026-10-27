/* ============================================================
   ALL PORTFOLIO CONTENT LIVES HERE — EDIT THIS FILE ONLY
   ============================================================ */

export const profile = {
  name: "Deepanshu Sharma",
  firstName: "DEEPANSHU",
  lastName: "SHARMA",
  role: "Full-Stack Developer",
  location: "Delhi, India",
  summary:
    "Full-stack engineer skilled in the MERN stack, Docker, and AWS, with hands-on experience in real-time systems and LLM/AI integration. Final-year B.Tech CSE (CGPA 9.36), GATE 2026 qualified.",
  // Drop your photo at: Portfolio/public/profile.jpg
  photo: "/profile.jpg",
  // Drop your resume at: Portfolio/public/resume.pdf
  resume: "/resume.pdf",
  email: "deepanshu190920005@gmail.com",
  phone: "+91 9821746617",
  phoneHref: "tel:+919821746617",
  linkedin: "https://linkedin.com/in/deepanshu-sharma-3594a6319",
  linkedinLabel: "linkedin.com/in/deepanshu-sharma-3594a6319",
  github: "https://github.com/Deepanshu-creater",
  portfolio: "https://myportfolio-ten-iota.vercel.app",
  portfolioLabel: "myportfolio-ten-iota.vercel.app",
};

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export const hero = {
  tagline: "FULL-STACK DEVELOPER",
  location: "DELHI, INDIA",
  flipBackTitle: "HELLO, I BUILD THINGS THAT SCALE",
  flipBackStack: ["JS", "REACT", "NODE", "DOCKER", "AWS"],
  gateSticker: "GATE 2026 ✦ QUALIFIED",
  statusSticker: "● AVAILABLE — OPEN TO WORK",
  quickFacts: [
    { k: "ROLE", v: "Full-Stack Dev" },
    { k: "BASE", v: "Delhi, India" },
    { k: "CGPA", v: "9.36 / 10" },
    { k: "GATE", v: "2026 Qualified" },
    { k: "FOCUS", v: "MERN + AI" },
  ],
};

/* Derived from the Sharnex experience bullets — fills the sidebar */
export const experienceStats = [
  { value: "5", label: "RBAC USER ROLES" },
  { value: "3", label: "INVENTORY TIERS" },
  { value: "2", label: "VALUATION ENGINES" },
  { value: "3", label: "APPROVAL LEVELS" },
];

export const experienceStack = [
  "PostgreSQL",
  "RBAC",
  "FIFO",
  "Weighted-Average",
  "GRN/QC",
  "MOQ Alerts",
  "Append-Only Ledger",
  "ERP",
];

export const experienceSticker = "STILL SHIPPING →";

export const marquee = {
  top: ["FULL-STACK", "MERN", "DOCKER", "AWS", "REAL-TIME", "AI"],
  mid: ["WEBSOCKETS", "OPERATIONAL TRANSFORMATION", "CI/CD", "LLM INTEGRATION", "POSTGRESQL", "RBAC"],
  bottom: ["OPEN TO WORK", "LET'S BUILD SOMETHING LOUD", "HIRE ME", "SHIPPING FAST", "DELHI → WORLD"],
};

export const about = {
  paragraphs: [
    "I'm a final-year B.Tech CSE student at GGSIPU, Delhi, and a full-stack developer who ships production software — not just side projects.",
    "Day to day I work across the MERN stack with Docker and AWS, building real-time systems (WebSockets, operational transformation) and wiring LLM/AI assistance into everyday developer tools.",
  ],
  stats: [
    { value: "9.36", label: "B.TECH CGPA", note: "OUT OF 10", color: "sun" },
    { value: "GATE", label: "2026 QUALIFIED", note: "CSE", color: "hot" },
    { value: "2+", label: "PRODUCTION APPS", note: "LIVE & SCALING", color: "electric" },
  ],
};

export const experience = [
  {
    role: "Full-Stack Developer",
    company: "Sharnex",
    location: "Delhi",
    period: "July 2026 – October 2026",
    points: [
      "Designed a multi-tier inventory and warehouse management module (Central > Site > Sub-store) for a construction ERP, with real-time stock tracking via an append-only, partitioned PostgreSQL ledger.",
      "Built a multi-level indent approval workflow with automatic value-based routing (Site Engineer > Project Manager > Owner), enforcing RBAC across 5 user roles and approval thresholds.",
      "Implemented FIFO and Weighted-Average inventory valuation engines, GRN/QC processing with partial-acceptance handling, and automated MOQ-based purchase alerts via scheduled checks.",
      "Architected a secure, invite-only onboarding flow with server-driven role assignment, eliminating client-side role selection to prevent privilege escalation.",
    ],
  },
];

export const projects = [
  {
    index: "01",
    name: "CodeFlux",
    subtitle: "Real-Time AI Collaborative IDE with Automated Deployment",
    color: "hot",
    image: "/projects/codeflux.png",
    points: [
      "Real-time collaborative IDE using WebSockets and Operational Transformation (OT) for conflict-free simultaneous editing.",
      "Docker-based sandboxed code execution isolating each user's runtime across multiple languages, extended to a real-time interactive terminal inside containers.",
      "LLM-powered coding assistance (code generation, debugging, inline suggestions).",
      "One-click CI/CD deployment pipeline to deploy projects directly from the IDE.",
    ],
    tags: ["WebSockets", "OT", "Docker", "LLM", "CI/CD"],
    live: null,
    github: "https://github.com/Deepanshu-creater",
  },
  {
    index: "02",
    name: "U&me",
    subtitle: "Multilingual Real-Time Chat App",
    color: "sun",
    image: "/projects/uandme.png",
    points: [
      "Real-time messaging with WebSockets and automatic language detection + translation APIs for cross-language chat.",
      "Production Node.js/MongoDB backend serving 20+ active users with 99%+ uptime; optimized queries and indexing for message delivery under 100ms.",
      "Secure auth (JWT/OAuth), persistent message storage, responsive mobile-first UI with React and Tailwind CSS.",
    ],
    tags: ["React", "Node.js", "MongoDB", "Socket.IO", "JWT", "Tailwind"],
    live: "https://u-me-chat-app.vercel.app",
    github: "https://github.com/Deepanshu-creater",
  },
];

export const skills = [
  {
    group: "FRONTEND & BACKEND",
    color: "sun",
    items: [
      "React.js",
      "HTML5",
      "CSS3",
      "JavaScript (ES6+)",
      "Node.js",
      "Express.js",
      "REST APIs",
      "Socket.IO",
      "JWT Authentication",
    ],
  },
  {
    group: "AI/ML & TOOLS",
    color: "hot",
    items: [
      "Claude API",
      "Ollama",
      "GitHub Copilot",
      "AI-assisted development",
      "Git",
      "GitHub",
      "VS Code",
      "Postman",
    ],
  },
  {
    group: "DATABASE & CLOUD",
    color: "electric",
    items: ["Docker", "AWS (EC2, S3, CloudFront)", "Vercel", "Render", "MongoDB"],
  },
  {
    group: "LANGUAGES",
    color: "ink",
    items: ["JavaScript", "C", "C++", "Java"],
  },
];

export const education = [
  {
    degree: "B.Tech in Computer Science",
    school: "Guru Gobind Singh Indraprastha University, Delhi",
    year: "2027",
    note: "CGPA 9.36/10 · Coursework: DSA, OS, DBMS",
  },
  {
    degree: "Senior Secondary",
    school: "Government Sarvodaya Bal Vidyalaya, Delhi",
    year: "2023",
    note: "PCMB — 84.4%",
  },
];

export const award = {
  title: "GATE (CSE) 2026",
  subtitle: "QUALIFIED",
  note: "IIT GUWAHATI · 2026",
};

/*
   CONTACT FORM — Formspree-ready.
   1. Go to https://formspree.io and create a free form.
   2. Paste your form ID below (e.g. "xzayvngq").
   3. If left empty, the form falls back to opening your mail app (mailto).
*/
export const formspreeId = "";

export const footerNote = "BUILT WITH REACT + FRAMER MOTION + TOO MUCH CHAI";
