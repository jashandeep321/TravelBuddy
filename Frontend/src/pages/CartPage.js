// import { useCart } from '../Context/CartContext';
// import { Link } from 'react-router-dom';

// function CartPage() {
//   const { cartItems, increaseQuantity, decreaseQuantity, clearCart } = useCart();

//   if (cartItems.length === 0) return <div className="text-center py-5">Your cart is empty.</div>;

//   return (
//     <div className="container py-5">
//       <h2 className="mb-4">Your Cart</h2>
//       {cartItems.map((item) => (
//         <div key={item._id} className="card mb-3 p-3 shadow-sm">
//           <h4>{item.title}</h4>
//           <p>{item.duration}</p>
//           <p>₹{item.price} per person</p>

//           {/* Quantity Controls */}
//           <div className="d-flex align-items-center mb-2">
//             <button
//               className="btn btn-outline-secondary me-2"
//               onClick={() => decreaseQuantity(item._id)}
//             >
//               -
//             </button>
//             <span className="fw-bold">{item.quantity}</span>
//             <button
//               className="btn btn-outline-secondary ms-2"
//               onClick={() => increaseQuantity(item._id)}
//             >
//               +
//             </button>
//           </div>

//           {/* Message */}
//           <p className="text-muted">Booking package for {item.quantity} {item.quantity === 1 ? 'person' : 'people'}</p>

//           <p className="fw-bold">Subtotal: ₹{item.price * item.quantity}</p>
//         </div>
//       ))}

//       {/* Cart Controls */}
//       <div className="mt-4">
//         <button className="btn btn-warning me-2" onClick={clearCart}>Clear Cart</button>
//         <Link to="/checkout" className="btn btn-success">Proceed to Checkout</Link>
//       </div>
//     </div>
//   );
// }

// export default CartPage;


// pages/CartPage.js
import { useCart } from '../Context/CartContext';
import { Link } from 'react-router-dom';

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

    if (cartItems.length === 0) {
        return <div className="text-center py-5">Your cart is empty.</div>;
    }

    return (
        <div className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Your Cart</h2>
                <button className="btn btn-warning" onClick={clearCart}>Clear Cart</button>
            </div>

            {cartItems.map((item) => (
                <div key={item._id} className="card mb-4 p-3 shadow-sm">
                    <div className="row g-3 align-items-center">
                        {/* Left: Image */}
                        <div className="col-md-3">
                            <img
                                src={item.images?.sightseeing?.[0] || 'https://via.placeholder.com/300x200'}
                                alt={item.title}
                                className="img-fluid rounded shadow-sm"
                                style={{ height: '180px', objectFit: 'cover', width:'300px' }}
                            />
                        </div>

                        {/* Middle: Info */}
                        <div className="col-md-5 text-start ">
                            <h3 className='p-3'>{item.title}</h3>
                            <p className="mb-1 ps-3">{item.duration}</p>
                            <p className="mb-2 ps-3">₹{item.price.toLocaleString()} per person</p>

                            {/* <p className="fw-semibold">Subtotal: ₹{(item.price * item.quantity).toLocaleString()}</p> */}
                        </div>

                        {/* Right: Controls */}
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

            {/* Bottom Section */}
            {/* <div className="row align-items-start mt-5"> */}
                {/* Left: Actions */}
                {/* <div className="col-md-6 mb-3 d-flex flex-column gap-3">
                    <button className="btn btn-warning w-100" onClick={clearCart}>Clear Cart</button>
                    <Link to="/checkout" className="btn btn-success w-100">Proceed to Checkout</Link>
                </div> */}

                {/* Right: Summary */}
                <div className="col">
                    <div className="p-4 border rounded shadow-sm bg-light">
                        <h5 className="mb-3">Price Summary</h5>
                        <div className="d-flex justify-content-between mb-2">
                            <span>Subtotal</span>
                            <span>₹{subtotal.toLocaleString()}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                            <span>GST (18%)</span>
                            <span>₹{gst.toFixed(0)}</span>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between fw-bold fs-5 mb-3">
                            <span>Total</span>
                            <span>₹{total.toLocaleString()}</span>
                        </div>
                        {/* <Link to="/checkout" className="btn btn-success w-100">Proceed to Checkout</Link> */}
                    </div>
                </div>
                {/* <button className="btn btn-warning" onClick={clearCart}>Clear Cart</button> */}
                <Link to="/checkout" className="btn btn-success w-50 mt-3 ms-auto d-block">Proceed to Checkout</Link>
            {/* </div> */}
        </div>
    );
}

export default CartPage;

