// .






import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import './Form.css';

const Signup = () => {
  const [currentPage, setCurrentPage] = useState(1); // 1 for Signup, 2 for Login
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ username: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();
  const location = useLocation();

  // Navigate between Signup and Login pages
  const handleNext = () => {
    setCurrentPage(2);
    setError(null);
  };
  
  const handleBack = () => {
    setCurrentPage(1);
    setError(null);
  };

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
    setError(null);
    
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/TravelBuddy/user/register`, signupData);
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        // Redirect to cart if coming from checkout, otherwise to home
        const returnPath = location.state?.from === '/cart' ? '/cart' : '/';
        navigate(returnPath, { state: { from: 'signup' } });
      }
    } catch (error) {
      console.error('Signup failed:', error.response?.data || error.message);
      setError(error.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Login form submission
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/TravelBuddy/user/login`, loginData);
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        // Redirect to cart if coming from checkout, otherwise to home
        const returnPath = location.state?.from === '/cart' ? '/cart' : '/';
        navigate(returnPath, { state: { from: 'login' } });
      }
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      setError(error.response?.data?.message || 'Login failed. Please try again.');
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

  // Get appropriate welcome message based on where user came from
  const getWelcomeMessage = () => {
    if (location.state?.from === '/cart') {
      return {
        heading: currentPage === 1 
          ? 'Complete Your Booking' 
          : 'Sign In to Checkout',
        subheading: currentPage === 1
          ? 'Create an account to proceed with your travel package'
          : 'Log in to complete your purchase'
      };
    }
    
    return {
      heading: currentPage === 1
        ? 'Welcome to Travel Buddy!'
        : 'Welcome Back!',
      subheading: currentPage === 1
        ? 'Adventure awaits! Sign up now to start planning your next trip'
        : 'The adventure continues. Log in to pick up where you left off'
    };
  };

  const { heading, subheading } = getWelcomeMessage();

  return (
    <div className="book">
      {loading && (
        <div className="loader-overlay">
          <div className="loader"></div>
        </div>
      )}
      
      <div className="flip-book">
        {/* Signup Page */}
        <div className={`flip ${currentPage === 1 ? 'active' : 'inactive'}`} id="p1">
          <div className="back">
            <div className="welcome-message">
              <h1 className="head">
                <span className="span">{heading}</span>
              </h1>
              <h2 className="head">
                {subheading}
              </h2>
            </div>
            <button className="next-btn" onClick={handleNext}>
             New to Travel Buddy? Register
            </button>
          </div>
          <div className="front">
            <h2 className="login-head">Create Account</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSignupSubmit}>
              <input
                className="input"
                type="text"
                name="username"
                placeholder="Username"
                value={signupData.username}
                onChange={(e) => handleInputChange(e, 'signup')}
                required
                minLength="3"
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
                placeholder="Password (min 6 characters)"
                value={signupData.password}
                onChange={(e) => handleInputChange(e, 'signup')}
                required
                minLength="6"
              />
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? 'Creating Account...' : 'Sign Up'}
              </button>
            </form>
          </div>
        </div>

        {/* Login Page */}
        <div className={`flip ${currentPage === 2 ? 'active' : 'inactive'}`} id="p2">
          <div className="back">
            <div className="welcome-message">
              <h1 className="head">
                <span className="span">{heading}</span>
              </h1>
              <h2 className="head">
                {subheading}
              </h2>
            </div>
            <button className="back-btn" onClick={handleBack}>
               Already registered? Login
            </button>
          </div>
          <div className="front">
            <h2 className="login-head">Login</h2>
            {error && <div className="alert alert-danger">{error}</div>}
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
                {loading ? 'Logging In...' : 'Login'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;