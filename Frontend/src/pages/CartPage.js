// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './Form.css'; // Assuming this file contains your styling

// const Signup = () => {
//   const [currentPage, setCurrentPage] = useState(1); // 1 for Signup, 2 for Login
//   const [loginData, setLoginData] = useState({ email: '', password: '' });
//   const [signupData, setSignupData] = useState({ username: '', email: '', password: '' });
//   const [loading, setLoading] = useState(false); // Loader state

//   // Navigate between Signup and Login pages
//   const handleNext = () => setCurrentPage(2);
//   const handleBack = () => setCurrentPage(1);

//   // Handle input changes for both forms
//   const handleInputChange = (e, formType) => {
//     const { name, value } = e.target;
//     if (formType === 'login') {
//       setLoginData({ ...loginData, [name]: value });
//     } else if (formType === 'signup') {
//       setSignupData({ ...signupData, [name]: value });
//     }
//   };

//   // Handle Signup form submission
//   const handleSignupSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const response = await axios.post(`${process.env.REACT_APP_API_URL}/TravelBuddy/user/register`, signupData);
//       if (response.status === 200) {
//         alert('Signup successful!');
//         setSignupData({ username: '', email: '', password: '' });
//         setCurrentPage(2); // Redirect to login page after signup
//       }
//     } catch (error) {
//       console.error('Signup failed:', error.response?.data || error.message);
//       alert('Signup failed! Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle Login form submission
//   const handleLoginSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const response = await axios.post('http://localhost:4444/TravelBuddy/user/login', loginData);
//       if (response.status === 200) {
//         alert('Login successful!');
//         setLoginData({ email: '', password: '' });
//       }
//     } catch (error) {
//       console.error('Login failed:', error.response?.data || error.message);
//       alert('Login failed! Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Add fullscreen background effect
//   useEffect(() => {
//     document.body.classList.add('fullscreen-background');
//     return () => {
//       document.body.classList.remove('fullscreen-background');
//     };
//   }, []);

//   return (
//     <div className="book">
//       {loading && <div className="loader">Loading...</div>}
//       <div className="flip-book">
//         {/* Signup Page */}
//         <div className={`flip ${currentPage === 1 ? 'active' : 'inactive'}`} id="p1">
//           <div className="back">
//             <div className="welcome-message">
//               <h1 className="head">
//                 Welcome to <span className="span">Travel Buddy!</span>
//               </h1>
//               <h2 className="head">
//                 Adventure Awaits! <span className="span">Sign up</span> now to start planning your
//                 next trip!
//               </h2>
//             </div>
//             <button className="next-btn" onClick={handleNext}>
//               Already have an account? Login
//             </button>
//           </div>
//           <div className="front">
//             <h2 className="login-head">Sign Up</h2>
//             <form onSubmit={handleSignupSubmit}>
//               <input
//                 className="input"
//                 type="text"
//                 name="username"
//                 placeholder="Username"
//                 value={signupData.username}
//                 onChange={(e) => handleInputChange(e, 'signup')}
//                 required
//               />
//               <input
//                 className="input"
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 value={signupData.email}
//                 onChange={(e) => handleInputChange(e, 'signup')}
//                 required
//               />
//               <input
//                 className="input"
//                 type="password"
//                 name="password"
//                 placeholder="Password"
//                 value={signupData.password}
//                 onChange={(e) => handleInputChange(e, 'signup')}
//                 required
//               />
//               <button type="submit" className="submit-btn" disabled={loading}>
//                 Sign Up
//               </button>
//             </form>
//           </div>
//         </div>

//         {/* Login Page */}
//         <div className={`flip ${currentPage === 2 ? 'active' : 'inactive'}`} id="p2">
//           <div className="back">
//             <div className="welcome-message">
//               <h1 className="head">
//                 Welcome Back to <span className="span">Travel Buddy!</span>
//               </h1>
//               <h2 className="head">
//                 The adventure continues here. <span className="span">Log in</span> to pick up where
//                 you left off!
//               </h2>
//             </div>
//             <button className="back-btn" onClick={handleBack}>
//               Don’t have an account? Sign Up
//             </button>
//           </div>
//           <div className="front">
//             <h2 className="login-head">Login</h2>
//             <form onSubmit={handleLoginSubmit}>
//               <input
//                 className="input"
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 value={loginData.email}
//                 onChange={(e) => handleInputChange(e, 'login')}
//                 required
//               />
//               <input
//                 className="input"
//                 type="password"
//                 name="password"
//                 placeholder="Password"
//                 value={loginData.password}
//                 onChange={(e) => handleInputChange(e, 'login')}
//                 required
//               />
//               <button type="submit" className="submit-btn" disabled={loading}>
//                 Login
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;

