// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import RecipeForm from './components/RecipeForm';
import Login from './components/Login';
import Registration from './components/Registration';
import './App.css';

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);

  const handleLogin = () => {
    setAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuthenticated(false);
  };

  return (
    <Router>
      <div className="app-container">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            {authenticated ? (
              <>
                <li>
                  <Link to="/add">Add Recipe</Link>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </nav>

        <hr />

        <Routes>
          <Route
            path="/login"
            element={authenticated ? <Navigate to="/" /> : <Login onLogin={handleLogin} />}
          />
          <Route path="/register" element={<Registration />} />
          <Route
            path="/add"
            element={authenticated ? <RecipeForm /> : <Navigate to="/login" />}
          />
          <Route path="/" element={<RecipeList authenticated={authenticated} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
