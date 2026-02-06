import React, { useState } from 'react';
import { employeeService } from '../../services/employeeService';
import Swal from 'sweetalert2';
import './Employee.css';

const AttendanceModal = ({ employee, onClose }) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [status, setStatus] = useState('Present');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await employeeService.updateAttendance(employee.id, status, selectedDate);
      Swal.fire('Success!', `Attendance updated successfully for ${employee.fullName}`, 'success');
      onClose();
    } catch (error) {
      console.error('Error updating attendance:', error);
      Swal.fire('Error!', error.message || 'Error updating attendance', 'error');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Update Attendance</h3>
        
        <form onSubmit={handleSubmit} className="attendance-form">
          <div className="form-group">
            <label>Employee ID:</label>
            <input type="text" value={employee.employeeId} disabled />
          </div>

          <div className="form-group">
            <label>Employee Name:</label>
            <input type="text" value={employee.fullName} disabled />
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input type="text" value={employee.email} disabled />
          </div>

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
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AttendanceModal;