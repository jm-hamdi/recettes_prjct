// src/api.js
const getToken = () => {
    return localStorage.getItem('token');
  };
  
  const setToken = (token) => {
    localStorage.setItem('token', token);
  };
  
  const clearToken = () => {
    localStorage.removeItem('token');
  };
  
  const headers = {
    'Content-Type': 'application/json',
    'x-auth-token': getToken(),
  };
  
  const api = {
    async login(credentials) {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers,
        body: JSON.stringify(credentials),
      });
  
      if (response.ok) {
        const { token } = await response.json();
        setToken(token);
      }
  
      return response;
    },
  
    async register(userData) {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers,
        body: JSON.stringify(userData),
      });
  
      if (response.ok) {
        const { token } = await response.json();
        setToken(token);
      }
  
      return response;
    },
  
    // Add other API methods as needed...
  };
  
  export default api;
  