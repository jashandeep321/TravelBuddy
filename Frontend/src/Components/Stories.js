// import React from 'react';
// import Card from 'react-bootstrap/Card';
// import Image from 'react-bootstrap/Image';
// import reviews from '../media/rewiew.jpg';
// // const review = [
// //     {
// //         id: 1,
// //         name: "John Doe",
// //         rating: 5,
// //         comment: "Amazing experience!",
// //         avatar: "path-to-avatar-image.jpg",
// //     },
// //     {
// //         id: 2,
// //         name: "Jane Smith",
// //         rating: 4,
// //         comment: "Beautiful destination!",
// //         avatar: "path-to-avatar-image.jpg",
// //     },
// //     // Add more reviews as needed
// // ];

// function Stories() {
//     return (
//         <div className="container pb-5">
//             <h1 className='fw-bold p-5 text-center'>Traveler Stories</h1>
//             <Card className="mx-auto shadow-lg rounded" style={{ maxWidth: '900px' }}>
//                 <div className="row ">
//                     {/* <img src={reviews} style={{ width: '30%', height:'200%'}}/> */}
//                     <div className="col-md-6 pe-0">
//                         <Image
//                             src={reviews}
//                             alt="Travel Destination"
//                             className="img-fluid rounded-start h-100"
//                             style={{ objectFit: 'cover' }}
//                         />
//                     </div>

//                     {/* Reviews Section */}
//                     <div className="col-md-6 ps-0">
//                         <Card.Body className='rounded m-3' style={{ border: '#cfcdcd 1px solid', textAlign: 'start' }} >
//                             <Card.Title>Name</Card.Title>
//                             <Card.Subtitle className="mb-2 text-muted">Rating</Card.Subtitle>
//                             <Card.Text>
//                                 Some quick example text to build on the card title and make up the
//                                 bulk of the card's content.
//                             </Card.Text>
//                         </Card.Body>
//                     </div>
//                 </div>
//             </Card>
//         </div>
//     );
// }

// export default Stories;


import React from 'react';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import { FaStar } from 'react-icons/fa';
import reviewsImage from '../media/rewiew.jpg';

function Stories() {
    // Static travel stories data
    const travelStories = [
        {
            id: 1,
            name: "Sarah & Mark Johnson",
            rating: 5,
            location: "Bali, Indonesia",
            date: "January 2025",
            comment: "Our honeymoon in Bali was absolutely magical thanks to Travel Buddy! The private villa with ocean view exceeded our expectations. The cultural tours and sunset dinners were unforgettable. We'll cherish these memories forever.",
            avatar: "https://randomuser.me/api/portraits/women/44.jpg"
        },
        
    ];

    // Render star ratings
    const renderStars = (rating) => {
        return [...Array(5)].map((_, i) => (
            <FaStar key={i} className={i < rating ? "text-warning" : "text-secondary"} />
        ));
    };

    return (
        <div className="container py-5">
            <h1 className='fw-bold mb-5 text-center display-5'>Traveler Stories & Testimonials</h1>
            
            {travelStories.map((story) => (
                <Card key={story.id} className="mx-auto shadow-lg rounded mb-5" style={{ maxWidth: '900px' }}>
                    <div className="row g-0">
                        {/* Story Image */}
                        <div className="col-md-6">
                            <Image
                                src={reviewsImage}
                                alt="Travel Destination"
                                className="img-fluid rounded-start h-100"
                                style={{ objectFit: 'cover', height: '100%', minHeight: '300px' }}
                            />
                        </div>

                        {/* Story Content */}
                        <div className="col-md-6 d-flex flex-column">
                            <Card.Body className='p-4 h-100' style={{ borderLeft: '#e0e0e0 1px solid' }}>
                                <div className="d-flex align-items-center mb-3">
                                    <img 
                                        src={story.avatar} 
                                        alt={story.name} 
                                        className="rounded-circle me-3" 
                                        style={{ width: '50px', height: '50px', objectFit: 'cover' }} 
                                    />
                                    <div>
                                        <Card.Title className="mb-0">{story.name}</Card.Title>
                                        <small className="text-muted">{story.location} • {story.date}</small>
                                    </div>
                                </div>
                                
                                <div className="mb-3">
                                    {renderStars(story.rating)}
                                    <span className="ms-2 text-muted">{story.rating}.0 rating</span>
                                </div>
                                
                                <Card.Text className="fst-italic" style={{ lineHeight: '1.6' }}>
                                    "{story.comment}"
                                </Card.Text>
                                
                                <div className="mt-auto pt-3 border-top">
                                    <small className="text-muted">
                                        <FaStar className="text-warning me-1" />
                                        Verified Traveler • {story.date}
                                    </small>
                                </div>
                            </Card.Body>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
}

export default Stories;