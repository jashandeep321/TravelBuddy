import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { BrowserRouter as Routes, Route, Link } from 'react-router-dom';

function Navigation() {
  const [showModal, setShowModal] = useState(false);
  const [destination, setDestination] = useState('');
  const [duration, setDuration] = useState('');
  const [preferences, setPreferences] = useState('');
  const [itinerary, setItinerary] = useState(null); // To store the generated itinerary
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // Show/hide modal handlers
  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    setItinerary(null); // Reset the itinerary when the modal is closed
    setError(null); // Reset error state
  };

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Send data to the backend for itinerary generation
      const response = await axios.post('http://localhost:4444/VoyageVista/itinerary', {
        destination,
        duration,
        preferences,
      });

      setItinerary(response.data); // Set the generated itinerary
    } catch (err) {
      console.error("Error generating itinerary:", err);
      setError("Failed to generate the itinerary. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Navigation Bar */}
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Link to="/">
            <Navbar.Brand>Travel Buddy</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/AllDestinations">Destinations</Nav.Link>
              <Link className="nav-link" to="/deals">Deals</Link>
              <Link className="nav-link" to="/about">About</Link>
              <Link className="nav-link" to="/contact">Contact Us</Link>
              <Link to="/Signup">
                <Button variant="light">Sign In</Button>
              </Link>
              <Button variant="light" onClick={handleShow}>Itinerary</Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Modal for Itinerary Form */}
      <Modal show={showModal} onHide={handleClose} centered dialogClassName="modal-xl">
        <Modal.Header closeButton>
          <Modal.Title>Create Travel Itinerary</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            {/* Destination Input */}
            <div className="mb-3">
              <label htmlFor="destination" className="form-label">Destination</label>
              <input
                type="text"
                className="form-control"
                id="destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                required
              />
            </div>

            {/* Duration Input */}
            <div className="mb-3">
              <label htmlFor="duration" className="form-label">Duration (Days)</label>
              <input
                type="number"
                className="form-control"
                id="duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                required
              />
            </div>

            {/* Preferences Input */}
            <div className="mb-3">
              <label htmlFor="preferences" className="form-label">Preferences (Optional)</label>
              <textarea
                className="form-control"
                id="preferences"
                value={preferences}
                onChange={(e) => setPreferences(e.target.value)}
              ></textarea>
            </div>

            {/* Submit Button */}
            <Button variant="info" type="submit" className="w-100">
              {loading ? "Generating..." : "Generate Itinerary"}
            </Button>
          </form>

          {/* Display Loading/Error/Itinerary */}
          {loading && <div className="mt-3">Loading...</div>}
          {error && <div className="mt-3 text-danger">{error}</div>}
          {itinerary && (
            <div className="mt-3">
              <h5>Generated Itinerary</h5>
              <pre className="bg-light p-3 rounded">{itinerary}</pre>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Navigation;
