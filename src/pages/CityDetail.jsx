import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { citiesData } from '../data/citiesData';
import { useModal } from '../context/ModalContext';
import { IconRenderer } from '../components/Icons';
import { projectsData } from '../data/projectsData';
import './CityDetail.css';

const CityDetail = () => {
    const { citySlug } = useParams();
    const navigate = useNavigate();
    const { openModal } = useModal();
    const city = citiesData[citySlug?.toLowerCase()];

    useEffect(() => {
        if (!city) {
            navigate('/');
        }
        window.scrollTo(0, 0);
    }, [city, navigate]);

    if (!city) return null;

    // Get a few featured projects for the city page
    const featuredProjects = projectsData.slice(0, 3);

    const offerings = [
        { id: 'modular-cupboards', title: 'Modular Cupboards', icon: 'WARDROBE' },
        { id: 'aluminium-interiors', title: 'Modular Kitchens', icon: 'KITCHEN' },
        { id: 'exterior-works', title: 'Exterior Works', icon: 'EXTERIOR' },
        { id: 'custom-designs', title: 'Custom TV Units', icon: 'LIVING' },
        { id: 'renovation', title: 'Full Renovation', icon: 'RENOVATION' }
    ];

    return (
        <div className="city-detail-page">
            {/* Hero Section */}
            <section className="city-hero">
                <div className="city-hero-image-wrapper">
                    <img src={city.image} alt={city.name} className="city-hero-img" />
                    <div className="city-hero-overlay"></div>
                </div>
                <div className="container city-hero-content">
                    <span className="city-badge">{city.state}</span>
                    <h1 className="city-title">{city.heroTitle}</h1>
                    <p className="city-subtitle">{city.heroSubtitle}</p>
                    <div className="city-hero-actions">
                        <button onClick={openModal} className="city-primary-btn">Get Free Consultation</button>
                        <Link to="/projects" className="city-secondary-btn">View Projects</Link>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="city-about-section">
                <div className="container">
                    <div className="city-about-grid">
                        <div className="city-about-content">
                            <h2 className="section-title-premium">{city.aboutHeading}</h2>
                            <p className="city-about-text-lead">{city.aboutText}</p>
                            <p className="city-about-text-sub">{city.cityDescription}</p>
                        </div>
                        <div className="city-highlights-grid">
                            {city.highlights.map((item, idx) => (
                                <div key={idx} className="city-highlight-card">
                                    <h3 className="highlight-card-title">{item.title}</h3>
                                    <p className="highlight-card-text">{item.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="city-services-section">
                <div className="container">
                    <div className="city-section-header">
                        <h2 className="section-title-premium">Services in {city.name}</h2>
                        <p className="city-section-subtitle">Comprehensive aluminium solutions for modern urban living.</p>
                    </div>
                    <div className="city-services-grid">
                        {offerings.map(service => (
                            <Link key={service.id} to={`/offerings/${service.id}`} className="city-service-card">
                                <div className="city-service-icon">
                                    <IconRenderer iconName={service.icon} size={32} />
                                </div>
                                <h3 className="city-service-title">{service.title}</h3>
                                <div className="city-service-link">
                                    <span>Explore</span>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Projects */}
            <section className="city-projects-section">
                <div className="container">
                    <div className="city-section-header">
                        <h2 className="section-title-premium">Recent Work</h2>
                        <p className="city-section-subtitle">Bringing high-end designs to homes across {city.state}.</p>
                    </div>
                    <div className="city-projects-grid">
                        {featuredProjects.map(project => (
                            <Link key={project.id} to={`/projects/${project.id}`} className="city-project-card">
                                <div className="city-project-img-wrapper">
                                    <img src={project.image} alt={project.title} />
                                </div>
                                <div className="city-project-info">
                                    <span className="city-project-cat">{project.category}</span>
                                    <h3 className="city-project-title">{project.title}</h3>
                                </div>
                            </Link>
                        ))}
                    </div>
                    <div className="city-projects-footer">
                        <Link to="/projects" className="view-all-city-projects">View Full Portfolio</Link>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default CityDetail;
