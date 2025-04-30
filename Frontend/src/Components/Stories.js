import React from 'react';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import reviews from '../media/rewiew.jpg';
const review = [
    {
        id: 1,
        name: "John Doe",
        rating: 5,
        comment: "Amazing experience!",
        avatar: "path-to-avatar-image.jpg",
    },
    {
        id: 2,
        name: "Jane Smith",
        rating: 4,
        comment: "Beautiful destination!",
        avatar: "path-to-avatar-image.jpg",
    },
    // Add more reviews as needed
];

function Stories() {
    return (
        <div className="container pb-5">
            <h1 className='fw-bold p-5 text-center'>Traveler Stories</h1>
            <Card className="mx-auto shadow-lg rounded" style={{ maxWidth: '900px' }}>
                <div className="row ">
                    {/* <img src={reviews} style={{ width: '30%', height:'200%'}}/> */}
                    <div className="col-md-6 pe-0">
                        <Image
                            src={reviews}
                            alt="Travel Destination"
                            className="img-fluid rounded-start h-100"
                            style={{ objectFit: 'cover' }}
                        />
                    </div>

                    {/* Reviews Section */}
                    <div className="col-md-6 ps-0">
                        <Card.Body className='rounded m-3' style={{ border: '#cfcdcd 1px solid', textAlign: 'start' }} >
                            <Card.Title>Name</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Rating</Card.Subtitle>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the
                                bulk of the card's content.
                            </Card.Text>
                        </Card.Body>
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default Stories;
