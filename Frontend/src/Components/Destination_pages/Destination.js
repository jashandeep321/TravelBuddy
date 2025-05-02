import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import Rating from '@mui/material/Rating';
import { FaMapMarkerAlt, FaLanguage, FaUtensils, FaLandmark, FaBusAlt, FaCalendarAlt } from 'react-icons/fa';

import './Destination.css'; // <-- we'll create this

function Destination() {
  const { slug } = useParams();
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        const res = await axios.get(`http://localhost:4444/TravelBuddy/destinations/slug/${slug}`);
        setDestination(res.data);
      } catch (error) {
        console.error('Error fetching destination:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDestination();
  }, [slug]);

  if (loading) return <div className="loading">Loading...</div>;
  if (!destination) return <div className="error">Destination not found</div>;

  return (
    <div className="destination-page container py-5">
      <h1 className="mb-4 display-5 fw-bold text-center">{destination.name}</h1>

      <div className="row align-items-center mb-5">
        <div className="col-md-6">
          {destination.baseImages?.length > 0 && (
            <Carousel interval={3000} pause={false} fade>
              {destination.baseImages.map((img, index) => (
                <Carousel.Item key={index}>
                  <img
                    className="d-block w-100 rounded shadow-sm"
                    src={img}
                    alt={`Slide ${index + 1}`}
                    style={{ height: '400px', objectFit: 'cover' }}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          )}
        </div>
        <div className="col-md-6 ps-md-5 mt-4 mt-md-0">
          <p className="text-end text-muted small"><FaMapMarkerAlt className="icon" /> {destination.location}</p>
          <p className="lead ">{destination.description}</p>

        </div>
      </div>

      <div className="row gy-4 px-md-3">

        {/* <p><strong>Category:</strong> {destination.category}</p> */}
        <div className="d-flex flex-column flex-md-row gap-4">
          <div className="card flex-fill shadow-sm">
            <div className="card-body">
              <p className="mb-0">
                <FaCalendarAlt className="me-2 text-primary" />
                <strong>Best Time to Visit:</strong> {destination.bestTimeToVisit}
              </p>
            </div>
          </div>

          <div className="card flex-fill shadow-sm">
            <div className="card-body">
              <p className="mb-0">
                <strong>Avoid Visiting:</strong> {destination.whenNotToVisit}
              </p>
            </div>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-md-4">
            <h5><FaBusAlt className="icon" /> Getting Around</h5>
            {/* <p>{destination.transportation}</p> */}
            {destination.transportation?.map((lang, idx) => (
              <p key={idx} className="mb-1">- {lang}</p>
            ))}
          </div>

          <div className="col-md-4">
            <h5><FaLanguage className="icon" /> Languages You Might Need</h5>
            {destination.languages?.map((lang, idx) => (
              <p key={idx} className="mb-1">- {lang}</p>
            ))}
          </div>

          <div className="col-md-4">
            <h5><FaUtensils className="icon" /> Foods You must Try</h5>
            {destination.foodToTry?.map((food, idx) => (
              <p key={idx} className="mb-1">- {food}</p>
            ))}
          </div>

          <div className="col-md-6">
            <h5><FaLandmark className="icon" />Places You must visit</h5>
            {destination.placesToVisit?.map((place, idx) => (
              <p key={idx} className="mb-1">- {place}</p>
            ))}
          </div>

          <div className="col-md-6">
            <div className="card shadow-sm p-4 h-100">
              {/* <h5 className="mb-3">What people feel </h5> */}

              <div className="d-flex align-items-center mb-3  " style={{ margin: 'auto' }}>
                <Rating
                  name="read-only-rating"
                  defaultValue={parseFloat(destination.stars)}
                  precision={0.5}
                  readOnly
                  size="large"
                />
                <span className="ms-3 fs-5 fw-semibold">{destination.stars}</span>
              </div>

              <p className="mb-0 m-4"><strong>Avg Price:</strong> <span className="text-success">{destination.price}/per Day</span></p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Destination;
