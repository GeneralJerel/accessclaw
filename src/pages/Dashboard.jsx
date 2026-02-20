import React, { useState, useEffect, useRef, useMemo } from 'react';
import './Dashboard.css';
import { Mail, Calendar, FileText, Settings, Search, CheckCircle2, Circle, AlertCircle, RefreshCw, Send, User, Bot, Sparkles, Clock, Users, DollarSign, Download, ListTodo, ArrowUpRight, ArrowDownLeft, ArrowUpRight as ArrowOut, ChevronDown, ChevronRight, Zap, MessageSquare, PenLine } from 'lucide-react';
import { useCopilotAction, useCopilotReadable, useCopilotChat } from "@copilotkit/react-core";

import { useLocation } from 'react-router-dom';
import db, { sendEmail, freelancer, getThread } from '../../mock-data/index';
import { scenarioOnlyEmails } from '../../mock-data/seed';
import eventBus from '../../mock-data/eventBus';

const calendarEvents = db.collection('calendar').getAll();
const scenarioClients = db.collection('clients').getAll();
const dailyBrief = db.collection('dailyBriefs').getAll()[0];
const scenarioTasks = db.collection('tasks').getAll();

function formatTime(iso) {
    return new Date(iso).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}

function formatDate(iso) {
    return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function getInitials(name) {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

const WORKFLOW_LABELS = {
    'new-lead': 'New Lead Response',
    'revision-request': 'Revision Acknowledgment',
    'client-feedback': 'Feedback Reply',
    'payment-notification': 'Payment Logging',
    'notification': 'FYI — No Action',
};

const CONTEXT_SIGNALS = {
    'respond-with-calendar-slots': ['Calendar availability', 'Client profile', "Maya's voice"],
    'create-calendar-invite': ['Calendar sync', 'Meeting details'],
    'draft-reply': ['Client history', 'Project context', "Maya's voice"],
    'log-payment': ['Stripe data', 'Invoice records'],
    'none': [],
};

function getDraftForEmail(email) {
    const firstName = email.sender.split(' ')[0];
    switch (email.category) {
        case 'new-lead':
            return `Hi ${firstName},\n\nThank you so much for reaching out — that sounds like a wonderful project, and I'd love to learn more about your vision.\n\nI have a few openings this week for a quick intro call. Would any of these work?\n\n• Thursday, Feb 20 — 1:00 PM PST\n• Friday, Feb 21 — 10:00 AM PST\n• Friday, Feb 21 — 3:00 PM PST\n\nLooking forward to the conversation!\n\nWarm regards,\nMaya`;
        case 'revision-request':
            return `Hi ${firstName},\n\nThanks for the detailed feedback — both notes make sense. I'll add the social media avatar section and explore some brighter options for the secondary palette.\n\nI can have the updated version to you by Friday as requested. I'll send a progress check tomorrow afternoon.\n\nBest,\nMaya`;
        case 'client-feedback':
            return `Hi ${firstName},\n\nGreat to hear the screens are looking good! I'll update the recipe detail background — thinking a warm linen tone that feels more inviting.\n\nI'll send the revision by end of day tomorrow.\n\nThanks for the quick turnaround!\n\nBest,\nMaya`;
        case 'payment-notification':
            return '';
        default:
            return `Hi ${firstName},\n\nThanks for reaching out! I'll review this and get back to you shortly.\n\nBest,\nMaya`;
    }
}

function mapEmailsForDisplay(emails) {
    return emails
        .filter(e => e.direction === 'inbound')
        .map(e => ({
            id: e.id,
            threadId: e.threadId,
            sender: e.from.name,
            senderEmail: e.from.email,
            subject: e.subject,
            snippet: e.clawSummary,
            clawSummary: e.clawSummary,
            body: e.body,
            time: formatTime(e.timestamp),
            timestamp: e.timestamp,
            tag: e.category === 'new-lead' ? 'New Lead' : e.category === 'revision-request' ? 'Revision' : e.category === 'client-feedback' ? 'Feedback' : e.category === 'payment-notification' ? 'Payment' : 'Info',
            priority: e.urgency,
            category: e.category,
            clawAction: e.clawAction,
            requiresReply: e.requiresReply,
            linkedClientId: e.linkedClientId,
        }));
}

function ThreadMessage({ email, isLast }) {
    const [expanded, setExpanded] = useState(isLast);
    const isOutbound = email.direction === 'outbound';
    const senderName = isOutbound ? email.from.name : email.from.name;

    return (
        <div className={`thread-msg ${isOutbound ? 'outbound' : 'inbound'} ${expanded ? 'expanded' : ''}`}>
            <button className="thread-msg-header" onClick={() => setExpanded(!expanded)}>
                <div className="thread-msg-left">
                    <div className={`thread-avatar ${isOutbound ? 'avatar-maya' : ''}`}>
                        {getInitials(senderName)}
                    </div>
                    <div className="thread-msg-meta">
                        <span className="thread-sender-name">{senderName}</span>
                        {email.generatedBy === 'openclaw' && (
                            <span className="thread-claw-badge"><Bot size={10} /> Claw</span>
                        )}
                    </div>
                </div>
                <div className="thread-msg-right">
                    <span className="thread-direction-icon">
                        {isOutbound ? <ArrowOut size={12} /> : <ArrowDownLeft size={12} />}
                    </span>
                    <span className="thread-time">{formatTime(email.timestamp)}</span>
                    {expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                </div>
            </button>
            {expanded && (
                <div className="thread-msg-body">
                    {email.body.split('\n\n').map((para, i) => (
                        <p key={i}>{para}</p>
                    ))}
                </div>
            )}
            {!expanded && (
                <div className="thread-msg-preview">
                    {email.body.split('\n')[0].slice(0, 80)}{email.body.length > 80 ? '...' : ''}
                </div>
            )}
        </div>
    );
}

function ThreadView({ threadId }) {
    if (!threadId) return null;
    const thread = getThread(threadId);
    if (!thread.length) return null;

    return (
        <div className="thread-view">
            <div className="thread-count">{thread.length} message{thread.length > 1 ? 's' : ''} in thread</div>
            {thread.map((email, i) => (
                <ThreadMessage key={email.id} email={email} isLast={i === thread.length - 1} />
            ))}
        </div>
    );
}

const mockSchedule = calendarEvents.map(evt => ({
    id: evt.id,
    title: evt.title,
    time: formatTime(evt.datetime) + (evt.duration > 30 ? ` - ${formatTime(new Date(new Date(evt.datetime).getTime() + evt.duration * 60000).toISOString())}` : ''),
    type: evt.type === 'deep-work' ? 'block' : 'meeting',
    status: evt.source === 'openclaw' && evt.type === 'client-call' ? 'proposed' : undefined,
}));

const mockClients = scenarioClients.map(c => ({
    id: c.id,
    name: c.name,
    company: c.company,
    status: c.status === 'new-lead' ? 'New Lead' : c.status === 'active' ? 'Active' : c.status === 'follow-up-needed' ? 'Follow-up Needed' : c.status,
    lastContact: new Date(c.lastContact).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    health: c.status === 'follow-up-needed' ? 'warning' : 'good',
}));

const mockTasks = scenarioTasks.map(t => ({
    id: t.id,
    title: t.title,
    description: t.description,
    status: t.status,
    priority: t.priority,
    dueDate: new Date(t.dueDate).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true }),
    project: t.project,
    tags: t.tags,
    source: t.source,
}));

const mockInvoiceDetails = {
    client: 'Archway Financial',
    contact: 'Marcus Webb',
    project: 'Brand Guidelines Package',
    date: 'Feb 10, 2026',
    dueDate: 'Feb 25, 2026',
    items: [
        { description: 'Brand Strategy & Positioning', hours: 12, rate: 150 },
        { description: 'Logo & Visual Identity Design', hours: 24, rate: 150 },
        { description: 'Brand Guidelines Document', hours: 8, rate: 150 }
    ]
};

function CopilotBridge(props) {
    const { visibleMessages: _visibleMessages, appendMessage, isLoading } = useCopilotChat();
    const visibleMessages = _visibleMessages ?? [];
    return <DashboardInner {...props} visibleMessages={visibleMessages} appendMessage={appendMessage} isLoading={isLoading} copilotConnected={true} />;
}


function DashboardInner({ visibleMessages = [], appendMessage = () => {}, isLoading = false, copilotConnected = false }) {
    const location = useLocation();
    const isDemoMode = new URLSearchParams(location.search).get('chiefclaw') === 'true';

    const [inboxEmails, setInboxEmails] = useState(() => db.collection('inbox').getAll());
    const mockEmails = useMemo(() => mapEmailsForDisplay(inboxEmails), [inboxEmails]);

    const [selectedEmail, setSelectedEmail] = useState(() => {
        const initial = mapEmailsForDisplay(db.collection('inbox').getAll());
        return initial[0] || null;
    });
    const [detailTab, setDetailTab] = useState('message');
    const [todoItems, setTodoItems] = useState(mockTasks);

    const toggleTodo = (id) => {
        setTodoItems(prev => prev.map(t =>
            t.id === id ? { ...t, status: t.status === 'done' ? 'todo' : 'done' } : t
        ));
    };

    // Chat Interface State
    const [chatInput, setChatInput] = useState('');

    const [activeWorkspace, setActiveWorkspace] = useState('empty');
    const messagesEndRef = useRef(null);

    

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [visibleMessages]);

    // Reactive inbox — re-render when scenario adds emails
    useEffect(() => {
        const unsub = db.collection('inbox').subscribe((emails) => {
            setInboxEmails(emails);
        });
        return unsub;
    }, []);

    // Event bus — scenario drives the chat and UI (cross-tab via BroadcastChannel)
    useEffect(() => {
        const unsubs = [
            eventBus.on('inbox:add', ({ email }) => {
                db.collection('inbox').add({ ...email });
            }),
            eventBus.on('scenario:reset', () => {
                scenarioOnlyEmails.forEach(e => db.collection('inbox').remove(e.id));
                setMessages([
                    { id: 1, role: 'system', text: 'Hi! I am your ChiefClaw 🦞. How can I help you manage your business today?' },
                    { id: 2, role: 'system', text: 'Here are the things I can help you with right now: Manage Emails, Check Schedule, Client Follow-ups, and Invoices.' }
                ]);
                setActiveWorkspace('empty');
                setSelectedEmail(null);
            }),
            eventBus.on('chat:message', ({ text, role }) => {
                setMessages(prev => [...prev, { id: Date.now(), role, text }]);
            }),
            eventBus.on('chat:typing', ({ isTyping: typing }) => {
                setIsTyping(typing);
            }),
            eventBus.on('ui:switchView', ({ workspace }) => {
                setActiveWorkspace(workspace);
            }),
            eventBus.on('ui:selectEmail', ({ emailId }) => {
                const freshEmails = db.collection('inbox').getAll();
                const mapped = mapEmailsForDisplay(freshEmails);
                const found = mapped.find(e => e.id === emailId);
                if (found) {
                    setSelectedEmail(found);
                    setDetailTab('message');
                }
            }),
        ];
        return () => unsubs.forEach(fn => fn());
    }, []);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!chatInput.trim() || isLoading) return;

        // Send message to CopilotKit/OpenClaw
        appendMessage(chatInput);
        setChatInput('');

    };


    return (
        <div className="dashboard-split">

            {/* Primary Interaction: AI Chat Interface (Left Panel) */}
            <aside className="chat-interface page">
                <div className="chat-header">
                    <div className="agent-identity">
                        <div className="agent-avatar"><Sparkles size={18} color="white" /></div>
                        <div>
                            <div className="agent-name">ChiefClaw 🦞</div>
                            <div className="agent-status"><span className="status-dot"></span> Online</div>
                        </div>
                    </div>
                    <button className="btn-icon" title="Settings"><Settings size={18} /></button>
                </div>

                <div className="chat-messages">
                    {visibleMessages.map((msg, idx) => {
                        const role = msg.role === 'user' ? 'user' : (msg.role === 'notification' ? 'system notification' : 'system');
                        let text = '';

                        // Handle different CopilotKit message structures
                        if (typeof msg.content === 'string' && msg.content.trim()) text = msg.content;
                        else if (typeof msg === 'string') text = msg;
                        else if (msg.text) text = msg.text;
                        else if (msg.isTextMessage?.()) text = msg.content;

                        // Skip empty messages (e.g. tool execution events)
                        if (!text) return null;

                        return (
                            <div key={msg.id || idx} className={`message-wrapper ${role}`}>
                                <div className="message-avatar">
                                    {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                                </div>
                                <div className="message-bubble">
                                    <div className="message-sender-label">
                                        {msg.role === 'system' ? 'ChiefClaw 🦞' : msg.role === 'notification' ? '[System]' : 'You'}
                                    </div>
                                    {text}
                                </div>
                            </div>
                        );
                    })}
                    {isLoading && (
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
                            disabled={isLoading}
                        />
                        <button type="submit" className={`send-btn ${chatInput.trim() ? 'active' : ''}`} disabled={!chatInput.trim() || isLoading}>
                            <Send size={18} />
                        </button>
                    </form>
                    <div className="chat-hint">Powered by OpenClaw & Wordware</div>
                </div>
            </aside>

            {/* Dynamic Workspace (Right Panel) */}
            < main className="dashboard-content" >

                {/* VIEW 1 & 2: INBOX + EMAIL PREVIEW (side-by-side) */}
                {
                    ['inbox', 'drafting'].includes(activeWorkspace) && (
                        <div className={`inbox-workspace ${activeWorkspace === 'drafting' ? 'has-preview' : ''}`}>
                            <section className="email-list page">
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
                                            className={`email-item ${selectedEmail?.id === email.id ? 'selected' : ''}`}
                                            onClick={() => {
                                                setSelectedEmail(email);
                                                setDetailTab('message');
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

                            {activeWorkspace === 'drafting' && selectedEmail && (
                                <section className="email-detail page animate-fade-in">
                                    <div className="detail-header-v2">
                                        <div className="detail-header-top">
                                            <div className="detail-subject-v2">{selectedEmail.subject}</div>
                                            <span className={`tag ${selectedEmail.priority}`}>{selectedEmail.tag}</span>
                                        </div>
                                        <div className="detail-sender-row">
                                            <div className="detail-sender-avatar">{getInitials(selectedEmail.sender)}</div>
                                            <div className="detail-sender-info">
                                                <span className="detail-sender-name">{selectedEmail.sender}</span>
                                                <span className="detail-sender-email">{selectedEmail.senderEmail}</span>
                                            </div>
                                            <span className="detail-timestamp">{formatDate(selectedEmail.timestamp)} at {selectedEmail.time}</span>
                                        </div>
                                        {selectedEmail.clawSummary && (
                                            <div className="detail-claw-summary">
                                                <Sparkles size={13} />
                                                <span>{selectedEmail.clawSummary}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="detail-tab-bar">
                                        <button
                                            className={`detail-tab ${detailTab === 'message' ? 'active' : ''}`}
                                            onClick={() => setDetailTab('message')}
                                        >
                                            <Mail size={14} />
                                            <span>Message</span>
                                        </button>
                                        {selectedEmail.threadId && getThread(selectedEmail.threadId).length > 1 && (
                                            <button
                                                className={`detail-tab ${detailTab === 'thread' ? 'active' : ''}`}
                                                onClick={() => setDetailTab('thread')}
                                            >
                                                <MessageSquare size={14} />
                                                <span>Thread</span>
                                                <span className="detail-tab-count">{getThread(selectedEmail.threadId).length}</span>
                                            </button>
                                        )}
                                        {selectedEmail.requiresReply !== false && (
                                            <button
                                                className={`detail-tab ${detailTab === 'reply' ? 'active' : ''}`}
                                                onClick={() => setDetailTab('reply')}
                                            >
                                                <PenLine size={14} />
                                                <span>AI Reply</span>
                                                <span className="detail-tab-dot"></span>
                                            </button>
                                        )}
                                    </div>

                                    {detailTab === 'message' && (
                                        <div className="detail-message-area">
                                            <div className="message-body">
                                                {selectedEmail.body.split('\n\n').map((para, i) => (
                                                    <p key={i}>{para}</p>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {detailTab === 'thread' && (
                                        <div className="detail-thread-area">
                                            <ThreadView threadId={selectedEmail.threadId} />
                                        </div>
                                    )}

                                    {detailTab === 'reply' && selectedEmail.requiresReply !== false && (
                                        <div className="detail-reply-area">
                                            <div className="ai-copilot-panel-v2">
                                                <div className="copilot-header-v2">
                                                    <div className="copilot-title-v2">
                                                        <span className="status-indicator"></span>
                                                        <span>AI Draft Ready</span>
                                                        <span className="confidence-badge"><Zap size={10} /> 95%</span>
                                                    </div>
                                                    <div className="workflow-badge">
                                                        {WORKFLOW_LABELS[selectedEmail.category] || 'Follow-up'}
                                                    </div>
                                                </div>

                                                <div className="tone-selector">
                                                    {['Professional', 'Warm', 'Casual'].map(tone => (
                                                        <button
                                                            key={tone}
                                                            className={`tone-pill ${tone === 'Warm' ? 'active' : ''}`}
                                                            onClick={() => { }}
                                                        >{tone}</button>
                                                    ))}
                                                </div>

                                                <div className="draft-editor-v2">
                                                    <textarea
                                                        className="draft-textarea"
                                                        key={selectedEmail.id}
                                                        defaultValue={getDraftForEmail(selectedEmail)}
                                                    />
                                                </div>

                                                <div className="copilot-context-bar">
                                                    <Sparkles size={12} />
                                                    <span>Context: </span>
                                                    {(CONTEXT_SIGNALS[selectedEmail.clawAction] || ["Maya's voice"]).map((signal, i) => (
                                                        <span key={i} className="context-chip">{signal}</span>
                                                    ))}
                                                </div>

                                                <div className="copilot-actions-v2">
                                                    <button className="btn btn-ghost" onClick={() => { }}>
                                                        <RefreshCw size={14} /> Regenerate
                                                    </button>
                                                    <div className="action-buttons">
                                                        <button className="btn btn-outline">Edit Draft</button>
                                                        <button className="btn btn-primary" onClick={() => {
                                                            const draftText = document.querySelector('.draft-textarea')?.value || '';
                                                            sendEmail({
                                                                direction: 'outbound',
                                                                to: { name: selectedEmail.sender, email: selectedEmail.senderEmail || '' },
                                                                subject: `Re: ${selectedEmail.subject}`,
                                                                body: draftText,
                                                                threadId: selectedEmail.threadId || null,
                                                                generatedBy: 'openclaw',
                                                                approvedBy: freelancer.name,
                                                            });
                                                            setMessages(prev => [...prev, { id: Date.now(), role: 'notification', text: `Email sent to ${selectedEmail.sender} and thread archived.` }]);
                                                            setActiveWorkspace('inbox');
                                                        }}><CheckCircle2 size={16} /> Approve & Send</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </section>
                            )}
                        </div>
                    )
                }

                {/* VIEW 3: SCHEDULE */}
                {
                    activeWorkspace === 'schedule' && (
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
                    )
                }

                {/* VIEW 4: CRM / CLIENT FOLLOW UP */}
                {
                    activeWorkspace === 'crm' && (
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
                    )
                }

                {/* VIEW 6: TODO LIST */}
                {
                    activeWorkspace === 'todos' && (
                        <section className="workspace-view page animate-fade-in todo-view">
                            <div className="todo-header">
                                <div>
                                    <h2><ListTodo size={24} className="text-primary inline-icon" /> Today's Tasks</h2>
                                    <p className="text-secondary">{todoItems.filter(t => t.status === 'done').length} of {todoItems.length} completed</p>
                                </div>
                                <div className="todo-progress-wrap">
                                    <div className="todo-progress-bar">
                                        <div
                                            className="todo-progress-fill"
                                            style={{ width: `${(todoItems.filter(t => t.status === 'done').length / todoItems.length) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="todo-list">
                                {todoItems
                                    .sort((a, b) => {
                                        if (a.status === 'done' && b.status !== 'done') return 1;
                                        if (a.status !== 'done' && b.status === 'done') return -1;
                                        const prio = { high: 0, medium: 1, low: 2 };
                                        return (prio[a.priority] ?? 2) - (prio[b.priority] ?? 2);
                                    })
                                    .map(task => (
                                        <div key={task.id} className={`todo-item ${task.status === 'done' ? 'done' : ''}`}>
                                            <button className="todo-check" onClick={() => toggleTodo(task.id)}>
                                                {task.status === 'done'
                                                    ? <CheckCircle2 size={20} className="text-success" />
                                                    : <Circle size={20} />
                                                }
                                            </button>
                                            <div className="todo-content">
                                                <div className="todo-title-row">
                                                    <span className="todo-title">{task.title}</span>
                                                    <span className={`tag ${task.priority}`}>{task.priority}</span>
                                                </div>
                                                <p className="todo-desc">{task.description}</p>
                                                <div className="todo-meta">
                                                    <span className="todo-project">{task.project}</span>
                                                    <span className="todo-due"><Clock size={12} /> {task.dueDate}</span>
                                                    {task.source && <span className="todo-source"><ArrowUpRight size={12} /> {task.source}</span>}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </section>
                    )
                }

                {/* VIEW 5: INVOICE GENERATION */}
                {
                    activeWorkspace === 'invoice_gen' && (
                        <div className="inbox-workspace has-preview animate-fade-in">
                            <section className="invoice-sidebar page">
                                <div className="list-header">
                                    <h3>Invoices</h3>
                                    <div className="filter-tabs">
                                        <span className="tab active">Draft</span>
                                        <span className="tab">Sent</span>
                                    </div>
                                </div>

                                <div className="invoice-list-items">
                                    <div className="invoice-list-item selected">
                                        <div className="invoice-list-item-header">
                                            <span className="sender">{mockInvoiceDetails.client}</span>
                                            <span className="time">{mockInvoiceDetails.date}</span>
                                        </div>
                                        <div className="subject">{mockInvoiceDetails.project}</div>
                                        <div className="snippet">
                                            {mockInvoiceDetails.items.length} line items • ${mockInvoiceDetails.items.reduce((acc, curr) => acc + (curr.hours * curr.rate), 0).toLocaleString()} total
                                        </div>
                                        <div className="email-tags">
                                            <span className="tag high">Due {mockInvoiceDetails.dueDate}</span>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="invoice-detail page">
                                <div className="detail-header invoice-detail-header">
                                    <div>
                                        <div className="detail-subject">Invoice — {mockInvoiceDetails.project}</div>
                                        <div className="detail-meta">For: <span className="text-primary">{mockInvoiceDetails.client}</span> • {mockInvoiceDetails.contact}</div>
                                    </div>
                                    <div className="invoice-actions">
                                        <button className="btn btn-outline"><Download size={16} /> PDF</button>
                                        <button className="btn btn-primary" onClick={() => {
                                            setMessages(prev => [...prev, { id: Date.now(), role: 'notification', text: `Invoice successfully sent to ${mockInvoiceDetails.contact} at ${mockInvoiceDetails.client}.` }]);
                                            setActiveWorkspace('empty');
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
                        </div>
                    )
                }

                {/* DEFAULT: DAILY BRIEF */}
                {
                    activeWorkspace === 'empty' && (
                        <section className="daily-brief animate-fade-in">
                            {/* Brief Header + Stats */}
                            <div className="brief-header page">
                                <div className="brief-greeting">
                                    <Sparkles size={20} className="text-primary" />
                                    <h2>{dailyBrief.greeting}</h2>
                                </div>
                                <div className="brief-stats">
                                    <div className="stat-pill" onClick={() => setActiveWorkspace('inbox')}>
                                        <Mail size={15} />
                                        <span className="stat-value">{dailyBrief.stats.pendingEmails}</span>
                                        <span className="stat-label">Emails</span>
                                    </div>
                                    <div className="stat-pill" onClick={() => setActiveWorkspace('todos')}>
                                        <ListTodo size={15} />
                                        <span className="stat-value">{dailyBrief.stats.tasksDueToday}</span>
                                        <span className="stat-label">Tasks Today</span>
                                    </div>
                                    <div className="stat-pill">
                                        <DollarSign size={15} />
                                        <span className="stat-value">${(dailyBrief.stats.revenueThisMonth / 1000).toFixed(1)}k</span>
                                        <span className="stat-label">This Month</span>
                                    </div>
                                    <div className="stat-pill" onClick={() => setActiveWorkspace('crm')}>
                                        <Users size={15} />
                                        <span className="stat-value">{dailyBrief.stats.activeClients}</span>
                                        <span className="stat-label">Clients</span>
                                    </div>
                                </div>
                                <p className="brief-summary">{dailyBrief.summary.split('\n\n')[0]}</p>
                            </div>

                            <div className="brief-grid">
                                {/* Emails Preview */}
                                <div className="brief-card page">
                                    <div className="brief-card-header" onClick={() => setActiveWorkspace('inbox')}>
                                        <div className="brief-card-title">
                                            <Mail size={16} className="text-primary" />
                                            <h3>Emails Needing Attention</h3>
                                        </div>
                                        <span className="brief-card-count">{dailyBrief.sections[1].items.length}</span>
                                    </div>
                                    <div className="brief-card-items">
                                        {dailyBrief.sections[1].items.map((item, i) => (
                                            <div key={i} className="brief-item" onClick={() => setActiveWorkspace('inbox')}>
                                                <div className="brief-item-row">
                                                    <span className={`brief-status-dot ${item.status}`}></span>
                                                    <span className="brief-item-label">{item.label}</span>
                                                </div>
                                                <p className="brief-item-detail">{item.detail}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Invoices Preview */}
                                <div className="brief-card page">
                                    <div className="brief-card-header">
                                        <div className="brief-card-title">
                                            <DollarSign size={16} className="text-primary" />
                                            <h3>Invoices & Payments</h3>
                                        </div>
                                        <span className="brief-card-count">{dailyBrief.sections[2].items.length}</span>
                                    </div>
                                    <div className="brief-card-items">
                                        {dailyBrief.sections[2].items.map((item, i) => (
                                            <div key={i} className="brief-item">
                                                <div className="brief-item-row">
                                                    <span className={`brief-status-dot ${item.status}`}></span>
                                                    <span className="brief-item-label">{item.label}</span>
                                                </div>
                                                <p className="brief-item-detail">{item.detail}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* AI Notes */}
                            {dailyBrief.clawNotes.length > 0 && (
                                <div className="brief-notes page">
                                    <div className="brief-card-title">
                                        <Sparkles size={16} className="text-primary" />
                                        <h3>AI Notes</h3>
                                    </div>
                                    <ul className="brief-notes-list">
                                        {dailyBrief.clawNotes.map((note, i) => (
                                            <li key={i}>{note}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </section>
                    )
                }

            </main >
        </div >
    );
}

function Dashboard({ deviceToken, setDeviceToken }) {
    // Connection State
    const [password, setPassword] = useState('');

    const handleConnect = (e) => {
        e.preventDefault();
        if (password) {
            setDeviceToken(password);
        }
    };

    if (!deviceToken) {
        return (
            <div className="container stack" style={{ margin: '8rem auto', maxWidth: '600px', textAlign: 'center' }}>
                <div className="page stack" style={{ padding: '3rem 2rem' }}>
                    <div style={{ color: 'var(--accent)', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                        <Sparkles size={48} />
                    </div>
                    <h2>Connect your ChiefClaw 🦞</h2>
                    <p className="subtitle">Enter your OpenClaw device token from the pairing flow to connect your workspace.</p>

                    <form onSubmit={handleConnect} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem', maxWidth: '300px', margin: '2rem auto 0' }}>
                        <input
                            type="password"
                            placeholder="Device token (from pairing)"
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
                    <p style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: '1rem' }}>
                        Need a token? Run the pairing flow: <code style={{ fontSize: '0.75rem' }}>curl -X POST http://localhost:18789/v1/clawg-ui -H "Content-Type: application/json" -d '{}'</code>, then approve with <code style={{ fontSize: '0.75rem' }}>openclaw pairing approve clawg-ui &lt;pairingCode&gt;</code>. See docs/engineering/4_OPENCLAW_CONNECTION.md.
                    </p>
                </div>
            </div>
        );
    }

    return <CopilotBridge />;
}

export { DashboardInner };
export default Dashboard;
