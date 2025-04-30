import React from 'react';
import './Footer.css'; 

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          {/* First Column */}
          <div className="col-md-3">
            <h5>Flight & Travel</h5>
            <ul className="list-unstyled">
              <li><a href="#">Flight Status</a></li>
              <li><a href="#">PNR Status</a></li>
              <li><a href="#">Flight Booking</a></li>
              <li><a href="#">Bus Booking</a></li>
            </ul>
          </div>
          {/* Second Column */}
          <div className="col-md-3">
            <h5>Services</h5>
            <ul className="list-unstyled">
              <li><a href="#">Hotels</a></li>
              <li><a href="#">Cabs</a></li>
              <li><a href="#">Airlines</a></li>
              <li><a href="#">Blog</a></li>
            </ul>
          </div>
          {/* Third Column */}
          <div className="col-md-3">
            <h5>Transport & Activities</h5>
            <ul className="list-unstyled">
              <li><a href="#">Trains</a></li>
              <li><a href="#">Cruise</a></li>
              <li><a href="#">Airports</a></li>
              <li><a href="#">Activities</a></li>
            </ul>
          </div>
          {/* Fourth Column */}
          <div className="col-md-3">
            <h5>Travel Resources</h5>
            <ul className="list-unstyled">
              <li><a href="#">Holidays</a></li>
              <li><a href="#">Travel Guides</a></li>
              <li><a href="#">Travel Updates</a></li>
              <li><a href="#">Customer Support</a></li>
            </ul>
          </div>
        </div>
      </div>
      
    </footer>
  );
}
