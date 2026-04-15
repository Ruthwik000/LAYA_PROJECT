import React, { useState, useEffect } from 'react';
import './PromoModal.css';
import promoImg from '../assets/promo_offer.png';

const PromoModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutes in ms

        const checkAndShow = () => {
            const isCompleted = localStorage.getItem('laya_promo_completed');
            if (isCompleted) return;

            const lastShown = localStorage.getItem('laya_promo_last_shown');
            const now = Date.now();

            if (!lastShown || now - parseInt(lastShown) >= REFRESH_INTERVAL) {
                setIsOpen(true);
            }
        };

        // Initial check with 1.5s delay
        const initialTimer = setTimeout(checkAndShow, 1500);

        // Periodic check every 30 seconds
        const interval = setInterval(checkAndShow, 30000);

        return () => {
            clearTimeout(initialTimer);
            clearInterval(interval);
        };
    }, []);

    const closeModal = () => {
        setIsOpen(false);
        localStorage.setItem('laya_promo_last_shown', Date.now().toString());
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Lead captured');
        localStorage.setItem('laya_promo_completed', 'true');
        setIsOpen(false);
    };

    if (!isOpen) return null;

    return (
        <div className="promo-modal-overlay" onClick={closeModal}>
            <div className="promo-modal-container" onClick={(e) => e.stopPropagation()}>
                <button className="promo-close-btn" onClick={closeModal} aria-label="Close modal">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13 1L1 13M1 1L13 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>

                <div className="promo-image-container">
                    <img src={promoImg} alt="Special Offer" />
                </div>

                <div className="promo-content">
                    <h2 className="promo-title">Exclusive Offer</h2>
                    <p className="promo-subtitle sans-serif">Unlock 20% Off Your First Project</p>

                    <form className="promo-form" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="promo-input"
                            required
                        />
                        <input
                            type="tel"
                            placeholder="Mobile Number"
                            className="promo-input"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Pincode"
                            className="promo-input"
                            required
                        />

                        <button type="submit" className="promo-submit-btn">
                            Continue
                        </button>
                    </form>

                    <p className="promo-disclaimer">
                        By continuing, you agree to our Terms of Use & Privacy Policy.
                        We'll use these details to share the offer with you.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PromoModal;
