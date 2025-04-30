import React, { useState } from 'react';
import axios from 'axios';
import './Form.css';

const Form = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [signupData, setSignupData] = useState({ username: '', email: '', password: '' });
  const [loading, setLoading] = useState(false); // State for loader

  const handleNext = () => {
    if (currentPage < 2) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleBack = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleInputChange = (e, formType) => {
    const { name, value } = e.target;
    if (formType === 'login') {
      setLoginData({ ...loginData, [name]: value });
    } else if (formType === 'signup') {
      setSignupData({ ...signupData, [name]: value });
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loader
    try {
      const response = await axios.post('http://localhost:4444/VoyageVista/user/register', signupData);
      if (response.status === 200) {
        alert('Signup successful!');
        setSignupData({ username: '', email: '', password: '' });
      }
    } catch (error) {
      console.error('Signup failed:', error.response?.data || error.message);
      alert('Signup failed! Please try again.');
    } finally {
      setLoading(false); // Stop loader
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loader
    try {
      const response = await axios.post('http://localhost:4444/VoyageVista/user/login', loginData);
      if (response.status === 200) {
        alert('Login successful!');
        setLoginData({ username: '', password: '' });
      }
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      alert('Login failed! Please try again.');
    } finally {
      setLoading(false); // Stop loader
    }
  };

  return (
    <div className="book">
      {loading && <div className="loader">Loading...</div>} {/* Loader */}
      <div className="flip-book">
        {/* Sign-Up Form */}
        <div className={`flip ${currentPage === 1 ? 'active' : 'inactive'}`} id="p1">
          <div className="back">
            <div className="welcome-message">
              <h1 className="head">
                Welcome Back to <span className="span">Travel Buddy!</span>
              </h1>
              <br />
              <h2 className="head">
                The adventure continues here. <span className="span">Log in</span> to pick up where
                you left off and chart new destinations!
              </h2>
            </div>
            {currentPage === 2 && (
              <button className="back-btn" onClick={handleBack}>
                BACK
              </button>
            )}
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
            {currentPage === 1 && (
              <button className="next-btn" onClick={handleNext}>
                Don't have an account? Sign Up
              </button>
            )}
          </div>
        </div>

        {/* Login Form */}
        <div className={`flip ${currentPage === 2 ? 'active' : 'inactive'}`} id="p2">
          <div className="back">
            <div className="welcome-message">
              <h1 className="head">
                Welcome to <br /> <span className="span">Travel Buddy!.</span>
              </h1>
              <br />
              <h2 className="head">
                Adventure Awaits! <span className="span">Sign up</span> now to start planning your
                next trip and stay updated on exciting travel opportunities.
              </h2>
            </div>
            {currentPage === 2 && (
              <button className="back-btn" onClick={handleBack}>
                Already have an account? Login
              </button>
            )}
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
              {/* <Link to="/"> */}
              <button type="submit" className="submit-btn" disabled={loading}>
                Login
              </button>
              {/* </Link> */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
