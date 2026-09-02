import React from 'react';
import './Workshop.css';
import workshop1 from '../assets/workshop1.jpg';
import workshop2 from '../assets/workshop2.jpg';
import workshop3 from '../assets/workshop3.jpg';

const Workshop = () => {
    return (
        <section id="workshop" className="workshop-section">
            <div className="container">
                <div className="workshop-header reveal-on-scroll">
                    <span className="subtitle">OUR INFRASTRUCTURE</span>
                    <h2 className="title">Workshop & Manufacturing</h2>
                    <p className="description">
                        State-of-the-art facilities powering our precision aluminum and PVC window systems.
                    </p>
                </div>
                
                <div className="workshop-gallery reveal-on-scroll delay-100">
                    <div className="gallery-item">
                        <img src={workshop1} alt="Wide shot of manufacturing workshop" />
                    </div>
                    <div className="gallery-item">
                        <img src={workshop2} alt="Close up assembly of aluminum frame" />
                    </div>
                    <div className="gallery-item">
                        <img src={workshop3} alt="Machinery in clean workshop" />
                    </div>
                </div>

                <div className="workshop-footer reveal-on-scroll delay-200">
                    <p>
                        At LAYA, our cutting-edge manufacturing facilities form the backbone of our operations. Equipped with advanced machinery and staffed by highly trained experts, we ensure every aluminum profile and PVC window meets the highest standards of precision and durability. Our rigorous quality control processes guarantee that your modular spaces are built to last with exceptional craftsmanship.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Workshop;
