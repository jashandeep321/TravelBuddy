import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import logo1 from './images/logo1.png';
import { useCart } from '../Context/CartContext';

function Navigation() {
  const [showModal, setShowModal] = useState(false);
  const [destination, setDestination] = useState('');
  const [duration, setDuration] = useState('');
  const [preferences, setPreferences] = useState('');
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [blurBackground, setBlurBackground] = useState(false);

  const { cartItems } = useCart();
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    };

    checkLoginStatus();
    window.addEventListener('loginStatusChanged', checkLoginStatus);

    return () => {
      window.removeEventListener('loginStatusChanged', checkLoginStatus);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    window.dispatchEvent(new Event('loginStatusChanged'));
    navigate('/Signup');
  };

  const handleShow = () => {
    setShowModal(true);
    setBlurBackground(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  const handleClose = () => {
    setShowModal(false);
    setItinerary(null);
    setError(null);
    setBlurBackground(false);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError(null);

  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/TravelBuddy/itinerary`, {
      destination,
      duration,
      preferences,
    });
    setItinerary(response.data);
  } catch (err) {
    console.error("Error generating itinerary:", err);
    setError("Failed to generate the itinerary. Please try again.");
  } finally {
    setLoading(false);
  }
};

  return (
    <>
      {/* Blur overlay */}
      {blurBackground && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backdropFilter: 'blur(5px)',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1040, // Bootstrap modals use z-index 1050
            pointerEvents: 'none' // Allows clicks to pass through to elements behind
          }}
        />
      )}

      <Navbar expand="lg" className={`bg-body-tertiary p-0 ${blurBackground ? 'pe-none' : ''}`}>
        <Container>
          <Link to="/"><Navbar.Brand>
            <img src={logo1} alt="Logo" style={{ height: '3em', verticalAlign: 'middle', margin: '0 5px' }} />
          </Navbar.Brand></Link>

          <Link 
            className="nav-link position-relative me-3" 
            to="/cart"
            style={{ order: 1 }}
          >
            <FaShoppingCart size={28} />
            {itemCount > 0 && (
              <span
                className="position-absolute translate-middle bg-danger border border-light rounded-circle d-flex justify-content-center align-items-center"
                style={{
                  width: '18px',
                  height: '18px',
                  bottom: '15px',
                  right: '-20px',
                  top:'1px',
                  fontSize: '0.7rem',
                  color: 'white',
                }}
              >
                {itemCount}
              </span>
            )}
          </Link>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Link className="nav-link" to="/AllDestinations">Destinations</Link>
              <Link className="nav-link" to="/deals">Deals</Link>
              <Link className="nav-link" to="/about">About</Link>
              <Link className="nav-link" to="/contact">Contact Us</Link>

              {isLoggedIn ? (
                <>
                  <Button variant="outline-danger" className="ms-2" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
              ) : (
                <Link to="/Signup">
                  <Button variant="light" className="ms-2">Sign In</Button>
                </Link>
              )}

              <Button variant="light" className="ms-2" onClick={handleShow}>Itinerary</Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal 
        show={showModal} 
        onHide={handleClose} 
        centered 
        dialogClassName="modal-xl"
        style={{ zIndex: 1051 }} // Ensure modal appears above blur overlay
      >
       <Modal.Body>
  <form onSubmit={handleSubmit}>
    <div className="mb-3">
      <label htmlFor="destination" className="form-label">Destination</label>
      <input
        type="text"
        className="form-control"
        id="destination"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        required
        placeholder="Where do you want to go?"
      />
    </div>

    <div className="mb-3">
      <label htmlFor="duration" className="form-label">Duration (Days)</label>
      <input
        type="number"
        className="form-control"
        id="duration"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        required
        placeholder="How many days?"
        min="1"
      />
    </div>

    <div className="mb-3">
      <label htmlFor="preferences" className="form-label">Preferences (Optional)</label>
      <textarea
        className="form-control"
        id="preferences"
        value={preferences}
        onChange={(e) => setPreferences(e.target.value)}
        placeholder="E.g., family-friendly, adventure, luxury, foodie, etc."
        rows="3"
      ></textarea>
    </div>

    <Button variant="info" type="submit" className="w-100" disabled={loading}>
      {loading ? (
        <>
          <span 
            className="spinner-border spinner-border-sm me-2" 
            style={{
              display: 'inline-block',
              width: '1rem',
              height: '1rem',
              verticalAlign: 'text-bottom',
              border: '0.2em solid currentColor',
              borderRightColor: 'transparent',
              borderRadius: '50%',
              animation: 'spin 0.75s linear infinite'
            }} 
            role="status" 
            aria-hidden="true"
          ></span>
          Generating Itinerary...
        </>
      ) : "Generate Itinerary"}
    </Button>
  </form>

  {loading && (
    <div className="mt-4 text-center">
      <div 
        className="spinner-border text-info" 
        style={{
          width: '3rem',
          height: '3rem',
          borderWidth: '0.3em'
        }} 
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="mt-2">Creating your perfect travel plan...</p>
    </div>
  )}
  
  {error && (
    <div className="alert alert-danger mt-3 d-flex align-items-center" role="alert">
      <i className="bi bi-exclamation-triangle-fill me-2"></i>
      <div>{error}</div>
    </div>
  )}
  
  {/* {itinerary && (
    <div 
      className="mt-4 p-3" 
      style={{
        backgroundColor: '#f8f9fa',
        borderRadius: '10px'
      }}
    >
      <h5 className="text-center mb-4">
        <i className="bi bi-map me-2"></i>
        Your {duration}-Day {destination} Itinerary
      </h5>
      
      <div 
        className="p-4" 
        style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          lineHeight: '1.6'
        }}
      >
        {itinerary.split('\n').map((paragraph, index) => (
          <p 
            key={index} 
            className={paragraph.trim() === '' ? 'mb-0' : 'mb-3'}
            style={{ color: '#333' }}
          >
            {paragraph.trim() === '' ? <br /> : paragraph}
          </p>
        ))}
      </div>
      
      <div className="d-flex justify-content-center mt-4">
        <Button 
          variant="outline-info" 
          onClick={() => navigator.clipboard.writeText(itinerary)}
          style={{ minWidth: '150px' }}
        >
          <i className="bi bi-clipboard me-2"></i>
          Copy Itinerary
        </Button>
      </div>
    </div>
  )} */}


  {itinerary && (
  <div 
    className="mt-4 p-3" 
    style={{
      backgroundColor: '#f8f9fa',
      borderRadius: '10px'
    }}
  >
    <h5 className="text-center mb-4">
      <i className="bi bi-map me-2"></i>
      Your {duration}-Day {destination} Itinerary
    </h5>
    
    <div 
      className="p-4" 
      style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        lineHeight: '1.6'
      }}
    >
      {itinerary.split('\n').map((paragraph, index) => {
        // Check if the paragraph looks like a header (common patterns)
        const isHeader = 
          paragraph.trim().endsWith(':') || 
          paragraph.trim().toUpperCase() === paragraph.trim() ||
          paragraph.trim().startsWith('Day ') ||
          paragraph.trim().startsWith('DAY ');
        
        return (
          <p 
            key={index} 
            className={paragraph.trim() === '' ? 'mb-0' : 'mb-3'}
            style={{ 
              color: '#333',
              fontWeight: isHeader ? '600' : 'normal',
              fontSize: isHeader ? '1.1em' : '1em'
            }}
          >
            {paragraph.trim() === '' ? <br /> : paragraph}
          </p>
        );
      })}
    </div>
    
    <div className="d-flex justify-content-center mt-4">
      <Button 
        variant="outline-info" 
        onClick={() => navigator.clipboard.writeText(itinerary)}
        style={{ minWidth: '150px' }}
      >
        <i className="bi bi-clipboard me-2"></i>
        Copy Itinerary
      </Button>
    </div>
  </div>
)}
</Modal.Body>
      </Modal>
    </>
  );
}

export default Navigation;

