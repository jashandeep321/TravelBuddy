
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const OrderHistory = () => {
//     const [orders, setOrders] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchOrders = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 const response = await axios.get(`${process.env.REACT_APP_API_URL}/TravelBuddy/payment/orders/history`, {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 });

//                 console.log('Orders data:', response.data);

//                 setOrders(response.data);
//             } catch (error) {
//                 console.error('Error fetching order history:', error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchOrders();
//     }, []);

//     if (loading) return <p className="text-center my-4">Loading your orders...</p>;

//     if (orders.length === 0)
//         return <p className="text-center my-4">You have no past orders.</p>;

//     return (
//         <div className="container my-5">
//             <h2 className="mb-4 text-center">Your Order History</h2>

//             {orders.map((order, index) => (
//                 <div key={order._id || index} className="card mb-4 shadow-sm">
//                     <div className="card-body">
//                         <h5 className="card-title">
//                             Order Date: {new Date(order.createdAt).toLocaleDateString()}
//                             {' '}
//                             <span className={`badge ms-2 ${order.status === 'paid' ? 'bg-success' : 'bg-warning text-dark'
//                                 }`}>
//                                 {order.status.toUpperCase()}
//                             </span>
//                         </h5>

//                         <p><strong>Order ID:</strong> {order._id}</p>
//                         <p><strong>Razorpay Order ID:</strong> {order.razorpay_order_id}</p>
//                         <p><strong>Razorpay Payment ID:</strong> {order.razorpay_payment_id}</p>
//                         <p><strong>Currency:</strong> {order.currency}</p>
//                         <p><strong>Amount Paid:</strong> ₹{(order.amount / 100).toFixed(2)}</p>

//                         <h6>Items:</h6>
//                         <ul className="list-group mb-3">
//                             {/* {order.items.map((item, i) => (
//                 <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
//                   <div>{item.name} (Qty: {item.quantity})</div>
//                   <span>₹{item.price.toFixed(2)}</span>
//                 </li>
//               ))} */}
//                             {/* {order.items.map((item, i) => (
//                                 <li key={i} className="list-group-item">
//                                     <h6>{item.name}</h6>
//                                     <p>{item.basicInfo}</p>
//                                     {item.basePrice !== undefined && (
//                                         <p>Base Price: ₹{item.basePrice}</p>
//                                     )}
//                                     <p>GST: ₹{item.gst.toFixed(2)}</p>
//                                     <p>
//                                         Qty: {item.quantity} — Total: ₹{item.price.toFixed(2)}
//                                     </p>
//                                 </li>
//                             ))} */}
//                             {order.items.map((item, i) => {
//     // Calculate basePrice if missing (fallback to price/quantity)
//     const basePrice = item.basePrice ?? (item.price / (item.quantity || 1));
//     // Skip GST display entirely since it's not in DB
//     const price = item.price ?? basePrice * (item.quantity || 1);
    
//     return (
//         <li key={i} className="list-group-item">
//             <h6>{item.name || 'Unnamed Item'}</h6>
//             {item.basicInfo && <p>{item.basicInfo}</p>}
//             <p>Base Price: ₹{basePrice.toFixed(2)}</p>
//             <p>
//                 Qty: {item.quantity || 1} — Total: ₹{price.toFixed(2)}
//             </p>
//         </li>
//     );
// })}
//                         </ul>

//                         <p><strong>Order Created At:</strong> {new Date(order.createdAt).toLocaleString()}</p>
//                         <p><strong>Last Updated At:</strong> {new Date(order.updatedAt).toLocaleString()}</p>
//                     </div>
//                 </div>
//             ))}

//             <div className="text-center mt-4">
//                 <button onClick={() => navigate('/cart')} className="btn btn-secondary">
//                     Back to Cart
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default OrderHistory;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/TravelBuddy/payment/orders/history`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching order history:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) return (
        <div className="d-flex justify-content-center my-5">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );

    if (orders.length === 0) return (
        <div className="container text-center my-5 py-5">
            <div className="card shadow-sm">
                <div className="card-body py-5">
                    <i className="bi bi-box-seam display-5 text-muted mb-3"></i>
                    <h3 className="mb-3">No Orders Found</h3>
                    <p className="text-muted mb-4">You haven't made any bookings yet.</p>
                    <button 
                        onClick={() => navigate('/')} 
                        className="btn btn-primary px-4"
                    >
                        Browse Packages
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="container my-5">
            <div className="row mb-4">
                <div className="col">
                    <h2 className="text-center fw-bold">Your Booking History</h2>
                    <p className="text-center text-muted">All your past travel bookings in one place</p>
                </div>
            </div>

            <div className="row">
                {orders.map((order, index) => (
                    <div key={order._id || index} className="col-12 mb-4">
                        <div className="card shadow-sm border-0">
                            <div className="card-header bg-white border-bottom">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h5 className="mb-0">
                                        <i className="bi bi-calendar-check me-2"></i>
                                        {new Date(order.createdAt).toLocaleDateString('en-US', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </h5>
                                    <span className={`badge rounded-pill ${order.status === 'paid' ? 'bg-success' : 'bg-warning text-dark'}`}>
                                        {order.status.toUpperCase()}
                                    </span>
                                </div>
                            </div>
                            
                            <div className="card-body">
                                {order.items.map((item, i) => {
                                    const basePrice = item.basePrice ?? (item.price / (item.quantity || 1));
                                    const price = item.price ?? basePrice * (item.quantity || 1);
                                    
                                    return (
                                        <div key={i} className="mb-4">
                                            <div className="row g-4">
                                                {/* Package Image */}
                                                <div className="col-md-3">
                                                    <div className="ratio ratio-16x9 rounded overflow-hidden">
                                                        <img 
                                                            src={item.image || 'https://via.placeholder.com/400x300?text=Travel+Package'} 
                                                            alt={item.name} 
                                                            className="img-fluid object-fit-cover"
                                                        />
                                                    </div>
                                                </div>
                                                
                                                {/* Package Details */}
                                                <div className="col-md-9">
                                                    <div className="d-flex flex-column h-100">
                                                        <div className="mb-2">
                                                            <h5 className="fw-bold mb-1">{item.name || 'Travel Package'}</h5>
                                                            {item.basicInfo && <p className="text-muted mb-2">{item.basicInfo}</p>}
                                                        </div>
                                                        
                                                        <div className="mt-auto">
                                                            <div className="row">
                                                                <div className="col-6 col-md-3 mb-2">
                                                                    <div className="text-muted small">Price per person</div>
                                                                    <div className="fw-bold">₹{basePrice.toFixed(2)}</div>
                                                                </div>
                                                                <div className="col-6 col-md-3 mb-2">
                                                                    <div className="text-muted small">Travelers</div>
                                                                    <div className="fw-bold">
                                                                        {item.quantity || 1} {item.quantity === 1 ? 'person' : 'people'}
                                                                    </div>
                                                                </div>
                                                                <div className="col-12 col-md-6 mb-2">
                                                                    <div className="text-muted small">Total amount</div>
                                                                    <div className="fw-bold fs-5 text-success">₹{price.toFixed(2)}</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="d-grid gap-2 col-md-4 mx-auto mt-4">
                <button 
                    onClick={() => navigate('/')} 
                    className="btn btn-outline-primary"
                >
                    <i className="bi bi-arrow-left me-2"></i>Back to Home
                </button>
            </div>
        </div>
    );
};

export default OrderHistory;
