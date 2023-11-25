// Login.js
import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Login.css';

const Login = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/users/login', credentials);
      const token = response.data.token;
      localStorage.setItem('token', token);
      onLogin();
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" name="email" value={credentials.email} onChange={handleChange} />
        </label>
        <label>
          Password:
          <input type="password" name="password" value={credentials.password} onChange={handleChange} />
        </label>
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

export default Login;
