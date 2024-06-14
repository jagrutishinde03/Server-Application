import React, { useState } from 'react';
import './Login-Register.css'; // Import the CSS file

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    role: '',
    organizationName: '',
    organizationAddress: '',
    clientPositionTitle: '',
    employeeId: '',
    department: '',
    expertise: [],
    availability: '',
    supervisor: '',
    adminPositionTitle: '',
    permissionsLevel: '',
    emergencyContact: ''
  });

  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    const phoneRegex = /^[6-9]\d{9}$/;

    switch (name) {
      case 'fullName':
        if (!value) return 'Full Name is required';
        break;
      case 'email':
        if (!emailRegex.test(value)) return 'Invalid email address';
        break;
      case 'password':
        if (!passwordRegex.test(value)) return 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one symbol';
        break;
      case 'confirmPassword':
        if (value !== formData.password) return 'Passwords do not match';
        break;
      case 'phoneNumber':
        if (!phoneRegex.test(value)) return 'Invalid phone number, it should be a 10-digit Indian number';
        break;
      case 'role':
        if (!value) return 'Role is required';
        break;
      case 'organizationName':
        if (formData.role === 'Client' && !value) return 'Organization Name is required';
        break;
      case 'organizationAddress':
        if (formData.role === 'Client' && !value) return 'Organization Address is required';
        break;
      case 'clientPositionTitle':
        if (formData.role === 'Client' && !value) return 'Position/Title is required';
        break;
      case 'employeeId':
        if (formData.role !== 'Client' && !value) return 'Employee ID is required';
        break;
      case 'department':
        if (formData.role !== 'Client' && !value) return 'Department is required';
        break;
      case 'expertise':
        if (formData.role === 'Engineer' && formData.expertise.length === 0) return 'At least one expertise is required';
        break;
      case 'availability':
        if (formData.role === 'Engineer' && !value) return 'Availability is required';
        break;
      case 'adminPositionTitle':
        if (formData.role === 'Admin' && !value) return 'Position/Title is required';
        break;
      case 'emergencyContact':
        if (formData.role === 'Admin' && !value) return 'Emergency Contact Information is required';
        break;
      default:
        break;
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    const updatedExpertise = checked
      ? [...formData.expertise, name]
      : formData.expertise.filter((expertise) => expertise !== name);

    setFormData({ ...formData, expertise: updatedExpertise });

    const error = validateField('expertise', updatedExpertise);
    setErrors({ ...errors, expertise: error });
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle form submission logic here
      console.log(formData);
    }
  };

  return (
    <div class="page-container">
    <div className="register-container">
      <h2 className="register-title">Register</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <div>
          <label>Full Name:</label>
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
          {errors.fullName && <div className="error">{errors.fullName}</div>}
        </div>
        <div>
          <label>Email Address:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          {errors.email && <div className="error">{errors.email}</div>}
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          {errors.password && <div className="error">{errors.password}</div>}
        </div>
        <div>
          <label>Confirm Password:</label>
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
          {errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}
        </div>
        <div>
          <label>Phone Number:</label>
          <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
          {errors.phoneNumber && <div className="error">{errors.phoneNumber}</div>}
        </div>
        <div>
          <label>Role:</label>
          <select name="role" value={formData.role} onChange={handleChange} required>
            <option value="">Select a role</option>
            <option value="Client">Client</option>
            <option value="Engineer">Engineer</option>
            <option value="Admin">Admin</option>
          </select>
          {errors.role && <div className="error">{errors.role}</div>}
        </div>
        {formData.role === 'Client' && (
          <>
            <div>
              <label>Organization Name:</label>
              <input type="text" name="organizationName" value={formData.organizationName} onChange={handleChange} required />
              {errors.organizationName && <div className="error">{errors.organizationName}</div>}
            </div>
            <div>
              <label>Organization Address:</label>
              <input type="text" name="organizationAddress" value={formData.organizationAddress} onChange={handleChange} required />
              {errors.organizationAddress && <div className="error">{errors.organizationAddress}</div>}
            </div>
            <div>
              <label>Position/Title:</label>
              <input type="text" name="clientPositionTitle" value={formData.clientPositionTitle} onChange={handleChange} required />
              {errors.clientPositionTitle && <div className="error">{errors.clientPositionTitle}</div>}
            </div>
          </>
        )}
        {formData.role !== 'Client' && (
          <>
            <div>
              <label>Employee ID:</label>
              <input type="text" name="employeeId" value={formData.employeeId} onChange={handleChange} required />
              {errors.employeeId && <div className="error">{errors.employeeId}</div>}
            </div>
            <div>
              <label>Department:</label>
              <input type="text" name="department" value={formData.department} onChange={handleChange} required />
              {errors.department && <div className="error">{errors.department}</div>}
            </div>
          </>
        )}
        {formData.role === 'Engineer' && (
          <>
            <div>
              <label>Expertise:</label>
              <div>
                <label>
                  <input type="checkbox" name="Networking" checked={formData.expertise.includes('Networking')} onChange={handleCheckboxChange} />
                  Networking
                </label>
                <label>
                  <input type="checkbox" name="Security" checked={formData.expertise.includes('Security')} onChange={handleCheckboxChange} />
                  Security
                </label>
                <label>
                  <input type="checkbox" name="Development" checked={formData.expertise.includes('Development')} onChange={handleCheckboxChange} />
                  Development
                </label>
              </div>
              {errors.expertise && <div className="error">{errors.expertise}</div>}
            </div>
            <div>
              <label>Availability:</label>
              <input type="text" name="availability" value={formData.availability} onChange={handleChange} required />
              {errors.availability && <div className="error">{errors.availability}</div>}
            </div>
            <div>
              <label>Supervisor:</label>
              <input type="text" name="supervisor" value={formData.supervisor} onChange={handleChange} />
            </div>
          </>
        )}
        {formData.role === 'Admin' && (
          <>
            <div>
              <label>Position/Title:</label>
              <input type="text" name="adminPositionTitle" value={formData.adminPositionTitle} onChange={handleChange} required />
              {errors.adminPositionTitle && <div className="error">{errors.adminPositionTitle}</div>}
            </div>
            <div>
              <label>Permissions Level:</label>
              <select name="permissionsLevel" value={formData.permissionsLevel} onChange={handleChange} required>
                <option value="">Select a level</option>
                <option value="Read">Read</option>
                <option value="Write">Write</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            <div>
              <label>Emergency Contact Information:</label>
              <input type="text" name="emergencyContact" value={formData.emergencyContact} onChange={handleChange} required />
              {errors.emergencyContact && <div className="error">{errors.emergencyContact}</div>}
            </div>
          </>
        )}
        <div className="button-container">
        <button type="submit">Register</button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default Register;
