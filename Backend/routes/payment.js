

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



  const generated_signature = crypto
  .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
  .update(`${razorpay_order_id}|${razorpay_payment_id}`)
  .digest('hex');

if (generated_signature !== razorpay_signature) {
  return res.status(400).json({ success: false, message: 'Invalid signature' });
}

  try {
    
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


router.get('/orders/history', isLoggedIn, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching orders' });
  }
});


export default router;
