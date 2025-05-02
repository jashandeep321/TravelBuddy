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
