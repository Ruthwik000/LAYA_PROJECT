import React from 'react';
import { Link } from 'react-router-dom';
import { useModal } from '../context/ModalContext';
import './Hero.css';

const Hero = () => {
  const { openModal } = useModal();

  return (
    <section className="hero" id="home">
      <div className="hero-background">
        <div className="hero-overlay"></div>
      </div>

      <div className="hero-content container">
        <div className="hero-text animate-in">
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
