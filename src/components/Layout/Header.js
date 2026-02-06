import React from 'react';
import './Layout.css';

const Header = ({ onNavigate, currentView }) => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1>HRMS</h1>
          <span>Human Resource Management System</span>
        </div>
        <nav className="nav">
          <button 
            className={`nav-link ${currentView === 'employees' ? 'active' : ''}`}
            onClick={() => onNavigate('employees')}
          >
            Employees
          </button>
        </nav>
        <div className="user-info">
          <span>Welcome, Admin</span>
          <button className="logout-btn">Logout</button>
        </div>
      </div>
    </header>
  );
};

export default Header;