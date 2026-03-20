import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-top-container container">
        <div className="nav-links left-links">
          <a href="#design-ideas">Design Ideas</a>
          <a href="#cities">Cities</a>
          <a href="#projects">Projects</a>
        </div>
        
        <div className="navbar-logo">
          <h2>LAYA DESIGN</h2>
        </div>
        
        <div className="nav-links right-links">
          <a href="#login" className="icon-link">
             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          </a>
          <a href="#consult" className="consult-btn">Consult Online</a>
        </div>
      </div>
      
      <div className="navbar-bottom-container container">
        <div className="sub-nav-links">
          <a href="#how-it-works">How It Works</a>
          <span className="separator"></span>
          <a href="#offerings">Offerings</a>
          <span className="separator"></span>
          <a href="#price-calculators">Price Calculators</a>
          <span className="separator"></span>
          <a href="#modular-journey">The Modular Journey</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
