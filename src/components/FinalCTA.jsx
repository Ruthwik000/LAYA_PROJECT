import React from 'react';
import { useModal } from '../context/ModalContext';
import './FinalCTA.css';

const FinalCTA = () => {
    const { openModal } = useModal();

    return (
        <section className="final-cta">
            <div className="container">
                <div className="cta-banner">
                    <h2 className="cta-headline">Ready to transform your space?</h2>
                    <p className="cta-subtext">Book a free consultation today and start your journey towards a modern aluminium interior.</p>
                    <button onClick={openModal} className="final-cta-btn">Book Free Consultation</button>
                </div>
            </div>
        </section>
    );
};

export default FinalCTA;
