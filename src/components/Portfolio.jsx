import React from 'react';
import './Portfolio.css';

const Portfolio = () => {
  const projects = [
    { id: 1, image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 2, image: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 3, image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  ];

  return (
    <section className="portfolio" id="portfolio">
      <div className="container" style={{maxWidth: '1200px'}}>
        <div className="portfolio-grid">
          {projects.map((project) => (
            <div key={project.id} className="portfolio-item hover-scale">
              <img src={project.image} alt="Interior Architecture" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
