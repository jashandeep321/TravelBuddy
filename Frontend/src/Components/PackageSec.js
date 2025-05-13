import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { FaChevronRight, FaBusAlt, FaPlane, FaTrain } from 'react-icons/fa';

function Packages() {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch packages from the backend on component mount
    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const response = await axios.get('http://localhost:4444/TravelBuddy/packages');
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

    // Loading and error handling
    if (loading) return <div className="p-5">Loading tour packages...</div>;
    if (error) return <div className="p-5 text-danger">{error}</div>;

    // Function to get the correct travel icon with color adjustments
    const getTravelIcon = (mode) => {
        const m = mode?.toLowerCase();
        if (m?.includes('by air')) {
            return <FaPlane className="me-1" style={{ color: 'gray' }} />;
        }
        if (m?.includes('by train')) {
            return <FaTrain className="me-1" style={{ color: 'gray'}} />;
        }
        return <FaBusAlt className="me-1" />;
    };

    return (
        <div>
            {/* Packages Section */}
            <div className="p-5" style={{ background: 'rgb(240, 240, 240)' }}>
                <h1 className="fw-bold p-5" style={{ fontFamily: 'sans-serif' }}>Featured Travel Packages</h1>
                <div className="container">
                    <div className="row d-flex justify-content-center pt-2">
                        {packages.slice(1, 4).map((pkg) => (
                            <div key={pkg.id} className="col-lg-4 col-md-6 mb-4 d-flex justify-content-center">
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
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="d-flex align-items-center">
                                                    <strong className="me-2 fs-5"></strong>
                                                    {getTravelIcon(pkg.travelMode)} {pkg.travelMode}
                                                </div>
                                                <div className="text-end">
                                                    <span className="text-muted text-decoration-line-through me-2 fs-7">
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
                    <div className="d-flex justify-content-end pt-3">
                        <Link to="/Packages">
                            <Button variant="outline-primary" className="d-flex align-items-center">
                                View All Packages <FaChevronRight className="ms-2" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Packages;
