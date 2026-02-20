import React, { useState, useEffect } from 'react';
import './AgentMockup.css';
import { Mail, Calendar, FileText, CheckCircle2 } from 'lucide-react';

function AgentMockup() {
    const [typedText, setTypedText] = useState('');
    const fullText = "Hi Sarah,\n\nI'm following up on the proposal sent last Tuesday. Since we're looking at a Q3 start, I'd love to get this wrapped up so I can lock in your dates.\n\nLet me know if you have any questions!\n\nBest,\nYour Name";

    useEffect(() => {
        let i = 0;
        const typingInterval = setInterval(() => {
            if (i < fullText.length) {
                setTypedText(fullText.substring(0, i + 1));
                i++;
            } else {
                clearInterval(typingInterval);
            }
        }, 30); // Speed of typing

        return () => clearInterval(typingInterval);
    }, []);

    return (
        <div className="agent-mockup glass-panel">
            <div className="mockup-header">
                <div className="window-controls">
                    <span className="dot red"></span>
                    <span className="dot yellow"></span>
                    <span className="dot green"></span>
                </div>
                <div className="header-title">AG-UI Stream: <span>Drafting Follow-up...</span></div>
                <div className="agent-status">
                    <span className="status-indicator"></span> Active
                </div>
            </div>

            <div className="mockup-body">
                <div className="sidebar">
                    <div className="task-item active">
                        <Mail size={16} /> Compose Email
                    </div>
                    <div className="task-item">
                        <Calendar size={16} /> Check Schedule
                    </div>
                    <div className="task-item">
                        <FileText size={16} /> Prep Invoice
                    </div>
                </div>

                <div className="main-view">
                    <div className="email-meta">
                        <div className="meta-row"><strong>To:</strong> sarah@client.com</div>
                        <div className="meta-row"><strong>Subject:</strong> Checking in on our Proposal</div>
                    </div>
                    <div className="email-body">
                        {typedText}
                        <span className="cursor">|</span>
                    </div>
                </div>
            </div>

            <div className="mockup-footer">
                <div className="action-prompt">
                    <div className="prompt-text">
                        Reviewing draft based on relationship history (3 past successful projects).
                    </div>
                </div>
                <button className="btn btn-primary approve-btn">
                    <CheckCircle2 size={16} /> Approve & Send
                </button>
            </div>
        </div>
    );
}

export default AgentMockup;
