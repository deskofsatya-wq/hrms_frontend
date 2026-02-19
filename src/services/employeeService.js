/**
 * Create By @name Satyaban_Khuntia
 */

const API_BASE_URL = 'https://hrms-backend-75zp.onrender.com/api/';
//const API_BASE_URL = 'http://127.0.0.1:8000/api/';



export const employeeService = {
  async getEmployees() {
    const response = await fetch(`${API_BASE_URL}employees/list`);
    return response.json();
  },

  async addEmployee(employee) {
    const response = await fetch(`${API_BASE_URL}employees/add_employee`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(employee)
    });
    const data = await response.json();
    if (!response.ok || data.detail) {
      throw new Error(data.detail || 'Failed to add employee');
    }
    return data;
  },

  async editEmployee(id, employee) {
    const response = await fetch(`${API_BASE_URL}employees/edit_employee/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(employee)
    });
    const data = await response.json();
    if (!response.ok || data.detail) {
      throw new Error(data.detail || 'Failed to update employee');
    }
    return data;
  },

  async deleteEmployee(id) {
    const response = await fetch(`${API_BASE_URL}employees/delete_employee/${id}`, {
      method: 'DELETE'
    });
    const data = await response.json();
    if (!response.ok || data.detail) {
      throw new Error(data.detail || 'Failed to delete employee');
    }
    return data;
  },

  async updateAttendance(employeeId, status, date = null) {
    const attendanceDate = date || new Date().toISOString().split('T')[0];
    const response = await fetch(`${API_BASE_URL}attendance/update_attendance`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ employeeId, status, date: attendanceDate })
    });
    const data = await response.json();
    if (!response.ok || data.detail) {
      throw new Error(data.detail || 'Failed to update attendance');
    }
    return data;
  },

  async getAttendance() {
    const response = await fetch(`${API_BASE_URL}attendance/att-list/`);
    return response.json();
  },
};