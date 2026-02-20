import React from 'react';
import './Hero.css';
import AgentMockup from './AgentMockup'; // We will create this next

function Hero() {
    return (
        <section className="hero-section container">
            <div className="hero-content animate-fade-in">
                <div className="badge glass-panel">
                    <span className="pulse-dot"></span>
                    Now available for early access
                </div>
                <h1 className="hero-title">
                    AI Chief of Staff for <span className="text-gradient">Solopreneurs</span>
                </h1>
                <p className="hero-subtitle text-secondary">
                    An AI-powered executive assistant that handles the operational chaos of running a freelance business — so you can focus on the work that actually pays.
                </p>
                <div className="hero-actions">
                    <button className="btn btn-primary">Start Your Free Trial</button>
                    <button className="btn btn-secondary glass-panel">Watch Demo</button>
                </div>
            </div>
            <div className="hero-visual animate-fade-in delay-200">
                <AgentMockup />
            </div>
        </section>
    );
}

export default Hero;
