import React from 'react';
import './Layout.css';

const Header = ({ onNavigate, currentView }) => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo" onClick={() => onNavigate('employees')} style={{cursor: 'pointer'}}>
          <h1>HRMS</h1>
          <span>Human Resource Management System</span>
        </div>

        <nav className="nav">
          <button 
            className={`nav-link ${currentView === 'employees' ? 'active' : ''}`}
            onClick={() => onNavigate('employees')}
          >
            👥 Employees
          </button>
          <button 
    className={`nav-link ${currentView === 'attendance' ? 'active' : ''}`}
    onClick={() => onNavigate('attendance')}
  >
    📅 Attendance
  </button>
          {/* You can easily add more links here later */}
        </nav>

        <div className="user-info">
          <span>Welcome, Admin</span>
          {/* Mobile Profile Icon Circle */}
          <div className="mobile-user-avatar" style={{
            width: '32px', 
            height: '32px', 
            background: 'rgba(255,255,255,0.2)', 
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
            fontWeight: 'bold'
          }}>A</div>
          <button className="logout-btn">Logout</button>
        </div>
      </div>
    </header>
  );
};

export default Header;