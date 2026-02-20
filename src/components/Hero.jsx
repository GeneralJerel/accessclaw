import React from 'react';
import './Hero.css';
import AgentMockup from './AgentMockup'; // We will create this next

function Hero() {
    return (
        <section className="container split" style={{ alignItems: 'center', margin: '4rem auto' }}>
            <div className="stack animate-fade-in">
                <p className="kicker">Now available for early access</p>
                <h1>
                    AI Chief of Staff for <span style={{ color: 'var(--accent)' }}>Solopreneurs</span>
                </h1>
                <p className="subtitle">
                    An AI-powered executive assistant that handles the operational chaos of running a freelance business — so you can focus on the work that actually pays.
                </p>
                <div className="quick-actions" style={{ marginTop: '1rem' }}>
                    <button className="btn btn-primary">Start Your Free Trial</button>
                    <button className="btn btn-outline">Watch Demo</button>
                </div>
            </div>
            <div className="hero-visual animate-fade-in delay-200">
                <AgentMockup />
            </div>
        </section>
    );
}

export default Hero;
