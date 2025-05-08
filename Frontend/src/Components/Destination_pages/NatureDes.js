import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import Card from 'react-bootstrap/Card';

import parisimg from '../images/destination-Img/paris.jpg';
import baliimg from '../images/destination-Img/bali.jpg';
import nyimg from '../images/destination-Img/newyork.jpg';
import sydneyimg from '../images/destination-Img/sydney.jpg';
import pin from '../images/destination-Img/pin.png';

import tokyoimg from '../images/destination-Img/tokyo.jpg';
import amazonimg from '../images/destination-Img/amazon.jpg';
import romeimg from '../images/destination-Img/rome.jpg';
import seoulimg from '../images/destination-Img/seoul.jpg';
import himalayasimg from '../images/destination-Img/himalayas.jpg';
import yellowstoneimg from '../images/destination-Img/yellowstone.jpg';
import patagoniaimg from '../images/destination-Img/patagonia.jpg';
import swissalpsimg from '../images/destination-Img/swissapls.jpg';
import hawaiiimg from '../images/destination-Img/hawaii.jpg';
import maldivesimg from '../images/destination-Img/maldives.jpg';

const data = [
    { id: 1, name: "Paris", description: "The city of light and love, known for its iconic Eiffel Tower and rich culture.", location: "France", image: parisimg, category: "city" },
    { id: 2, name: "Bali", description: "A tropical paradise with stunning beaches and vibrant culture.", location: "Indonesia", image: baliimg, category: "Beach" },
    { id: 3, name: "New York", description: "The city that never sleeps, famous for its skyline and bustling streets.", location: "USA", image: nyimg, category: "city" },
    { id: 4, name: "Sydney", description: "Known for the Sydney Opera House, Harbour Bridge, and beautiful beaches.", location: "Australia", image: sydneyimg, category: "beach" },
    { id: 5, name: "Amazon Rainforest", description: "Unparalleled biodiversity and a haven for adventure seekers.", location: "South America", image: amazonimg, category: "nature" },
    { id: 6, name: "Yellowstone", description: "Home to geothermal wonders like Old Faithful and a variety of wildlife.", location: "USA", image: yellowstoneimg, category: "nature" },
    { id: 7, name: "Tokyo", description: "A bustling metropolis where futuristic technology meets ancient traditions.", location: "Japan", image: tokyoimg, category: "city" },
    { id: 8, name: "Patagonia", description: "Rugged landscapes and breathtaking vistas await in this outdoor paradise.", location: "Chile & Argentina", image: patagoniaimg, category: "mountain" },
    { id: 9, name: "Swiss Alps", description: "Majestic peaks and world-class skiing make it a must-visit destination.", location: "Switzerland", image: swissalpsimg, category: "mountain" },
    { id: 10, name: "Hawaii", description: "A tropical paradise with diverse landscapes and stunning beaches.", location: "USA", image: hawaiiimg, category: "beach" },
    { id: 11, name: "Maldives", description: "Known for luxurious overwater villas and crystal-clear waters.", location: "Indian Ocean", image: maldivesimg, category: "beach" },
    { id: 12, name: "Himalayas", description: "A mountain range with unmatched scenic beauty and thrilling adventures.", location: "Asia", image: himalayasimg, category: "mountain" },
    { id: 13, name: "Seoul", description: "A vibrant city blending traditional palaces with K-pop culture.", location: "South Korea", image: seoulimg, category: "city" },
    { id: 14, name: "Rome", description: "An open-air museum of ancient ruins and Renaissance art.", location: "Italy", image: romeimg, category: "city" }
];

function NatureDes() {
    const filteredData = data.filter(destination => destination.category.toLowerCase() === "nature");

    return (
        <div className="p-5" style={{ background: 'rgb(245, 245, 245)' }}>
            <h1 className="fw-bold pt-5" style={{ fontFamily: 'Courier New' }}>Nature's Best Kept Secrets</h1>
            <p className="pb-5" style={{ fontFamily: 'Papyrus', fontSize: '1.5rem' }}>
                Explore untouched landscapes, lush forests, and breathtaking natural wonders that inspire awe and adventure.
            </p>
            <div className="container">
                <div className="row justify-content-center pt-3">
                    {filteredData.map((destination, index) => (
                        <div key={index} className="col-lg-4 col-md-6 mb-4 d-flex justify-content-center">
                            <Link to={`/destination/${destination.name.toLowerCase().replace(/\s+/g, '-')}`} className="text-decoration-none"> {/* Wrap with Link */}
                                <Card style={{ width: '24rem', border: 'none', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
                                    <Card.Img 
                                        variant="top" 
                                        src={destination.image} 
                                        alt={destination.name} 
                                        style={{ borderTopLeftRadius: '10px', borderTopRightRadius: '10px', height: '250px', objectFit: 'cover' }} 
                                    />
                                    <Card.Body>
                                        <Card.Title className="fw-bold" style={{ textAlign: 'start', fontSize: '1.4rem', marginBottom: '10px' }}>
                                            {destination.name}
                                        </Card.Title>
                                        <Card.Text className="text-secondary" style={{ textAlign: 'start', fontSize: '0.75rem', marginBottom: '10px' }}>
                                            {destination.description}
                                        </Card.Text>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="d-flex align-items-center">
                                                <img className="me-2" src={pin} alt="Location Pin" style={{ height: '20px' }} />
                                                <span className="text-secondary" style={{ fontSize: '0.95rem' }}>
                                                    {destination.location}
                                                </span>
                                            </div>
                                            <span className="badge bg-light text-secondary fw-bold" style={{
                                                border: '1px solid #ddd', 
                                                fontSize: '0.85rem',
                                                padding: '5px 10px',
                                                borderRadius: '12px'
                                            }}>
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

export default NatureDes;
