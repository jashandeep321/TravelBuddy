import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link for navigation
import Card from 'react-bootstrap/Card';
import pin from '../images/destination-Img/pin.png';

function MountainDes() {
  const [mountainDestinations, setMountainDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMountainData = async () => {
      try {
        const response = await axios.get('http://localhost:4444/TravelBuddy/destinations');
        const filtered = response.data.filter(dest => dest.category.toLowerCase() === 'mountain');
        setMountainDestinations(filtered);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to load mountain destinations.');
        setLoading(false);
      }
    };

    fetchMountainData();
  }, []);

  if (loading) return <div className="p-5">Loading mountain destinations...</div>;
  if (error) return <div className="p-5 text-danger">{error}</div>;

  return (
    <div className="p-5" style={{ background: 'rgb(245, 245, 245)' }}>
      <h1 className="fw-bold pt-5" style={{ fontFamily: 'Courier New' }}>
        Majestic Peaks and Endless Horizons
      </h1>
      <p className="pb-5" style={{ fontFamily: 'Papyrus', fontSize: '1.5rem' }}>
        Embark on an adventure to towering mountains and serene valleys, perfect for thrill-seekers and nature lovers alike.
      </p>
      <div className="container">
        <div className="row justify-content-center pt-3">
          {mountainDestinations.map((destination, index) => (
            <div key={index} className="col-lg-4 col-md-6 mb-4 d-flex justify-content-center">
              <Link to={`/destination/${destination.slug}`} className="text-decoration-none"> {/* Wrap with Link */}
                <Card
                  style={{
                    width: '24rem',
                    border: 'none',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    borderRadius: '10px'
                  }}
                >
                  <Card.Img
                    variant="top"
                    src={destination.bannerImage}
                    alt={destination.name}
                    style={{
                      borderTopLeftRadius: '10px',
                      borderTopRightRadius: '10px',
                      height: '250px',
                      objectFit: 'cover'
                    }}
                  />
                  <Card.Body>
                    <Card.Title
                      className="fw-bold"
                      style={{ textAlign: 'start', fontSize: '1.4rem', marginBottom: '10px' }}
                    >
                      {destination.name}
                    </Card.Title>
                    <Card.Text
                      className="text-secondary"
                      style={{ textAlign: 'start', fontSize: '0.75rem', marginBottom: '10px' }}
                    >
                      {destination.description}
                    </Card.Text>

                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        <img className="me-2" src={pin} alt="Location Pin" style={{ height: '20px' }} />
                        <span className="text-secondary" style={{ fontSize: '0.95rem' }}>
                          {destination.location}
                        </span>
                      </div>

                      <span
                        className="badge bg-light text-secondary fw-bold"
                        style={{
                          border: '1px solid #ddd',
                          fontSize: '0.85rem',
                          padding: '5px 10px',
                          borderRadius: '12px'
                        }}
                      >
                        {destination.category}
                      </span>
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

export default MountainDes;
