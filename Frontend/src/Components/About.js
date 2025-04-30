import React from 'react';
import './About.css';
import Footer from "./Footer"

import teamImage from './images/destination-Img/about.jpg';
import serviceImage from './images/destination-Img/paris.jpg';
import supportImage from './images/destination-Img/rome.jpg';

function About() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="herosection" style={{ backgroundImage: `url(${teamImage})` }}>
        <div className="hero-content">
          <h1 className="hero-title">About Us</h1>
          <p className="hero-description">At Travel Buddy, we curate memorable travel experiences with unmatched style and professionalism.</p>
        </div>
      </section>

      {/* Services Section (List) */}
      <section className="services-list-section">
        <h2 className="section-title">Our Services</h2>
        <div className="service-list">
          <div className="service-item">
            <div className="service-icon">
              <img src={serviceImage} alt="Tailored Travel Plans" />
            </div>
            <div className="service-text">
              <h3>Tailored Travel Plans</h3>
              <p>We create personalized travel itineraries based on your preferences and requirements. Your trip, your way.</p>
            </div>
          </div>
          
          <div className="service-item">
            <div className="service-icon">
              <img src={supportImage} alt="24/7 Support" />
            </div>
            <div className="service-text">
              <h3>24/7 Support</h3>
              <p>Our team is always available to assist you with any queries, ensuring a smooth and worry-free journey.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="who-we-are-section">
        <div className="who-we-are-text">
          <h2 className="who-we-are-title">Who We Are</h2>
          <p >
            At <span className="highlight">Travel Buddy</span>, we believe in providing the highest level of service for our travelers. 
            We specialize in creating bespoke journeys, filled with luxurious, personalized experiences. 
            Whether it's a business trip, a honeymoon, or an adventurous getaway, we've got you covered.
          </p>
          <div className="who-we-are-features">
            <div className="feature-item">
              <h3>Luxury Travel</h3>
              <p>Enjoy the finest accommodations, exquisite dining, and VIP experiences at every destination.</p>
            </div>
            <div className="feature-item">
              <h3>Personalized Journeys</h3>
              <p>Your interests shape the trip. Every detail is tailored to your preferences.</p>
            </div>
            <div className="feature-item">
              <h3>Global Expertise</h3>
              <p>With a team of travel experts, we provide insights into hidden gems at every destination.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <h2 className="section-title">Our Mission</h2>
        <ul className="mission-list">
          <li>To provide tailored travel experiences that exceed expectations.</li>
          <li>To offer 24/7 support for all our travelers, ensuring peace of mind.</li>
          <li>To promote sustainable tourism by supporting eco-friendly travel options.</li>
          <li>To connect travelers with unique destinations and experiences around the world.</li>
        </ul>
      </section>
      <Footer/>
    </div>
  );
}

export default About;
