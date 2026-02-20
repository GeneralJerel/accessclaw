import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <footer className="footer-section">
            <div className="container">
                <div className="footer-vision">
                    <h2>The future of freelancing isn't hiring an assistant. It's having an AI that thinks like one.</h2>
                    <p className="text-secondary">
                        Every skilled professional deserves operational support that matches their talent.
                        Amplify your capacity.
                    </p>
                    <button className="btn btn-primary" style={{ marginTop: 'var(--space-6)' }}>
                        Join the Waitlist
                    </button>
                </div>

                <div className="footer-bottom">
                    <div className="logo">AI Chief of Staff</div>
                    <div className="footer-links">
                        <a href="#">Terms</a>
                        <a href="#">Privacy</a>
                        <a href="#">Contact</a>
                    </div>
                    <p className="copyright text-tertiary">
                        © {new Date().getFullYear()} AI Chief of Staff. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
