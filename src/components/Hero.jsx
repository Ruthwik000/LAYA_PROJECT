import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero" id="home">
      <div className="hero-image-container">
        {/* Placeholder for an elegant kitchen/interior shot like the reference */}
        <img 
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
          alt="Elegant Interior" 
          className="hero-img"
        />
        <div className="hero-overlay"></div>
      </div>
    </section>
  );
};

export default Hero;
