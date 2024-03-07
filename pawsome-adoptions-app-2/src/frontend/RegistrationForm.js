import React, { useState } from 'react';
import './RegistrationForm.css'; // Ensure the path is correct

function RegistrationForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted', formData);

    try {
      const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json(); // Wait for the JSON response
        console.log("Registration success", data);
        // Handle successful registration here (e.g., display success message)
      } else {
        console.log("Registration failed with status:", response.status);
        // Handle non-200 responses here (e.g., display error message)
      }
    } catch (error) {
      console.error('Registration failed with error:', error);
      // Handle network errors here (e.g., display error message)
    }
  };

  return (
    <div style={{marginTop: "30px"}}>
      <form onSubmit={handleSubmit} className="form-container">
        <label className="form-label">
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="form-input"
          />
        </label>
        <br />
        <label className="form-label">
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
          />
        </label>
        <br />
        <label className="form-label">
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-input"
          />
        </label>
        <button type="submit" className="form-submit">Register</button>
      </form>
    </div>
  );
}

export default RegistrationForm;
