import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { projectsData } from '../data/projectsData';
import { useModal } from '../context/ModalContext';
import './ProjectDetail.css';

const ProjectDetail = () => {
  const { projectId } = useParams();
  const { openModal } = useModal();
  const project = projectsData.find(p => p.id === projectId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [projectId]);

  if (!project) {
    return <Navigate to="/projects" />;
  }

  // Get 3 related projects (same category if possible)
  const relatedProjects = projectsData
    .filter(p => p.id !== project.id)
    .sort((a, b) => (a.category === project.category ? -1 : 1))
    .slice(0, 3);

  return (
    <div className="project-detail-page">
      {/* Detail Hero */}
      <section className="project-detail-hero">
        <img src={project.image} alt={project.title} className="project-detail-hero-img" />
        <div className="project-detail-hero-overlay"></div>
        <div className="project-detail-hero-content">
          <span className="project-detail-tag">{project.category}</span>
          <h1 className="project-detail-title">{project.title}</h1>
        </div>
      </section>

      {/* Project Info Section */}
      <section className="project-info-section">
        <div className="projects-container">
          <div className="project-info-grid">
            <div className="project-main-info">
              <h2 className="info-section-title">Project Overview</h2>
              <p className="project-full-description">{project.fullDesc}</p>
            </div>
            
            <div className="project-spec-sidebar">
              <div className="spec-card">
                <h3 className="spec-title">Specifications</h3>
                <div className="spec-item">
                  <span className="spec-label">Type</span>
                  <span className="spec-value">{project.type}</span>
                </div>
                {project.materials && (
                  <div className="spec-item">
                    <span className="spec-label">Materials</span>
                    <div className="materials-list">
                      {project.materials.map((m, i) => (
                        <span key={i} className="material-tag">{m}</span>
                      ))}
                    </div>
                  </div>
                )}
                <button className="get-design-btn" onClick={openModal}>
                  Get Similar Design
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="project-gallery-section">
          <div className="projects-container">
            <h2 className="info-section-title" style={{ textAlign: 'center', marginBottom: '3rem' }}>
              Project Gallery
            </h2>
            <div className="project-images-grid">
              {project.gallery.map((img, i) => (
                <div key={i} className="gallery-image-wrapper">
                  <img src={img} alt={`${project.title} detail ${i + 1}`} className="gallery-img" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Projects Section */}
      <section className="related-projects-section">
        <div className="projects-container">
          <h2 className="info-section-title">Related Projects</h2>
          <div className="related-grid">
            {relatedProjects.map(p => (
              <Link to={`/projects/${p.id}`} key={p.id} className="related-card">
                <div className="related-img-wrapper">
                  <img src={p.image} alt={p.title} />
                </div>
                <div className="related-info">
                  <span className="related-cat">{p.category}</span>
                  <h4 className="related-title">{p.title}</h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;
