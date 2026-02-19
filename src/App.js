import React, { useState } from 'react';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import EmployeeList from './components/Employee/EmployeeList';
import AttendanceList from './components/Employee/AttendanceList';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('employees');
  const [resetTrigger, setResetTrigger] = useState(0);

  const handleNavigation = (view) => {
    console.log('Navigating to:', view);
    setCurrentView(view);
    setResetTrigger(prev => prev + 1);
  };

  return (
    <div className="App">
      <Header onNavigate={handleNavigation} currentView={currentView} />
      <main className="main-content">
  {currentView === 'employees' && (
    <EmployeeList key={resetTrigger} onReset={resetTrigger} />
  )}

  {currentView === 'attendance' && (
    <AttendanceList />
  )}

  {!['employees', 'attendance'].includes(currentView) && (
    <div>No view selected</div>
  )}
</main>

      <Footer />
    </div>
  );
}

export default App;