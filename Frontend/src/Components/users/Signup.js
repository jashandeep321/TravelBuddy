

import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import backgroundImage from '../images/destination-Img/travel1.webp'; // Replace with your image path

const Signup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setError(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const endpoint = isLogin ? 'login' : 'register';
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/TravelBuddy/user/${endpoint}`,
        isLogin ? { email: formData.email, password: formData.password } : formData
      );

      // After successful login/signup
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));

        // Dispatch a login event
        window.dispatchEvent(new Event('loginStatusChanged'));

        const returnPath = location.state?.from === '/cart' ? '/cart' : '/';
        navigate(returnPath, { state: { from: isLogin ? 'login' : 'signup' } });
      }
    } catch (err) {
      setError(err.response?.data?.message ||
        (isLogin ? 'Login failed. Please try again.' : 'Signup failed. Please try again.'));
    } finally {
      setLoading(false);
    }
  };

  const getHeaderText = () => {
    if (location.state?.from === '/cart') {
      return isLogin
        ? 'Sign In to Complete Your Booking'
        : 'Create Account to Continue';
    }
    return isLogin ? 'Welcome Back!' : 'Join Travel Buddy';
  };

  const getSubText = () => {
    if (location.state?.from === '/cart') {
      return isLogin
        ? 'Log in to complete your purchase'
        : 'Create an account to proceed with your travel package';
    }
    return isLogin
      ? 'Sign in to continue your adventure'
      : 'Start planning your next trip today';
  };

  return (
    <div style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      padding: '20px 0',
      position: 'relative'
    }}>
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={7}>
            <Card
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                color: 'white',
                border: 'none',
                backdropFilter: 'blur(5px)',
                borderTopRightRadius: '15px',
                borderBottomRightRadius: '15px',
                boxShadow: 'inset 20px 0 50px rgba(0, 0, 0, 0.5), 0 2px 5px rgba(0, 0, 0, 0.5)',
                padding: '30px',
                boxSizing: 'border-box',
              }}
            >
              <Card.Body className="p-4">
                <div className="text-center mb-4">
                  <h2 style={{ color: 'white' }}>{getHeaderText()}</h2>
                  <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>{getSubText()}</p>
                </div>

                {error && <Alert variant="danger">{error}</Alert>}

                <Form onSubmit={handleSubmit}>
                  {!isLogin && (
                    <Form.Group className="mb-3">
                      <Form.Label style={{ color: 'white' }}>Username</Form.Label>
                      <Form.Control
                        type="text"
                        name="username"
                        placeholder="Enter username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        minLength="3"
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'white', border: '1px solid rgba(255, 255, 255, 0.2)' }}
                      />
                    </Form.Group>
                  )}

                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: 'white' }}>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Enter email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'white', border: '1px solid rgba(255, 255, 255, 0.2)' }}
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label style={{ color: 'white' }}>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      minLength={isLogin ? "1" : "6"}
                      style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'white', border: '1px solid rgba(255, 255, 255, 0.2)' }}
                    />
                    {!isLogin && (
                      <Form.Text style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                        At least 6 characters
                      </Form.Text>
                    )}
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100 mb-3"
                    disabled={loading}
                    style={{ backgroundColor: '#007bff', border: 'none' }}
                  >
                    {loading ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          className="me-2"
                        />
                        {isLogin ? 'Signing In...' : 'Creating Account...'}
                      </>
                    ) : (
                      isLogin ? 'Sign In' : 'Sign Up'
                    )}
                  </Button>

                  <div className="text-center">
                    <Button
                      variant="link"
                      onClick={toggleAuthMode}
                      style={{ color: 'rgba(255, 255, 255, 0.8)' }}
                    >
                      {isLogin
                        ? "Don't have an account? Sign Up"
                        : "Already have an account? Sign In"}
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Signup;