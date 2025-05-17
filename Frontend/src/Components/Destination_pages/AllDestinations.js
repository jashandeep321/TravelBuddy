// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import Card from 'react-bootstrap/Card';
// import axios from 'axios';
// import { FaStar } from 'react-icons/fa';
// import pin from '../images/destination-Img/pin.png';

// function AllDestinations() {
//     const [data, setData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         // Fetch data from the API
//         const fetchData = async () => {
//             try {
//                 const response = await axios.get(`${process.env.REACT_APP_API_URL}/TravelBuddy/destinations`);
//                 setData(response.data);
//                 setLoading(false);
//             } catch (err) {
//                 console.error(err);
//                 setError('Failed to fetch destinations.');
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, []);

//     if (loading) {
//         return <div className="p-5">Loading destinations...</div>;
//     }

//     if (error) {
//         return <div className="p-5 text-danger">{error}</div>;
//     }

//     return (
//         <div className="p-5" style={{ background: 'rgb(245, 245, 245)' }}>
//           <h1 className="fw-bold p-3" style={{ fontFamily: 'sans-serif' }}>Explore Popular Destinations</h1>
//           <div className="container">
//             <div className="row justify-content-center pt-3">
//               {data.map((destination, index) => (
//                 <div key={index} className="col-lg-4 col-md-6 mb-4 d-flex justify-content-center">
// <Link to={`/destination/${destination.slug}`} className="text-decoration-none text-dark">
//   <Card style={{ width: '24rem', border: 'none', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
//     <Card.Img 
//       variant="top"
//       src={destination.bannerImage}
//       alt={destination.name}
//       style={{ borderTopLeftRadius: '10px', borderTopRightRadius: '10px', height: '300px', objectFit: 'cover' }}
//     />
//     <Card.Body>
//       <Card.Title className="fw-bold">{destination.name}</Card.Title>
//       <Card.Text className="text-secondary">{destination.description.split(' ').slice(0, 11).join(' ')}...</Card.Text>
//       <div className="d-flex justify-content-between align-items-center">
//         <div className="d-flex align-items-center">
//           <img className="me-2" src={pin} alt="Location Pin" style={{ height: '20px' }} />
//           <span className="text-secondary">{destination.location}</span>
//         </div>
//         <span className="badge bg-light text-secondary fw-bold"><FaStar className="me-1" />{destination.stars}</span>
//       </div>
//     </Card.Body>
//   </Card>
// </Link>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       );
//     }
    
//     export default AllDestinations;


import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import pin from '../images/destination-Img/pin.png';

function AllDestinations() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/TravelBuddy/destinations`);
                setData(response.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch destinations.');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="p-5 text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2">Loading destinations...</p>
            </div>
        );
    }

    if (error) {
        return <div className="p-5 text-center text-danger">{error}</div>;
    }

    return (
        <div className="p-3 p-md-5" style={{ background: 'rgb(245, 245, 245)' }}>
            <Container>
                <h1 className="fw-bold p-3 text-center text-md-start" style={{ fontFamily: 'sans-serif' }}>
                    Explore Popular Destinations
                </h1>
                
                <Row className="g-4 justify-content-center">
                    {data.map((destination, index) => (
                        <Col key={index} xs={12} sm={10} md={6} lg={4} className="d-flex justify-content-center">
                            <Link to={`/destination/${destination.slug}`} className="text-decoration-none text-dark w-100">
                                <Card style={{ 
                                    width: '100%',
                                    maxWidth: '24rem',
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
                                            objectFit: 'cover',
                                            width: '100%'
                                        }}
                                    />
                                    <Card.Body>
                                        <Card.Title className="fw-bold">{destination.name}</Card.Title>
                                        <Card.Text className="text-secondary">
                                            {destination.description.split(' ').slice(0, 11).join(' ')}...
                                        </Card.Text>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="d-flex align-items-center">
                                                <img className="me-2" src={pin} alt="Location Pin" style={{ height: '20px' }} />
                                                <span className="text-secondary">{destination.location}</span>
                                            </div>
                                            <span className="badge bg-light text-secondary fw-bold">
                                                <FaStar className="me-1" />{destination.stars}
                                            </span>
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

export default AllDestinations;