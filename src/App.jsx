import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import QuoteSection from './components/QuoteSection';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import './App.css';

function App() {
  return (
    <div className="app-wrapper">
      <Navbar />
      <main>
        <Hero />
        <QuoteSection />
        <Services />
        <Portfolio />
      </main>
      <footer style={{ padding: '6rem 2rem', textAlign: 'center', backgroundColor: 'var(--bg-light)' }}>
        <p className="sans-serif" style={{fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px'}}>
          &copy; {new Date().getFullYear()} LAYA DESIGN.
        </p>
      </footer>
    </div>
  );
}

export default App;
