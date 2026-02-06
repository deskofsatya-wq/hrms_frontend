import React, { useState, useEffect } from 'react';

const EmployeeForm = ({ employee, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    employeeId: '',
    fullName: '',
    email: '',
    department: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (employee) {
      setFormData(employee);
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.employeeId.trim()) {
      newErrors.employeeId = 'Employee ID is required';
    }
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.department.trim()) {
      newErrors.department = 'Department is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  return (
    <div className="employee-form">
      <h3>{employee ? 'Edit Employee' : 'Add Employee'}</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Employee ID <span className="required">*</span></label>
          <input
            type="text"
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            placeholder="Enter employee ID (e.g., EMP001)"
            required
          />
          {errors.employeeId && <span className="error-message">{errors.employeeId}</span>}
        </div>
        
        <div className="form-group">
          <label>Full Name <span className="required">*</span></label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter full name"
            required
          />
          {errors.fullName && <span className="error-message">{errors.fullName}</span>}
        </div>
        
        <div className="form-group">
          <label>Email <span className="required">*</span></label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email address"
            required
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>
        
        <div className="form-group">
          <label>Department <span className="required">*</span></label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            placeholder="Enter department name"
            required
          />
          {errors.department && <span className="error-message">{errors.department}</span>}
        </div>
        
        <div className="form-actions">
          <button type="submit" className="btn-primary">Save</button>
          <button type="button" className="btn-secondary" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;