// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';

// import pin from './images/destination-Img/pin.png';

// function Destinations() {
//     const [destinations, setDestinations] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         // Fetch data from the API
//         const fetchDestinations = async () => {
//             try {
//                 const response = await axios.get('http://localhost:4444/VoyageVista/destinations'); // Replace with your API endpoint
//                 setDestinations(response.data);
//                 setLoading(false);
//             } catch (err) {
//                 console.error(err);
//                 setError('Failed to fetch destinations.');
//                 setLoading(false);
//             }
//         };

//         fetchDestinations();
//     }, []);

//     if (loading) {
//         return <div>Loading destinations...</div>;
//     }

//     if (error) {
//         return <div>Error: {error}</div>;
//     }

//     // Slice the destinations array to get the latest 4 items
//     const latestDestinations = destinations.slice(-4);

//     return (
//         <div className='p-5' style={{ background: 'rgb(245, 245, 245)' }}>
//             <h1 className='fw-bold pt-5' style={{ fontFamily: 'sans-serif' }}>Explore Popular Destinations</h1>

//             <div className="container">
//                 <div className="row justify-content-center pt-2">
//                     {latestDestinations.map((destination, index) => (
//                         <div key={index} className="col-lg-3 col-md-6 mb-4 d-flex justify-content-center">
//                             <Card style={{ width: '18rem' }}>
//                                 <Card.Img
//                                     variant="top"
//                                     src={`http://localhost:4444/${destination.image}`} // Adjust based on your API response
//                                     alt={destination.name}
//                                 />
//                                 <Card.Body>
//                                     <Card.Title className='fw-bold' style={{ textAlign: 'start' }}>{destination.name}</Card.Title>
//                                     <div className='d-flex align-items-center'>
//                                         <img className='me-1' src={pin} alt="Location pin" />
//                                         <Card.Text className='text-secondary mb-0'>{destination.location}</Card.Text>
//                                     </div>
//                                 </Card.Body>
//                             </Card>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Destinations;


// import React, { useEffect, useRef } from 'react';
// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';


// function Destinations() {
//     const scrollRef = useRef(null);

//     useEffect(() => {
//         const scrollContainer = scrollRef.current;

//         const scrollSpeed = 1; // Adjust the speed of the scroll
//         const scrollInterval = 10; // Adjust the interval for smooth scrolling

//         const startScroll = () => {
//             scrollContainer.scrollLeft += scrollSpeed;

//             // Check if scroll has reached the end of the first set of items
//             if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
//                 // Reset scroll position to the beginning
//                 scrollContainer.scrollLeft = 0;
//             }
//         };

//         const intervalId = setInterval(startScroll, scrollInterval);

//         return () => clearInterval(intervalId); // Clean up the interval on component unmount
//     }, []);

//     return (
//         <div>
//             <h1 className='fw-bold m-5'>Personalized Travel Recommendations</h1>

