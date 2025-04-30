import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Form.css'; // Assuming this file contains your styling

const Signup = () => {
  const [currentPage, setCurrentPage] = useState(1); // 1 for Signup, 2 for Login
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ username: '', email: '', password: '' });
  const [loading, setLoading] = useState(false); // Loader state

  // Navigate between Signup and Login pages
  const handleNext = () => setCurrentPage(2);
  const handleBack = () => setCurrentPage(1);

  // Handle input changes for both forms
  const handleInputChange = (e, formType) => {
    const { name, value } = e.target;
    if (formType === 'login') {
      setLoginData({ ...loginData, [name]: value });
    } else if (formType === 'signup') {
      setSignupData({ ...signupData, [name]: value });
    }
  };

  // Handle Signup form submission
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:4444/VoyageVista/user/register', signupData);
      if (response.status === 200) {
        alert('Signup successful!');
        setSignupData({ username: '', email: '', password: '' });
        setCurrentPage(2); // Redirect to login page after signup
      }
    } catch (error) {
      console.error('Signup failed:', error.response?.data || error.message);
      alert('Signup failed! Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Login form submission
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:4444/VoyageVista/user/login', loginData);
      if (response.status === 200) {
        alert('Login successful!');
        setLoginData({ email: '', password: '' });
      }
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      alert('Login failed! Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Add fullscreen background effect
  useEffect(() => {
    document.body.classList.add('fullscreen-background');
    return () => {
      document.body.classList.remove('fullscreen-background');
    };
  }, []);

  return (
    <div className="book">
      {loading && <div className="loader">Loading...</div>}
      <div className="flip-book">
        {/* Signup Page */}
        <div className={`flip ${currentPage === 1 ? 'active' : 'inactive'}`} id="p1">
          <div className="back">
            <div className="welcome-message">
              <h1 className="head">
                Welcome to <span className="span">Travel Buddy!</span>
              </h1>
              <h2 className="head">
                Adventure Awaits! <span className="span">Sign up</span> now to start planning your
                next trip!
              </h2>
            </div>
            <button className="next-btn" onClick={handleNext}>
              Already have an account? Login
            </button>
          </div>
          <div className="front">
            <h2 className="login-head">Sign Up</h2>
            <form onSubmit={handleSignupSubmit}>
              <input
                className="input"
                type="text"
                name="username"
                placeholder="Username"
                value={signupData.username}
                onChange={(e) => handleInputChange(e, 'signup')}
                required
              />
              <input
                className="input"
                type="email"
                name="email"
                placeholder="Email"
                value={signupData.email}
                onChange={(e) => handleInputChange(e, 'signup')}
                required
              />
              <input
                className="input"
                type="password"
                name="password"
                placeholder="Password"
                value={signupData.password}
                onChange={(e) => handleInputChange(e, 'signup')}
                required
              />
              <button type="submit" className="submit-btn" disabled={loading}>
                Sign Up
              </button>
            </form>
          </div>
        </div>

        {/* Login Page */}
        <div className={`flip ${currentPage === 2 ? 'active' : 'inactive'}`} id="p2">
          <div className="back">
            <div className="welcome-message">
              <h1 className="head">
                Welcome Back to <span className="span">Travel Buddy!</span>
              </h1>
              <h2 className="head">
                The adventure continues here. <span className="span">Log in</span> to pick up where
                you left off!
              </h2>
            </div>
            <button className="back-btn" onClick={handleBack}>
              Don’t have an account? Sign Up
            </button>
          </div>
          <div className="front">
            <h2 className="login-head">Login</h2>
            <form onSubmit={handleLoginSubmit}>
              <input
                className="input"
                type="email"
                name="email"
                placeholder="Email"
                value={loginData.email}
                onChange={(e) => handleInputChange(e, 'login')}
                required
              />
              <input
                className="input"
                type="password"
                name="password"
                placeholder="Password"
                value={loginData.password}
                onChange={(e) => handleInputChange(e, 'login')}
                required
              />
              <button type="submit" className="submit-btn" disabled={loading}>
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
