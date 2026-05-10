import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Menu, X, LogOut, Home, FolderOpen, Settings, Users } from 'lucide-react';
import './Navigation.css';

export const Navigation = ({ currentPage, setCurrentPage }) => {
  const { user, logout, isAdmin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    setCurrentPage('login');
  };

  if (!user) return null;

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          📋 Task Manager
          {isAdmin() && <span className="admin-badge">ADMIN</span>}
        </div>

        <button className="menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <ul className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
          <li>
            <button
              className={`nav-link ${currentPage === 'dashboard' ? 'active' : ''}`}
              onClick={() => {
                setCurrentPage('dashboard');
                setMobileMenuOpen(false);
              }}
            >
              <Home size={18} /> Dashboard
            </button>
          </li>
          <li>
            <button
              className={`nav-link ${currentPage === 'projects' ? 'active' : ''}`}
              onClick={() => {
                setCurrentPage('dashboard');
                setMobileMenuOpen(false);
              }}
            >
              <FolderOpen size={18} /> Projects
            </button>
          </li>

          {isAdmin() && (
            <li>
              <button
                className={`nav-link ${currentPage === 'admin' ? 'active' : ''}`}
                onClick={() => {
                  setCurrentPage('admin');
                  setMobileMenuOpen(false);
                }}
              >
                <Users size={18} /> Users
              </button>
            </li>
          )}

          <li className="nav-user">
            <div className="user-info">
              <span className="user-name">{user.name}</span>
              <span className="user-role">{user.role}</span>
            </div>
            <button className="logout-btn" onClick={handleLogout} title="Logout">
              <LogOut size={18} />
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};