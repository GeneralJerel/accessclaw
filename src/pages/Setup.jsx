import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, CheckCircle, Loader } from 'lucide-react';
import './Setup.css';

const STEPS = [
  'Provisioning your ChiefClaw instance…',
  'Connecting to OpenClaw gateway…',
  'Configuring AI workflows…',
  'Finalizing setup…',
];

function Setup() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState('idle'); // idle | loading | done
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    if (phase !== 'loading') return;

    const interval = setInterval(() => {
      setStepIndex((prev) => {
        if (prev < STEPS.length - 1) return prev + 1;
        return prev;
      });
    }, 700);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      setPhase('done');
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [phase]);

  const handleCreate = () => {
    setPhase('loading');
    setStepIndex(0);
  };

  const handleGoToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <main className="setup-page">
      <div className="setup-card">
        {phase === 'idle' && (
          <div className="setup-idle">
            <div className="setup-icon-ring">
              <Bot size={40} strokeWidth={1.6} />
            </div>
            <h1>Create your ChiefClaw</h1>
            <p className="subtitle">
              Provision a personal ChiefClaw 🦞 for your organization.
              It runs in a sandboxed container with its own storage and configuration.
            </p>
            <button className="btn btn-primary setup-btn" onClick={handleCreate}>
              Create ChiefClaw
            </button>
          </div>
        )}

        {phase === 'loading' && (
          <div className="setup-loading">
            <div className="setup-spinner-ring">
              <Loader size={40} strokeWidth={1.6} className="spin" />
            </div>
            <h2>Setting up your ChiefClaw</h2>
            <ul className="setup-steps">
              {STEPS.map((step, i) => (
                <li key={i} className={i <= stepIndex ? 'active' : ''}>
                  {i < stepIndex ? (
                    <CheckCircle size={16} className="step-check" />
                  ) : i === stepIndex ? (
                    <span className="step-dot pulse" />
                  ) : (
                    <span className="step-dot" />
                  )}
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {phase === 'done' && (
          <div className="setup-done">
            <div className="setup-success-ring">
              <CheckCircle size={44} strokeWidth={1.6} />
            </div>
            <h2>ChiefClaw is ready</h2>
            <p className="subtitle">
              Your ChiefClaw 🦞 has been provisioned and is standing by.
            </p>
            <button className="btn btn-primary setup-btn" onClick={handleGoToDashboard}>
              Go to Dashboard
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

export default Setup;
