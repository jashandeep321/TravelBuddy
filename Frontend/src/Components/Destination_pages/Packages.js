import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { FaBusAlt, FaPlane, FaTrain } from 'react-icons/fa';

function Packages() {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/TravelBuddy/packages`);
                const uniquePackages = Array.from(new Map(response.data.map(pkg => [pkg._id, pkg])).values());
                setPackages(uniquePackages);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch tour packages.');
                setLoading(false);
            }
        };

        fetchPackages();
    }, []);

    const getTravelIcon = (mode) => {
        const m = mode?.toLowerCase();
        if (m?.includes('by air')) return <FaPlane className="me-1" />;
        if (m?.includes('by train')) return <FaTrain className="me-1" />;
        return <FaBusAlt className="me-1" />;
    };

    if (loading) return <div className="p-5 text-center">Loading tour packages...</div>;
    if (error) return <div className="p-5 text-center text-danger">{error}</div>;

    return (
        <div className="p-3 p-md-5" style={{ background: 'rgb(245, 245, 245)' }}>
            <Container>
                <h1 className="fw-bold p-3 text-center text-md-start" style={{ fontFamily: 'sans-serif' }}>
                    Explore Popular Tour Packages
                </h1>
                
                <Row className="justify-content-center justify-content-md-start">
                    {packages.map((pkg) => (
                        <Col key={pkg._id} xs={12} sm={10} md={6} lg={4} className="mb-4 d-flex justify-content-center">
                            <Link to={`/packages/${pkg.slug}`} className="text-decoration-none text-dark">
                                <Card style={{ 
                                    width: '100%',
                                    maxWidth: '24rem',
                                    border: 'none', 
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
                                    borderRadius: '10px' 
                                }}>
                                    <Card.Img
                                        variant="top"
                                        src={pkg.image}
                                        alt={pkg.title}
                                        style={{ 
                                            borderTopLeftRadius: '10px', 
                                            borderTopRightRadius: '10px', 
                                            height: '300px', 
                                            objectFit: 'cover',
                                            width: '100%'
                                        }}
                                    />
                                    <Card.Body>
                                        <Card.Title className="fw-bold">{pkg.title}</Card.Title>
                                        <Card.Text className="text-secondary">
                                            {pkg.description?.split(' ').slice(0, 12).join(' ')}...
                                        </Card.Text>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="d-flex align-items-center">
                                                <span className="text-secondary">
                                                    {getTravelIcon(pkg.travelMode)}{pkg.travelMode || 'By Air'}
                                                </span>
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
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
}

export default Packages;