import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import { FaBusAlt, FaPlane, FaTrain } from 'react-icons/fa';
import { useCart } from '../../Context/CartContext';

function PackageDetails() {
  const { slug } = useParams();
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const res = await axios.get(`http://localhost:4444/TravelBuddy/packages/slug/${slug}`);
        setPkg(res.data);
      } catch (err) {
        console.error('Error fetching package:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPackage();
  }, [slug]);

  if (loading) return <div className="text-center py-5">Loading...</div>;
  if (!pkg) return <div className="text-center text-danger py-5">Package not found</div>;

  const originalPrice = (pkg.price * 1.1).toFixed(0);

  const getTravelIcon = (mode) => {
    const m = mode?.toLowerCase();
    if (m?.includes('by air')) return <FaPlane className="me-1" />;
    if (m?.includes('by train')) return <FaTrain className="me-1" />;
    return <FaBusAlt className="me-1" />;
  };

  return (
    <div className="container py-5">
      {/* Header */}
      <h1 className="text-center fw-bold mb-4">{pkg.title}</h1>

      {/* Top Section */}
      <div className="row mb-5">

        {/* Images Section */}
        <div className="col-md-6 mb-3">
          {pkg.images?.sightseeing?.length > 0 && (
            <Carousel interval={3000} pause={false} fade>
              {pkg.images.sightseeing.map((img, index) => (
                <Carousel.Item key={index}>
                  <img
                    src={img}
                    alt={`Sightseeing ${index + 1}`}
                    className="d-block w-100 rounded shadow-sm"
                    style={{ height: '400px', objectFit: 'cover' }}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          )}
        </div>

        <div className="col-md-6">
          <p className="lead fs-4 p-3">{pkg.description}</p>
          <p><strong className='fs-5'>Duration:</strong> {pkg.duration}</p>
          <p className="d-flex justify-content-center align-items-center">
            <strong className="me-2 fs-5">Travel Mode:</strong> {getTravelIcon(pkg.travelMode)} {pkg.travelMode}
          </p>
          <p className="fs-5 pt-3">
            {/* <strong>Price:</strong>{' '} */}
            <span className="text-muted text-decoration-line-through me-2 fs-6">₹{originalPrice}</span>
            <span className="text-success fw-bold fs-5">₹{pkg.price}</span> /person
          </p>

          {/* Buttons Section */}
          <div className="d-flex justify-content-center gap-3 p-5">
            <button className="btn btn-outline-primary px-4 py-2 fs-5">Add to Wishlist</button>
            <button className="btn btn-primary px-4 py-2 fs-5"  onClick={() => addToCart(pkg)}>Book Package</button>
          </div>
        </div>
      </div>
      {/* Images Section */}
      <div className="row mb-5">
        {pkg.hotelImages?.length > 0 && (
          <div className="col-md-4 mb-3">
            <h5 className="text-center">Hotel</h5>
            <img src={pkg.hotelImages[0]} alt="Hotel" className="img-fluid rounded shadow-sm" />
          </div>
        )}
        {pkg.restaurantImages?.length > 0 && (
          <div className="col-md-4 mb-3">
            <h5 className="text-center">Restaurant</h5>
            <img src={pkg.restaurantImages[0]} alt="Restaurant" className="img-fluid rounded shadow-sm" />
          </div>
        )}
        {pkg.sightseeingImages?.length > 0 && (
          <div className="col-md-4 mb-3">
            <h5 className="text-center">Sightseeing</h5>
            <img src={pkg.sightseeingImages[0]} alt="Sightseeing" className="img-fluid rounded shadow-sm" />
          </div>
        )}
      </div>

      {/* Inclusions & Exclusions */}
      <div className="mb-5">
        <div className="row">
          <div className="col-md-6 mb-4">
            <h4>What's Included</h4>
            <ul className="list-group list-group-flush shadow-sm rounded">
              {pkg.inclusions.map((item, idx) => (
                <li key={idx} className="list-group-item">{item}</li>
              ))}
            </ul>
          </div>
          <div className="col-md-6 mb-4">
            <h4>What's Not Included</h4>
            <ul className="list-group list-group-flush shadow-sm rounded">
              {pkg.exclusions.map((item, idx) => (
                <li key={idx} className="list-group-item">{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="row mb-5">
  {pkg.images?.hotel?.length > 0 && (
    <div className="col-md-6 mb-3">
      <h5 className="text-center">Hotel</h5>
      <Carousel interval={3000} pause={false} fade>
        {pkg.images.hotel.map((img, index) => (
          <Carousel.Item key={index}>
            <img
              src={img}
              alt={`Hotel ${index + 1}`}
              className="d-block w-100 rounded shadow-sm"
              style={{ height: '300px', objectFit: 'cover' }}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  )}

  {pkg.images?.restaurant?.length > 0 && (
    <div className="col-md-6 mb-3">
      <h5 className="text-center">Restaurant</h5>
      <Carousel interval={3000} pause={false} fade>
        {pkg.images.restaurant.map((img, index) => (
          <Carousel.Item key={index}>
            <img
              src={img}
              alt={`Restaurant ${index + 1}`}
              className="d-block w-100 rounded shadow-sm"
              style={{ height: '300px', objectFit: 'cover' }}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  )}
</div>

      {/* Itinerary Section */}
      <div>
        <h4 className="mb-4">Itinerary</h4>
        <div className="row">
          {pkg.itinerary.map((day, idx) => (
            <div className="col-md-6 mb-4" key={idx}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Day {day.day}: {day.title}</h5>
                  <p className="card-text">{day.activities}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PackageDetails;
