import React, { useState, useEffect } from 'react';
import { useModal } from '../context/ModalContext';
import './PriceCalculator.css';

const PriceCalculator = () => {
    const { openModal } = useModal();
    const [step, setStep] = useState(1);
    const [selections, setSelections] = useState({
        type: 'Wardrobe',
        size: 'Medium',
        material: 'Premium',
        addons: []
    });
    const [estimate, setEstimate] = useState({ min: 0, max: 0 });

    const basePrices = {
        'Wardrobe': 50000,
        'Kitchen': 100000,
        'Living Room': 75000,
        'Full Home': 350000
    };

    const sizeMultipliers = {
        'Small': 0.8,
        'Medium': 1,
        'Large': 1.5
    };

    const materialAddons = {
        'Basic': 0,
        'Premium': 0.2, // +20%
        'Luxury': 0.4   // +40%
    };

    const addonPrices = {
        'Mirror finish': 5000,
        'Glass finish': 8000,
        'Extra storage': 10000
    };

    useEffect(() => {
        let base = basePrices[selections.type];
        let sizeMult = sizeMultipliers[selections.size];
        let materialMult = 1 + materialAddons[selections.material];

        let calculatedBase = base * sizeMult * materialMult;

        let addonsCost = selections.addons.reduce((sum, addon) => sum + addonPrices[addon], 0);

        let total = calculatedBase + addonsCost;

        // Results are shown as a range (±10%)
        setEstimate({
            min: Math.round(total * 0.9 / 1000) * 1000,
            max: Math.round(total * 1.1 / 1000) * 1000
        });
    }, [selections]);

    const handleOptionChange = (field, value) => {
        setSelections(prev => ({ ...prev, [field]: value }));
    };

    const toggleAddon = (addon) => {
        setSelections(prev => {
            const exists = prev.addons.includes(addon);
            if (exists) {
                return { ...prev, addons: prev.addons.filter(a => a !== addon) };
            } else {
                return { ...prev, addons: [...prev.addons, addon] };
            }
        });
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <div className="calc-step-content animate-in">
                        <h3 className="step-tag">Step 01</h3>
                        <h2 className="step-title">What are you looking to design?</h2>
                        <div className="option-grid">
                            {Object.keys(basePrices).map(type => (
                                <button
                                    key={type}
                                    className={`calc-option-card ${selections.type === type ? 'active' : ''}`}
                                    onClick={() => { handleOptionChange('type', type); setStep(2); }}
                                >
                                    <span className="card-icon">{type === 'Kitchen' ? '🍳' : type === 'Wardrobe' ? '👕' : type === 'Living Room' ? '🛋️' : '🏠'}</span>
                                    <span className="card-label">{type}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="calc-step-content animate-in">
                        <h3 className="step-tag">Step 02</h3>
                        <h2 className="step-title">Select the approximate size</h2>
                        <div className="option-grid">
                            {Object.keys(sizeMultipliers).map(size => (
                                <button
                                    key={size}
                                    className={`calc-option-card ${selections.size === size ? 'active' : ''}`}
                                    onClick={() => { handleOptionChange('size', size); setStep(3); }}
                                >
                                    <span className="card-label">{size}</span>
                                    <span className="card-sublabel">
                                        {size === 'Small' ? 'Standard 1BHK / Small Room' : size === 'Medium' ? 'Comfortable 2BHK / Master Room' : 'Spacious 3BHK+ / Luxury Suite'}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="calc-step-content animate-in">
                        <h3 className="step-tag">Step 03</h3>
                        <h2 className="step-title">Choose your material level</h2>
                        <div className="option-grid">
                            {Object.keys(materialAddons).map(level => (
                                <button
                                    key={level}
                                    className={`calc-option-card ${selections.material === level ? 'active' : ''}`}
                                    onClick={() => { handleOptionChange('material', level); setStep(4); }}
                                >
                                    <span className="card-label">{level}</span>
                                    <span className="card-sublabel">
                                        {level === 'Basic' ? 'Quality essentials & value' : level === 'Premium' ? 'Best selling stylish finishes' : 'High-end exotic look & feel'}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className="calc-step-content animate-in">
                        <h3 className="step-tag">Step 04</h3>
                        <h2 className="step-title">Any additional features?</h2>
                        <div className="option-grid">
                            {Object.keys(addonPrices).map(addon => (
                                <button
                                    key={addon}
                                    className={`calc-option-card ${selections.addons.includes(addon) ? 'active' : ''}`}
                                    onClick={() => toggleAddon(addon)}
                                >
                                    <span className="card-label">{addon}</span>
                                    <span className="card-sublabel">+₹{addonPrices[addon].toLocaleString()}</span>
                                </button>
                            ))}
                        </div>
                        <button className="calc-finish-btn" onClick={() => setStep(5)}>See Final Estimate</button>
                    </div>
                );
            case 5:
                return (
                    <div className="calc-step-content animate-in final-summary">
                        <h2 className="step-title">Ready! Here's your estimate</h2>
                        <div className="summary-details">
                            <div className="summary-row">
                                <span className="summary-label">Type</span>
                                <span className="summary-value">{selections.type}</span>
                            </div>
                            <div className="summary-row">
                                <span className="summary-label">Size</span>
                                <span className="summary-value">{selections.size}</span>
                            </div>
                            <div className="summary-row">
                                <span className="summary-label">Material</span>
                                <span className="summary-value">{selections.material}</span>
                            </div>
                            {selections.addons.length > 0 && (
                                <div className="summary-row">
                                    <span className="summary-label">Add-ons</span>
                                    <span className="summary-value">{selections.addons.join(', ')}</span>
                                </div>
                            )}
                        </div>
                        <button className="calc-reset-btn" onClick={() => setStep(1)}>Restart Calculator</button>
                    </div>
                );
            default: return null;
        }
    };

    return (
        <div className="price-calculator-page">
            <div className="container">
                <header className="calc-header">
                    <h1 className="calc-main-title">Estimate Your Interior Cost</h1>
                    <p className="calc-subtitle">Get an approximate cost for your aluminium interior project in seconds.</p>
                </header>

                <div className="calc-layout">
                    <div className="calc-form-side">
                        <div className="calc-progress">
                            {[1, 2, 3, 4].map(s => (
                                <div key={s} className={`progress-dot ${step >= s ? 'active' : ''}`}></div>
                            ))}
                        </div>
                        {renderStep()}
                    </div>

                    <div className="calc-result-side">
                        <div className="result-sticky-card">
                            <h4 className="result-label">ESTIMATED INVESTMENT</h4>
                            <div className="price-display">
                                <span className="currency">₹</span>
                                <span className="amount">{estimate.min.toLocaleString()} — {estimate.max.toLocaleString()}</span>
                            </div>
                            <p className="price-disclaimer">
                                *This is an approximate estimate. Final pricing may vary based on specific site measurements and customizations.
                            </p>

                            <div className="result-cta-box">
                                <h3>Want an exact quote?</h3>
                                <p>Our experts will provide a detailed breakdown after a brief discussion.</p>
                                <button className="result-btn-primary" onClick={openModal}>Get Free Consultation</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PriceCalculator;
