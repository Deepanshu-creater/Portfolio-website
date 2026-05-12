import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import emailjs from 'emailjs-com';
import axios from 'axios';
import './contact.css';

// ============================================
// ENVIRONMENT VARIABLES INITIALIZATION
// ============================================
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT || '/api/contact';
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

// Validate critical environment variables
const validateEnvironment = () => {
  const missing = [];
  if (!EMAILJS_SERVICE_ID) missing.push('VITE_EMAILJS_SERVICE_ID');
  if (!EMAILJS_TEMPLATE_ID) missing.push('VITE_EMAILJS_TEMPLATE_ID');
  if (!EMAILJS_PUBLIC_KEY) missing.push('VITE_EMAILJS_PUBLIC_KEY');
  
  if (missing.length > 0) {
    console.warn('Missing environment variables:', missing);
  }
};

validateEnvironment();

// ============================================
// ANIMATION VARIANTS
// ============================================
const terminalVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 80, damping: 20 }
  }
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const fadeSlideUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const glowPulse = {
  initial: { boxShadow: "0 0 5px rgba(0, 255, 255, 0.2)" },
  animate: {
    boxShadow: [
      "0 0 5px rgba(0, 255, 255, 0.2)",
      "0 0 25px rgba(0, 255, 255, 0.5)",
      "0 0 5px rgba(0, 255, 255, 0.2)"
    ],
    transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
  }
};

// ============================================
// TERMINAL TYPING COMPONENT
// ============================================
const TerminalTyping = () => {
  const [text, setText] = useState('');
  const [phase, setPhase] = useState(0);
  const messages = [
    '> Establishing secure connection...',
    '> Connection encrypted [AES-256]',
    '> AI Communication Terminal ready.',
    '> Awaiting your transmission...'
  ];

  useEffect(() => {
    if (phase >= messages.length) return;
    
    const currentMessage = messages[phase];
    let index = 0;
    
    const typingInterval = setInterval(() => {
      if (index <= currentMessage.length) {
        setText(currentMessage.slice(0, index));
        index++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setPhase(prev => prev + 1);
          setText('');
        }, 1500);
      }
    }, 40);

    return () => clearInterval(typingInterval);
  }, [phase]);

  return (
    <div className="terminal-output">
      <span className="terminal-text">{text}</span>
      <span className="terminal-cursor">▌</span>
    </div>
  );
};

// ============================================
// CUSTOM TOAST COMPONENT
// ============================================
const FuturisticToast = ({ type, message }) => (
  <motion.div
    className={`futuristic-toast ${type}`}
    initial={{ opacity: 0, x: 50, scale: 0.9 }}
    animate={{ opacity: 1, x: 0, scale: 1 }}
    exit={{ opacity: 0, x: 50, scale: 0.9 }}
  >
    <span className="toast-icon">{type === 'success' ? '✓' : '✕'}</span>
    <span className="toast-message">{message}</span>
    <div className="toast-glow" />
  </motion.div>
);

// ============================================
// MAIN CONTACT COMPONENT
// ============================================
// Remove everything after the first `export default function Contact() { ... }` block.
// Your file contains a duplicated JSX `return (...)` outside the component,
// which causes: 'return' outside of function.

