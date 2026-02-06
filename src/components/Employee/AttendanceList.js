import React, { useState, useEffect } from 'react';
import UpdateAttendanceForm from './UpdateAttendanceForm';
import { employeeService } from '../../services/employeeService';
import './Employee.css';

const AttendanceList = ({ onBack }) => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

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

  const handleUpdateAttendance = (employee) => {
    setSelectedEmployee(employee);
    setShowUpdateForm(true);
  };

  const handleBackToList = () => {
    setShowUpdateForm(false);
    setSelectedEmployee(null);
  };

  if (showUpdateForm) {
    return (
      <UpdateAttendanceForm 
        employee={selectedEmployee}
        onBack={handleBackToList}
      />
    );
  }

  return (
    <div className="attendance-list-container">
      <h3>Employee Attendance Management</h3>
      
      <table className="employee-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? employees.map(employee => (
            <tr key={employee.id}>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.department}</td>
              <td>
                <button 
                  className="btn-primary" 
                  onClick={() => handleUpdateAttendance(employee)}
                >
                  Update Attendance
                </button>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan="4">No employees found</td>
            </tr>
          )}
        </tbody>
      </table>
      
      <button className="btn-secondary" onClick={onBack}>
        Back to Employee Management
      </button>
    </div>
  );
};

export default AttendanceList;