import { useState } from 'react';
import { useCart } from '../Context/CartContext';
import { useNavigate } from 'react-router-dom';

function CartPage() {
    const {
        cartItems,
        removeFromCart,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
    } = useCart();

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const gst = subtotal * 0.18; // 18% GST
    const total = subtotal + gst;

    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);

    // const userData = localStorage.getItem('user');
    // const user = userData ? JSON.parse(userData) : null;
    let user = null;
    try {
        const userData = localStorage.getItem('user');
        user = userData ? JSON.parse(userData) : null;
    } catch (error) {
        console.warn('Error parsing user data from localStorage:', error);
        localStorage.removeItem('user');
        user = null;
    }

    if (cartItems.length === 0) {
        return (
            <div className="empty-cart">
                <p>Your cart is empty.</p>
                <button onClick={() => navigate('/orders')}>
                    View Order History
                </button>
            </div>
        );
    }

    // const handleCheckout = async () => {
    //     if (!user) {
    //         // Redirect to signup/login and after login redirect back to /cart
    //         console.log('Redirecting to signup because user is not logged in.');
    //         navigate('/signup', { state: { from: '/cart' } });
    //         return;
    //     }

    //     if (!window.Razorpay) {
    //         alert('Razorpay SDK not loaded. Please try again later.');
    //         return;
    //     }

    //     setIsProcessing(true);

    //     try {
    //         // Step 1: Create order on backend
    //         const res = await fetch(`${process.env.REACT_APP_API_URL}/TravelBuddy/payment/create-order`, {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({ amount: total }), // total includes GST
    //         });

    //         const data = await res.json();
    //         const { order } = data;

    //         // Step 2: Open Razorpay
    //         const options = {
    //             key: process.env.REACT_APP_RAZORPAY_KEY_ID,
    //             amount: order.amount,
    //             currency: order.currency,
    //             name: 'TravelBuddy',
    //             description: 'Travel Package Booking',
    //             order_id: order.id,
    //             handler: async function (response) {
    //                 // Step 3: Verify payment
    //                 // const verifyRes = await fetch(`${process.env.REACT_APP_API_URL}/TravelBuddy/payment/verify`, {
    //                 //     method: 'POST',
    //                 //     headers: { 'Content-Type': 'application/json' },
    //                 //     body: JSON.stringify({
    //                 //         razorpay_order_id: response.razorpay_order_id,
    //                 //         razorpay_payment_id: response.razorpay_payment_id,
    //                 //         razorpay_signature: response.razorpay_signature,
    //                 //         amount: order.amount,
    //                 //         currency: order.currency,
    //                 //         userId: user?._id || user?.uid,
    //                 //     }),
    //                 // });
    //                 const verifyRes = await fetch(`${process.env.REACT_APP_API_URL}/TravelBuddy/payment/verify`, {
    //                     method: 'POST',
    //                     headers: { 'Content-Type': 'application/json' },
    //                     body: JSON.stringify({
    //                         razorpay_order_id: response.razorpay_order_id,
    //                         razorpay_payment_id: response.razorpay_payment_id,
    //                         razorpay_signature: response.razorpay_signature,
    //                         amount: order.amount,
    //                         currency: order.currency,
    //                         userId: user?._id || user?.uid,
    //                         items: cartItems, // ✅ Include this
    //                     }),
    //                 });


    //                 const verifyData = await verifyRes.json();
    //                 if (verifyData.success) {
    //                     alert('Payment successful! Order saved.');
    //                     clearCart();
    //                 } else {
    //                     alert('Payment verification failed');
    //                 }
    //                 setIsProcessing(false);
    //             },
    //             prefill: {
    //                 name: user?.name || 'Test User',
    //                 email: user?.email || 'test@example.com',
    //                 contact: user?.phone || '9999999999'
    //             },
    //             theme: {
    //                 color: '#3399cc',
    //             },
    //         };

    //         const rzp = new window.Razorpay(options);
    //         rzp.open();

    //     } catch (err) {
    //         console.error(err);
    //         alert('Something went wrong while processing your payment.');
    //         setIsProcessing(false);
    //     }
    // };

