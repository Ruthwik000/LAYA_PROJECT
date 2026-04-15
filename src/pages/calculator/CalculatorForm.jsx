import React, { useState, useEffect } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { calculatorConfigs } from '../../data/calculatorConfig';
import './CalculatorFunnel.css';

const CalculatorForm = () => {
    const { type } = useParams();
    const navigate = useNavigate();
    const config = calculatorConfigs[type];

    const [currentStep, setCurrentStep] = useState(0);
    const [selections, setSelections] = useState({});
    const [leadInfo, setLeadInfo] = useState({ name: '', phone: '', city: '', email: '' });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentStep]);

    if (!config) {
        return <Navigate to="/price-calculator" replace />;
    }

    const sections = config.form.sections;
    const totalSteps = sections.length + 1; // +1 for the lead capture step

    const handleSingleSelect = (sectionId, option) => {
        setSelections(prev => ({
            ...prev,
            [sectionId]: option
        }));
        // Auto-advance for single selection
        setTimeout(() => {
            setCurrentStep(prev => prev + 1);
        }, 400);
    };

    const handleMultiSelect = (sectionId, option) => {
        setSelections(prev => {
            const currentList = prev[sectionId] || [];
            const exists = currentList.find(item => item.label === option.label);
            
            if (exists) {
                return { ...prev, [sectionId]: currentList.filter(item => item.label !== option.label) };
            } else {
                return { ...prev, [sectionId]: [...currentList, option] };
            }
        });
    };

    const handleLeadChange = (e) => {
        setLeadInfo({ ...leadInfo, [e.target.name]: e.target.value });
    };

    const calculateTotal = () => {
        let calculatedBase = config.basePrice;
        let addonsCost = 0;

        sections.forEach(sec => {
            const selected = selections[sec.id];
            if (!selected) return;

            if (sec.isMultiple) {
                selected.forEach(addon => { addonsCost += addon.price; });
            } else {
                calculatedBase *= selected.multiplier;
            }
        });
        
        const total = calculatedBase + addonsCost;
        return {
            min: Math.round((total * 0.9) / 1000) * 1000,
            max: Math.round((total * 1.1) / 1000) * 1000
        };
    };

    const submitForm = (e) => {
        e.preventDefault();
        // Here, an API call would normally fire to save the lead.
        
        const estimate = calculateTotal();
        
        // Push to result page with the data
        navigate(`/price-calculator/${type}/result`, {
            state: { estimate, selections, leadInfo }
        });
    };

    const renderStepContent = () => {
        if (currentStep < sections.length) {
            const section = sections[currentStep];
            return (
                <div className="cf-form-step animate-in">
                    <h2 className="cf-step-question">Step {currentStep + 1}: {section.title}</h2>
                    <div className="cf-options-grid">
                        {section.options.map(opt => {
                            let isSelected = false;
                            if (section.isMultiple) {
                                isSelected = selections[section.id]?.some(item => item.label === opt.label);
                            } else {
                                isSelected = selections[section.id]?.label === opt.label;
                            }

                            return (
                                <button
                                    key={opt.label}
                                    className={`cf-option-btn ${isSelected ? 'selected' : ''}`}
                                    onClick={() => section.isMultiple ? handleMultiSelect(section.id, opt) : handleSingleSelect(section.id, opt)}
                                >
                                    {opt.label}
                                </button>
                            );
                        })}
                    </div>
                    {section.isMultiple && (
                        <div className="cf-step-actions">
                            <button 
                                className="cf-btn-primary" 
                                onClick={() => setCurrentStep(prev => prev + 1)}
                                disabled={!selections[section.id] || selections[section.id].length === 0}
                            >
                                Continue
                            </button>
                        </div>
                    )}
                </div>
            );
        } else {
            return (
                <div className="cf-form-step animate-in">
                    <h2 className="cf-step-question">Last Step: Get Your Quote</h2>
                    <p className="cf-lead-desc">Where should we send your detailed interior estimate?</p>
                    <form className="cf-lead-form" onSubmit={submitForm}>
                        <div className="input-group">
                            <label>Full Name</label>
                            <input type="text" name="name" required value={leadInfo.name} onChange={handleLeadChange} placeholder="Enter your name" />
                        </div>
                        <div className="input-group">
                            <label>Phone Number</label>
                            <input type="tel" name="phone" required value={leadInfo.phone} onChange={handleLeadChange} placeholder="+91 XXXXX XXXXX" />
                        </div>
                        <div className="input-group">
                            <label>City / Location</label>
                            <input type="text" name="city" required value={leadInfo.city} onChange={handleLeadChange} placeholder="E.g., Hyderabad" />
                        </div>
                        <div className="input-group">
                            <label>Email Address (Optional)</label>
                            <input type="email" name="email" value={leadInfo.email} onChange={handleLeadChange} placeholder="you@example.com" />
                        </div>
                        <button type="submit" className="cf-btn-submit">View My Estimate</button>
                    </form>
                </div>
            );
        }
    };

    return (
        <div className="calc-funnel-page form-stage">
            <div className="cf-form-container">
                <div className="cf-progress-bar">
                    <div 
                        className="cf-progress-fill" 
                        style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
                    ></div>
                </div>
                
                <div className="cf-back-control">
                    {currentStep > 0 && (
                        <button className="cf-btn-back" onClick={() => setCurrentStep(prev => prev - 1)}>
                            ← Back
                        </button>
                    )}
                </div>

                <div className="cf-step-wrapper">
                    {renderStepContent()}
                </div>
            </div>
        </div>
    );
};

export default CalculatorForm;
