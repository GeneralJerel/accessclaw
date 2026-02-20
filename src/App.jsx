import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Scenario from './pages/Scenario'
import Setup from './pages/Setup'

function NavLink({ to, children }) {
  const location = useLocation();
  return <Link to={to} className={location.pathname === to ? 'active' : ''}>{children}</Link>;
}

function App() {
  return (
    <Router>
      <div className="container">
        <header className="site-header">
          <Link to="/" className="logo">AI Chief of Staff</Link>
          <nav className="tabs">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/scenario" element={<Scenario />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/setup" element={<Setup />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
