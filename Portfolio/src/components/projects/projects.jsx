import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './projects.css';

const projectsData = [
  {
    title: "UnMe",
    desc: "A real-time chat application for seamless conversations between you and me.",
    tech: "React, Node.js, MongoDB, WebSockets, Socket.io",
    link: "https://u-me-chat-app.vercel.app/",
  }
  ,
  {
    title: "Portfolio Website",
    desc: "Modern portfolio with responsive design",
    tech: "React, CSS, Node.js, Emailjs(notification)",
    link: "https://myportfolio-ten-iota.vercel.app/",
  },
  {
    title: "Edusync",
    desc: "AI-powered group study and virtual tutoring platform",
    tech: "MERN Stack, WebSockets, AI APIs",
    link: "https://edu-sync-hub.vercel.app/",
  }
  
];

export default function Projects() {
  return (
    <div className="projects-section">
      <h2 className="section-title">My Projects</h2>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 20,
          stretch: 0,
          depth: 300,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="projects-carousel"
      >
        {projectsData.map((project, index) => (
          <SwiperSlide key={index}>
            <div className="project-card">
              <h3>{project.title}</h3>
              <p>{project.desc}</p>
              <span className="tech">{project.tech}</span>
              <a href={project.link} className="project-link" target="_blank" rel="noopener noreferrer">
                View Project →
              </a>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
