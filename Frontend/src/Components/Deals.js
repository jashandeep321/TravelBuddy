import React from 'react';
import './Deals.css';

import newuser from './images/destination-Img/newuser.jpg';
import winter from './images/destination-Img/winter.jpg';
import airline from './images/destination-Img/airline.webp';
import cab from './images/destination-Img/cab.jpg';
import dutyfree from './images/destination-Img/dutyfree.jpg';
import hotel from './images/destination-Img/hotel.jpg';
import bus from './images/destination-Img/bus.jpg';
import refer from './images/destination-Img/refer.webp';
import Footer from "./Footer";
import dealimage from './images/destination-Img/deel.png'

const Deals = () => {
  const offers = [
    {
      id: 1,
      title: 'New User Offer',
      description: 'Register and get Discount on first bookings with us',
      imageUrl: newuser,
    },
    {
      id: 2,
      title: 'Winter Sale',
      description: 'Enjoy this winter season with exclusive discounts on travel bookings',
      imageUrl: winter, 
    },
    {
      id: 3,
      title: 'International Airlines Deal',
      description: 'Fly to your dream with exclusive deals and discounted fares on international flights',
      imageUrl: airline, 
    },
    {
      id: 4,
      title: 'Free Cab Offer',
      description: 'Enjoy free cab bookings with us',
      imageUrl: cab, 
    },
    {
    id: 5,
      title: 'Duty Free Products',
      description: 'Shop for duty free products on selective airports with extra discounts',
      imageUrl: dutyfree,
    },
    {
      id: 6,
      title: 'Hotel Offer',
      description: 'Upto 20% discount on selected hotel booking',
      imageUrl: hotel,
    },
    {
      id: 7,
      title: 'Bus Deal',
      description: 'Bus tickets to different destinations at a discount up to Rs.500',
      imageUrl: bus,
    },
    {
      id: 8,
      title: 'Invite & Earn',
      description: 'Invite your friends & earn upto Rs.2000',
      imageUrl: refer,
    },
  ];

  return (
    <div>
    <div className="deals-page">
      <h1 className="deals-heading">Special Deals & Offers</h1>
      <p>"Travel More for Less!"
Get ready for your next trip with our fantastic travel deals.
From family vacations to romantic getaways, find the perfect offer that fits your budget.
Save on flights, hotels, and activities - your dream destination is just a click away!

</p>

      <img src={dealimage} alt="dealimage" className="dealimage" />

      <div className="offers-container">
        {offers.map((offer) => (
          <div className="offer-card" key={offer.id}>
            <img src={offer.imageUrl} alt={offer.title} className="offer-image" />
            <div className="offer-info">
              <h3 className="offer-title">{offer.title}</h3>
              <p className="offer-description">{offer.description}</p>
            </div>
          </div>
        ))}
        
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default Deals;
