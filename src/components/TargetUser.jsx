import React from 'react';
import './TargetUser.css';
import { UserCheck, Check, X } from 'lucide-react';

function TargetUser() {
    return (
        <section className="target-user-section container">
            <div className="target-card glass-panel">
                <div className="target-header">
                    <div className="icon-wrapper">
                        <UserCheck size={32} color="var(--accent-secondary)" />
                    </div>
                    <div>
                        <h2>Who is this for?</h2>
                        <p className="text-secondary">Independent consultants, designers, developers, and coaches running a one-person business.</p>
                    </div>
                </div>

                <div className="target-details">
                    <div className="detail-column">
                        <h3 className="success-text">Core Needs</h3>
                        <ul className="check-list">
                            <li><Check size={16} /> Fewer admin hours</li>
                            <li><Check size={16} /> No missed follow-ups</li>
                            <li><Check size={16} /> Faster payments</li>
                            <li><Check size={16} /> Feeling in control without overwhelm</li>
                        </ul>
                    </div>

                    <div className="detail-column">
                        <h3 className="danger-text">Non-goals</h3>
                        <ul className="cross-list">
                            <li><X size={16} /> Another tool to babysit</li>
                            <li><X size={16} /> Hidden black-box automation</li>
                            <li><X size={16} /> Complex, lengthy setup</li>
                            <li><X size={16} /> Losing your personal voice</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default TargetUser;
