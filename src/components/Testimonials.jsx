import React from 'react';
import './Testimonials.css';

const Testimonials = () => {
    const reviews = [
        {
            text: "Excellent quality and modern design. Very satisfied with the work.",
            author: "Satisfied Homeowner",
            location: "Hyderabad"
        },
        {
            text: "The precision in their aluminium work is unmatched. Truly premium.",
            author: "Interior Enthusiast",
            location: "Warangal"
        },
        {
            text: "Professional team and on-time delivery. Highly recommended!",
            author: "Business Owner",
            location: "Vijayawada"
        }
    ];

    return (
        <section className="testimonials" id="testimonials">
            <div className="container">
                <h2 className="testimonials-title">What Our Clients Say</h2>
                
                {/* Featured Video Testimonial */}
                <div className="featured-video-container">
                    <div className="video-wrapper">
                        <video 
                            controls 
                            poster="/videos/testimonial-poster-vertical.png"
                            className="testimonial-video"
                        >
                            <source src="/videos/client_testimonial.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        <div className="video-overlay">
                            <span className="play-hint">Watch Client Story</span>
                        </div>
                    </div>
                    <div className="video-meta">
                        <h3 className="video-client-name">A Modern Transformation</h3>
                        <p className="video-client-desc">"The precision and dedication of Laya Space Design brought our vision to life in ways we never imagined."</p>
                    </div>
                </div>

                <div className="testimonials-grid">
                    {reviews.map((review, index) => (
                        <div key={index} className="testimonial-card">
                            <p className="testimonial-text">“{review.text}”</p>
                            <div className="testimonial-author">
                                <span className="author-name">{review.author}</span>
                                <span className="author-location">{review.location}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
