
// import mongoose from 'mongoose';

// const orderSchema = new mongoose.Schema({
//   userId: { type: String },
//   auth0UserId: { type: String },
//   razorpay_order_id: { type: String, required: true },
//   razorpay_payment_id: { type: String, required: true },
//   amount: { type: Number, required: true },
//   currency: { type: String, default: 'INR' },
//   status: { type: String, default: 'pending' },
//   items: [
//     {
//       name: String,
//       price: Number,
//       quantity: Number,
//     },
//   ],
// }, { timestamps: true });

// const Order = mongoose.model('Order', orderSchema);

// export default Order;

import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String },
    auth0UserId: { type: String },
    razorpay_order_id: { type: String, required: true },
    razorpay_payment_id: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'INR' },
    status: { type: String, default: 'pending' },
    items: [
      {
        packageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Package' }, // reference to package
        name: String,
        basePrice: Number,
        gst: Number,
        price: Number, // total price after gst per quantity
        quantity: Number,
        basicInfo: String,
        image: String, // 🌟 added field for main package image
      },
    ],
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
