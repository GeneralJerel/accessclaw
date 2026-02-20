import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <Router>
      <div className="container">
        <header className="site-header">
          <Link to="/" className="logo">AI Chief of Staff</Link>
          <nav className="tabs">
            <Link to="/" className={window.location.pathname === '/' ? 'active' : ''}>Home</Link>
            <Link to="/dashboard" className={window.location.pathname === '/dashboard' ? 'active' : ''}>Dashboard</Link>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
