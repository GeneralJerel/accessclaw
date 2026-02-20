import React from 'react';
import './Architecture.css';
import { Database, Zap, Monitor, Cpu } from 'lucide-react';

function Architecture() {
    return (
        <section className="container" style={{ margin: '4rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h2>Powered by a <span style={{ color: 'var(--accent)' }}>Modern Stack</span></h2>
                <p className="subtitle" style={{ margin: '0 auto' }}>A robust architecture enabling true real-time transparent collaboration.</p>
            </div>

            <div className="summary-grid">
                <div className="card stack">
                    <div style={{ color: 'var(--accent)' }}><Monitor size={24} /></div>
                    <h3>CopilotKit UI</h3>
                    <p>Renders agent activity, inline editing, and interactions.</p>
                </div>
                <div className="card stack">
                    <div style={{ color: 'var(--accent)' }}><Cpu size={24} /></div>
                    <h3>OpenClaw Orchestration</h3>
                    <p>Manages multi-step workflows and intelligent task routing.</p>
                </div>
                <div className="card stack">
                    <div style={{ color: 'var(--accent)' }}><Database size={24} /></div>
                    <h3>Wordware Prompt Logic</h3>
                    <p>Defines LLM workflows, decision trees, and business rules.</p>
                </div>
            </div>
        </section>
    );
}

export default Architecture;