// Keep this complete, error-free Contact component.

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const form = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Send to backend
      const backendUrl = `${API_BASE_URL}${API_ENDPOINT}`;

      const apiResponse = await axios.post(backendUrl, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000,
      });

      console.log('Backend response:', apiResponse.data);

      // 2. Send email with EmailJS (optional)
      if (
        EMAILJS_PUBLIC_KEY &&
        EMAILJS_SERVICE_ID &&
        EMAILJS_TEMPLATE_ID &&
        form.current
      ) {
        try {
          await emailjs.sendForm(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            form.current,
            EMAILJS_PUBLIC_KEY
          );

          console.log('Email sent via EmailJS');
        } catch (emailError) {
          console.warn('EmailJS error:', emailError);
          // Do not fail overall submission if EmailJS fails
        }
      }

      // 3. Success toast
      toast.success(
        <FuturisticToast
          type="success"
          message="Transmission received. Confirmation sent to your communication channel."
        />,
        {
          className: 'futuristic-toast-container',
        }
      );

      // 4. Reset form
      setFormData({
        name: '',
        email: '',
        message: '',
      });

      if (form.current) {
        form.current.reset();
      }
    } catch (error) {
      console.error('Form submission error:', error);

      let errorMsg = 'Transmission failed. Please try again.';

      if (error.response?.status === 409) {
        errorMsg =
          'This communication channel is already registered. Please wait 24 hours before submitting again.';
      } else if (error.response?.data?.message) {
        errorMsg = error.response.data.message;
      } else if (error.message === 'Network Error') {
        errorMsg =
          'Network error. Please check your connection and try again.';
      } else if (error.code === 'ECONNABORTED') {
        errorMsg =
          'Request timeout. The server is not responding. Please try again.';
      }

      toast.error(
        <FuturisticToast type="error" message={errorMsg} />,
        {
          className: 'futuristic-toast-container',
        }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      className="contact-terminal-container"
      ref={sectionRef}
      variants={terminalVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {/* Terminal Header */}
      <motion.div className="terminal-header" variants={fadeSlideUp}>
        <div className="terminal-dots">
          <span className="dot red" />
          <span className="dot yellow" />
          <span className="dot green" />
        </div>
        <span className="terminal-title">AI_COMM_INTERFACE_v2.0</span>
        <span className="terminal-encryption">🔒 E2E ENCRYPTED</span>
      </motion.div>

      {/* Terminal Body */}
      <motion.div className="terminal-body" variants={staggerChildren}>
        {/* Typing Animation */}
        <motion.div className="terminal-output-area" variants={fadeSlideUp}>
          <TerminalTyping />
        </motion.div>

        {/* Contact Form */}
        <motion.form
          ref={form}
          className="contact-form-terminal"
          onSubmit={handleSubmit}
          variants={staggerChildren}
        >
          {/* Name */}
          <motion.div
            className={`input-field-group ${
              focusedField === 'name' ? 'focused' : ''
            }`}
            variants={fadeSlideUp}
          >
            <label className="field-label">
              <span className="label-icon">◈</span>
              IDENTIFIER
            </label>

            <div className="input-wrapper">
              <span className="input-prefix">&gt;</span>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your identifier..."
                required
                minLength={2}
                maxLength={100}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
              />

              <span className="input-border-glow" />
            </div>
          </motion.div>

          {/* Email */}
          <motion.div
            className={`input-field-group ${
              focusedField === 'email' ? 'focused' : ''
            }`}
            variants={fadeSlideUp}
          >
            <label className="field-label">
              <span className="label-icon">◈</span>
              COMM_CHANNEL
            </label>

            <div className="input-wrapper">
              <span className="input-prefix">&gt;</span>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your communication channel..."
                required
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
              />

              <span className="input-border-glow" />
            </div>
          </motion.div>

          {/* Message */}
          <motion.div
            className={`input-field-group ${
              focusedField === 'message' ? 'focused' : ''
            }`}
            variants={fadeSlideUp}
          >
            <label className="field-label">
              <span className="label-icon">◈</span>
              TRANSMISSION
            </label>

            <div className="input-wrapper textarea-wrapper">
              <span className="input-prefix textarea-prefix">&gt;</span>

              <textarea
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                placeholder="Compose your transmission..."
                required
                minLength={10}
                maxLength={5000}
                onFocus={() => setFocusedField('message')}
                onBlur={() => setFocusedField(null)}
              />

              <span className="input-border-glow" />
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.div className="submit-area" variants={fadeSlideUp}>
            <motion.button
              type="submit"
              className="terminal-submit-btn"
              disabled={isSubmitting}
              variants={glowPulse}
              initial="initial"
              animate="animate"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="btn-content">
                {isSubmitting ? (
                  <>
                    <span className="btn-spinner" />
                    TRANSMITTING...
                  </>
                ) : (
                  <>
                    <span className="btn-icon">↑</span>
                    SEND TRANSMISSION
                  </>
                )}
              </span>

              <span className="btn-scan-line" />
            </motion.button>

            <p className="submit-note">
              <span className="note-icon">🔒</span>
              All transmissions are end-to-end encrypted
            </p>
          </motion.div>
        </motion.form>

        {/* Status Bar */}
        <motion.div
          className="terminal-status-bar"
          variants={fadeSlideUp}
        >
          <div className="status-item">
            <span className="status-dot-connected" />
            CONNECTION: SECURE
          </div>

          <div className="status-item">
            PROTOCOL: HTTPS/TLS 1.3
          </div>

          <div className="status-item">
            LATENCY: &lt;10ms
          </div>
        </motion.div>
      </motion.div>

      {/* Grid Overlay */}
      <div className="terminal-grid-overlay" />

      {/* Toast Notifications */}
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        className="futuristic-toast-wrapper"
      />
    </motion.div>
  );
}