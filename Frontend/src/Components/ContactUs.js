import React, { useState } from 'react';
import axios from 'axios';
import './ContactUs.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [statusMessage, setStatusMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    setStatusMessage(''); // Clear any previous status messages

    try {
      // Send data to the backend API
      const response = await axios.post('http://localhost:4444/VoyageVista/contactus', formData);
      console.log('Response:', response.data);

      // Success message
      setStatusMessage('Thank you for contacting us! We will get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatusMessage('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-us-wrapper">
      <div className="contact-us-container">
        <div className="contact-us-header">
          <h1>Contact Us</h1>
          <p>We'd love to hear from you! Reach out to us with any questions or comments.</p>
        </div>

        {statusMessage && <p className="status-message">{statusMessage}</p>}

        <form onSubmit={handleSubmit} className="contact-us-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Your Message</label>
            <textarea
              id="message"
              name="message"
              placeholder="Write your message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button type="submit" className="submit-contact" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
