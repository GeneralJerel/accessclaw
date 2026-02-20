import React from 'react';
import './Features.css';
import { Mail, RefreshCw, FileText, Calendar } from 'lucide-react';

const features = [
    {
        id: 1,
        title: 'Email Tracking & Drafting',
        description: 'Monitors your inbox, surfaces what needs a response, and drafts replies in your voice. Flags unanswered threads before they go cold.',
        icon: <Mail size={24} />,
        color: 'var(--accent-primary)'
    },
    {
        id: 2,
        title: 'Client Follow-Ups',
        description: 'Proactively tracks every client relationship. Sends follow-ups on proposals and checks in on ongoing projects automatically.',
        icon: <RefreshCw size={24} />,
        color: 'var(--accent-secondary)'
    },
    {
        id: 3,
        title: 'Invoice Management',
        description: 'Generates invoices, sends them on time, and follows up on unpaid bills. Keeps your cash flow visible to catch slow-pay situations early.',
        icon: <FileText size={24} />,
        color: 'var(--success)'
    },
    {
        id: 4,
        title: 'Smart Scheduling',
        description: 'Handles calendar negotiation, books meetings based on your priorities, and protects deep work blocks through natural language.',
        icon: <Calendar size={24} />,
        color: 'var(--warning)'
    }
];

function Features() {
    return (
        <section className="features-section container">
            <div className="features-header text-center">
                <h2>Everything you need, <span className="text-gradient">handled.</span></h2>
                <p className="text-secondary">Stop context-switching. Let your AI Chief of Staff handle the busywork.</p>
            </div>

            <div className="features-grid">
                {features.map((feature) => (
                    <div key={feature.id} className="feature-card glass-panel group">
                        <div className="feature-icon" style={{ backgroundColor: `${feature.color}20`, color: feature.color }}>
                            {feature.icon}
                        </div>
                        <h3>{feature.title}</h3>
                        <p className="text-secondary">{feature.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Features;
