import React, { useState, useEffect, useRef } from 'react';
import './Dashboard.css';
import { Mail, Calendar, FileText, Settings, Search, CheckCircle2, AlertCircle, RefreshCw, Send, User, Bot, Sparkles, Clock, Users, DollarSign, Download } from 'lucide-react';

// Mock Data
const mockEmails = [
    { id: 1, sender: 'Sarah Jenkins', subject: 'Checking in on our Proposal', snippet: 'Just following up to see if you had time to review...', time: '10:42 AM', tag: 'Follow-up', priority: 'high' },
    { id: 2, sender: 'Mark Tech LLC', subject: 'Invoice #042 Overdue', snippet: 'We noticed invoice #042 is now 5 days past due...', time: 'Yesterday', tag: 'Invoice', priority: 'high' },
    { id: 3, sender: 'Alex Chen', subject: 'Q3 Design Project Scope', snippet: 'Attached is the brief for the upcoming UI revamp...', time: 'Yesterday', tag: 'New Lead', priority: 'medium' },
    { id: 4, sender: 'Emily Rodriguez', subject: 'Re: Next week availability', snippet: 'Does Tuesday at 2 PM work for our sync?', time: 'Mon', tag: 'Scheduling', priority: 'low' },
];

const mockSchedule = [
    { id: 1, title: 'Deep Work Block', time: '10:00 AM - 12:00 PM', type: 'block' },
    { id: 2, title: 'Sync with Sarah', time: '1:00 PM - 1:30 PM', type: 'meeting', status: 'proposed' },
    { id: 3, title: 'Design Review: NextGen UI', time: '3:00 PM - 4:00 PM', type: 'meeting' },
];

const mockClients = [
    { id: 1, name: 'Sarah Jenkins', company: 'Acme Corp', status: 'Proposal Sent', lastContact: '2 days ago', health: 'good' },
    { id: 2, name: 'Mark Tech LLC', company: 'Mark Tech', status: 'Active Board', lastContact: '5 days ago', health: 'warning' },
    { id: 3, name: 'Alex Chen', company: 'StartupX', status: 'New Lead', lastContact: 'Yesterday', health: 'good' },
];

const mockInvoiceDetails = {
    client: 'StartupX',
    contact: 'Alex Chen',
    project: 'Q3 Design Project Scope',
    date: 'Oct 24, 2023',
    dueDate: 'Nov 24, 2023',
    items: [
        { description: 'UX Research & Strategy', hours: 15, rate: 120 },
        { description: 'UI Design (Wireframes & Hi-Fi)', hours: 40, rate: 120 },
        { description: 'Prototyping & Handoff', hours: 10, rate: 120 }
    ]
};

