import React from 'react';
import { Link } from 'react-router-dom';
import { projectsData } from '../data/projectsData';
import './FeaturedProjects.css';

const FeaturedProjects = () => {
    // Show only the first 3 projects on the home page as featured
    const featuredProjects = projectsData.slice(0, 3);

    return (
        <section className="featured-projects" id="projects">
            <div className="container">
                <div className="projects-header reveal-on-scroll">
                    <h2 className="projects-title">Our Recent Projects</h2>
                    <p className="projects-subtitle">A glimpse into our premium aluminium interior transformations.</p>
                </div>

                <div className="projects-grid">
                    {featuredProjects.map((project, index) => (
                        <Link to={`/projects/${project.id}`} key={project.id} className={`project-card reveal-on-scroll delay-${(index % 3) * 100 + 100}`} data-cursor-text="VIEW PROJECT">
                            <div className="project-image">
                                <img src={project.image} alt={project.title} />
                            </div>
                            <div className="project-info">
                                <h3 className="project-card-title">{project.title}</h3>
                                <p className="project-card-category">{project.category}</p>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="projects-footer">
                    <Link to="/projects" className="view-all-projects-btn">
                        View All Projects
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FeaturedProjects;
