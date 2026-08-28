import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useModal } from '../context/ModalContext';
import './Hero.css';

const Hero = () => {
  const { openModal } = useModal();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate scale: starts at 1, zooms in slowly as you scroll down
  const scale = 1 + scrollY * 0.0005;
  // Calculate vertical parallax for the text content
  const textTranslateY = scrollY * 0.4;
  // Fade out text slightly as you scroll down
  const textOpacity = Math.max(1 - scrollY * 0.002, 0);

  return (
    <section className="hero" id="home">
      <div 
        className="hero-background"
        style={{ 
          transform: `scale(${scale})`,
          transformOrigin: 'center center'
        }}
      >
        <div className="hero-overlay"></div>
      </div>

      <div className="hero-content container">
        <div 
          className="hero-text animate-in"
          style={{ 
            transform: `translateY(${textTranslateY}px)`,
            opacity: textOpacity
          }}
        >
          <h1 className="hero-title">Precision in Every Detail</h1>
          <p className="hero-subtitle">
            Modern aluminium interiors crafted for durability, elegance, and everyday living.
          </p>
          <div className="hero-cta">
            <button onClick={openModal} className="cta-primary">Get Free Consultation</button>
            <Link to="/projects" className="cta-secondary">View Projects</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
