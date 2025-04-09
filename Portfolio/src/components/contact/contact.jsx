import React, { useState, useRef } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import emailjs from 'emailjs-com';
import axios from 'axios';
import './contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const form = useRef(); // ✅ reference for emailjs

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // ✅ 1. Save to backend
      await axios.post('http://localhost:8000/api/users', formData);

      // ✅ 2. Send confirmation email
      await emailjs.sendForm(
        'service_04wu7pr',
        'template_xydb1a8',
        form.current,
        '22xF-vi4q8FWcCwc4'
      );

      toast.success('Form submitted and confirmation email sent!');
      setFormData({ name: '', email: '', message: '' });
      form.current.reset(); // ✅ clear emailjs form

    } catch (error) {
      console.error('Error submitting form or sending email:', error);
      toast.error('Something went wrong. Please try again!');
    }
  };

  return (
    <div className="main-contact">
      <div className="contact-section">
        <h2>Contact Me</h2>
        <p>Let's build something great together. Reach out via the form below:</p>

        <form ref={form} className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            value={formData.name}
            placeholder="Your Name"
            required
          />
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={formData.email}
            placeholder="Your Email"
            required
          />
          <textarea
            name="message"
            rows="5"
            onChange={handleChange}
            value={formData.message}
            placeholder="Your Message"
            required
          ></textarea>
          <button type="submit">Send Message</button>
        </form>

        <ToastContainer position="bottom-right" autoClose={3000} />
      </div>
    </div>
  );
}