function Dashboard() {
    const [selectedEmail, setSelectedEmail] = useState(mockEmails[0]);

    // Chat Interface State
    const [chatInput, setChatInput] = useState('');
    const [messages, setMessages] = useState([
        { id: 1, role: 'system', text: 'Hi! I am your AI Chief of Staff. How can I help you manage your business today?' },
        { id: 2, role: 'system', text: 'Here are the things I can help you with right now: Manage Emails, Check Schedule, Client Follow-ups, and Invoices.' }
    ]);
    const [isTyping, setIsTyping] = useState(false);

    // 'inbox', 'drafting', 'schedule', 'crm', 'invoice_gen', 'empty'
    const [activeWorkspace, setActiveWorkspace] = useState('empty');

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!chatInput.trim()) return;

        const userMessage = chatInput;
        setMessages(prev => [...prev, { id: Date.now(), role: 'user', text: userMessage }]);
        setChatInput('');
        setIsTyping(true);

        // Mock OpenClaw Agent workflow response logic
        setTimeout(() => {
            let aiResponse = "";
            let actionToTake = null;
            let emailToSelect = null;

            const msgLower = userMessage.toLowerCase();

            // 5. Generate Invoice
            if (msgLower.includes('generate invoice') || msgLower.includes('create invoice') || msgLower.includes('bill alex') || msgLower.includes('invoice alex')) {
                aiResponse = "I've drafted an invoice for Alex Chen at StartupX based on the tracked hours for the 'Q3 Design Project'. Please review and approve to send it.";
                actionToTake = 'invoice_gen';
            }
            // 1. Email & Drafting
            else if (msgLower.includes('sarah') || msgLower.includes('draft') || msgLower.includes('email')) {
                aiResponse = "I've pulled up Sarah's thread and drafted a quick follow-up response based on your previous history.";
                actionToTake = 'drafting';
                emailToSelect = mockEmails[0];
            }
            // 2. Invoice Management
            else if (msgLower.includes('invoice') || msgLower.includes('pay')) {
                aiResponse = "I've filtered your inbox to show the overdue invoice for Mark Tech LLC. Would you like me to draft a reminder?";
                actionToTake = 'inbox';
                emailToSelect = mockEmails[1];
            }
            // 3. Schedule Workspace
            else if (msgLower.includes('schedule') || msgLower.includes('meet') || msgLower.includes('calendar')) {
                aiResponse = "Here is your schedule for today based on your deep work preferences. I've also tentatively proposed a 1:00 PM sync with Sarah.";
                actionToTake = 'schedule';
            }
            // 4. Client Follow up / CRM
            else if (msgLower.includes('client') || msgLower.includes('crm') || msgLower.includes('follow up') || msgLower.includes('pipeline')) {
                aiResponse = "Here is an overview of your active clients. It looks like Mark Tech LLC has an active issue (overdue invoice) that we should address today.";
                actionToTake = 'crm';
            }
            // Fallback
            else {
                aiResponse = "I can certainly help with that. Would you like me to check your Inbox, Schedule, or Client Pipeline first?";
                actionToTake = activeWorkspace; // Keep it where it is
            }

            setIsTyping(false);
            setMessages(prev => [...prev, { id: Date.now() + 1, role: 'system', text: aiResponse }]);

            if (emailToSelect) setSelectedEmail(emailToSelect);
            if (actionToTake) setActiveWorkspace(actionToTake);

        }, 1500);
    };

    // Connection State
    const [isConnected, setIsConnected] = useState(false);
    const [password, setPassword] = useState('');

    const handleConnect = (e) => {
        e.preventDefault();
        // Just mock the connection for now
        if (password) {
            setIsConnected(true);
        }
    };

    if (!isConnected) {
        return (
            <div className="container stack" style={{ margin: '8rem auto', maxWidth: '600px', textAlign: 'center' }}>
                <div className="page stack" style={{ padding: '3rem 2rem' }}>
                    <div style={{ color: 'var(--accent)', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                        <Sparkles size={48} />
                    </div>
                    <h2>Connect your AI Chief of Staff</h2>
                    <p className="subtitle">Enter your OpenClaw credentials to connect your workspace.</p>

                    <form onSubmit={handleConnect} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem', maxWidth: '300px', margin: '2rem auto 0' }}>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                padding: '0.75rem',
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid var(--line)',
                                background: 'var(--bg)',
                                color: 'var(--text)'
                            }}
                            required
                        />
                        <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                            Connect to OpenClaw
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard-split">

            {/* Primary Interaction: AI Chat Interface (Left Panel) */}
            <aside className="chat-interface page">
                <div className="chat-header">
                    <div className="agent-identity">
                        <div className="agent-avatar"><Sparkles size={18} color="white" /></div>
                        <div>
                            <div className="agent-name">AI Chief of Staff</div>
                            <div className="agent-status"><span className="status-dot"></span> Online</div>
                        </div>
                    </div>
                    <button className="btn-icon" title="Settings"><Settings size={18} /></button>
                </div>

                <div className="chat-messages">
                    {messages.map(msg => (
                        <div key={msg.id} className={`message-wrapper ${msg.role}`}>
                            <div className="message-avatar">
                                {msg.role === 'system' ? <Bot size={16} /> : <User size={16} />}
                            </div>
                            <div className="message-bubble">
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    {isTyping && (
                        <div className="message-wrapper system">
                            <div className="message-avatar"><Bot size={16} /></div>
                            <div className="message-bubble typing-indicator">
                                <span></span><span></span><span></span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <div className="chat-input-area">
                    <form onSubmit={handleSendMessage} className="chat-form">
                        <input
                            type="text"
                            placeholder="E.g. 'Show my schedule' or 'Check invoices'"
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                            disabled={isTyping}
                        />
                        <button type="submit" className={`send-btn ${chatInput.trim() ? 'active' : ''}`} disabled={!chatInput.trim() || isTyping}>
                            <Send size={18} />
                        </button>
                    </form>
                    <div className="chat-hint">Powered by OpenClaw & Wordware</div>
                </div>
            </aside>

            {/* Dynamic Workspace (Right Panel) */}
            <main className="dashboard-content">

                {/* VIEW 1: INBOX */}
                <section className={`email-list page ${['inbox', 'drafting'].includes(activeWorkspace) ? 'active-view' : ''}`}>
                    <div className="list-header">
                        <h3>Triage Inbox</h3>
                        <div className="filter-tabs">
                            <span className="tab active">Priority</span>
                            <span className="tab">All</span>
                        </div>
                    </div>

                    <div className="emails">
                        {mockEmails.map(email => (
                            <div
                                key={email.id}
                                className={`email-item ${selectedEmail.id === email.id ? 'selected' : ''}`}
                                onClick={() => {
                                    setSelectedEmail(email);
                                    setActiveWorkspace('drafting');
                                }}
                            >
                                <div className="email-item-header">
                                    <span className="sender">{email.sender}</span>
                                    <span className="time">{email.time}</span>
                                </div>
                                <div className="subject">{email.subject}</div>
                                <div className="snippet">{email.snippet}</div>
                                <div className="email-tags">
                                    <span className={`tag ${email.priority}`}>{email.tag}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* VIEW 2: DRAFTING */}
                {activeWorkspace === 'drafting' && (
                    <section className="email-detail page animate-fade-in">
                        <div className="detail-header">
                            <div className="detail-subject">{selectedEmail.subject}</div>
                            <div className="detail-meta">From: <span className="text-primary">{selectedEmail.sender}</span> • {selectedEmail.time}</div>
                        </div>

                        <div className="thread-body">
                            <p>{selectedEmail.snippet}</p>
                            <p>I hope your week is off to a great start. I'm writing to follow up on the proposal sent last Tuesday. Since we're looking at a Q3 start, I'd love to get this wrapped up so I can lock in your dates.</p>
                        </div>

                        <div className="ai-copilot-panel">
                            <div className="copilot-header">
                                <div className="copilot-title">
                                    <span className="status-indicator"></span>
                                    <span>AI Drafting Response</span>
                                </div>
                                <div className="workflow-badge">Workflow: Follow-up</div>
                            </div>

                            <div className="draft-editor">
                                <textarea
                                    className="draft-textarea"
                                    defaultValue={`Hi ${selectedEmail.sender.split(' ')[0]},\n\nThanks for following up! I've reviewed the proposal and everything looks great. Could you send over the final contract so we can get started?\n\nBest,\nYour Name`}
                                />
                            </div>

                            <div className="copilot-actions">
                                <div className="context-note">
                                    <AlertCircle size={14} color="var(--warning)" />
                                    <span>Context applied from chat history.</span>
                                </div>
                                <div className="action-buttons">
                                    <button className="btn btn-outline">Edit Draft</button>
                                    <button className="btn btn-primary" onClick={() => {
                                        setMessages(prev => [...prev, { id: Date.now(), role: 'system', text: 'Email successfully sent and thread archived.' }]);
                                        setActiveWorkspace('inbox');
                                    }}><CheckCircle2 size={16} /> Approve & Send</button>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* VIEW 3: SCHEDULE */}
                {activeWorkspace === 'schedule' && (
                    <section className="workspace-view page animate-fade-in">
                        <div className="workspace-header">
                            <h2><Calendar size={24} className="text-primary inline-icon" /> Smart Schedule</h2>
                            <p className="text-secondary">AI protected deep work and proposed meetings.</p>
                        </div>
                        <div className="schedule-list">
                            {mockSchedule.map(item => (
                                <div key={item.id} className={`schedule-item ${item.type} ${item.status || ''}`}>
                                    <div className="time">{item.time}</div>
                                    <div className="details">
                                        <h4>{item.title}</h4>
                                        {item.status === 'proposed' && <span className="tag warning">Proposed by AI</span>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* VIEW 4: CRM / CLIENT FOLLOW UP */}
                {activeWorkspace === 'crm' && (
                    <section className="workspace-view page animate-fade-in">
                        <div className="workspace-header">
                            <h2><Users size={24} className="text-primary inline-icon" /> Client Pipeline</h2>
                            <p className="text-secondary">Proactive tracking of relationships and active projects.</p>
                        </div>
                        <div className="crm-list">
                            {mockClients.map(client => (
                                <div key={client.id} className="crm-card">
                                    <div className="crm-card-header">
                                        <h3>{client.name}</h3>
                                        <span className={`health-dot ${client.health}`}></span>
                                    </div>
                                    <div className="crm-meta">{client.company}</div>
                                    <div className="crm-status">
                                        <span className="text-secondary">Status:</span> {client.status}
                                    </div>
                                    <div className="crm-contact">
                                        <Clock size={14} /> Last Contact: {client.lastContact}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* VIEW 5: INVOICE GENERATION */}
                {activeWorkspace === 'invoice_gen' && (
                    <section className="workspace-view page animate-fade-in invoice-view">
                        <div className="workspace-header invoice-header">
                            <div>
                                <h2><FileText size={24} className="text-primary inline-icon" /> Invoice Draft</h2>
                                <p className="text-secondary">Auto-generated based on tracked time for {mockInvoiceDetails.project}</p>
                            </div>
                            <div className="invoice-actions">
                                <button className="btn btn-outline"><Download size={16} /> Download PDF</button>
                                <button className="btn btn-primary" onClick={() => {
                                    setMessages(prev => [...prev, { id: Date.now(), role: 'system', text: `Invoice successfully sent to ${mockInvoiceDetails.contact} at ${mockInvoiceDetails.client}.` }]);
                                    setActiveWorkspace('inbox');
                                }}><Send size={16} /> Approve & Send</button>
                            </div>
                        </div>

                        <div className="invoice-document">
                            <div className="invoice-meta">
                                <div className="bill-to">
                                    <div className="meta-label">Billed To</div>
                                    <div className="client-name">{mockInvoiceDetails.client}</div>
                                    <div className="client-contact">{mockInvoiceDetails.contact}</div>
                                </div>
                                <div className="invoice-dates">
                                    <div className="date-group">
                                        <span className="meta-label">Date of Issue</span>
                                        <span>{mockInvoiceDetails.date}</span>
                                    </div>
                                    <div className="date-group">
                                        <span className="meta-label">Due Date</span>
                                        <span>{mockInvoiceDetails.dueDate}</span>
                                    </div>
                                </div>
                            </div>

                            <table className="invoice-table">
                                <thead>
                                    <tr>
                                        <th>Description</th>
                                        <th className="text-right">Hours</th>
                                        <th className="text-right">Rate</th>
                                        <th className="text-right">Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mockInvoiceDetails.items.map((item, idx) => (
                                        <tr key={idx}>
                                            <td>{item.description}</td>
                                            <td className="text-right">{item.hours}</td>
                                            <td className="text-right">${item.rate}/hr</td>
                                            <td className="text-right">${item.hours * item.rate}</td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan="3" className="text-right font-semibold">Total Due</td>
                                        <td className="text-right font-bold text-primary text-xl">
                                            ${mockInvoiceDetails.items.reduce((acc, curr) => acc + (curr.hours * curr.rate), 0).toLocaleString()}
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </section>
                )}

                {/* EMPTY STATE */}
                {activeWorkspace === 'empty' && (
                    <section className="empty-workspace page">
                        <div className="empty-state">
                            <div className="empty-icon"><Sparkles size={48} color="rgba(255,255,255,0.1)" /></div>
                            <h3>Workspace Ready</h3>
                            <p className="text-secondary">Ask your Assistant in the chat to pull up emails, draft responses, view schedule, or check clients.</p>
                        </div>
                    </section>
                )}

            </main>
        </div>
    );
}

export default Dashboard;
