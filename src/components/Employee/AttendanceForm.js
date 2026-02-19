/**
 * Create By @name Satyaban_Khuntia
 */
import React, { useState, useEffect } from 'react';
import { employeeService } from '../../services/employeeService';
import './Employee.css';

const AttendanceForm = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [status, setStatus] = useState('Present');

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const data = await employeeService.getEmployees();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedEmployee) {
      alert('Please select an employee');
      return;
    }

    try {
      await employeeService.updateAttendance(selectedEmployee, status, selectedDate);
      alert('Attendance updated successfully');
      setSelectedEmployee('');
      setStatus('Present');
    } catch (error) {
      console.error('Error updating attendance:', error);
      alert('Error updating attendance');
    }
  };

  return (
    <div className="attendance-form-container">
      <h3>Update Employee Attendance</h3>
      <form onSubmit={handleSubmit} className="attendance-form">
        <div className="form-group">
          <label>Employee:</label>
          <select 
            value={selectedEmployee} 
            onChange={(e) => setSelectedEmployee(e.target.value)}
            required
          >
            <option value="">Select Employee</option>
            {employees.map(employee => (
              <option key={employee.id} value={employee.id}>
                {employee.name}
              </option>
            ))}
          </select>
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

        <button type="submit" className="btn-primary">Update Attendance</button>
      </form>
    </div>
  );
};

export default AttendanceForm;