//             <div
//                 className="row flex-nowrap overflow-auto"
//                 ref={scrollRef}
//                 style={{ whiteSpace: 'nowrap', overflowX: 'auto' }}
//             >
//                 {/* Duplicate cards for infinite loop effect */}
//                 <div style={{ display: 'flex' }}>
//                     <div className="col-lg-3 col-md-6 mb-4 d-inline-flex justify-content-center">
//                         <Card style={{ width: '16rem' }}>
//                             <Card.Img variant="top" src="holder.js/100px180" />
//                             <Card.Body>
//                                 <Card.Title>Card 1</Card.Title>
//                                 <Card.Text>Content for card 1</Card.Text>
//                                 <Button variant="primary">Go somewhere</Button>
//                             </Card.Body>
//                         </Card>
//                     </div>
//                     <div className="col-lg-3 col-md-6 mb-4 d-inline-flex justify-content-center">
//                         <Card style={{ width: '16rem' }}>
//                             <Card.Img variant="top" src="holder.js/100px180" />
//                             <Card.Body>
//                                 <Card.Title>Card 2</Card.Title>
//                                 <Card.Text>Content for card 2</Card.Text>
//                                 <Button variant="primary">Go somewhere</Button>
//                             </Card.Body>
//                         </Card>
//                     </div>
//                     <div className="col-lg-3 col-md-6 mb-4 d-inline-flex justify-content-center">
//                         <Card style={{ width: '16rem' }}>
//                             <Card.Img variant="top" src="holder.js/100px180" />
//                             <Card.Body>
//                                 <Card.Title>Card 3</Card.Title>
//                                 <Card.Text>Content for card 3</Card.Text>
//                                 <Button variant="primary">Go somewhere</Button>
//                             </Card.Body>
//                         </Card>
//                     </div>
//                     <div className="col-lg-3 col-md-6 mb-4 d-inline-flex justify-content-center">
//                         <Card style={{ width: '16rem' }}>
//                             <Card.Img variant="top" src="holder.js/100px180" />
//                             <Card.Body>
//                                 <Card.Title>Card 4</Card.Title>
//                                 <Card.Text>Content for card 4</Card.Text>
//                                 <Button variant="primary">Go somewhere</Button>
//                             </Card.Body>
//                         </Card>
//                     </div>
//                     <div className="col-lg-3 col-md-6 mb-4 d-inline-flex justify-content-center">
//                         <Card style={{ width: '16rem' }}>
//                             <Card.Img variant="top" src="holder.js/100px180" />
//                             <Card.Body>
//                                 <Card.Title>Card 5</Card.Title>
//                                 <Card.Text>Content for card 5</Card.Text>
//                                 <Button variant="primary">Go somewhere</Button>
//                             </Card.Body>
//                         </Card>
//                     </div>
//                     <div className="col-lg-3 col-md-6 mb-4 d-inline-flex justify-content-center">
//                         <Card style={{ width: '16rem' }}>
//                             <Card.Img variant="top" src="holder.js/100px180" />
//                             <Card.Body>
//                                 <Card.Title>Card 6</Card.Title>
//                                 <Card.Text>Content for card 6</Card.Text>
//                                 <Button variant="primary">Go somewhere</Button>
//                             </Card.Body>
//                         </Card>
//                     </div>
//                 </div>
//                 {/* Duplicate cards */}
//                 <div style={{ display: 'flex' }}>
//                     <div className="col-lg-3 col-md-6 mb-4 d-inline-flex justify-content-center">
//                         <Card style={{ width: '16rem' }}>
//                             <Card.Img variant="top" src="holder.js/100px180" />
//                             <Card.Body>
//                                 <Card.Title>Card 1</Card.Title>
//                                 <Card.Text>Content for card 1</Card.Text>
//                                 <Button variant="primary">Go somewhere</Button>
//                             </Card.Body>
//                         </Card>
//                     </div>
//                     <div className="col-lg-3 col-md-6 mb-4 d-inline-flex justify-content-center">
//                         <Card style={{ width: '16rem' }}>
//                             <Card.Img variant="top" src="holder.js/100px180" />
//                             <Card.Body>
//                                 <Card.Title>Card 2</Card.Title>
//                                 <Card.Text>Content for card 2</Card.Text>
//                                 <Button variant="primary">Go somewhere</Button>
//                             </Card.Body>
//                         </Card>
//                     </div>
//                     <div className="col-lg-3 col-md-6 mb-4 d-inline-flex justify-content-center">
//                         <Card style={{ width: '16rem' }}>
//                             <Card.Img variant="top" src="holder.js/100px180" />
//                             <Card.Body>
//                                 <Card.Title>Card 3</Card.Title>
//                                 <Card.Text>Content for card 3</Card.Text>
//                                 <Button variant="primary">Go somewhere</Button>
//                             </Card.Body>
//                         </Card>
//                     </div>
//                     <div className="col-lg-3 col-md-6 mb-4 d-inline-flex justify-content-center">
//                         <Card style={{ width: '16rem' }}>
//                             <Card.Img variant="top" src="holder.js/100px180" />
//                             <Card.Body>
//                                 <Card.Title>Card 4</Card.Title>
//                                 <Card.Text>Content for card 4</Card.Text>
//                                 <Button variant="primary">Go somewhere</Button>
//                             </Card.Body>
//                         </Card>
//                     </div>
//                     <div className="col-lg-3 col-md-6 mb-4 d-inline-flex justify-content-center">
//                         <Card style={{ width: '16rem' }}>
//                             <Card.Img variant="top" src="holder.js/100px180" />
//                             <Card.Body>
//                                 <Card.Title>Card 5</Card.Title>
//                                 <Card.Text>Content for card 5</Card.Text>
//                                 <Button variant="primary">Go somewhere</Button>
//                             </Card.Body>
//                         </Card>
//                     </div>
//                     <div className="col-lg-3 col-md-6 mb-4 d-inline-flex justify-content-center">
//                         <Card style={{ width: '16rem' }}>
//                             <Card.Img variant="top" src="holder.js/100px180" />
//                             <Card.Body>
//                                 <Card.Title>Card 6</Card.Title>
//                                 <Card.Text>Content for card 6</Card.Text>
//                                 <Button variant="primary">Go somewhere</Button>
//                             </Card.Body>
//                         </Card>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
// export default Destinations;


import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import parisimg from './images/destination-Img/paris.jpg';
import baliimg from './images/destination-Img/bali.jpg';
import nyimg from './images/destination-Img/newyork.jpg';
import sydneyimg from './images/destination-Img/sydney.jpg';
import pin from './images/destination-Img/pin.png';
// import parisimg from './images/destination-Img/rome.jpg';

const data = [
    { id: 1, name: "Paris", location: "France", image: parisimg },
    { id: 2, name: "Bali", location: "Indonesia", image: baliimg },
    { id: 3, name: "New York", location: "USA", image: nyimg },
    { id: 4, name: "Sydney", location: "Australia", image: sydneyimg },
    // { id: 5, name: "Rome", location: "Italy", image: "./destination-Img/rome.jpg" },
    // { id: 6, name: "Tokyo", location: "Japan", image: "./destination-Img/tokyo.jpg" }
];

function Destinations() {
    return (
        <div className=' p-5' style={{ background:'rgb(245, 245, 245)' }}>
            <h1 className='fw-bold pt-5'style={{ fontFamily:'sans-serif'}}>Explore Popular Destinations</h1>

            <div className="container">
                <div className="row justify-content-center pt-2">
                    {data.map((destination, index) => (
                        <div key={index} className="col-lg-3 col-md-6 mb-4 d-flex justify-content-center">
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={destination.image} alt={destination.name} />
                                <Card.Body>
                                    <Card.Title className='fw-bold' style={{ textAlign:'start' }}>{destination.name}</Card.Title>
                                    {/* <Card.Text className='text-align-start text-secondary'>{destination.location}</Card.Text> */}
                                    <div className='d-flex align-items-center'>
                                        <img className='me-1'src={pin} />
                                        <Card.Text className='text-secondary mb-0'>{destination.location}</Card.Text>
                                    </div>
                                    {/* <Button variant="primary">Explore {destination.name}</Button> */}
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Destinations;