const handleCheckout = async () => {
  if (!user) {
    navigate('/signup', { state: { from: '/cart' ,
        message: 'Please sign in to complete your purchase'
      }  });
    return;
  }

  if (!window.Razorpay) {
    alert('Razorpay SDK not loaded. Please try again later.');
    return;
  }

  setIsProcessing(true);

  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/TravelBuddy/payment/create-order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: total }), 
    });

    const data = await res.json();
    const { order } = data;

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'TravelBuddy',
      description: 'Travel Package Booking',
      order_id: order.id,
      handler: async function (response) {
        // Map cartItems to minimal needed info for backend
        const itemsForBackend = cartItems.map(item => ({
          packageId: item._id,
          quantity: item.quantity,
        }));

        const verifyRes = await fetch(`${process.env.REACT_APP_API_URL}/TravelBuddy/payment/verify`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            amount: order.amount,
            currency: order.currency,
            userId: user?._id || user?.uid,
            items: itemsForBackend,
          }),
        });

        const verifyData = await verifyRes.json();

        if (verifyData.success) {
          alert('Payment successful! Order saved.');
          clearCart();
          navigate('/orders'); // Optionally redirect to order history
        } else {
          alert('Payment verification failed');
        }

        setIsProcessing(false);
      },
      prefill: {
        name: user?.name || 'Test User',
        email: user?.email || 'test@example.com',
        contact: user?.phone || '9999999999',
      },
      theme: { color: '#3399cc' },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

  } catch (err) {
    console.error(err);
    alert('Something went wrong while processing your payment.');
    setIsProcessing(false);
  }
};


    return (
        <div className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Your Cart</h2>
                <button className="btn btn-warning" onClick={clearCart}>Clear Cart</button>
            </div>

            {cartItems.map((item) => (
                <div key={item._id} className="card mb-4 p-3 shadow-sm">
                    <div className="row g-3 align-items-center">
                        <div className="col-md-3">
                            <img
                                src={item.images?.sightseeing?.[0] || 'https://via.placeholder.com/300x200'}
                                alt={item.title}
                                className="img-fluid rounded shadow-sm"
                                style={{ height: '180px', objectFit: 'cover', width: '300px' }}
                            />
                        </div>

                        <div className="col-md-5 text-start">
                            <h3 className="p-3">{item.title}</h3>
                            <p className="mb-1 ps-3">{item.duration}</p>
                            <p className="mb-2 ps-3">₹{item.price.toLocaleString()} per person</p>
                        </div>

                        <div className="col-md-4 text-center mt-4">
                            <div className="d-flex justify-content-center align-items-center mb-3 gap-3">
                                <button className="btn btn-outline-secondary" onClick={() => decreaseQuantity(item._id)}>-</button>
                                <span className="fs-5">{item.quantity}</span>
                                <button className="btn btn-outline-secondary" onClick={() => increaseQuantity(item._id)}>+</button>
                            </div>
                            <button className="btn btn-danger" onClick={() => removeFromCart(item._id)}>
                                Remove Package
                            </button>
                            <p className="text-muted mt-2">
                                Booking package for <strong>{item.quantity}</strong> {item.quantity === 1 ? 'person' : 'people'}
                            </p>
                        </div>
                    </div>
                </div>
            ))}

            <div className="col">
                <div className="p-4 border rounded shadow-sm bg-light">
                    <h5 className="mb-3">Price Summary</h5>
                    <div className="d-flex justify-content-between mb-2">
                        <span>Subtotal</span>
                        <span>₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                        <span>GST (18%)</span>
                        <span>₹{gst.toFixed(2)}</span>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between fw-bold fs-5 mb-3">
                        <span>Total</span>
                        <span>₹{total.toFixed(2)}</span>
                    </div>
                </div>
            </div>
            <button
                className="btn btn-success w-50 mt-3 ms-auto d-block"
                onClick={handleCheckout}
                disabled={isProcessing}
            >
                {isProcessing ? 'Processing...' : 'Proceed to Checkout'}
            </button>
        </div>
    );
}

export default CartPage;
