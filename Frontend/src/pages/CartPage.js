

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
        <div className="empty-cart d-flex flex-column align-items-center justify-content-center py-5">
            <div className="card shadow-sm p-5 text-center" style={{ maxWidth: '500px', width: '100%' }}>
                <div className="mb-4">
                    <i className="bi bi-cart-x fs-1 text-muted"></i>
                </div>
                <h3 className="mb-3">Your cart is empty</h3>
                <p className="text-muted mb-4">Looks like you haven't added any items to your cart yet.</p>
                
                <div className="d-flex flex-column gap-3">
                    <button 
                        onClick={() => navigate('/packages')}  // Replace with your packages route
                        className="btn btn-primary px-4"
                    >
                        <i className="bi bi-search me-2"></i>
                        Browse Packages
                    </button>
                    
                    <button 
                        onClick={() => navigate('/orders')}
                        className="btn btn-outline-primary px-4"
                    >
                        <i className="bi bi-clock-history me-2"></i>
                        View Order History
                    </button>
                </div>
            </div>
        </div>
    );
}

 
  const handleCheckout = async () => {
    if (!user) {
      navigate('/Signup', {
        state: {
          from: '/cart',
          message: 'Please sign in to complete your purchase'
        }
      });
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
            <div>
                <button className="btn btn-outline-primary me-2" onClick={() => navigate('/orders')}>
                    <i className="bi bi-clock-history me-2"></i>
                    View Order History
                </button>
                <button className="btn btn-warning" onClick={clearCart}>Clear Cart</button>
            </div>
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

        <div className="row">
            <div className="col-md-8">
                {/* Optional: You could add something here like a promo code input */}
            </div>
            <div className="col-md-4">
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
                    <button
                        className="btn btn-success w-100"
                        onClick={handleCheckout}
                        disabled={isProcessing}
                    >
                        {isProcessing ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                Processing...
                            </>
                        ) : 'Proceed to Checkout'}
                    </button>
                </div>
            </div>
        </div>
    </div>
);
}

export default CartPage;
