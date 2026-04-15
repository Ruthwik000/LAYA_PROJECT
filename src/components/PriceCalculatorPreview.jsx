import React from 'react';
import { Link } from 'react-router-dom';
import './PriceCalculatorPreview.css';

const PriceCalculatorPreview = () => {
  return (
    <section className="price-calculator-preview">
      <div className="container">
        <div className="calc-banner">
          <div className="calc-content">
            <h2 className="calc-title">Try Our Price Calculator</h2>
            <p className="calc-text">Get a quick estimate for your home interior project in just a few clicks.</p>
          </div>
          <Link to="/price-calculator" className="calc-btn">Calculate Now</Link>
        </div>
      </div>
    </section>
  );
};

export default PriceCalculatorPreview;
