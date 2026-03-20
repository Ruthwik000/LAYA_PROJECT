import React from 'react';
import './Services.css';

const Services = () => {
  return (
    <section className="services-section" id="services">
      <div className="services-left">
        <div className="services-content">
          <h2>Our<br/>Services</h2>
          <p className="sans-serif">
            When it comes to interior design, we consider all aspects of intentional living. Architectural structure, functionality, and unique preferences are what make a house a home. By combining a personalized approach to design with an established collaborative process, we specialize in executing projects from concept to completion—guiding you to beautiful, everyday living.
          </p>
          <div className="services-list sans-serif">
            <p>NEW BUILDS / LARGE-SCALE RENOVATIONS /<br/>FULL-SERVICE DECORATING</p>
          </div>
          <a href="#learn-more" className="learn-more-btn sans-serif">LEARN MORE</a>
        </div>
      </div>
      <div className="services-right">
        <img 
          src="https://images.unsplash.com/photo-1600607687920-4e2a09cf1546?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
          alt="Interior Design Services" 
        />
      </div>
    </section>
  );
};

export default Services;
