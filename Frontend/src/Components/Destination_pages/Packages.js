import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import pin from '../images/destination-Img/pin.png';

function Packages() {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/TravelBuddy/packages`);
                setPackages(response.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch tour packages.');
                setLoading(false);
            }
        };

        fetchPackages();
    }, []);

    if (loading) return <div className="p-5">Loading tour packages...</div>;
    if (error) return <div className="p-5 text-danger">{error}</div>;

    return (
        <div className="p-5" style={{ background: 'rgb(245, 245, 245)' }}>
            <h1 className="fw-bold p-3" style={{ fontFamily: 'sans-serif' }}>Explore Popular Tour Packages</h1>
            <div className="container">
                <div className="row justify-content-center pt-3">
                    {packages.map((pkg, index) => (
                        <div key={index} className="col-lg-4 col-md-6 mb-4 d-flex justify-content-center">
                            <Link to={`/packages/${pkg.slug}`} className="text-decoration-none text-dark">
                                <Card style={{ width: '24rem', border: 'none', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
                                    <Card.Img
                                        variant="top"
                                        src={pkg.image}
                                        alt={pkg.title}
                                        style={{ borderTopLeftRadius: '10px', borderTopRightRadius: '10px', height: '300px', objectFit: 'cover' }}
                                    />
                                    <Card.Body>
                                        <Card.Title className="fw-bold">{pkg.title}</Card.Title>
                                        <Card.Text className="text-secondary">
                                            {pkg.description?.split(' ').slice(0, 12).join(' ')}...
                                        </Card.Text>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="d-flex align-items-center">
                                                <img className="me-2" src={pin} alt="Location Pin" style={{ height: '20px' }} />
                                                <span className="text-secondary">{pkg.travelMode || 'By Air'}</span>
                                            </div>
                                            <div className="text-end">
                                                <span className="text-muted text-decoration-line-through me-2 fs-6">
                                                    ₹{(pkg.price * 1.1).toFixed(0)}
                                                </span>
                                                <span className="fw-bold text-success fs-5">
                                                    ₹{pkg.price}
                                                </span>
                                            </div>
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

export default Packages;
