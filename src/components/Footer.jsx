import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <footer style={{ borderTop: '1px solid var(--line)', padding: '4rem 0 2rem', marginTop: '4rem', background: 'var(--surface-soft)' }}>
            <div className="container stack" style={{ textAlign: 'center' }}>
                <h2 style={{ maxWidth: '700px', margin: '0 auto' }}>The future of freelancing isn't hiring an assistant. It's having an AI that thinks like one.</h2>
                <p className="subtitle" style={{ margin: '0 auto' }}>
                    Every skilled professional deserves operational support that matches their talent. Amplify your capacity.
                </p>
                <div style={{ margin: '2rem auto 0' }}>
                    <button className="btn btn-primary">
                        Join the Waitlist
                    </button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid var(--line)', flexWrap: 'wrap', gap: '1rem' }}>
                    <div className="logo">AI Chief of Staff</div>
                    <div style={{ display: 'flex', gap: '1.5rem' }}>
                        <a href="#" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '0.85rem' }}>Terms</a>
                        <a href="#" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '0.85rem' }}>Privacy</a>
                        <a href="#" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '0.85rem' }}>Contact</a>
                    </div>
                </div>
                <p style={{ color: 'var(--muted)', fontSize: '0.8rem', marginTop: '1rem', textAlign: 'left' }}>
                    © {new Date().getFullYear()} AI Chief of Staff. All rights reserved.
                </p>
            </div>
        </footer>
    );
}

export default Footer;
