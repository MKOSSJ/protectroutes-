import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/navbar.css';

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setMobileMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  // No mostrar navbar en página de login
  if (location.pathname === '/login') {
    return null;
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-brand">
          <div className="logo-icon">🔐</div>
          <span className="logo-text">Protect</span>
        </div>

        {/* Hamburger Menu */}
        <button 
          className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigation Links */}
        {isAuthenticated && (
          <div className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
            <div className="nav-links">
              <button
                className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
                onClick={() => {
                  navigate('/dashboard');
                  setMobileMenuOpen(false);
                }}
              >
                📊 Dashboard
              </button>

              {user?.role === 'admin' && (
                <button
                  className={`nav-link ${isActive('/admin') ? 'active' : ''}`}
                  onClick={() => {
                    navigate('/admin');
                    setMobileMenuOpen(false);
                  }}
                >
                  ⚙️ Admin
                </button>
              )}
            </div>

            {/* User Info & Logout */}
            <div className="nav-user">
              <div className="user-badge">
                <div className="user-avatar">{user?.name?.[0].toUpperCase()}</div>
                <div className="user-details">
                  <div className="user-name">{user?.name}</div>
                  <div className="user-role">{user?.role === 'admin' ? '👨‍💼 Admin' : '👤 User'}</div>
                </div>
              </div>
              <button 
                className="btn-logout"
                onClick={handleLogout}
              >
                🚪 Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
