import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useModal } from '../context/ModalContext';
import { calculatorConfigs } from '../data/calculatorConfig';
import './PriceCalculatorNew.css';

const SpecificCalculator = () => {
    const { type } = useParams();
    const { openModal } = useModal();
    const config = calculatorConfigs[type];

    // Initialize selections safely based on config
    const [selections, setSelections] = useState({});
    const [estimate, setEstimate] = useState({ min: 0, max: 0 });

    useEffect(() => {
        if (config) {
            // Pre-select the first option for single-choice sections to prevent empty states
            const initialSelections = {};
            config.sections.forEach(sec => {
                if (sec.isMultiple) {
                    initialSelections[sec.id] = [];
                } else {
                    initialSelections[sec.id] = sec.options[0];
                }
            });
            setSelections(initialSelections);
        }
        window.scrollTo(0, 0);
    }, [type, config]);

    useEffect(() => {
        if (!config || Object.keys(selections).length === 0) return;

        let calculatedBase = config.basePrice;
        let addonsCost = 0;

        config.sections.forEach(sec => {
            const selected = selections[sec.id];
            if (!selected) return;

            if (sec.isMultiple) {
                // selected is an array of options
                selected.forEach(addon => {
                    addonsCost += addon.price;
                });
            } else {
                // selected is a single option object
                calculatedBase *= selected.multiplier;
            }
        });

        const total = calculatedBase + addonsCost;

        // Add ±10% buffer range for realistic estimation
        setEstimate({
            min: Math.round((total * 0.9) / 1000) * 1000,
            max: Math.round((total * 1.1) / 1000) * 1000
        });

    }, [selections, config]);

    if (!config) {
        return <Navigate to="/price-calculator" replace />;
    }

    const handleSingleSelect = (sectionId, option) => {
        setSelections(prev => ({
            ...prev,
            [sectionId]: option
        }));
    };

    const handleMultiSelect = (sectionId, option) => {
        setSelections(prev => {
            const currentList = prev[sectionId] || [];
            const exists = currentList.find(item => item.label === option.label);
            
            let newList;
            if (exists) {
                newList = currentList.filter(item => item.label !== option.label);
            } else {
                newList = [...currentList, option];
            }
            
            return {
                ...prev,
                [sectionId]: newList
            };
        });
    };

    return (
        <div className="specific-calc-page">
            <div className="container">
                <header className="specific-calc-hero">
                    <h1 className="specific-calc-title">{config.title}</h1>
                    <p className="specific-calc-subtitle">{config.subtitle}</p>
                </header>

                <div className="specific-calc-layout">
                    {/* User Inputs Form */}
                    <div className="calc-inputs-side">
                        {config.sections.map((section, index) => (
                            <section 
                                key={section.id} 
                                className="form-section"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <h3 className="form-section-title">{section.title}</h3>
                                <div className="options-grid">
                                    {section.options.map((opt) => {
                                        let isSelected = false;
                                        if (section.isMultiple) {
                                            isSelected = selections[section.id]?.some(item => item.label === opt.label);
                                        } else {
                                            isSelected = selections[section.id]?.label === opt.label;
                                        }

                                        return (
                                            <button
                                                key={opt.label}
                                                className={`option-btn ${isSelected ? 'selected' : ''}`}
                                                onClick={() => section.isMultiple 
                                                    ? handleMultiSelect(section.id, opt) 
                                                    : handleSingleSelect(section.id, opt)}
                                            >
                                                <span className="opt-label">{opt.label}</span>
                                                {section.isMultiple && <span className="opt-price-tag"> (+₹{opt.price.toLocaleString()})</span>}
                                            </button>
                                        );
                                    })}
                                </div>
                            </section>
                        ))}
                    </div>

                    {/* Result Sidebar */}
                    <div className="calc-result-side">
                        <div className="calc-result-sidebar">
                            <h4 className="result-label">Estimated Investment</h4>
                            <div className="estimated-price">
                                <span className="currency">₹</span>
                                <span className="amount">
                                    {estimate.min.toLocaleString('en-IN')} – {estimate.max.toLocaleString('en-IN')}
                                </span>
                            </div>
                            
                            <div className="price-divider"></div>

                            <div className="summary-list">
                                {config.sections.map(section => {
                                    const selected = selections[section.id];
                                    if (!selected) return null;
                                    
                                    let valText = '';
                                    if (section.isMultiple) {
                                        if (selected.length === 0) return null;
                                        valText = selected.map(s => s.label).join(', ');
                                    } else {
                                        valText = selected.label;
                                    }

                                    return (
                                        <div key={section.id} className="summary-item">
                                            <span className="key">{section.title}</span>
                                            <span className="val">{valText}</span>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="price-divider"></div>

                            <div className="result-cta-box">
                                <h3>{config.ctaText}</h3>
                                <p>Our design experts will create a precise quotation tailored exactly to your floorplan.</p>
                                <button className="calc-primary-btn" onClick={openModal}>
                                    {config.ctaButton}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpecificCalculator;
