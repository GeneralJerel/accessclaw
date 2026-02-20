import React from 'react';
import './TargetUser.css';
import { UserCheck, Check, X } from 'lucide-react';

function TargetUser() {
    return (
        <section className="container" style={{ margin: '4rem auto' }}>
            <div className="page stack">
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div style={{ color: 'var(--accent)', background: 'var(--surface-soft)', padding: '0.75rem', borderRadius: '50%' }}>
                        <UserCheck size={32} />
                    </div>
                    <div>
                        <h2 style={{ marginBottom: 0 }}>Who is this for?</h2>
                        <p className="subtitle">Independent consultants, designers, developers, and coaches running a one-person business.</p>
                    </div>
                </div>

                <div className="split">
                    <div className="card stack" style={{ padding: '1.5rem' }}>
                        <h3 style={{ color: 'var(--success)' }}>Core Needs</h3>
                        <ul className="trust-list" style={{ marginTop: '0.5rem' }}>
                            <li className="active" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={16} /> Fewer admin hours</li>
                            <li className="active" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={16} /> No missed follow-ups</li>
                            <li className="active" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={16} /> Faster payments</li>
                            <li className="active" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={16} /> Feeling in control without overwhelm</li>
                        </ul>
                    </div>

                    <div className="card stack" style={{ padding: '1.5rem' }}>
                        <h3 style={{ color: '#ef4444' }}>Non-goals</h3>
                        <ul className="trust-list" style={{ marginTop: '0.5rem' }}>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><X size={16} /> Another tool to babysit</li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><X size={16} /> Hidden black-box automation</li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><X size={16} /> Complex, lengthy setup</li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><X size={16} /> Losing your personal voice</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default TargetUser;
