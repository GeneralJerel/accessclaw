import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <Router>
      <div className="app-container">
        <div className="bg-blob-1"></div>
        <div className="bg-blob-2"></div>

        {/* Simple global nav for demo purposes */}
        <nav style={{ padding: 'var(--space-4) var(--space-6)', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ fontWeight: 700 }}>AI Chief of Staff</div>
          <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
            <Link to="/" style={{ color: 'var(--text-secondary)' }}>Home</Link>
            <Link to="/dashboard" style={{ color: 'var(--accent-primary)', fontWeight: 500 }}>Dashboard</Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
