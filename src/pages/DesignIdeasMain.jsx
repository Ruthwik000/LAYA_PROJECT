import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../data/DesignIdeasData';
import './DesignIdeasMain.css';

const DesignIdeasMain = () => {
    return (
        <div className="design-ideas-page">
            <section className="di-hero">
                <div className="container">
                    <h1 className="di-title">Explore Design Ideas</h1>
                    <p className="di-subtitle">Discover modern aluminium design inspirations for every space in your home.</p>
                </div>
            </section>

            <section className="di-categories">
                <div className="container">
                    <div className="di-grid">
                        {categories.map((cat) => (
                            <Link key={cat.id} to={`/design-ideas/${cat.id}`} className="di-card" data-cursor-text="VIEW DESIGNS">
                                <div className="di-card-image">
                                    <img src={cat.image} alt={cat.title} />
                                </div>
                                <div className="di-card-info">
                                    <h3 className="di-card-title">{cat.title}</h3>
                                    <p className="di-card-desc">{cat.desc}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default DesignIdeasMain;
