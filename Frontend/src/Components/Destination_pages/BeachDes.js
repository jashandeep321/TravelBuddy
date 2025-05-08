import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import axios from 'axios';

import pin from '../images/destination-Img/pin.png';

function BeachDestinations() {
  const [beachDestinations, setBeachDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4444/TravelBuddy/destinations');
        const beachData = response.data.filter(dest => dest.category.toLowerCase() === 'beach');
        setBeachDestinations(beachData);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch beach destinations.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="p-5">Loading beach destinations...</div>;
  if (error) return <div className="p-5 text-danger">{error}</div>;

  return (
    <div className="p-5" style={{ background: 'rgb(245, 245, 245)' }}>
      <h1 className="fw-bold pt-5" style={{ fontFamily: 'sans-serif' }}>Explore Beach Destinations</h1>
      <div className="container">
        <div className="row justify-content-center pt-3">
          {beachDestinations.map((destination, index) => (
            <div key={index} className="col-lg-4 col-md-6 mb-4 d-flex justify-content-center">
              <Link to={`/destination/${destination.slug}`} className="text-decoration-none text-dark">
                <Card style={{
                  width: '24rem',
                  border: 'none',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  borderRadius: '10px'
                }}>
                  <Card.Img
                    variant="top"
                    src={destination.bannerImage}
                    alt={destination.name}
                    style={{
                      borderTopLeftRadius: '10px',
                      borderTopRightRadius: '10px',
                      height: '300px',
                      objectFit: 'cover'
                    }}
                  />
                  <Card.Body>
                    <Card.Title className="fw-bold">{destination.name}</Card.Title>
                    <Card.Text className="text-secondary">
                      {destination.description.split(' ').slice(0, 12).join(' ')}...
                    </Card.Text>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        <img className="me-2" src={pin} alt="Location Pin" style={{ height: '20px' }} />
                        <span className="text-secondary">{destination.location}</span>
                      </div>
                      <span className="badge bg-light text-secondary fw-bold">{destination.category}</span>
                    </div>
                  </Card.Body>
                </Card>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BeachDestinations;
