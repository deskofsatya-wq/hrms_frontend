import React, { useState, useEffect } from 'react';

const EmployeeForm = ({ employee, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    employeeId: '',
    fullName: '',
    email: '',
    department: ''
  });
  const [errors, setErrors] = useState({});

  // Department List for modern dropdown
  const departments = ["Engineering", "Human Resources", "UI/UX Design", "Marketing", "Finance"];

  useEffect(() => {
    if (employee) {
      setFormData(employee);
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.employeeId.trim()) newErrors.employeeId = 'Employee ID is required';
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Enter a valid email address';
    }
    if (!formData.department) newErrors.department = 'Please select a department';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) onSave(formData);
  };

  return (
    <div className="employee-form">
      <h3>{employee ? 'Edit Profile' : 'New Employee'}</h3>
      <form onSubmit={handleSubmit}>
        
        <div className="form-group">
          <label>Employee ID <span className="required">*</span></label>
          <input
            type="text"
            name="employeeId"
            style={errors.employeeId ? {borderColor: '#ef4444'} : {}}
            value={formData.employeeId}
            onChange={handleChange}
            placeholder="EMP-100..."
          />
          {errors.employeeId && <span className="error-message">{errors.employeeId}</span>}
        </div>

        <div className="form-group">
          <label>Full Name <span className="required">*</span></label>
          <input
            type="text"
            name="fullName"
            style={errors.fullName ? {borderColor: '#ef4444'} : {}}
            value={formData.fullName}
            onChange={handleChange}
            placeholder="John Doe"
          />
          {errors.fullName && <span className="error-message">{errors.fullName}</span>}
        </div>

        <div className="form-group">
          <label>Email Address <span className="required">*</span></label>
          <input
            type="email"
            name="email"
            style={errors.email ? {borderColor: '#ef4444'} : {}}
            value={formData.email}
            onChange={handleChange}
            placeholder="john@company.com"
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label>Department <span className="required">*</span></label>
          <select 
            name="department" 
            value={formData.department} 
            onChange={handleChange}
            className="form-control" /* Add specific styling for select if needed */
            style={{
                width: '100%',
                padding: '14px',
                borderRadius: '12px',
                border: `2px solid ${errors.department ? '#ef4444' : '#e2e8f0'}`,
                backgroundColor: '#f8fafc'
            }}
          >
            <option value="">Select Department</option>
            {departments.map(dept => <option key={dept} value={dept}>{dept}</option>)}
          </select>
          {errors.department && <span className="error-message">{errors.department}</span>}
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary">
            {employee ? 'Update Employee' : 'Create Employee'}
          </button>
          <button type="button" className="btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;