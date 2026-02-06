import React, { useState } from 'react';
import { employeeService } from '../../services/employeeService';
import './Employee.css';

const UpdateAttendanceForm = ({ employee, onBack }) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [status, setStatus] = useState('Present');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await employeeService.updateAttendance(employee.id, status, selectedDate);
      alert(`Attendance updated successfully for ${employee.name}`);
      onBack();
    } catch (error) {
      console.error('Error updating attendance:', error);
      alert('Error updating attendance');
    }
  };

  return (
    <div className="update-attendance-container">
      <h3>Update Attendance for {employee.name}</h3>
      
      <div className="employee-info">
        <p><strong>Employee ID:</strong> {employee.employeeId}</p>
        <p><strong>Employee:</strong> {employee.name}</p>
        <p><strong>Email:</strong> {employee.email}</p>
        <p><strong>Department:</strong> {employee.department}</p>
      </div>

      <form onSubmit={handleSubmit} className="attendance-form">
        <div className="form-group">
          <label>Date:</label>
          <input 
            type="date" 
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Status:</label>
          <select 
            value={status} 
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>
        </div>

        <div className="button-group">
          <button type="submit" className="btn-primary">Update Attendance</button>
          <button type="button" className="btn-secondary" onClick={onBack}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateAttendanceForm;