// // routes/payment.js
// const express = require('express');
// const Razorpay = require('razorpay');
// const router = express.Router();
// const crypto = require('crypto');
// const Order = require('../models/Order');

// const razorpayInstance = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// router.post('/create-order', async (req, res) => {
//   try {
//     const { amount } = req.body;
//     if (!amount) {
//       return res.status(400).json({ error: 'Amount is required' });
//     }

//     const options = {
//       amount: amount * 100, // amount in paise
//       currency: 'INR',
//       receipt: `receipt_${Date.now()}`,
//     };

//     const order = await razorpayInstance.orders.create(options);
//     res.json({ order });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to create order' });
//   }
// });



// router.post('/verify', async (req, res) => {
//   const {
//     razorpay_order_id,
//     razorpay_payment_id,
//     razorpay_signature,
//     amount,
//     currency,
//     userId,
//     auth0UserId,
//   } = req.body;

//   if (!userId && !auth0UserId) {
//     return res.status(400).json({ success: false, message: 'User not identified' });
//   }

//   // Verify signature
//   const generated_signature = crypto
//     .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
//     .update(razorpay_order_id + '|' + razorpay_payment_id)
//     .digest('hex');

//   if (generated_signature !== razorpay_signature) {
//     return res.status(400).json({ success: false, message: 'Invalid signature' });
//   }

//   try {
//     const order = new Order({
//       userId: userId || null,
//       auth0UserId: auth0UserId || null,
//       razorpay_order_id,
//       razorpay_payment_id,
//       amount,
//       currency,
//       status: 'paid',
//     });

//     await order.save();

//     res.json({ success: true, message: 'Payment verified and order saved' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: 'Failed to save order' });
//   }
// });


// module.exports = router;





// import express from 'express';
// import Razorpay from 'razorpay';
// import crypto from 'crypto';
// import Order from '../model/order.js';  // make sure to use .js extension if needed
// import { isLoggedIn } from '../middlewares/isLoggedin.js';
// import Packages from './package.js';

// const router = express.Router();

// const razorpayInstance = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// router.post('/create-order', async (req, res) => {
//   try {
//     const { amount } = req.body;
//     if (!amount) {
//       return res.status(400).json({ error: 'Amount is required' });
//     }

//     const options = {
//       amount: amount * 100, // amount in paise
//       currency: 'INR',
//       receipt: `receipt_${Date.now()}`,
//     };

//     const order = await razorpayInstance.orders.create(options);
//     res.json({ order });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to create order' });
//   }
// });

// // router.post('/verify', async (req, res) => {
// //   const {
// //     razorpay_order_id,
// //     razorpay_payment_id,
// //     razorpay_signature,
// //     amount,
// //     currency,
// //     userId,
// //     auth0UserId,
// //   } = req.body;

// //   if (!userId && !auth0UserId) {
// //     return res.status(400).json({ success: false, message: 'User not identified' });
// //   }

// //   // Verify signature
// //   const generated_signature = crypto
// //     .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
// //     .update(razorpay_order_id + '|' + razorpay_payment_id)
// //     .digest('hex');

// //   if (generated_signature !== razorpay_signature) {
// //     return res.status(400).json({ success: false, message: 'Invalid signature' });
// //   }

// //   try {
// //     const order = new Order({
// //       userId: userId || null,
// //       auth0UserId: auth0UserId || null,
// //       razorpay_order_id,
// //       razorpay_payment_id,
// //       amount,
// //       currency,
// //       status: 'paid',
// //     });

// //     await order.save();

// //     res.json({ success: true, message: 'Payment verified and order saved' });
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({ success: false, message: 'Failed to save order' });
// //   }
// // });


// router.post('/verify', async (req, res) => {
//   const {
//     razorpay_order_id,
//     razorpay_payment_id,
//     razorpay_signature,
//     amount,
//     currency,
//     userId,
//     auth0UserId,
//     items, // ✅ include this
//   } = req.body;

//   // Signature validation logic...

//   try {
//     const order = new Order({
//       userId: userId || null,
//       auth0UserId: auth0UserId || null,
//       razorpay_order_id,
//       razorpay_payment_id,
//       amount,
//       currency,
//       status: 'paid',
//       items, 
//     });

//     await order.save();

//     res.json({ success: true, message: 'Payment verified and order saved' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: 'Failed to save order' });
//   }
// });


// // Import express, Order model, etc. (you already have)

// // router.get('/orders/history', async (req, res) => {
// //   try {
// //     // Assume userId is passed as a query param or extracted from auth token
// //     // const { userId, auth0UserId } = req.query;

// //     const userId = req.user._id;


// //     if (!userId && !auth0UserId) {
// //       return res.status(400).json({ message: 'User not identified' });
// //     }

// //     // Find all orders for the user (by either ID)
// //     const orders = await Order.find({
// //       $or: [{ userId: userId || null }, { auth0UserId: auth0UserId || null }]
// //     }).sort({ createdAt: -1 });

// //     res.json(orders);
// //   } catch (error) {
// //     console.error('Error fetching order history:', error);
// //     res.status(500).json({ message: 'Failed to fetch order history' });
// //   }
// // });

// router.get('/orders/history', isLoggedIn, async (req, res) => {
//   try {
//     const userId = req.user._id;  // obtained from the auth middleware

//     if (!userId) {
//       return res.status(400).json({ message: 'User not identified' });
//     }

//     // Find orders for this user only
//     const orders = await Order.find({ userId }).sort({ createdAt: -1 });

//     res.json(orders);
//   } catch (error) {
//     console.error('Error fetching order history:', error);
//     res.status(500).json({ message: 'Failed to fetch order history' });
//   }
// });


// export default router;





import express from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import Order from '../model/order.js';
import { isLoggedIn } from '../middlewares/isLoggedin.js';
import Package from '../model/package.js';

const router = express.Router();

// ✅ Razorpay Instance
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ✅ 1. Create Razorpay Order
router.post('/create-order', async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({ error: 'Amount is required' });
    }

    const options = {
      amount: amount * 100, // Convert to paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpayInstance.orders.create(options);
    res.json({ order });
  } catch (error) {
    console.error('Create Order Error:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});


// ✅ 2. Verify Payment & Save Order
router.post('/verify', async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    amount,
    currency,
    userId,
    auth0UserId,
    items, // Should contain: [{ packageId, quantity }]
  } = req.body;

  if (!items || !Array.isArray(items)) {
    return res.status(400).json({ success: false, message: 'Items are required' });
  }

  // console.log('razorpay_order_id:', razorpay_order_id);
  // console.log('razorpay_payment_id:', razorpay_payment_id);
  // console.log('razorpay_signature (client):', razorpay_signature);

  // ✅ Signature validation
  const generated_signature = crypto
  .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
  .update(`${razorpay_order_id}|${razorpay_payment_id}`)
  .digest('hex');

if (generated_signature !== razorpay_signature) {
  return res.status(400).json({ success: false, message: 'Invalid signature' });
}

  try {
    // ✅ Build full order item details
    const detailedItems = await Promise.all(
      items.map(async ({ packageId, quantity }) => {
        const pkg = await Package.findById(packageId);
        const basePrice = pkg.price;
        const gst = Math.round(basePrice * 0.05); // 5% GST
        const price = (basePrice + gst) * quantity;

        return {
          packageId,
          name: pkg.title,
          basePrice,
          gst,
          price,
          quantity,
          basicInfo: pkg.description,
          image: pkg.image || '',
        };
      })
    );

    const newOrder = new Order({
      userId: userId || null,
      auth0UserId: auth0UserId || null,
      razorpay_order_id,
      razorpay_payment_id,
      amount,
      currency,
      status: 'paid',
      items: detailedItems,
    });

    await newOrder.save();
    res.json({ success: true, message: 'Payment verified and order saved' });
  } catch (error) {
    console.error('Verify Order Error:', error);
    res.status(500).json({ success: false, message: 'Failed to save order' });
  }
});


// ✅ 3. Get Order History
// router.get('/orders/history', isLoggedIn, async (req, res) => {
//   try {
//     const userId = req.user._id;

//     if (!userId) {
//       return res.status(400).json({ message: 'User not identified' });
//     }

//     const orders = await Order.find({ userId }).sort({ createdAt: -1 });
//     res.json(orders);
//   } catch (error) {
//     console.error('Error fetching order history:', error);
//     res.status(500).json({ message: 'Failed to fetch order history' });
//   }
// });

// router.get('/orders/history', isLoggedIn, async (req, res) => {
//   try {
//     const userId = req.user._id;
//     const auth0UserId = req.user.auth0UserId; // Adjust this based on how you store Auth0 user ID in req.user

//     if (!userId && !auth0UserId) {
//       return res.status(400).json({ message: 'User not identified' });
//     }

//     // Query orders by userId if exists, otherwise by auth0UserId
//     const query = userId ? { userId } : { auth0UserId };

//     const orders = await Order.find(query).sort({ createdAt: -1 });
//     res.json(orders);
//   } catch (error) {
//     console.error('Error fetching order history:', error);
//     res.status(500).json({ message: 'Failed to fetch order history' });
//   }
// });
router.get('/orders/history', isLoggedIn, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching orders' });
  }
});


export default router;
