
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { FaChevronRight, FaBusAlt, FaPlane, FaTrain } from 'react-icons/fa';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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

    if (loading) return (
        <Container className="py-5 text-center">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading tour packages...</p>
        </Container>
    );

    if (error) return (
        <Container className="py-5 text-center text-danger">
            <p>{error}</p>
            <Button variant="outline-primary" onClick={() => window.location.reload()}>
                Try Again
            </Button>
        </Container>
    );

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
        <div className="py-3 py-md-5" style={{ background: 'rgb(240, 240, 240)' }}>
            <Container>
                <h1 className="fw-bold text-center text-md-start mb-4 mb-md-5 px-2 px-md-0">
                    Featured Travel Packages
                </h1>
                
                <Row className="g-4 justify-content-center">
                    {packages.slice(1, 4).map((pkg) => (
                        <Col key={pkg.id} xs={12} sm={10} md={6} lg={4} xl={4} className="d-flex justify-content-center">
                            <Link to={`/packages/${pkg.slug}`} className="text-decoration-none w-100">
                                <Card className="h-100 shadow-sm border-0">
                                    
                                    <Card.Img
                                            variant="top"
                                            src={pkg.image}
                                            alt={pkg.title}
                                            style={{ borderTopLeftRadius: '10px', borderTopRightRadius: '10px', height: '300px', objectFit: 'cover' }}
                                  />
                                    <Card.Body className="d-flex flex-column">
                                        <Card.Title className="fw-bold mb-3">{pkg.title}</Card.Title>
                                        <div className="d-flex justify-content-between align-items-center mt-auto">
                                            <div className="d-flex align-items-center text-muted">
                                                {getTravelIcon(pkg.travelMode)} 
                                                <small>{pkg.travelMode}</small>
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
                        </Col>
                    ))}
                </Row>

                <div className="text-center text-md-end mt-4 mt-md-5">
                    <Link to="/Packages">
                        <Button variant="outline-primary" className="d-inline-flex align-items-center">
                            View All Packages <FaChevronRight className="ms-2" />
                        </Button>
                    </Link>
                </div>
            </Container>
        </div>
    );
}

export default Packages;