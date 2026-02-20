import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { CopilotKit } from "@copilotkit/react-core";
import { useState } from "react";
import "@copilotkit/react-ui/styles.css";
import './App.css'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Scenario from './pages/Scenario'
import Setup from './pages/Setup'
import ErrorBoundary from './components/ErrorBoundary';

function NavLink({ to, children }) {
  const location = useLocation();
  return <Link to={to} className={location.pathname === to ? 'active' : ''}>{children}</Link>;
}

function App() {
  const [deviceToken, setDeviceToken] = useState('');
  return (
    <Router>
      <div className="container">
        <header className="site-header">
          <Link to="/" className="logo">ChiefClaw 🦞</Link>
          <nav className="tabs">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/scenario" element={<Scenario />} />
          <Route path="/dashboard" element={
            deviceToken ? (
              <ErrorBoundary onReset={() => setDeviceToken('')}>
                <CopilotKit
                  runtimeUrl="http://localhost:18789/v1/clawg-ui"
                  agent="openclaw"
                  headers={{
                    Authorization: `Bearer ${deviceToken}`
                  }}
                >
                  <Dashboard deviceToken={deviceToken} setDeviceToken={setDeviceToken} />
                </CopilotKit>
              </ErrorBoundary>
            ) : (
              <Dashboard deviceToken={deviceToken} setDeviceToken={setDeviceToken} />
            )
          } />
          <Route path="/setup" element={<Setup />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
