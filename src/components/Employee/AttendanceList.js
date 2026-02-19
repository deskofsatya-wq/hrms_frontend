/**
 * Create By @name Satyaban_Khuntia
 */

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
      const data = await employeeService.getAttendance();
      console.log('Fetched attendance data:', data);
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
      <div className="table-container">
      <div className="table-wrapper">
      <table className="employee-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? employees.map(employee => (
            <tr key={employee.id} className="employee-row">
              <td>{employee.fullName}</td>
              <td>{employee.email}</td>
              <td>{employee.department}</td>
              <td>{employee.status}</td>
            </tr>
          )) : (
            <tr>
              <td colSpan="4">No Attendance found</td>
            </tr>
          )}
        </tbody>
      </table>
      </div>
      </div>
      {/* <button className="btn-secondary" onClick={onBack}>
        Back to Employee Management
      </button> */}
    </div>
  );
};

export default AttendanceList;