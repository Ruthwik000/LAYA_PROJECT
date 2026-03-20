import React from 'react';

const QuoteSection = () => {
  return (
    <section style={{ padding: '8rem 2rem', backgroundColor: 'var(--bg-light)', textAlign: 'center' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', fontStyle: 'italic', color: 'var(--text-dark)' }}>
          The most treasured spaces are <br/>thoughtful, curated, and authentic.
        </h2>
        <p className="sans-serif" style={{ fontSize: '0.9rem', lineHeight: '1.8', color: '#666' }}>
          Laya Design is dedicated to creating spaces that shift your perception of intentional, everyday living. 
          Renowned for their take on traditional and contemporary design grounded in originality, they bring a 
          layered lens to each space—inviting an eclectic mix of collected pieces, natural materials, and personal elements.
        </p>
      </div>
    </section>
  );
};

export default QuoteSection;
