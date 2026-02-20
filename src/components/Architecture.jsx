import React from 'react';
import './Architecture.css';
import { Database, Zap, Monitor, Cpu } from 'lucide-react';

function Architecture() {
    return (
        <section className="architecture-section container">
            <div className="architecture-header text-center">
                <h2>Powered by a <span className="text-gradient">Modern Stack</span></h2>
                <p className="text-secondary">A robust architecture enabling true real-time transparent collaboration.</p>
            </div>

            <div className="architecture-wrapper">
                <div className="arch-layer glass-panel">
                    <div className="layer-icon"><Monitor size={24} color="var(--accent-tertiary)" /></div>
                    <div className="layer-content">
                        <h3>CopilotKit UI</h3>
                        <p>Renders agent activity, inline editing, and interactions.</p>
                    </div>
                </div>

                <div className="connection-line">
                    <Zap size={16} color="var(--accent-primary)" />
                    <span>AG-UI Protocol</span>
                </div>

                <div className="arch-layer glass-panel">
                    <div className="layer-icon"><Cpu size={24} color="var(--accent-primary)" /></div>
                    <div className="layer-content">
                        <h3>OpenClaw Orchestration</h3>
                        <p>Manages multi-step workflows and intelligent task routing.</p>
                    </div>
                </div>

                <div className="connection-line">
                    <Zap size={16} color="var(--accent-secondary)" />
                    <span>Workflow execution</span>
                </div>

                <div className="arch-layer glass-panel">
                    <div className="layer-icon"><Database size={24} color="var(--accent-secondary)" /></div>
                    <div className="layer-content">
                        <h3>Wordware Prompt Logic</h3>
                        <p>Defines LLM workflows, decision trees, and business rules.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Architecture;
