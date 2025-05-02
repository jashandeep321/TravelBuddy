import React from 'react';
// import nature from '../media/nature.mp4';
import './Hero.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSearch } from '@fortawesome/free-solid-svg-icons';
function HeroSec() {
  return (
    <div className="hero-section d-flex align-items-center justify-content-center text-center">
      <video className="video-background" autoPlay loop muted>
        <source src="https://res.cloudinary.com/dzyb93kms/video/upload/v1746177132/nature_ln9jtc.mp4" type="video/mp4" />
      </video>
      <div className="content position-relative z-index-1 text-white">
        <h1 className='fw-bold m-3'>Discover Your Dream Destination</h1>
        <h2 className='m-2'>Explore the world's most beautiful places and create unforgettable memories.</h2>

        <InputGroup className="mb-3 w-50 mx-auto m-5">
          <Form.Control
            type="text"
            placeholder="Where to?"
            className="rounded"
          />
          <Button variant="light" className="rounded ms-3">
          {/* <FontAwesomeIcon icon={faSearch} /> */}
          Search
          </Button>
        </InputGroup>

      </div>
    </div>
  );
}

export default HeroSec;
