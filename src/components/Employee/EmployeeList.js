import React, { useState, useEffect } from 'react';
import EmployeeForm from './EmployeeForm';
import AttendanceModal from './AttendanceModal';
import { employeeService } from '../../services/employeeService';
import Swal from 'sweetalert2';
import './Employee.css';

const EmployeeList = ({ onReset }) => {
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const [selectedEmployeeForAttendance, setSelectedEmployeeForAttendance] = useState(null);

  useEffect(() => {
    fetchEmployees();
    setShowForm(false);
    setEditingEmployee(null);
  }, []);

  useEffect(() => {
    if (onReset) {
      setShowForm(false);
      setEditingEmployee(null);
    }
  }, [onReset]);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const data = await employeeService.getEmployees();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingEmployee(null);
    setShowForm(true);
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        await employeeService.deleteEmployee(id);
        fetchEmployees();
        Swal.fire('Deleted!', 'Employee has been deleted.', 'success');
      } catch (error) {
        Swal.fire('Error!', error.message, 'error');
      }
    }
  };

  const handleSave = async (employeeData) => {
    try {
      if (editingEmployee) {
        await employeeService.editEmployee(editingEmployee.id, employeeData);
        Swal.fire('Success!', 'Employee updated successfully!', 'success');
      } else {
        const response = await employeeService.addEmployee(employeeData);
        Swal.fire('Success!', response.deatail, 'success');
      }
      fetchEmployees();
      setShowForm(false);
      setEditingEmployee(null);
    } catch (error) {
      Swal.fire('Error!', error.message, 'error');
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingEmployee(null);
  };

  const handleUpdateAttendance = (employee) => {
    setSelectedEmployeeForAttendance(employee);
    setShowAttendanceModal(true);
  };

  const handleCloseAttendanceModal = () => {
    setShowAttendanceModal(false);
    setSelectedEmployeeForAttendance(null);
  };

  const SkeletonRow = () => (
    <tr className="skeleton-row">
      <td><div className="skeleton skeleton-text"></div></td>
      <td><div className="skeleton skeleton-text"></div></td>
      <td><div className="skeleton skeleton-text"></div></td>
      <td><div className="skeleton skeleton-text"></div></td>
      <td>
        <div className="skeleton-actions">
          <div className="skeleton skeleton-button"></div>
          <div className="skeleton skeleton-button"></div>
          <div className="skeleton skeleton-button"></div>
        </div>
      </td>
    </tr>
  );



  return (
    <div className="employee-container">
      <div className="employee-header">
        <h2>Employee Management</h2>
        {!showForm && (
          <button className="btn-primary" onClick={handleAdd}>Add Employee</button>
        )}
      </div>
      
      {showForm ? (
        <EmployeeForm 
          employee={editingEmployee}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      ) : (
        <div className="table-container">
          <div className="table-header">
            <div className="table-info">
              <span className="employee-count">{employees.length} Employees</span>
            </div>
          </div>
          
          <div className="table-wrapper">
            <table className="employee-table">
              <thead>
                <tr>
                  <th>Employee ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  Array(5).fill().map((_, index) => <SkeletonRow key={index} />)
                ) : employees.length > 0 ? employees.map(employee => (
                  <tr key={employee.id} className="employee-row">
                    <td className="employee-id">{employee.employeeId}</td>
                    <td className="employee-name">{employee.fullName}</td>
                    <td className="employee-email">{employee.email}</td>
                    <td className="employee-department">
                      <span className="department-badge">{employee.department}</span>
                    </td>
                    <td className="actions-cell">
                      <div className="action-buttons">
                        <button className="btn-edit" onClick={() => handleEdit(employee)}>Edit</button>
                        <button className="btn-delete" onClick={() => handleDelete(employee.id)}>Delete</button>
                        <button className="btn-attendance" onClick={() => handleUpdateAttendance(employee)}>Attendance</button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="5" className="no-data">No employees found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {showAttendanceModal && (
        <AttendanceModal 
          employee={selectedEmployeeForAttendance}
          onClose={handleCloseAttendanceModal}
        />
      )}
    </div>
  );
};

export default EmployeeList;