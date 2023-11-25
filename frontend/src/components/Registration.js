// Registration.js
import React, { useState } from 'react';
import api from '../services/api';
import '../styles/Registration.css';

const Registration = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegistration = async (e) => {
    e.preventDefault();

    const response = await api.register({ username, password });

    if (response.ok) {
      console.log('Registration successful!');
      // Redirect or handle successful registration as needed
    } else {
      console.error('Registration failed!');
      // Handle registration error
    }
  };

  return (
    <form onSubmit={handleRegistration}>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <button type="submit">Register</button>
    </form>
  );
};

export default Registration;
