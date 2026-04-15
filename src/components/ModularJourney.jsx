import React from 'react';
import './ModularJourney.css';

const ModularJourney = () => {
    const journeySteps = [
        { title: 'Idea', icon: '01' },
        { title: 'Design', icon: '02' },
        { title: 'Build', icon: '03' },
        { title: 'Install', icon: '04' },
        { title: 'Enjoy', icon: '05' }
    ];

    return (
        <section className="modular-journey" id="modular-journey">
            <div className="container">
                <div className="journey-header">
                    <h2 className="journey-title">Your Modular Interior Journey</h2>
                    <p className="journey-subtitle">A seamless journey from concept to completion with precision at every step.</p>
                </div>
                <div className="journey-timeline">
                    {journeySteps.map((step, index) => (
                        <div key={index} className="journey-step">
                            <div className="journey-node">
                                <span className="node-number">{step.icon}</span>
                            </div>
                            <h3 className="node-title">{step.title}</h3>
                            {index < journeySteps.length - 1 && <div className="node-connector"></div>}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ModularJourney;
