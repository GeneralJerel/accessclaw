import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary caught an error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }
            return (
                <div className="container stack" style={{ margin: '8rem auto', maxWidth: '600px', textAlign: 'center' }}>
                    <div className="page stack" style={{ padding: '3rem 2rem' }}>
                        <div style={{ color: 'var(--warning)', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                            <AlertCircle size={48} />
                        </div>
                        <h2>Connection Error</h2>
                        <p className="subtitle">We couldn't connect to your local OpenClaw agent.</p>

                        <div style={{ textAlign: 'left', background: 'var(--bg)', padding: '1rem', borderRadius: 'var(--radius-md)', fontSize: '0.9rem', marginBottom: '2rem' }}>
                            <p><strong>Common reasons:</strong></p>
                            <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                                <li>OpenClaw is not running on your machine.</li>
                                <li>The `clawg-ui` plugin is not enabled on your agent.</li>
                                <li>The backend port is different from `18789`.</li>
                            </ul>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                            {this.props.onReset && (
                                <button className="btn btn-outline" onClick={() => {
                                    this.setState({ hasError: false, error: null });
                                    this.props.onReset();
                                }}>
                                    Go Back
                                </button>
                            )}
                            <button className="btn btn-primary" onClick={() => window.location.reload()}>
                                <RefreshCw size={16} style={{ marginRight: '8px' }} /> Retry Connection
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
