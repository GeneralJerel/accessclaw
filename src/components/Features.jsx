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
        <section className="container" style={{ margin: '4rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h2>Everything you need, <span style={{ color: 'var(--accent)' }}>handled.</span></h2>
                <p className="subtitle" style={{ margin: '0 auto' }}>Stop context-switching. Let your ChiefClaw 🦞 handle the busywork.</p>
            </div>

            <div className="feature-grid">
                {features.map((feature) => (
                    <div key={feature.id} className="card stack">
                        <div style={{ color: 'var(--accent)', marginBottom: '0.5rem' }}>
                            {feature.icon}
                        </div>
                        <h3>{feature.title}</h3>
                        <p>{feature.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Features;
